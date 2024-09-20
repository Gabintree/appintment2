package aphamale.project.appointment.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseBody;

import aphamale.project.appointment.Dto.UserInfoDto;
import aphamale.project.appointment.Service.UserInfoService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@Controller
@ResponseBody
public class JoinController {
    private final UserInfoService userInfoService;

    public JoinController(UserInfoService userInfoService){
        this.userInfoService = userInfoService;
    }
    
    @PostMapping("/api/join")
    public String postJoin(@RequestBody UserInfoDto userInfoDto) {
        
       String joinResult = userInfoService.JoinProcess(userInfoDto);
        
        return joinResult;
    }
    
}
