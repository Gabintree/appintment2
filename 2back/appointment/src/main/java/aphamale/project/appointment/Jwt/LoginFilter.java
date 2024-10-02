package aphamale.project.appointment.Jwt;

import java.util.Collection;
import java.util.Iterator;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import aphamale.project.appointment.Domain.HospitalInfoDomain;
import aphamale.project.appointment.Domain.UserInfoDomain;
import aphamale.project.appointment.Dto.CustomAdminUserDetails;
import aphamale.project.appointment.Dto.CustomUserDetails;
import aphamale.project.appointment.Repository.HospitalInfoRepository;
import aphamale.project.appointment.Repository.UserInfoRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class LoginFilter extends UsernamePasswordAuthenticationFilter {

    // 토큰 검증 매니저
    private final AuthenticationManager authenticationManager;

    // 토큰 발행 
    private final JwtUtil jwtUtil;

    private final UserInfoRepository userInfoRepository;
    private final HospitalInfoRepository hospitalInfoRepository;


    public LoginFilter(AuthenticationManager authenticationManager, JwtUtil jwtUtil, 
                       UserInfoRepository userInfoRepository, HospitalInfoRepository hospitalInfoRepository) {

        this.authenticationManager = authenticationManager;
        //LoiginFilter 경로 변경(자동으로 /login을 찾아 적용한다고 함, 그래서 변경 처리)    
        this.setFilterProcessesUrl("/api/login");
        this.setUsernameParameter("userId"); // userId로 변경
        this.setPasswordParameter("userPw"); // userPw로 변경 

        this.jwtUtil = jwtUtil;
        this.userInfoRepository = userInfoRepository;
        this.hospitalInfoRepository = hospitalInfoRepository;
    }      



    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        // 클라이언트 요청에서 userName, userPw 추출, userId는 ?? @_@??
        String userId = obtainUsername(request);
        String userPw = obtainPassword(request);
        //String role = request.getParameter("role");

	    // 스프링 시큐리티에서 userName과 userPw 검증하기 위해서는 token에 담아야 함
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userId, userPw, null);

        // token에 담은 검증을 위한 AuthenticationManager로 전달
        return authenticationManager.authenticate(authToken);
    }

	// 로그인 성공시 실행하는 메서드 (여기서 JWT를 발급하면 됨)
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) {

        // role 찾기
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();

        String role = auth.getAuthority();

        // userId 찾기
        String userId = "";
        if(role.equals("ROLE_USER")){
            // 사용자    
            CustomUserDetails customUserDetails = (CustomUserDetails)authentication.getPrincipal();
            userId = customUserDetails.getUsername();
        }
        else{
            // 관리자
            CustomAdminUserDetails customAdminUserDetails = (CustomAdminUserDetails)authentication.getPrincipal();
            userId = customAdminUserDetails.getUsername();
        }


        // 토큰 생성
        String access = jwtUtil.createJwt("access", userId, role, 600000L);
        String refresh = jwtUtil.createJwt("refresh", userId, role, 86400000L);     

        // db에 refresh Token 저장
        addRefreshToken(userId, refresh, role, 86400000L);


        
        //응답 설정
        response.setHeader("access", access); // 헤더에 액세스 토큰 넣고
        response.addCookie(createCookie("refresh", refresh)); // 쿠키에 리프레쉬 토큰 넣고
        response.setStatus(HttpStatus.OK.value()); // 응답 상태 코드




        // 리프레쉬 토큰 발급 전 소스
        // // userId 찾기
        // CustomUserDetails customUserDetails = (CustomUserDetails)authentication.getPrincipal();
        // String userId = customUserDetails.getUsername();

        // // role 찾기
        // Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        // Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        // GrantedAuthority auth = iterator.next();

        // String role = auth.getAuthority();

        // // toeken 발행 요청
        // String token = jwtUtil.createJwt(userId, role, 24*60*60*1000L); // 24*60*60*1000L 이렇게 하면 하루인 듯

        // // 발급된 token 담아 사용, 접두사 "Bearer " 필요, 띄워쓰기 필수
        // response.addHeader("Authorization", "Bearer " + token);

    }    

    // 로그인 실패시 실행하는 메서드
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) {

        response.setStatus(401);
    }    

    // 쿠키 생성 매서드
    private Cookie createCookie(String key, String value) {

        Cookie cookie = new Cookie(key, value); // value에는 jwt 값
        cookie.setMaxAge(24*60*60); // 쿠키의 생명 주기 하루?
        cookie.setSecure(true); // https 통신을 할 경우 
        cookie.setPath("/"); // 쿠키가 적용될 범위 설정                        
        cookie.setHttpOnly(true); // 클라이언트 -> 서버로 접근하지 못하게 필수적으로 막는 것.
        
        return cookie;
    }

    // db에 refresh Token update 매서드
    private void addRefreshToken(String userId, String refresh, String role, Long expiredMs) {

        // Date date = new Date(System.currentTimeMillis() + expiredMs); // 만료 기한 사용 안 하므로
        // userInfoDomain.setExpiration(date.toString()); // 만료 기한 사용 안 하므로 w주석

        if(role.equals("ROLE_USER")){
            UserInfoDomain userInfoDomain = userInfoRepository.findByUserId(userId);
            userInfoDomain.setJwtRefresh(refresh);
    
            userInfoRepository.save(userInfoDomain);
        }
        else{
            HospitalInfoDomain hospitalInfoDomain = hospitalInfoRepository.findByHospitalId(userId).orElseThrow(() -> new UsernameNotFoundException(userId));
            hospitalInfoDomain.setJwtRefresh(refresh);

            hospitalInfoRepository.save(hospitalInfoDomain);
        }
    


    }    

}
