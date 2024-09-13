package aphamale.project.appointment.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestController;

import aphamale.project.appointment.Dto.HospitalApiDto;
import aphamale.project.appointment.Dto.UserInfoDto;
import aphamale.project.appointment.Service.HospitalApiService;
import aphamale.project.appointment.Service.MessageApiService;
import aphamale.project.appointment.Service.UserInfoService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequiredArgsConstructor
public class ConnectController {

    // 생성자 주입 방식(컨트롤러가 서비스에 있는 변수나 매서드를 사용할 수 있다는 뜻??)
    private final UserInfoService userInfoService;      
    private final HospitalApiService hospitalApiService;  
    private final MessageApiService messageApiService;

    // 테스트
    @GetMapping("/api/hello")
    public String test() {
        return "Hello, world!";
    }    

    // 회원가입
    @GetMapping("/api/save")
    public String SaveForm() {
        return "save";
    }

    // 회원가입 data insert
    @PostMapping("/api/save")
    public String Save(@ModelAttribute UserInfoDto userInfoDto) {

        userInfoService.save(userInfoDto);

        System.out.println("testController.save");
        System.out.println("testDto : " + userInfoDto);
        
        return "login";
    }

    // 로그인
    @GetMapping("/api/login")
    public String loginForm() {
        return "login";
    }    

    // 로그인 data select  
    @PostMapping("/api/login")
    public String login(@ModelAttribute UserInfoDto userInfoDto, HttpSession session) {

        UserInfoDto loginResult = userInfoService.login(userInfoDto);

        if (loginResult != null) {
            // login 성공
            return "login 성공"; // 사용자 계정이면 환자 대시보드, 관리자 계정이면 병원 대시보드로 이동 
        }
        else{
            // login 실패
            return "login 실패";  
        }
    }

    // 병원 목록 조회
    @GetMapping("/api/list")
    public String ListForm() {
        return "get List";
    }

    // 병원 목록 조회 api
    @PostMapping("/api/list")
    public String getList(@ModelAttribute HospitalApiDto hospitalParam) {

        List<HospitalApiDto> hospitalList = hospitalApiService.SelectListApi(hospitalParam);
        for(int i = 0; i < hospitalList.size(); i++){
            System.out.println(hospitalList.get(i));
        }
        System.out.println();

        return "get API";
    }

    // sms 문자 전송
    @GetMapping("/api/send")
    public String sendMessage() {

        messageApiService.sendMessage();

        return "send api";
    }
    


    
    
    
    

}
