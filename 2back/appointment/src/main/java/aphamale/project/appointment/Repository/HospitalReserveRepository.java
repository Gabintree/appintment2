package aphamale.project.appointment.Repository;

import java.security.Timestamp;
import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import aphamale.project.appointment.Domain.HospitalReserveDomain;
import aphamale.project.appointment.Dto.Interface.GetHospitalReserveListDto;


@Repository
public interface HospitalReserveRepository extends JpaRepository<HospitalReserveDomain, String> {

    HospitalReserveDomain findByReserveNo(HospitalReserveDomain reserveNo);

    // 예약 내역 조회
    @Query(value = "select t1.reserve_no, " +
                " t1.reserve_date, " +
                " t1.reserve_time, " +
                " t2.user_name, " +
                " t2.birth_date, " +
                " t1.subject, " +
                " t1.reserve_status, " +
                " t1.update_user " +
            " from reserve t1 " +
            " inner join user_info t2" +
            " on t1.user_id = t2.user_id " +
            " where t1.group_id = :groupId " +
            " and t1.reserve_date between :fromDate and :toDate ", nativeQuery =true)
    List<GetHospitalReserveListDto> getItemsOfByReserveNo(String groupId, Date fromDate, Date toDate); 
    //List<HospitalReserveDomain> findByGroupIdAndReserveDateBetween(String groupId, Date fromDate, Date toDate);                                              
    
}
