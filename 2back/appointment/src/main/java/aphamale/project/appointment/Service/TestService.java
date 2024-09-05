package aphamale.project.appointment.Service;

import org.springframework.stereotype.Service;

import aphamale.project.appointment.Domain.TestDomain;
import aphamale.project.appointment.Dto.TestDto;
import aphamale.project.appointment.Repository.TestRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TestService {
    private final TestRepository testRepository;

    public void save(TestDto testDto){

        // 1. dto -> entity 변환
        // 2. repository의 save 메서드 호출
        TestDomain testDomain = TestDomain.ToTestDomain(testDto); 
        testRepository.save(testDomain); // save는 jpa가 제공해주는 메서드로 이건 save 밖에 안 됨

        // repository의 save 메서드 호출(조건, domain(entity) 객체를 넘겨줘야 함)

        
    }


}
