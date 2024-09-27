package aphamale.project.appointment.Controller;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseBody;

import aphamale.project.appointment.Domain.HospitalInfoDomain;
import aphamale.project.appointment.Dto.HospitalInfoDto;
import aphamale.project.appointment.Repository.HospitalInfoRepository;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@Controller
@ResponseBody
public class AdminController {

    private final HospitalInfoRepository hospitalInfoRepository;

    public AdminController(HospitalInfoRepository hospitalInfoRepository){
        this.hospitalInfoRepository = hospitalInfoRepository;
    }

    @PostMapping("/api/admin")
    public String getAdmin(@RequestBody HospitalInfoDto hospitalInfoDto) {

        // 병원ID
        String hospitalId = hospitalInfoDto.getHospitalId();

        // 병원명 조회
        HospitalInfoDomain hospitalInfoDomain = hospitalInfoRepository.findByHospitalId(hospitalId).orElseThrow(() -> new UsernameNotFoundException(hospitalId));
       
        // 조회된 병원명 
        String hospitalName = hospitalInfoDomain.getHospitalName();

        return hospitalName;
    }
    
    // @GetMapping("/api/admin/id")
    // public String getAdminId(@RequestParam String hospitalId) {

    //     // 병원명 조회
    //     hospitalInfoRepository.findByHospitalName(hospitalId);

    //     HospitalInfoDto hospitalInfoDto = new HospitalInfoDto();
    //     String hospitalName = hospitalInfoDto.getHospitalName();

    //     return hospitalName;
    // }
    
}
