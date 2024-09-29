package aphamale.project.appointment.Dto;

import java.sql.Time;
import java.sql.Timestamp;


// @Getter
// @Setter
// @NoArgsConstructor // 기본 생성자를 자동으로 만들어 줌
// @ToString
public interface GetHospitalReserveListDto {

    String getReserveNo(); // 예약번호
    Timestamp getReserveDate(); // 진료 예약일
    Time getReserveTime(); // 진료 예약시간
    String getUserName(); // 계정
    String getBirthDate(); // 생년월일
    String getSubject(); // 진료 과목
    String getReserveStatus(); // 예약 상태 (I 예약완료, U 변경완료, D 취소완료) 
    String getUpdateUser(); // 변경자 
    
    
    // public GetHospitalReserveListDto(String reserveNo, Timestamp reserveDate,  Timestamp reserveTime,
    //                                  String userName, String birthDate, String subject, 
    //                                  String reserveStatus, String updateUser){

    //         this.reserveNo = reserveNo;
    //         this.reserveDate = reserveDate;
    //         this.reserveTime = reserveTime;
    //         this.userName = userName;
    //         this.birthDate = birthDate;
    //         this.subject = subject;
    //         this.reserveStatus = reserveStatus;
    //         this.updateUser = updateUser;
    // }
}
