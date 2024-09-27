package aphamale.project.appointment.Domain;

import java.sql.Timestamp;

import org.hibernate.annotations.DynamicUpdate;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Entity
@Getter
@Setter
@Table(name="reserve") // 테이블을 지정하는 기능인 듯
@DynamicUpdate
public class HospitalReserveDomain {

    
    @EmbeddedId
    private ReserveNo reserveNo; // 복합키

    // @Id // 기본키라는 뜻임  //@GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
    // private String reserveNo; // 예약번호

    // @Id
    // private String userId; // 계정

    // @Id
    // private String groupId; // 기관Id

    @Column
    private String hospitalName; // 병원명

    @Column
    private String hospitalAddres; // 병원 주소

    @Column
    private String subject; // 진료 과목

    @Column
    private Timestamp revserveDate; // 진료 예약일

    @Column
    private Timestamp reserveTime; // 진료 예약시간

    @Column
    private String alarmFlag; // SMS 알림 수신 여부 
    
    @Column
    private String reserveStatus; // 예약 상태 (I 예약완료, U 변경완료, D 취소완료) 

    @Column
    private String remark; // 비고(증상 메세지)
    
    @Column 
    private String insertUser; // 입력자

    @Column
    private Timestamp insertDate; // 입력일자

    @Column
    private String updateUser; // 변경자

    @Column
    private Timestamp updateDate; // 변경일자 

}
