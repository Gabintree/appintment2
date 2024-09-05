package aphamale.project.appointment.Dto;

import java.security.Timestamp;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor // 기본 생성자를 자동으로 만들어 줌
@ToString
public class TestDto {
    private String id;
    private String password;
    private String name;
    private String gender;
    private int age;
    private String phone;
    private String userGbn;
    private String remark;
    private Timestamp insertDate;
    private Timestamp updateDate;

}
