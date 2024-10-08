package aphamale.project.appointment.Controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Date;
import java.text.SimpleDateFormat;
import java.sql.Timestamp;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseBody;

import aphamale.project.appointment.Domain.UserInfoDomain;
import aphamale.project.appointment.Dto.HospitalApiDto;
import aphamale.project.appointment.Dto.HospitalReserveDto;
import aphamale.project.appointment.Dto.UserInfoDto;
import aphamale.project.appointment.Dto.Interface.GetHospitalReserveListDto;
import aphamale.project.appointment.Repository.UserInfoRepository;
import aphamale.project.appointment.Service.HospitalApiService;
import aphamale.project.appointment.Service.HospitalReserveService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@Controller
@ResponseBody
public class UserController {

    private final HospitalApiService hospitalApiService;
    private final UserInfoRepository userInfoRepository;
    private final HospitalReserveService hospitalReserveService;

    public UserController(HospitalApiService hospitalApiService,
                          UserInfoRepository userInfoRepository,
                          HospitalReserveService hospitalReserveService){
        this.hospitalApiService = hospitalApiService;
        this.userInfoRepository = userInfoRepository;
        this.hospitalReserveService = hospitalReserveService;
    }

    // 사용자명 찾기
    @PostMapping("/api/user")
    public String getUser(@RequestBody UserInfoDto userInfoDto) {

        // userId
        String userId = userInfoDto.getUserId();

        // 해당 계정의 정보 조회
        UserInfoDomain userInfoDomain = userInfoRepository.findByUserId(userId);

        String userName = userInfoDomain.getUserName();

        return userName;
    }

    // 유저 대시보드 병원 목록 조회
    @PostMapping("/api/user/hospitalList")
    public List<HospitalApiDto> getUserHospitalList(@RequestBody Map<String,String> searchParam){ 
        String selectedSido = searchParam.get("selectedSido");
        String selectedGugun = searchParam.get("selectedGugun");
        String selectedDong = searchParam.get("selectedDong");
        String selectedSubject = searchParam.get("selectedSubject");
        String selectedDate = searchParam.get("selectedDate");
        String selectedTime = searchParam.get("selectedTime");
        String isChecked = searchParam.get("isChecked"); 
 
 
         // 최초 원본 list
         List<HospitalApiDto> hospitalList0 = new ArrayList<HospitalApiDto>();

         // 사이트 사용 유무 체크
         List<HospitalApiDto> useSiteHospital = new ArrayList<HospitalApiDto>();
         // 프론트에 보낼 LIST
         List<HospitalApiDto> finalHospitalList = new ArrayList<HospitalApiDto>();
 
         try{
 
             // 날짜 분리
             int year = Integer.parseInt(selectedDate.replace("-", "").substring(0, 4));
             int month = Integer.parseInt(selectedDate.replace("-", "").substring(4, 6));
             int day = Integer.parseInt(selectedDate.replace("-", "").substring(6, 8));
 
             // 해당 날짜의 요일(숫자 1~7) 구하기 
             LocalDate date = LocalDate.of(year, month, day);
             int dayOfWeekValue = date.getDayOfWeek().getValue();
             String dayOfWeek = String.valueOf(dayOfWeekValue);
 
             // 공휴일 체크박스가 체크된 상태라면, 공휴일로 검색
             if(isChecked.equals("true")){
                 dayOfWeek = "8";
             }
 
             // 병원 조건으로 조회
             List<HospitalApiDto> hospitalList_B = hospitalApiService.SelectListApi(selectedSido, selectedGugun, "B", selectedSubject, dayOfWeek); // 병원으로 한 번 조회
 
             // 주소에 동이 검색 조건과 같은 동이면 리스트에 추가.
             for(int i = 0; i < hospitalList_B.size(); i++){
                 System.out.println("hospitalList_B.get(i).getDutyAddr() : " + hospitalList_B.get(i).getDutyAddr());
 
                 if(hospitalList_B.get(i).getDutyAddr().contains(selectedDong)){
                     hospitalList0.add(hospitalList_B.get(i));
                 }
             }    
 
             // 의원 조건으로 조회
             List<HospitalApiDto> hospitalList_C = hospitalApiService.SelectListApi(selectedSido, selectedGugun, "C", selectedSubject, dayOfWeek); // 의원으로 한 번 조회
             
             // 주소에 동이 검색 조건과 같은 동이면 리스트에 추가.
             for(int i = 0; i < hospitalList_C.size(); i++){
                 System.out.println("hospitalList_C.get(i).getDutyAddr() : " + hospitalList_C.get(i).getDutyAddr());
 
                 if(hospitalList_C.get(i).getDutyAddr().contains(selectedDong)){
                     hospitalList0.add(hospitalList_C.get(i));
                 }
             }
 
             // HospitalList0으로 옮겼으니까 삭제하자.
             hospitalList_B.removeAll(hospitalList_B);
             hospitalList_C.removeAll(hospitalList_C);
 
             // 해당 요일에 맞는 list 조회
             List<HospitalApiDto> filteredList = hospitalApiService.SelectFilteredList(hospitalList0, selectedDate, selectedTime, selectedSubject, dayOfWeek);

             // 해당 사이트에 계정이 있는 지 유무 컬럼 추가(useSite // Y, N 구분)
             useSiteHospital = hospitalApiService.useSiteHospitalYN(filteredList);
                  
             finalHospitalList.addAll(useSiteHospital);

            // filteredList는 삭제 하자
            filteredList.removeAll(filteredList);
 
         }catch(Exception ex){
            System.out.println(ex.toString());
         }   
         
         return finalHospitalList;
    }  
    
    // 팝업 병원 운영 정보 조회
    @PostMapping("/api/user/hospitalWorkInfo")
    public List<HospitalApiDto> getHospitalWorkInfo(@RequestBody HospitalReserveDto hospitalReserveDto) {

        // 병원명으로 데이터 가져오기..... 
        String groupId = hospitalReserveDto.getGroupId();

        // 데이터 담을 list 생성
        List<HospitalApiDto> hospitalInfo = new ArrayList<>();
        hospitalInfo = hospitalApiService.SelectGroupIdApi(groupId);

        return hospitalInfo;
    }    

    // 해당 일자에 이미 예약된 정보 조회
    @PostMapping("/api/user/bookedTimesList")
    public List<String> getBookecTimesList(@RequestBody HospitalReserveDto hospitalReserveDto) {

        SimpleDateFormat formatDate = new SimpleDateFormat("yyyy-MM-dd"); // 0000년 00월 00일

        String groupId = hospitalReserveDto.getGroupId();
        String reserveDate = formatDate.format(hospitalReserveDto.getReserveDate());

        // 데이터 담을 list 생성
        List<String> bookedTimesList = new ArrayList<>();

        bookedTimesList = hospitalReserveService.selectBookedList(groupId, reserveDate);

        return bookedTimesList;
    }

    // 예약 일자, 시간 저장
    @PostMapping("/api/user/reserveDateAndTime")
    public boolean insertDateAndTime(@RequestBody HospitalReserveDto hospitalReserveDto) {

        boolean insertResult = false;

        String userId = hospitalReserveDto.getUserId();
        String groupId = hospitalReserveDto.getGroupId();
        String hospitalName = hospitalReserveDto.getHospitalName();
        String hospitalAddress = hospitalReserveDto.getHospitalAddress();
        String subjectCode = hospitalReserveDto.getSubjectCode();
        Timestamp reserveDate = hospitalReserveDto.getReserveDate();
        Timestamp reserveTime = hospitalReserveDto.getReserveTime();
        String alarmFlag = hospitalReserveDto.getAlarmFlag();
        String remark = hospitalReserveDto.getRemark();

        insertResult = hospitalReserveService.insertDateAndTime(userId, groupId, hospitalName, hospitalAddress, subjectCode, reserveDate, reserveTime, alarmFlag, remark);

        return insertResult;
    }  

    // 예약 내역 관리 조회 
    @PostMapping("/api/user/reserveList")
    public List<GetHospitalReserveListDto> getUSerReserveList(@RequestBody Map<String, String> searchParam) {

        List<GetHospitalReserveListDto> reserveList = new ArrayList<GetHospitalReserveListDto>();

        SimpleDateFormat formatDate = new SimpleDateFormat("yyyy-MM-dd"); // 0000년 00월 00일
        //SimpleDateFormat formatTime = new SimpleDateFormat("HH:mm");// 00:00

        try{

            String userId = searchParam.get("userId");
            Date fromDate = formatDate.parse(searchParam.get("fromDate"));
            Date toDate = formatDate.parse(searchParam.get("toDate"));
    
            reserveList = hospitalReserveService.selectUserReserveList(userId, fromDate, toDate);

        }catch(Exception ex){
            System.out.println(ex.toString());
        }

        return reserveList; 
    }

    
}
