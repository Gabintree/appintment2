package aphamale.project.appointment.Repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import aphamale.project.appointment.Domain.HospitalReserveDomain;


@Repository
public interface HospitalReserveRepository extends JpaRepository<HospitalReserveDomain, String> {

    HospitalReserveDomain findByReserveNo(HospitalReserveDomain reserveNo);

    // 예약 내역 조회
    List<HospitalReserveDomain> findByGroupIdAndReserveDateBetween(String groupId, Date fromDate, Date toDate);                                              
    
}
