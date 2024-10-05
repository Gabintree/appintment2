package aphamale.project.appointment.Dto.Interface;

public interface GetCurrentReserveDto {
   
    String getSubjectName(); // 진료 과목
    String getReserveDate(); // 진료 예약일
    String getReserveTime(); // 진료 예약시간
    String getGroupId(); // 병원 그룹Id
    String getHospitalName(); // 병원 명
    
}
