package aphamale.project.appointment.Controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseBody;

import aphamale.project.appointment.Dto.HospitalApiDto;
import aphamale.project.appointment.Service.HospitalApiService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@Controller
@ResponseBody
public class UserController {

    private final HospitalApiService hospitalApiService;

    public UserController(HospitalApiService hospitalApiService){
        this.hospitalApiService = hospitalApiService;
    }

    // @GetMapping("/api/user/")
    // public String getAdmin() {
    //     return "user Controller";
    // }

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
    
}
