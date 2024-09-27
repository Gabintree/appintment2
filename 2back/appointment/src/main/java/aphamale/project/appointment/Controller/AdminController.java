package aphamale.project.appointment.Controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseBody;

import aphamale.project.appointment.Domain.HospitalInfoDomain;
import aphamale.project.appointment.Dto.HospitalInfoDto;
import aphamale.project.appointment.Dto.HospitalReserveDto;
import aphamale.project.appointment.Repository.HospitalInfoRepository;
import aphamale.project.appointment.Service.HospitalReserveService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
@ResponseBody
public class AdminController {

    private final HospitalInfoRepository hospitalInfoRepository;
    private final HospitalReserveService hospitalReserveService;

    public AdminController(HospitalInfoRepository hospitalInfoRepository, HospitalReserveService hospitalReserveService){
        this.hospitalInfoRepository = hospitalInfoRepository;
        this.hospitalReserveService = hospitalReserveService;
    }

    @PostMapping("/api/admin")
    public String getAdmin(@RequestBody HospitalInfoDto hospitalInfoDto) {
    //public HospitalInfoDomain getAdmin(@RequestBody HospitalInfoDto hospitalInfoDto) {
    //public Object[] getAdmin(@RequestBody HospitalInfoDto hospitalInfoDto) {
        // 병원ID
        String hospitalId = hospitalInfoDto.getHospitalId();

        // 해당 계정의 정보 조회
        HospitalInfoDomain hospitalInfoDomain = hospitalInfoRepository.findByHospitalId(hospitalId).orElseThrow(() -> new UsernameNotFoundException(hospitalId));

        String hospitalName = hospitalInfoDomain.getHospitalName();
        //String refreshToken = hospitalInfoDomain.getJwtRefresh();

        return hospitalName;
        //return hospitalInfoDomain;
        //return new Object[] {hospitalName, refreshToken};
    }
    
    // 예약 내역 관리 조회 
    @PostMapping("/api/admin/reserveList")
    public List<HospitalReserveDto> getReserveList(@RequestParam String hospitalId, 
                                               @RequestParam String groupId, 
                                               @RequestParam Date fromDate, 
                                               @RequestParam Date toDate) {
                                              
        // 프론트에 보낼 LIST
        List<HospitalReserveDto> finalHospitalList = new ArrayList<HospitalReserveDto>();

        List<HospitalReserveDto> reserveList = hospitalReserveService.selectReserveList(hospitalId, groupId, fromDate, toDate);

        if(reserveList != null){

            finalHospitalList.addAll(reserveList);
        }     

        return finalHospitalList;
    }
    
}
