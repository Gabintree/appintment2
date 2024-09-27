package aphamale.project.appointment.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import aphamale.project.appointment.Domain.HospitalReserveDomain;
import aphamale.project.appointment.Domain.ReserveNo;

@Repository
public interface HospitalReserveRepository extends JpaRepository<HospitalReserveDomain, ReserveNo> {

    HospitalReserveDomain findByReserveNo(HospitalReserveDomain reserveNo);
    
}
