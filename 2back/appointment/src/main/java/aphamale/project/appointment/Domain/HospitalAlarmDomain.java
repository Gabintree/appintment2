package aphamale.project.appointment.Domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity(name="hospital_alarm")
@Getter
@Setter
@Table(name="hospital_alarm") // 테이블을 지정하는 기능인 듯
public class HospitalAlarmDomain {

    @Id // 기본키라는 뜻임  //@GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
    private String hospitalId; // 계정

    @Column(name="group_id")
    private String groupId; // 기관ID

    @Column(name="phone")
    private String phone; // 문자 수신 연락처

    @Column(name="alarm_flag")
    private String alarmFlag; // 문자 수신 여부



    
}
