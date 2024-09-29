package aphamale.project.appointment.Service;

import org.springframework.stereotype.Service;

import aphamale.project.appointment.Domain.HospitalAlarmDomain;
import aphamale.project.appointment.Dto.HospitalAlarmDto;
import aphamale.project.appointment.Repository.HospitalAlarmRepository;

@Service
public class HospitalAlarmService {

    private final HospitalAlarmRepository hospitalAlarmRepository;

    public HospitalAlarmService(HospitalAlarmRepository hospitalAlarmRepository){
        this.hospitalAlarmRepository = hospitalAlarmRepository;

    }


    // 상태값 저장(혹은 업데이트)
    public String AlarmFlagSave(HospitalAlarmDto hospitalAlarmDto){

        String hospitalId = hospitalAlarmDto.getHospitalId();
        String groupId = hospitalAlarmDto.getGroupId();
        String phone = hospitalAlarmDto.getPhone();
        String alarmFlag = hospitalAlarmDto.getAlarmFlag();

        String bool = "false"; // 리턴 값

        try{

            HospitalAlarmDomain hospitalAlarmDomain = new HospitalAlarmDomain();

            hospitalAlarmDomain.setHospitalId(hospitalId);
            hospitalAlarmDomain.setGroupId(groupId);
            hospitalAlarmDomain.setPhone(phone);
            hospitalAlarmDomain.setAlarmFlag(alarmFlag);

            hospitalAlarmRepository.save(hospitalAlarmDomain);

            bool = "true";


        }catch(Exception ex){
            System.out.println( ex.toString());
            bool = "false";
        }

        return bool;
    }
    
}
