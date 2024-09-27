package aphamale.project.appointment.Jwt;

import java.io.IOException;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.filter.GenericFilterBean;

import aphamale.project.appointment.Domain.HospitalInfoDomain;
import aphamale.project.appointment.Domain.UserInfoDomain;
import aphamale.project.appointment.Repository.HospitalInfoRepository;
import aphamale.project.appointment.Repository.UserInfoRepository;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class CustomLogoutFilter extends GenericFilterBean {

    private final JwtUtil jwtUtil;
    private final UserInfoRepository userInfoRepository;
    private final HospitalInfoRepository hospitalInfoRepository;

    public CustomLogoutFilter(JwtUtil jwtUtil, UserInfoRepository userInfoRepository, HospitalInfoRepository hospitalInfoRepository){
        this.jwtUtil = jwtUtil;
        this.userInfoRepository = userInfoRepository;
        this.hospitalInfoRepository = hospitalInfoRepository;
    }

    // GenericFilterBean 안에 기본으로 제공하는 doFilter
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
         
        doFilter((HttpServletRequest) request, (HttpServletResponse) response, chain);
    }

    // 커스텀한 doFilter
    private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {

        //path and method verify
        String requestUri = request.getRequestURI();
        // 로그아웃 경로인지 확인
        if (!requestUri.matches("^\\/api/logout$")) { 

            filterChain.doFilter(request, response);
            return;
        }

        // post요청이 맞는 지 확인
        String requestMethod = request.getMethod();
        if (!requestMethod.equals("POST")) {

            filterChain.doFilter(request, response);
            return;
        }

        // get refresh token
        String refresh = null;
        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {

            if (cookie.getName().equals("refresh")) {

                refresh = cookie.getValue();
            }
        }

        String userId = jwtUtil.getUsername(refresh);
        String role = jwtUtil.getRole(refresh);

        // refresh null check
        if (refresh == null) {

            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        // expired check 만료 기한 확인
        try {
            jwtUtil.isExpired(refresh);
        } catch (ExpiredJwtException e) {

            // response status code
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        // 토큰이 refresh인지 확인 (발급시 페이로드에 명시)
        String category = jwtUtil.getCategory(refresh);
        if (!category.equals("refresh")) {

            //response status code
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        //DB에 저장되어 있는지 확인
        // Boolean isExist = userInfoRepository.existsByRefresh(refresh);
        // if (!isExist) {

        //     //response status code
        //     response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        //     return;
        // }

        //DB에 저장되어 있는지 확인
        String getRefresh = "";

        if(role.equals("USER")){

            UserInfoDomain userInfoDomain = userInfoRepository.findByUserId(userId);
            getRefresh = userInfoDomain.getJwtRefresh();   

        }else{
            HospitalInfoDomain hospitalInfoDomain = hospitalInfoRepository.findByHospitalId(userId).orElseThrow(() -> new UsernameNotFoundException(userId));
            getRefresh = hospitalInfoDomain.getJwtRefresh(); 

        }  
        
        if (!refresh.equals(getRefresh)) {
            // response status code
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);           
        }

        // 로그아웃 진행
        // Refresh 토큰 DB에서 제거
        // userInfoRepository.deleteByRefresh(refresh);

        if(role.equals("USER")){
            UserInfoDomain userInfoDomain = userInfoRepository.findByUserId(userId);
            userInfoDomain.setJwtRefresh("");   // jwt_refresh 컬럼을 공백 처리
            
            userInfoRepository.save(userInfoDomain);
        }else{
            HospitalInfoDomain hospitalInfoDomain = hospitalInfoRepository.findByHospitalId(userId).orElseThrow(() -> new UsernameNotFoundException(userId));
            hospitalInfoDomain.setJwtRefresh(""); // // jwt_refresh 컬럼을 공백 처리

            hospitalInfoRepository.save(hospitalInfoDomain);
        }

        //Refresh 토큰 Cookie 값 0
        Cookie cookie = new Cookie("refresh", null); // 리프레쉬 토큰 null 값
        cookie.setMaxAge(0); // 쿠키의 시간 값 0 으로 변경
        cookie.setPath("/");

        response.addCookie(cookie);
        response.setStatus(HttpServletResponse.SC_OK);
    }
    
}
