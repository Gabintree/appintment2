package aphamale.project.appointment.Dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor // 기본 생성자를 자동으로 만들어 줌
@ToString
public class HospitalStatusDto {

    private String hospitalId;
    private String groupId;
    private String rushHourFlag;    
}
