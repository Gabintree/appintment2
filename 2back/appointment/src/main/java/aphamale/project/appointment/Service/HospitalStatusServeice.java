package aphamale.project.appointment.Service;

import org.springframework.stereotype.Service;

import aphamale.project.appointment.Domain.HospitalStatusDomain;
import aphamale.project.appointment.Dto.HospitalStatusDto;
import aphamale.project.appointment.Repository.HospitalStatusRepository;

@Service
public class HospitalStatusServeice {

    private final HospitalStatusRepository hospitalStatusRepository;

    public HospitalStatusServeice(HospitalStatusRepository hospitalStatusRepository){
        this.hospitalStatusRepository = hospitalStatusRepository;
    }
    
    // 상태값 저장(혹은 업데이트)
    public String StatusSave(HospitalStatusDto hospitalStatusDto){

        String hospitalId = hospitalStatusDto.getHospitalId();
        String groupId = hospitalStatusDto.getGroupId();
        String rushHourFlag = hospitalStatusDto.getRushHourFlag();

        String bool = "false"; // 리턴 값

        try{

            HospitalStatusDomain hospitalStatusDomain = new HospitalStatusDomain();

            hospitalStatusDomain.setHospitalId(hospitalId);
            hospitalStatusDomain.setGroupId(groupId);
            hospitalStatusDomain.setRushHourFlag(rushHourFlag);

            hospitalStatusRepository.save(hospitalStatusDomain);

            bool = "true";


        }catch(Exception ex){
            System.out.println( ex.toString());
            bool = "false";
        }

        return bool;
    }
}
