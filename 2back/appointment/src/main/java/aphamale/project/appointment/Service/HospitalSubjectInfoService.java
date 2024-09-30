package aphamale.project.appointment.Service;

import org.springframework.stereotype.Service;

import aphamale.project.appointment.Repository.HospitalSubjectInfoRepository;

@Service
public class HospitalSubjectInfoService {

    private final HospitalSubjectInfoRepository hospitalSubjectInfoRepository;

    public HospitalSubjectInfoService(HospitalSubjectInfoRepository hospitalSubjectInfoRepository){
        this.hospitalSubjectInfoRepository = hospitalSubjectInfoRepository;
    }
    
}
