package aphamale.project.appointment.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import aphamale.project.appointment.Domain.HospitalStatusDomain;

@Repository
public interface HospitalStatusRepository extends JpaRepository<HospitalStatusDomain, String>{

    HospitalStatusDomain findByHospitalId(String hospitalId);

    HospitalStatusDomain findByHospitalIdAndGroupId(String hospitalId, String groupId);
    
}
