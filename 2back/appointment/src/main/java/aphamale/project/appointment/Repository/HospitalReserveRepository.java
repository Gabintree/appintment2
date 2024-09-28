package aphamale.project.appointment.Repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import aphamale.project.appointment.Domain.HospitalReserveDomain;
import aphamale.project.appointment.Domain.ReservePk;


@Repository
public interface HospitalReserveRepository extends JpaRepository<HospitalReserveDomain, ReservePk> {

    HospitalReserveDomain findByReservePk(HospitalReserveDomain reservePk);

    // 예약 내역 조회
    List<HospitalReserveDomain> findByReserveDateBetween(Date fromDate, Date toDate);                                              
    
}
