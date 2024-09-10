package aphamale.project.appointment.Dto;

import java.security.Timestamp;
import java.sql.Date;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor // 기본 생성자를 자동으로 만들어 줌
@ToString
public class TestDto {
    private String userId;
    private String userPw;
    private String userName;
    private String residentNo;
    private Date birthDate;
    private String gender;
    private String phone;
    private Timestamp insertDate;
    private Timestamp updateDate;
}
