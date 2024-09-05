package aphamale.project.appointment.Domain;

import java.sql.Timestamp;

import aphamale.project.appointment.Dto.TestDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="userInfo") // 테이블을 생성하는 기능인 듯
public class TestDomain {
    @Id // 기본키라는 뜻임  //@GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
    private String id;

    @Column
    private String password;

    @Column
    private String name;
   
    @Column
    private String gender;

    @Column
    private int age;

    @Column
    private String phone;

    @Column
    private String userGbn;

    @Column
    private String hospitalId;

    @Column
    private Timestamp insertDate;

    @Column
    private Timestamp updateDate;

    // entity -> dto 객체로 변환하는 메서드
    public static TestDomain ToTestDomain(TestDto testDto){

        TestDomain testDomain = new TestDomain();

        testDomain.setId(testDto.getId());
        testDomain.setPassword(testDto.getPassword());

        return testDomain;
    }

    
}
