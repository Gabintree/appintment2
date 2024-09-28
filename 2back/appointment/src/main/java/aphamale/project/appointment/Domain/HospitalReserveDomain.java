package aphamale.project.appointment.Domain;

import java.sql.Timestamp;

import org.hibernate.annotations.DynamicUpdate;

import aphamale.project.appointment.Dto.HospitalReserveDto;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Entity(name="reserve")
@Getter
@Setter
@Table(name="reserve") // 테이블을 지정하는 기능인 듯
@DynamicUpdate
public class HospitalReserveDomain {

    
    @EmbeddedId
    private ReservePk reservePk; // 복합키

    // @Id // 기본키라는 뜻임  //@GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
    // private String reserveNo; // 예약번호

    // @Id
    // private String userId; // 계정

    // @Id
    // private String groupId; // 기관Id

    @Column(name="hospital_name")
    private String hospitalName; // 병원명

    @Column(name="hospital_address")
    private String hospitalAddres; // 병원 주소

    @Column(name="subject")
    private String subject; // 진료 과목

    @Column(name="reserve_date")
    private Timestamp reserveDate; // 진료 예약일

    @Column(name="reserve_time")
    private Timestamp reserveTime; // 진료 예약시간

    @Column(name="alarm_flag")
    private String alarmFlag; // SMS 알림 수신 여부 
    
    @Column(name="reserve_status")
    private String reserveStatus; // 예약 상태 (I 예약완료, U 변경완료, D 취소완료) 

    @Column(name="remark")
    private String remark; // 비고(증상 메세지)
    
    @Column(name="insert_user")
    private String insertUser; // 입력자

    @Column(name="insert_date")
    private Timestamp insertDate; // 입력일자

    @Column(name="update_user")
    private String updateUser; // 변경자

    @Column(name="update_date")
    private Timestamp updateDate; // 변경일자 

    // dto -> entity 객체로 변환하는 메서드
    public static HospitalReserveDomain ToHospitalReserveDomain(HospitalReserveDto hospitalReserveDto){

        HospitalReserveDomain hospitalReserveDomain = new HospitalReserveDomain();

        hospitalReserveDomain.setReservePk(hospitalReserveDto.getReservePk());
        hospitalReserveDomain.setHospitalName(hospitalReserveDto.getHospitalName());
        hospitalReserveDomain.setHospitalAddres(hospitalReserveDto.getHospitalAddres());
        hospitalReserveDomain.setSubject(hospitalReserveDto.getSubject());
        hospitalReserveDomain.setReserveDate(hospitalReserveDto.getReserveDate());
        hospitalReserveDomain.setReserveTime(hospitalReserveDto.getReserveTime());
        hospitalReserveDomain.setAlarmFlag(hospitalReserveDto.getAlarmFlag());
        hospitalReserveDomain.setReserveStatus(hospitalReserveDto.getReserveStatus());
        hospitalReserveDomain.setRemark(hospitalReserveDto.getRemark());
        hospitalReserveDomain.setInsertUser(hospitalReserveDto.getInsertUser());
        hospitalReserveDomain.setInsertDate(hospitalReserveDto.getInsertDate());
        hospitalReserveDomain.setUpdateUser(hospitalReserveDto.getUpdateUser());
        hospitalReserveDomain.setUpdateDate(hospitalReserveDto.getUpdateDate());

        return hospitalReserveDomain;
    }

    

}
