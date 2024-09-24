package aphamale.project.appointment.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseBody;

<<<<<<< HEAD
import aphamale.project.appointment.Dto.HospitalInfoDto;
import aphamale.project.appointment.Dto.UserInfoDto;
import aphamale.project.appointment.Service.HospitalApiService;
import aphamale.project.appointment.Service.HospitalInfoService;
import aphamale.project.appointment.Service.UserInfoService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
=======
import aphamale.project.appointment.Dto.UserInfoDto;
import aphamale.project.appointment.Service.UserInfoService;

import org.springframework.web.bind.annotation.PostMapping;
>>>>>>> origin/front_y


@Controller
@ResponseBody
public class JoinController {
    private final UserInfoService userInfoService;
<<<<<<< HEAD
    private final HospitalInfoService hospitalInfoService; 

    public JoinController(UserInfoService userInfoService, HospitalInfoService hospitalInfoService){
        this.userInfoService = userInfoService;
        this.hospitalInfoService = hospitalInfoService;
    }
    
    // 사용자 회원가입
    @PostMapping("/api/join")
    public String postJoin(@RequestBody UserInfoDto userInfoDto) {
=======

    public JoinController(UserInfoService userInfoService){
        this.userInfoService = userInfoService;
    }
    
    @PostMapping("/api/join")
    public String postJoin( UserInfoDto userInfoDto) {
>>>>>>> origin/front_y
        
       String joinResult = userInfoService.JoinProcess(userInfoDto);
        
        return joinResult;
    }
<<<<<<< HEAD

    // 관리자 회원가입
    @PostMapping("/api/joinAdmin")
    public String postJoin(@RequestBody HospitalInfoDto hospitalInfoDto) {
        
       String joinResult = hospitalInfoService.JoinProcess(hospitalInfoDto);
        
        return joinResult;
    }
=======
>>>>>>> origin/front_y
    
}
