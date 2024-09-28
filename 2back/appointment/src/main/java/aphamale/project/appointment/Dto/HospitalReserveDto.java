package aphamale.project.appointment.Dto;

import java.sql.Timestamp;
import aphamale.project.appointment.Domain.HospitalReserveDomain;
import aphamale.project.appointment.Domain.ReservePk;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor // 기본 생성자를 자동으로 만들어 줌
@ToString
public class HospitalReserveDto {

    private ReservePk reservePk; // 예약번호

    private String userId; // 계정
    private String groupId; // 기관Id
    private String hospitalName; // 병원명
    private String hospitalAddres; // 병원 주소
    private String subject; // 진료 과목
    private Timestamp reserveDate; // 진료 예약일
    private Timestamp reserveTime; // 진료 예약시간
    private String alarmFlag; // SMS 알림 수신 여부 
    private String reserveStatus; // 예약 상태 (I 예약완료, U 변경완료, D 취소완료) 
    private String remark; // 비고(증상 메세지)
    private String insertUser; // 입력자
    private Timestamp insertDate; // 입력일자
    private String updateUser; // 변경자
    private Timestamp updateDate; // 변경일자

        public HospitalReserveDto(ReservePk reservePk, String hospitalName, String hospitalAddres,
        String subject, Timestamp reserveDate, Timestamp reserveTime, String alarmFlag, String reserveStatus, String remark,
        String insertUser, Timestamp insertDate, String updateUser, Timestamp updateDate){

            this.reservePk = reservePk;
            this.hospitalName = hospitalName;
            this.hospitalAddres = hospitalAddres;
            this.subject = subject;
            this.reserveDate = reserveDate;
            this.reserveTime = reserveTime;
            this.alarmFlag = alarmFlag;
            this.reserveStatus = reserveStatus;
            this.remark = remark;
            this.insertUser = insertUser;
            this.insertDate = insertDate;
            this.updateUser = updateUser;
            this.updateDate = updateDate;
        }


  
        // entity -> dto  객체로 변환하는 메서드
        public static HospitalReserveDto ToHospitalReserveDto(HospitalReserveDomain hospitalReserveDomain){
            
        HospitalReserveDto hospitalReserveDto = new HospitalReserveDto();

        hospitalReserveDto.setReservePk(hospitalReserveDomain.getReservePk());
        hospitalReserveDto.setHospitalName(hospitalReserveDomain.getHospitalName());
        hospitalReserveDto.setHospitalAddres(hospitalReserveDomain.getHospitalAddres());
        hospitalReserveDto.setSubject(hospitalReserveDomain.getSubject());
        hospitalReserveDto.setReserveDate(hospitalReserveDomain.getReserveDate());
        hospitalReserveDto.setReserveTime(hospitalReserveDomain.getReserveTime());
        hospitalReserveDto.setAlarmFlag(hospitalReserveDomain.getAlarmFlag());
        hospitalReserveDto.setReserveStatus(hospitalReserveDomain.getReserveStatus());
        hospitalReserveDto.setRemark(hospitalReserveDomain.getRemark());
        hospitalReserveDto.setInsertUser(hospitalReserveDomain.getInsertUser());
        hospitalReserveDto.setInsertDate(hospitalReserveDomain.getInsertDate());
        hospitalReserveDto.setUpdateUser(hospitalReserveDomain.getUpdateUser());
        hospitalReserveDto.setUpdateDate(hospitalReserveDomain.getUpdateDate());

        return hospitalReserveDto;
    }
}
