package aphamale.project.appointment.Jwt;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import aphamale.project.appointment.Domain.UserInfoDomain;
import aphamale.project.appointment.Dto.CustomUserDetails;
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

                // //request에서 Authorization 헤더를 찾음
                String authorization = request.getHeader("Authorization");

                // 토큰이 없거나, 인증 방식이 다른 경우 종료
                if (authorization == null || !authorization.startsWith("Bearer ")) {

                    System.out.println("token null");
                    filterChain.doFilter(request, response); // 다음 필터로 넘겨준다.
                                
                    //조건이 해당되면 메소드 종료 (필수)
                    return;
                }

				// Bearer 부분 제거 후 순수 토큰만 획득
                String token = authorization.split(" ")[1];     
                   
                // 토큰 소멸 시간 검증
                if (jwtUtil.isExpired(token)) {

                    System.out.println("token expired");
                    filterChain.doFilter(request, response); // 다음 필터로 넘겨준다.

                    //조건이 해당되면 메소드 종료 (필수)
                    return;
                }

                // 아래 부분은 일시적으로 세션에 로그인 계정 정보를 저장하여 권한 유지

				// 토큰에서 username과 role 획득
                String userId = jwtUtil.getUsername(token);
                String role = jwtUtil.getRole(token);

				//UserInfoDomain를 생성하여 값 set
                UserInfoDomain userInfoDomain = new UserInfoDomain();
                userInfoDomain.setUserId(userId);
                userInfoDomain.setUserPw("temppassword"); // SecurityContextHolder에 임의 비밀번호 대입(정확한 PW 필요x)
                userInfoDomain.setJwtRole(role);       
                
                CustomUserDetails customUserDetails = new CustomUserDetails(userInfoDomain);

 				// 스프링 시큐리티 인증 토큰 생성
                Authentication  authToken = new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities());
                
                SecurityContextHolder.getContext().setAuthentication(authToken);

                filterChain.doFilter(request, response);

    }
    
}
