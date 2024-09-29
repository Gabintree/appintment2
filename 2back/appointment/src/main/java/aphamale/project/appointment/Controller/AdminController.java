package aphamale.project.appointment.Controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.sql.Time;
import java.text.SimpleDateFormat;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseBody;

import aphamale.project.appointment.Domain.HospitalInfoDomain;
import aphamale.project.appointment.Dto.HospitalInfoDto;
import aphamale.project.appointment.Dto.HospitalReserveDto;
import aphamale.project.appointment.Dto.Interface.GetHospitalReserveListDto;
import aphamale.project.appointment.Repository.HospitalInfoRepository;
import aphamale.project.appointment.Service.HospitalReserveService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


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
    public List<GetHospitalReserveListDto> getReserveList(@RequestBody Map<String, String> searchParam) {

        List<GetHospitalReserveListDto> reserveList = new ArrayList<GetHospitalReserveListDto>();

        SimpleDateFormat formatDate = new SimpleDateFormat("yyyy-MM-dd"); // 0000년 00월 00일
        //SimpleDateFormat formatTime = new SimpleDateFormat("HH:mm");// 00:00

        try{

            String hospitalId = searchParam.get("hospitalId");
            Date fromDate = formatDate.parse(searchParam.get("fromDate"));
            Date toDate = formatDate.parse(searchParam.get("toDate"));
                      
            // groupId 찾기
            HospitalInfoDomain hospitalInfoDomain = hospitalInfoRepository.findByHospitalId(hospitalId).orElseThrow(() -> new UsernameNotFoundException(hospitalId));
            String groupId = hospitalInfoDomain.getGroupId();
    
            reserveList = hospitalReserveService.selectReserveList(groupId, fromDate, toDate);

        }catch(Exception ex){
            System.out.println(ex.toString());
        }

        return reserveList; 
    }
}



//     // 일자, 시간 format 변경
//     for(int i = 0; i < finalHospitalList.size(); i++){
//         String changedDate = formatDate.format(finalHospitalList.get(i).getReserveDate());
//         finalHospitalList.set(i, changedDate);
//    }   


// 날짜 변환
// String date1 = formatDate.format(finalHospitalList.get(0).getReserveDate());
// System.out.println(date1);
// String time1 = formatTime.format(finalHospitalList.get(0).getReserveTime());
// System.out.println(time1);

// dto List를 domain 으로 변경하는 방법
// finalHospitalList = reserveList.stream()
//                     .map(m -> new HospitalReserveDto(m.getReserveNo(), m.getUserId(), m.getGroupId(), m.getHospitalName(), m.getHospitalAddres(),
//                         m.getSubject(), m.getReserveDate(), m.getReserveTime(), m.getAlarmFlag(), m.getReserveStatus(),
//                         m.getRemark(), m.getInsertUser(), m.getInsertDate(), m.getUpdateUser(), m.getUpdateDate()))
//                     .collect(Collectors.toList());   