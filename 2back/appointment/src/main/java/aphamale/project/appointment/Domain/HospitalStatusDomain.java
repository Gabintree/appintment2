package aphamale.project.appointment.Domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity(name="hospital_status")
@Getter
@Setter
@Table(name="hospital_status") // 테이블을 지정하는 기능인 듯
public class HospitalStatusDomain {

    @Id // 기본키라는 뜻임  //@GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
    private String hospitalId; // 계정

    @Column(name="group_id")
    private String groupId; // 기관ID

    @Column(name="rush_hour_flag")
    private String rushHourFlag; // 상태값

}
