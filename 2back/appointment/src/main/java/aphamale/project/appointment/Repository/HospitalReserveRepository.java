package aphamale.project.appointment.Repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import aphamale.project.appointment.Domain.HospitalReserveDomain;
import aphamale.project.appointment.Dto.Interface.GetHospitalReserveDetailDto;
import aphamale.project.appointment.Dto.Interface.GetHospitalReserveListDto;

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

    // 예약 내역 조회
    @Query(value = "select t1.reserve_no, " +
                " t1.reserve_date, " +
                " t1.reserve_time, " +
                " t2.user_name, " +
                " t2.birth_date, " +
                " t3.subject_name, " +
                " t1.reserve_status, " +
                " t1.update_user " +
            " from reserve t1 " +
            " inner join user_info t2" +
            " on t1.user_id = t2.user_id " +
            " inner join subject_info t3 " +
            " on t1.subject_code = t3.subject_code " +
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



}
