package aphamale.project.appointment.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestController;
import aphamale.project.appointment.Dto.TestDto;
import aphamale.project.appointment.Service.TestService;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.PostMapping;



@RestController
@RequiredArgsConstructor
public class ConnectController {
    // 생성자 주입 방식(컨트롤러가 서비스에 있는 변수나 매서드를 사용할 수 있다는 뜻??)
    private final TestService testService;        

    @GetMapping("/api/hello")
    public String test() {
        return "Hello, world!";
    }    

    @GetMapping("/api/save")
    public String SaveForm() {
        return "save";
    }

    @PostMapping("/api/save")
    public String Save(@ModelAttribute TestDto testDto) {

        testService.save(testDto);

        System.out.println("testController.save");
        System.out.println("testDto : " + testDto);
        
        return "index";

    }
    
    

}
