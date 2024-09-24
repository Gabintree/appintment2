package aphamale.project.appointment.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
@ResponseBody
public class AdminController {

    @GetMapping("/api/admin")
    public String getAdmin() {
        return "Admin Controller";
    }
    
    
}
