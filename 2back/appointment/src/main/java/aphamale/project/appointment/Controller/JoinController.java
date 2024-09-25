package aphamale.project.appointment.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseBody;

import aphamale.project.appointment.Dto.HospitalInfoDto;
import aphamale.project.appointment.Dto.UserInfoDto;
import aphamale.project.appointment.Service.HospitalApiService;
import aphamale.project.appointment.Service.HospitalInfoService;
import aphamale.project.appointment.Service.UserInfoService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@Controller
@ResponseBody
public class JoinController {
    private final UserInfoService userInfoService;
    private final HospitalInfoService hospitalInfoService; 

    public JoinController(UserInfoService userInfoService, HospitalInfoService hospitalInfoService){
        this.userInfoService = userInfoService;
        this.hospitalInfoService = hospitalInfoService;
    }
    
    // 사용자 회원가입
    @PostMapping("/api/join")
    public String postJoin(@RequestBody UserInfoDto userInfoDto) {
        
       String joinResult = userInfoService.JoinProcess(userInfoDto);
        
        return joinResult;
    }

    // 관리자 회원가입
    @PostMapping("/api/joinAdmin")
    public String postJoin(@RequestBody HospitalInfoDto hospitalInfoDto) {
        
       String joinResult = hospitalInfoService.JoinProcess(hospitalInfoDto);
        
        return joinResult;
    }
    
}
