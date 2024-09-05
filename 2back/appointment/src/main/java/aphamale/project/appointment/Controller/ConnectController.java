package aphamale.project.appointment.Controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import aphamale.project.appointment.Domain.TestDomain;
import aphamale.project.appointment.Repository.TestRepository;

@RestController
public class ConnectController {

    private TestRepository testRepository;
    
    @GetMapping("/api/hello")
    public String test() {
        return "Hello, world!";
    }    

    @Autowired
    public ConnectController(TestRepository testRepository){
        this.testRepository = testRepository;
    }


    @GetMapping(value = "/api/get/{id}")
    public Optional<TestDomain> fineOne(@PathVariable String id){
        return testRepository.findById(id);
    }
}
