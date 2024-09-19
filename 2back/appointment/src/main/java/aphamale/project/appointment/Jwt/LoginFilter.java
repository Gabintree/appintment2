package aphamale.project.appointment.Jwt;

import java.util.Collection;
import java.util.Iterator;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import aphamale.project.appointment.Dto.CustomUserDetails;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class LoginFilter extends UsernamePasswordAuthenticationFilter {

    // 토큰 검증 매니저
    private final AuthenticationManager authenticationManager;

    // 토큰 발행 
    private final JwtUtil jwtUtil;

    public LoginFilter(AuthenticationManager authenticationManager, JwtUtil jwtUtil) {

        this.authenticationManager = authenticationManager;
        //LoiginFilter 경로 변경(자동으로 /login을 찾아 적용한다고 함, 그래서 변경 처리)    
        this.setFilterProcessesUrl("/api/login");
        this.setUsernameParameter("userId"); // userId로 변경
        this.setPasswordParameter("userPw"); // userPw로 변경 

        this.jwtUtil = jwtUtil;
    }      

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        // 클라이언트 요청에서 userName, userPw 추출, userId는 ?? @_@??
        String userId = obtainUsername(request);
        String userPw = obtainPassword(request);

	    // 스프링 시큐리티에서 userName과 userPw 검증하기 위해서는 token에 담아야 함
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userId, userPw, null);

        // token에 담은 검증을 위한 AuthenticationManager로 전달
        return authenticationManager.authenticate(authToken);
    }

	// 로그인 성공시 실행하는 메서드 (여기서 JWT를 발급하면 됨)
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) {

        // userId 찾기
        CustomUserDetails customUserDetails = (CustomUserDetails)authentication.getPrincipal();
        String userId = customUserDetails.getUsername();

        // role 찾기
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();

        String role = auth.getAuthority();

        // toeken 발행 요청
        String token = jwtUtil.createJwt(userId, role, 24*60*60*1000L); // 24*60*60*1000L 이렇게 하면 하루인 듯

        // 발급된 token 담아 사용, 접두사 "Bearer " 필요, 띄워쓰기 필수
        response.addHeader("Authorization", "Bearer " + token);


    }    

    // 로그인 실패시 실행하는 메서드
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) {

        response.setStatus(401);
    }    

}
