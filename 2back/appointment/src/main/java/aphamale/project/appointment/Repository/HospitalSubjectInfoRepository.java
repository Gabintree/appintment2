package aphamale.project.appointment.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import aphamale.project.appointment.Domain.HospitalSubjectDomain;

@Repository
public interface HospitalSubjectInfoRepository extends JpaRepository<HospitalSubjectDomain, String>{
    
    HospitalSubjectDomain findBySubjectCode(String subjectCode);
}
