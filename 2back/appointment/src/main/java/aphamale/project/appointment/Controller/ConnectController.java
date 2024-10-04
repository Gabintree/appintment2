package aphamale.project.appointment.Controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import aphamale.project.appointment.Dto.HospitalApiDto;
import aphamale.project.appointment.Service.HospitalApiService;
import aphamale.project.appointment.Service.MessageApiService;
import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
public class ConnectController {

    // 생성자 주입 방식(컨트롤러가 서비스에 있는 변수나 매서드를 사용할 수 있다는 뜻??)  
    private final HospitalApiService hospitalApiService;  
    private final MessageApiService messageApiService;

    // // 병원 목록 조회
    // @GetMapping("/api/list")
    // public String ListForm() {
    //     return "get List";
    // }

    // 병원 목록 조회 api
    // @PostMapping("/api/hospitalList")
    // public List<HospitalApiDto> getHospitalApiList(@RequestParam String selectedSido, @RequestParam String selectedGugun,
    //                                  @RequestParam String selectedSubject,
    //                                  @RequestParam String selectedDate,
    //                                  @RequestParam String selectedTime){
    @PostMapping("/api/hospitalList")
    public List<HospitalApiDto> getHospitalApiList(@RequestBody Map<String,String> searchParam){    

       String selectedSido = searchParam.get("selectedSido");
       String selectedGugun = searchParam.get("selectedGugun");
       String selectedDong = searchParam.get("selectedDong");
       String selectedSubject = searchParam.get("selectedSubject");
       String selectedDate = searchParam.get("selectedDate");
       String selectedTime = searchParam.get("selectedTime");
       String isChecked = searchParam.get("isChecked"); 


        // 최초 원본 list
        List<HospitalApiDto> hospitalList0 = new ArrayList<HospitalApiDto>();
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
                
                if(hospitalList_B.get(i).getDutyAddr().contains(selectedDong)){
                    hospitalList0.add(hospitalList_B.get(i));
                }
            }    

            // 의원 조건으로 조회
            List<HospitalApiDto> hospitalList_C = hospitalApiService.SelectListApi(selectedSido, selectedGugun, "C", selectedSubject, dayOfWeek); // 의원으로 한 번 조회
            
            // 주소에 동이 검색 조건과 같은 동이면 리스트에 추가.
            for(int i = 0; i < hospitalList_C.size(); i++){
    
                if(hospitalList_C.get(i).getDutyAddr().contains(selectedDong)){
                    hospitalList0.add(hospitalList_C.get(i));
                }
            }

            // HospitalList0으로 옮겼으니까 삭제하자.
            hospitalList_B.removeAll(hospitalList_B);
            hospitalList_C.removeAll(hospitalList_C);

            // 해당 요일에 맞는 list 조회
            List<HospitalApiDto> filteredList = hospitalApiService.SelectFilteredList(hospitalList0, selectedDate, selectedTime, selectedSubject, dayOfWeek);
            
            finalHospitalList.addAll(filteredList);

        }catch(Exception ex){
           System.out.println(ex.toString());
        }   
        
        return finalHospitalList;
    }

    // sms 문자 전송
    @GetMapping("/api/send")
    public String sendMessage() {

        messageApiService.sendMessage();

        return "send api";
    }

    // // 테스트
    // @GetMapping("/api/hello")
    // public String test() {
    //     return "Hello, world!";
    // }    

    // // 회원가입
    // @GetMapping("/api/save")
    // public String SaveForm() {
    //     return "save";
    // }

    // // 회원가입 data insert
    // @PostMapping("/api/save")
    // public String Save(@ModelAttribute UserInfoDto userInfoDto) {

    //     userInfoService.save(userInfoDto);

    //     System.out.println("testController.save");
    //     System.out.println("testDto : " + userInfoDto);
        
    //     return "login";
    // }

    // // 로그인
    // @GetMapping("/api/login")
    // public String loginForm() {
    //     return "login";
    // }    

    // // 로그인 data select  
    // @PostMapping("/api/login")
    // public String login(@ModelAttribute UserInfoDto userInfoDto, HttpSession session) {

    //     UserInfoDto loginResult = userInfoService.login(userInfoDto);

    //     if (loginResult != null) {
    //         // login 성공
    //         return "login 성공"; // 사용자 계정이면 환자 대시보드, 관리자 계정이면 병원 대시보드로 이동 
    //     }
    //     else{
    //         // login 실패
    //         return "login 실패";  
    //     }
    // }
    


    
    
    
    

}
