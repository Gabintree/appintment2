package aphamale.project.appointment.Domain;

import java.sql.Date;
import java.sql.Timestamp;

import aphamale.project.appointment.Dto.UserInfoDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="userInfo") // 테이블을 지정하는 기능인 듯
public class UserInfoDomain {
    @Id // 기본키라는 뜻임  //@GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
    private String userId; // 계정

    @Column
    private String userPw; // 비밀번호

    @Column
    private String userName; // 성명

    @Column
    private String residentNo; // 주민등록번호

    @Column
    private Date birthDate; // 생년월일    
   
    @Column
    private String gender; // 성별

    @Column
    private String phone; // 연락처

    @Column
    private Timestamp insertDate; // 회원가입일

    @Column
    private Timestamp updateDate; // 정보수정일


    // dto -> entity 객체로 변환하는 메서드
    public static UserInfoDomain ToUserInfoDomain(UserInfoDto userInfoDto){

        UserInfoDomain userInfoDomain = new UserInfoDomain();

        userInfoDomain.setUserId(userInfoDto.getUserId());
        userInfoDomain.setUserPw(userInfoDto.getUserPw());

        return userInfoDomain;
    }

    
}
