package aphamale.project.appointment.Config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import aphamale.project.appointment.Jwt.JwtFilter;
import aphamale.project.appointment.Jwt.JwtUtil;
import aphamale.project.appointment.Jwt.LoginFilter;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    //AuthenticationManager가 인자로 받을 AuthenticationConfiguraion 객체 생성자 주입
    private final AuthenticationConfiguration authenticationConfiguration;

    private final JwtUtil jwtUtil;

    public SecurityConfig(AuthenticationConfiguration authenticationConfiguration, JwtUtil jwtUtil) {

        this.authenticationConfiguration = authenticationConfiguration;
        this.jwtUtil = jwtUtil;
    }    

    //AuthenticationManager Bean 등록
	@Bean // SecurityFilterChain에 Bean등록 했으므로 여기꺼는 주석
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {

        return configuration.getAuthenticationManager();
    }

    // 비밀번호를 캐시로 암호화 시켜서 검증하고 진행
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder(){

        return new BCryptPasswordEncoder();
    }

    // 허용 HTTP Method, cors?
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("HEAD","GET","POST","PUT","DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
    

    // 인가 작업, 세션 설정 등 
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{    
        
        // csrf disable, jwt방식은 STATELESS로 관리를 하기 때문에 disable 해도 된다고 한다.
        http.csrf((auth) -> auth.disable());

        // Form 로그인 방식 disable, jwt 방식을 사용할 거기 때문에 disable 한다고 한다.
        http.formLogin((auth) -> auth.disable());

        // http basic 인증 방식 disable, jwt 방식을 사용할 거기 때문에 disable 한다고 한다.
        http.httpBasic((auth) -> auth.disable());


        // 경로별 인가 작업
        http.authorizeHttpRequests((auth) -> auth
                            .requestMatchers("/api/login", "/", "/api/join").permitAll() // 해당 경로에서는 모든 권한을 허용
                            .requestMatchers("/api/admin").hasRole("ADMIN") // ADMIN 권한을 가진 자만 접근 허용
                            .anyRequest().authenticated()); // 그 외는 로그인한 사용자만 접근 허용
          
       // LoginFilter 보다 먼저 실행되도록, JwtFilter 등록 
        http
        .addFilterBefore(new JwtFilter(jwtUtil), LoginFilter.class);
       
        // 필터 추가 LoginFilter()는 인자를 받음 (AuthenticationManager() 메소드에 authenticationConfiguration 객체를 넣어야 함) 따라서 등록 필요
        http.addFilterAt(new LoginFilter(authenticationManager(authenticationConfiguration), jwtUtil), UsernamePasswordAuthenticationFilter.class);
        

        // 세션 설정                    
        http.sessionManagement((session) -> session
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)); // 꼭 이 상태 STATELESS

     return http.build();
    }


    
}
