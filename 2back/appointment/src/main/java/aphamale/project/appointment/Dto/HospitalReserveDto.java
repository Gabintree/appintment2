package aphamale.project.appointment.Dto;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor // 기본 생성자를 자동으로 만들어 줌
@ToString
public class HospitalReserveDto {

    private String reserveNo; // 예약번호
    private String userId; // 계정
    private String groupId; // 기관Id
    private String hospitalName; // 병원명
    private String hospitalAddres; // 병원 주소
    private String subject; // 진료 과목
    private Timestamp revserveDate; // 진료 예약일
    private Timestamp reserveTime; // 진료 예약시간
    private String alarmFlag; // SMS 알림 수신 여부 
    private String reserveStatus; // 예약 상태 (I 예약완료, U 변경완료, D 취소완료) 
    private String remark; // 비고(증상 메세지)
    private String insertUser; // 입력자
    private Timestamp insertDate; // 입력일자
    private String updateUser; // 변경자
    private Timestamp updateDate; // 변경일자     
}
