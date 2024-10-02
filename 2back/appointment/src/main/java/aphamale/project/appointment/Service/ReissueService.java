package aphamale.project.appointment.Service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import aphamale.project.appointment.Domain.HospitalInfoDomain;
import aphamale.project.appointment.Domain.UserInfoDomain;
import aphamale.project.appointment.Jwt.JwtUtil;
import aphamale.project.appointment.Repository.HospitalInfoRepository;
import aphamale.project.appointment.Repository.UserInfoRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Service
public class ReissueService {

    private final JwtUtil jwtUtil;
    private final UserInfoRepository userInfoRepository;
    private final HospitalInfoRepository hospitalInfoRepository;

    public ReissueService(JwtUtil jwtUtil, UserInfoRepository userInfoRepository, HospitalInfoRepository hospitalInfoRepository){
        this.jwtUtil = jwtUtil;
        this.userInfoRepository = userInfoRepository;
        this.hospitalInfoRepository = hospitalInfoRepository;
    }


    public ResponseEntity<?> RefreshTokenCheck(HttpServletRequest request, HttpServletResponse response){

        // get refresh token
        String refresh = null;
        Cookie[] cookies = request.getCookies(); // 쿠키를 배열로 가져온다.
        // 배열을 돌면서 리프레쉬 토큰값이 있는 지 확인
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("refresh")) {

                refresh = cookie.getValue();
            }
        }

        String userId = jwtUtil.getUsername(refresh);
        String role = jwtUtil.getRole(refresh);

        // 리프레쉬 토큰이 null 이면 리프레쉬 토큰이 없으면
        if (refresh == null) {

            //response status code
            return new ResponseEntity<>("refresh token null", HttpStatus.BAD_REQUEST); // 리프레쉬 토큰이 없습니다.
        }       

        String jwtRefresh = "";

        // 사용자 계정이면
        if(role.equals("USER")){

            // DB에 해당 userId에 저장된 refresh token 값 가져옴.
            UserInfoDomain userInfoDomain = userInfoRepository.findByUserId(userId);
            jwtRefresh = userInfoDomain.getJwtRefresh(); 

        }
        else{
            HospitalInfoDomain hospitalInfoDomain = hospitalInfoRepository.findByHospitalId(userId).orElseThrow(() -> new UsernameNotFoundException(userId));
            jwtRefresh = hospitalInfoDomain.getJwtRefresh();
        }


        if(!refresh.equals(jwtRefresh)){

        // response status code
        return new ResponseEntity<>("invalid refresh token", HttpStatus.BAD_REQUEST); // 유효하지 않는 토큰입니다.

        }


        // 리프레쉬 토큰이 만료되었는 지 확인 expired check
        // db에 있는 refresh token만 유효하므로 주석처리 함.
        // try {
        //     jwtUtil.isExpired(refresh);
        // } catch (ExpiredJwtException e) {

        //     // response status code
        //     return new ResponseEntity<>("refresh token expired", HttpStatus.BAD_REQUEST); // 토큰이 만료되었습니다.
        // }

        // 토큰이 refresh인지 확인 (발급시 페이로드에 명시)
        String category = jwtUtil.getCategory(refresh);

        // 리프레쉬 토큰이 아니면
        if (!category.equals("refresh")) {

            //response status code
            return new ResponseEntity<>("invalid refresh token", HttpStatus.BAD_REQUEST); // 유효하지 않은 리프레쉬 코드입니다.
        }


        // 새로운 액세스 토큰 및 리프레쉬 토큰 생성 make new JWT
        String newAccess = jwtUtil.createJwt("access", userId, role, 600000L); 
        String newRefresh = jwtUtil.createJwt("refresh", userId, role, 86400000L); // 24시간

        // response // 응답 헤더에 새로운 액세스 토큰, 리프레쉬 토큰 추가
        response.setHeader("access", newAccess);
        response.addCookie(createCookie("refresh", newRefresh));   
        
        // Refresh 토큰 저장 DB에 새 Refresh 토큰 저장
        addRefreshToken(userId, newRefresh, role, 86400000L);
		
        
        return new ResponseEntity<>(HttpStatus.OK);  // 응답 전송 

        }

        // 쿠키 생성 매서드
        private Cookie createCookie(String key, String value) {

            Cookie cookie = new Cookie(key, value);
            cookie.setMaxAge(24*60*60);
            cookie.setSecure(true);
            cookie.setPath("/");
            cookie.setAttribute("SameSite", "None");      
            cookie.setHttpOnly(true);
        
            return cookie;
        }

    // db에 refresh Token update 매서드
    private void addRefreshToken(String userId, String refresh, String role, Long expiredMs) {

        // Date date = new Date(System.currentTimeMillis() + expiredMs); // 만료 기한 사용 안 하므로
        // userInfoDomain.setExpiration(date.toString()); // 만료 기한 사용 안 하므로
    
        if(role.equals("USER")){
            UserInfoDomain userInfoDomain = userInfoRepository.findByUserId(userId);
            userInfoDomain.setJwtRefresh(refresh);    
    
            userInfoRepository.save(userInfoDomain);

        }else{
            HospitalInfoDomain hospitalInfoDomain = hospitalInfoRepository.findByHospitalId(userId).orElseThrow(() -> new UsernameNotFoundException(userId));
            hospitalInfoDomain.setJwtRefresh(refresh);

            hospitalInfoRepository.save(hospitalInfoDomain);

        }

    }

        
}

