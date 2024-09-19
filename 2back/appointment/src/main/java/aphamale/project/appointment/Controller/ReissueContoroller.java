package aphamale.project.appointment.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseBody;

import aphamale.project.appointment.Service.ReissueService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.PostMapping;


@Controller
@ResponseBody
public class ReissueContoroller {
    
    private final ReissueService reissueService;

    public ReissueContoroller(ReissueService reissueService){
        this.reissueService = reissueService;
    }

    // 리프레쉬 토큰 체크 후 액세스 토큰 신규 생성(재발급)
    @PostMapping("/api/reissue")
    public ResponseEntity<?> postReissue(HttpServletRequest request, HttpServletResponse response) {
       
        ResponseEntity<?> responseEntity = reissueService.RefreshTokenCheck(request, response);
        
        return responseEntity;
    }
    
}
