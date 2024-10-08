package aphamale.project.appointment.Repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import aphamale.project.appointment.Domain.HospitalReserveDomain;
import aphamale.project.appointment.Dto.Interface.GetCurrentReserveDto;
import aphamale.project.appointment.Dto.Interface.GetHospitalReserveDetailDto;
import aphamale.project.appointment.Dto.Interface.GetHospitalReserveListDto;
import aphamale.project.appointment.Dto.Interface.GetSmsContentsDto;

import java.sql.Time;



@Repository
public interface HospitalReserveRepository extends JpaRepository<HospitalReserveDomain, String> {

    HospitalReserveDomain findByReserveNo(String reserveNo);

    // 상세보기
    @Query(value = " select t1.remark, " + 
                   " t2.phone " + 
                   " from reserve t1 " + 
                   " inner join user_info t2 " +
                   " on t1.user_id = t2.user_id " + 
                   " where t1.reserve_no = :reserveNo ",  nativeQuery =true)
    List<GetHospitalReserveDetailDto> getItemReserveNo(String reserveNo);

    // 예약 내역 조회(관리자/병원)
    @Query(value = "select t1.reserve_no, " +
                " date_format(t1.reserve_date, '%Y-%m-%d') as reserve_date, " +
                " date_format(t1.reserve_time,'%H:%i') as reserve_time, " +
                " t2.user_name, " +
                " t2.birth_date, " +
                " t3.subject_name, " +
                " t1.reserve_status, " +
                " COALESCE(t4.hospital_name, t5.user_name) as update_user " +
            " from reserve t1 " +
            " inner join user_info t2" +
            " on t1.user_id = t2.user_id " +
            " inner join subject_info t3 " +
            " on t1.subject_code = t3.subject_code " +
            " left outer join hospital_info t4 " +
            " on t1.update_user = t4.group_id " +
            " left outer join user_info t5 " + 
            " on t1.update_user = t5.user_id " + 
            " where t1.group_id = :groupId " +
            " and t1.reserve_date between :fromDate and :toDate ", nativeQuery =true)
    List<GetHospitalReserveListDto> getItemsOfByReserveNo(String groupId, Date fromDate, Date toDate); 
    //List<HospitalReserveDomain> findByGroupIdAndReserveDateBetween(String groupId, Date fromDate, Date toDate);                                              
    
    // 해당 일자, 시간에 에약 내역이 있는 지 체크 (시간을 hh:mm 까지만 비교)
    @Query(value = "select count(t1.reserve_no) " +
                  " from reserve t1 " + 
                  " where t1.group_id = :groupId " + 
                  " and t1.reserve_date = :reserveDate " + 
                  " and time_format(t1.reserve_time, '%H:%i') = time_format(:reserveTime, '%H:%i')", nativeQuery =true)
    int countByGroupIdAndReserveDateAndReserveTime(String groupId, Date reserveDate, Time reserveTime);

    // 문자 전송 컬럼 조회 
    @Query(value = "select t2.phone as user_phone, " +
                    " t3.tell_no as admin_phone, " +
                    " t1.reserve_no, " + 
                    " t1.reserve_status as send_message_flag, " +
                    " t2.user_name, " +
                    " t3.hospital_name, " +
                    " date_format(t1.reserve_date, '%Y-%m-%d') as reserve_date, " + 
                    " date_format(t1.reserve_time,'%H:%i') as reserve_time " +
                    " from reserve t1 " +
                    " inner join user_info t2 " +
                    " on t1.user_id = t2.user_id " +
                    " inner join hospital_info t3 " +
                    " on t1.group_id = t3.group_id " + 
                    " where t1.reserve_no =  :reserveNo ", nativeQuery=true)
    List<GetSmsContentsDto> getItemOfbSmsContent(String reserveNo);



    // 기존 예약정보 조회 
    @Query(value = "select t2.subject_name, " +
                   " t3.hospital_name, " +
                   " date_format(t1.reserve_date, '%Y-%m-%d') as reserve_date, " + 
                   " date_format(t1.reserve_time,'%H:%i') as reserve_time, " +
                   " t1.group_id " +     
                   " from reserve t1 " +
                   " inner join subject_info t2 " +
                   " on t1.subject_code = t2.subject_code " +
                   " inner join hospital_info t3 " +
                   " on t1.group_id = t3.group_id " +
                   " where t1.reserve_no = :reserveNo ", nativeQuery = true)
    List<GetCurrentReserveDto> getItemsOfCurrentReserveNo(String reserveNo);

    // 팝업 해당 일자 예약된 시간 조회
    @Query(value =  "select date_format(t1.reserve_time,'%H:%i') as reserve_time " +
                    " from reserve t1 " +
                    " where group_id = :groupId " +
                    " and date_format(t1.reserve_date, '%Y-%m-%d') = :reserveDate ", nativeQuery = true)
    List<String> getItemsOfBookedReserveDate(String groupId, String reserveDate);

    // Max reserveNo 찾기
    @Query(value = "select max(t1.reserve_no) as reserveNo " +
                   " from reserve t1 " +
                   " where t1.reserve_no like :currentDate% ", nativeQuery = true)
    String getItemOfMaxReserveNo(String currentDate);


    // 예약 내역 조회(사용자/환자)
    @Query(value = "select t1.reserve_no, " +
                   " date_format(t1.reserve_date, '%Y-%m-%d') as reserve_date, " +
                   " date_format(t1.reserve_time,'%H:%i') as reserve_time, " + 
                   " t2.hospital_name, " +
                   " t3.subject_name, " +
                   " t1.reserve_status, " +
                   " COALESCE(t4.user_name, t5.hospital_name) as update_user " +    
                   " from reserve t1 " +
                   " inner join hospital_info t2 " +
                   " on t1.group_id = t2.group_id " +
                   " inner join subject_info t3 " +
                   " on t1.subject_code = t3.subject_code " +
                   " left outer join user_info t4 " +
                   " on t1.update_user = t4.user_id " +
	               " left outer join  hospital_info t5 " +
                   " on t1.update_user = t5.group_id " +
                   " where t1.user_id = :userId " +
                   " and t1.reserve_date between :fromDate and :toDate ", nativeQuery = true)
    List<GetHospitalReserveListDto> getItemsOfByUserId(String userId, Date fromDate, Date toDate); 

}
