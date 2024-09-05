package aphamale.project.appointment.Service;

import org.springframework.stereotype.Service;

import aphamale.project.appointment.Dto.TestDto;
import aphamale.project.appointment.Repository.TestRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TestService {
    private final TestRepository testRepository;

    public void save(TestDto testDto){
        
    }


}
