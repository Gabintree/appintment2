package aphamale.project.appointment.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import aphamale.project.appointment.Domain.HospitalAlarmDomain;

@Repository
public interface HospitalAlarmRepository extends JpaRepository<HospitalAlarmDomain, String> {

    HospitalAlarmDomain findByHospitalId(String hospitalId);

    HospitalAlarmDomain findByHospitalIdAndGroupId(String hospitalId, String groupId);

    
}
