package aphamale.project.appointment.Jwt;

import java.io.IOException;
import java.io.PrintWriter;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import aphamale.project.appointment.Domain.HospitalInfoDomain;
import aphamale.project.appointment.Domain.UserInfoDomain;
import aphamale.project.appointment.Dto.CustomAdminUserDetails;
import aphamale.project.appointment.Dto.CustomUserDetails;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;



public class JwtFilter extends OncePerRequestFilter{

    private final JwtUtil jwtUtil;

    public JwtFilter(JwtUtil jwtUtil){
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

            // 헤더에서 access키에 담긴 토큰을 꺼냄
             String accessToken = request.getHeader("access");

            // 토큰이 없다면 다음 필터로 넘김
            if (accessToken == null) {

                filterChain.doFilter(request, response);

                return;
            }

            // 토큰 만료 여부 확인, 만료시 다음 필터로 넘기지 않음
            try {

                jwtUtil.isExpired(accessToken);

            } catch (ExpiredJwtException e) {

                // response body
                PrintWriter writer = response.getWriter();
                writer.print("access token expired"); // 토큰이 만료되었습니다.

                //response status code
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 특정 상태 코드를 보내면 됨.
                return;
            }

            // 토큰이 access인지 확인 (발급시 페이로드에 명시)
            String category = jwtUtil.getCategory(accessToken);

            // 액세스 토큰이 아니면
            if (!category.equals("access")) { 

                //response body
                PrintWriter writer = response.getWriter();
                writer.print("invalid access token"); // 유효하지 않은 토큰입니다.

                //response status code
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 특정 상태 코드를 보내면 됨.
                return;
            }

            // username, role 값을 획득
            String userId = jwtUtil.getUsername(accessToken);
            String role = jwtUtil.getRole(accessToken);

            if(role.equals("USER")){

                UserInfoDomain userInfoDomain = new UserInfoDomain();
                userInfoDomain.setUserId(userId);
                userInfoDomain.setJwtRole(role);
                CustomUserDetails customUserDetails = new CustomUserDetails(userInfoDomain);
    
    
                // 토큰 생성 
                Authentication authToken = new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authToken);

            }
            else{

                HospitalInfoDomain hospitalInfoDomain = new HospitalInfoDomain();
                hospitalInfoDomain.setHospitalId(userId);
                hospitalInfoDomain.setJwtRole(role);
                CustomAdminUserDetails customAdminUserDetails = new CustomAdminUserDetails(hospitalInfoDomain);
    
    
                // 토큰 생성 
                Authentication authToken = new UsernamePasswordAuthenticationToken(customAdminUserDetails, null, customAdminUserDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authToken);


            }

            filterChain.doFilter(request, response);               


                // 리프레쉬 토큰 적용 전 소스
                // // //request에서 Authorization 헤더를 찾음
                // String authorization = request.getHeader("Authorization");

                // // 토큰이 없거나, 인증 방식이 다른 경우 종료
                // if (authorization == null || !authorization.startsWith("Bearer ")) {

                //     System.out.println("token null");
                //     filterChain.doFilter(request, response); // 다음 필터로 넘겨준다.
                                
                //     //조건이 해당되면 메소드 종료 (필수)
                //     return;
                // }

				// // Bearer 부분 제거 후 순수 토큰만 획득
                // String token = authorization.split(" ")[1];     
                   
                // // 토큰 소멸 시간 검증
                // if (jwtUtil.isExpired(token)) {

                //     System.out.println("token expired");
                //     filterChain.doFilter(request, response); // 다음 필터로 넘겨준다.

                //     //조건이 해당되면 메소드 종료 (필수)
                //     return;
                // }

                // // 아래 부분은 일시적으로 세션에 로그인 계정 정보를 저장하여 권한 유지

				// // 토큰에서 username과 role 획득
                // String userId = jwtUtil.getUsername(token);
                // String role = jwtUtil.getRole(token);

				// //UserInfoDomain를 생성하여 값 set
                // UserInfoDomain userInfoDomain = new UserInfoDomain();
                // userInfoDomain.setUserId(userId);
                // userInfoDomain.setUserPw("temppassword"); // SecurityContextHolder에 임의 비밀번호 대입(정확한 PW 필요x)
                // userInfoDomain.setJwtRole(role);       
                
                // CustomUserDetails customUserDetails = new CustomUserDetails(userInfoDomain);

 				// // 스프링 시큐리티 인증 토큰 생성
                // Authentication  authToken = new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities());
                
                // SecurityContextHolder.getContext().setAuthentication(authToken);

                // filterChain.doFilter(request, response);

    }
    
}