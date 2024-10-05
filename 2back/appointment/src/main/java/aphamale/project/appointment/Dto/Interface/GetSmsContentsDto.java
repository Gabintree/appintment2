package aphamale.project.appointment.Dto.Interface;

public interface GetSmsContentsDto {

    String getUserPhone(); // 수신 환자 연락처
    String getAdminPhone(); // 발신 병원 연락처
    String getReserveNo(); // 예약번호
    String getSendMessageFlag(); // 예약 상태 I, U, D
    String getUserName(); // 환자 성명
    String getHospitalName(); // 병원명
    String getReserveDate(); // 예약 일자
    String getReserveTime(); // 예약 시간 
}
