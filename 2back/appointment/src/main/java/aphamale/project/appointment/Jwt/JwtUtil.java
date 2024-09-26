package aphamale.project.appointment.Jwt;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

@Component
public class JwtUtil {

    private SecretKey secretKey; 
    
    // application.properties 에 저장해 둔 secret key를 변수로 불러오기
    public JwtUtil(@Value("${spring.jwt.secret}")String secret){

        // 양방향 대칭키 HS256 사용
        this.secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), Jwts.SIG.HS256.key().build().getAlgorithm());
    }

    // username 검증, 여기 username은 jwt의 username 컬럼이므로.
    public String getUsername(String token){
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("username", String.class);
    }

    // role 검증
    public String getRole(String token) {

        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("role", String.class);
    }   

    // 카테고리 구분(액세스 토큰인지, 리프레쉬 토큰인지)
    public String getCategory(String token){

        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("category", String.class);
    }

    // 유효기간 검증
    public Boolean isExpired(String token) {

        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().getExpiration().before(new Date());
    }   

    // 토큰 생성
    public String createJwt(String category, String username, String role, Long expriedMs){
        return Jwts.builder()
                .claim("category", category) // 액세스인지, 리프레쉬인지
                .claim("username", username)
                .claim("role", role)
                .issuedAt(new Date(System.currentTimeMillis())) // 토큰 발행 시간
                .expiration(new Date(System.currentTimeMillis() + expriedMs)) // 토큰 만료(소멸) 시간
                .signWith(secretKey) // 토큰 시그니처 
                .compact(); // 토큰 발행
    }    
}
