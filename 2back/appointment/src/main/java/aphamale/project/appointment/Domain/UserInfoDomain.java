package aphamale.project.appointment.Domain;

import java.sql.Timestamp;

import org.hibernate.annotations.DynamicUpdate;

import aphamale.project.appointment.Dto.UserInfoDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity(name="user_info")
@Getter
@Setter
@Table(name="user_info") // 테이블을 지정하는 기능인 듯
@DynamicUpdate
public class UserInfoDomain {

    @Id // 기본키라는 뜻임  //@GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
    private String userId; // 계정

    @Column(name="user_pw")
    private String userPw; // 비밀번호

    @Column(name="user_name")
    private String userName; // 성명

    @Column(name="resident_no")
    private String residentNo; // 주민등록번호

    @Column(name="birth_date")
    private String birthDate; // 생년월일    
   
    @Column(name="gender")
    private String gender; // 성별

    @Column(name="phone")
    private String phone; // 연락처

    @Column(name="agreeGPS")
    private String agreeGPS; // GPS 동의여부

    @Column(name="insert_date")
    private Timestamp insertDate; // 회원가입일

    @Column(name="update_date")
    private Timestamp updateDate; // 정보수정일

    @Column(name="jwt_role")
    private String jwtRole; // jwt 로그인시 권한 검증 필요 

    @Column(name="jwr_refresh")
    private String jwtRefresh; // jwt refresh token 값 저장


    // dto -> entity 객체로 변환하는 메서드
    public static UserInfoDomain ToUserInfoDomain(UserInfoDto userInfoDto){

        UserInfoDomain userInfoDomain = new UserInfoDomain();

        userInfoDomain.setUserId(userInfoDto.getUserId());
        userInfoDomain.setUserPw(userInfoDto.getUserPw());

        return userInfoDomain;
    }

    
}
