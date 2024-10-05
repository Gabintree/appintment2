package aphamale.project.appointment.Controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.text.SimpleDateFormat;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseBody;

import aphamale.project.appointment.Domain.HospitalAlarmDomain;
import aphamale.project.appointment.Domain.HospitalInfoDomain;
import aphamale.project.appointment.Domain.HospitalReserveDomain;
import aphamale.project.appointment.Domain.HospitalStatusDomain;
import aphamale.project.appointment.Dto.HospitalAlarmDto;
import aphamale.project.appointment.Dto.HospitalInfoDto;
import aphamale.project.appointment.Dto.HospitalReserveDto;
import aphamale.project.appointment.Dto.HospitalStatusDto;
import aphamale.project.appointment.Dto.Interface.GetCurrentReserveDto;
import aphamale.project.appointment.Dto.Interface.GetHospitalReserveDetailDto;
import aphamale.project.appointment.Dto.Interface.GetHospitalReserveListDto;
import aphamale.project.appointment.Repository.HospitalAlarmRepository;
import aphamale.project.appointment.Repository.HospitalInfoRepository;
import aphamale.project.appointment.Repository.HospitalReserveRepository;
import aphamale.project.appointment.Repository.HospitalStatusRepository;
import aphamale.project.appointment.Service.HospitalAlarmService;
import aphamale.project.appointment.Service.HospitalReserveService;
import aphamale.project.appointment.Service.HospitalStatusServeice;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@Controller
@ResponseBody
public class AdminController {

    private final HospitalInfoRepository hospitalInfoRepository;
    private final HospitalStatusRepository hospitalStatusRepository;
    private final HospitalAlarmRepository hospitalAlarmRepository;
    private final HospitalReserveRepository hospitalReserveRepository;
    private final HospitalReserveService hospitalReserveService;
    private final HospitalStatusServeice hospitalStatusServeice;
    private final HospitalAlarmService hospitalAlarmService;

    public AdminController(HospitalInfoRepository hospitalInfoRepository, 
                           HospitalReserveService hospitalReserveService, 
                           HospitalStatusServeice hospitalStatusServeice,
                           HospitalStatusRepository hospitalStatusRepository,
                           HospitalAlarmService hospitalAlarmService,
                           HospitalAlarmRepository hospitalAlarmRepository,
                           HospitalReserveRepository hospitalReserveRepository){
        this.hospitalInfoRepository = hospitalInfoRepository;
        this.hospitalReserveService = hospitalReserveService;
        this.hospitalStatusServeice = hospitalStatusServeice;
        this.hospitalStatusRepository = hospitalStatusRepository;
        this.hospitalAlarmService = hospitalAlarmService;
        this.hospitalAlarmRepository = hospitalAlarmRepository;
        this.hospitalReserveRepository = hospitalReserveRepository;
    }

    // 병원명 찾기
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

    // 병원 대기 상태값 저장
    @PostMapping("/api/admin/saveStatus")
    public String saveStatus(@RequestBody HospitalStatusDto hospitalStatusDto) {

        // 병원ID
        String hospitalId = hospitalStatusDto.getHospitalId();
        // groupId 찾기
        HospitalInfoDomain hospitalInfoDomain = hospitalInfoRepository.findByHospitalId(hospitalId).orElseThrow(() -> new UsernameNotFoundException(hospitalId));
        String groupId = hospitalInfoDomain.getGroupId();

        // 찾은 groupId dto에 넣기
        hospitalStatusDto.setGroupId(groupId);

        // 저장
        String saveResult = hospitalStatusServeice.StatusSave(hospitalStatusDto);

        return saveResult;
    }

    // 상태값 조회
    @PostMapping("/api/admin/getStatus")
    public String getStatus(@RequestBody HospitalStatusDto hospitalStatusDto) {

        // 병원ID
        String hospitalId = hospitalStatusDto.getHospitalId();
        // groupId 찾기
        HospitalInfoDomain hospitalInfoDomain = hospitalInfoRepository.findByHospitalId(hospitalId).orElseThrow(() -> new UsernameNotFoundException(hospitalId));
        String groupId = hospitalInfoDomain.getGroupId();

        HospitalStatusDomain hospitalStatusDomain = hospitalStatusRepository.findByHospitalIdAndGroupId(hospitalId, groupId);
        String rushHourFlag = hospitalStatusDomain.getRushHourFlag();    

        return rushHourFlag;
    }

    // 병원 SMS 수신 정보 저장
    @PostMapping("/api/admin/saveSmsAlarm")
    public String saveSmsAlarm(@RequestBody HospitalAlarmDto hospitalAlarmDto) {

        // 병원ID
        String hospitalId = hospitalAlarmDto.getHospitalId();
        // groupId 찾기
        HospitalInfoDomain hospitalInfoDomain = hospitalInfoRepository.findByHospitalId(hospitalId).orElseThrow(() -> new UsernameNotFoundException(hospitalId));
        String groupId = hospitalInfoDomain.getGroupId();

        // 찾은 groupId dto에 넣기
        hospitalAlarmDto.setGroupId(groupId);

        // 저장
        String saveResult = hospitalAlarmService.AlarmFlagSave(hospitalAlarmDto);

        return saveResult;
    }

    // SMS 수신 정보 조회
    @PostMapping("/api/admin/getSmsAlarm")
    public Map<String, String> getSmsAlarm(@RequestBody HospitalAlarmDto hospitalAlarmDto) {

        // 병원ID
        String hospitalId = hospitalAlarmDto.getHospitalId();
        // groupId 찾기
        HospitalInfoDomain hospitalInfoDomain = hospitalInfoRepository.findByHospitalId(hospitalId).orElseThrow(() -> new UsernameNotFoundException(hospitalId));
        String groupId = hospitalInfoDomain.getGroupId();

        HospitalAlarmDomain hospitalAlarmDomain = hospitalAlarmRepository.findByHospitalIdAndGroupId(hospitalId, groupId);

        String phone = hospitalAlarmDomain.getPhone();
        String alarmFlag = hospitalAlarmDomain.getAlarmFlag();    

        Map<String, String> alarmInfo = new HashMap<>();
        alarmInfo.put("phone", phone);
        alarmInfo.put("alarmFlag", alarmFlag);

        return alarmInfo;
    }

    // 예약번호 상세보기 
    @PostMapping("/api/admin/reserveDetail")
    public Map<String, String> getReserveDetail(@RequestBody HospitalReserveDto hospitalReserveDto) {

        String reserveNo = hospitalReserveDto.getReserveNo();

        List<GetHospitalReserveDetailDto> reserveDetailDto  = hospitalReserveRepository.getItemReserveNo(reserveNo);

        String symptoms = "";
        String phoneNumber = "";


        if(reserveDetailDto.get(0) != null){
          
            symptoms = reserveDetailDto.get(0).getRemark(); // 증상
            phoneNumber = reserveDetailDto.get(0).getPhone(); // 사용자 연락처
        }        

        Map<String, String> reserveDetail = new HashMap<>();
        reserveDetail.put("symptoms", symptoms);
        reserveDetail.put("phoneNumber", phoneNumber);

        return reserveDetail;
    }

    // 관리자 예약 취소 버튼 
    @PostMapping("/api/admin/reserveAdminCancel")
    public boolean deleteReserveAdminCancel(@RequestBody HospitalReserveDto hospitalReserveDto) {

        String reserveNo = hospitalReserveDto.getReserveNo();

        Boolean deleteResult = hospitalReserveService.deleteReserveAdminCancel(reserveNo);

        return deleteResult;
    }

    // 팝업 기존 예약정보 조회
    @PostMapping("/api/admin/currentReserve")
    public List<GetCurrentReserveDto> getCurrentReserve(@RequestBody HospitalReserveDto hospitalReserveDto) {

        String reserveNo = hospitalReserveDto.getReserveNo();        
        List<GetCurrentReserveDto> currentReserveList = hospitalReserveService.currentReserveData(reserveNo);

        if(currentReserveList == null){
            return null;
        }

        return currentReserveList;
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