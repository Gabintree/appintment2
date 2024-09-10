package aphamale.project.appointment.Dto;

import java.security.Timestamp;
import java.sql.Date;

import aphamale.project.appointment.Domain.UserInfoDomain;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor // 기본 생성자를 자동으로 만들어 줌
@ToString
public class UserInfoDto {
    private String userId;
    private String userPw;
    private String userName;
    private String residentNo;
    private Date birthDate;
    private String gender;
    private String phone;
    private Timestamp insertDate;
    private Timestamp updateDate;

    // entity -> dto  객체로 변환하는 메서드
    public static UserInfoDto ToUserinfoDto(UserInfoDomain userInfoDomain){
        UserInfoDto userInfoDto = new UserInfoDto();
        userInfoDto.setUserId(userInfoDomain.getUserId());
        userInfoDto.setUserPw(userInfoDomain.getUserPw());

        return userInfoDto;
    }



}
