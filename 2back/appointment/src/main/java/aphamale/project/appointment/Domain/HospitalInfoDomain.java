package aphamale.project.appointment.Domain;

import java.sql.Timestamp;

import org.hibernate.annotations.DynamicUpdate;

import aphamale.project.appointment.Dto.HospitalInfoDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity(name="hospital_info")
@Getter
@Setter
@Table(name="hospital_info") // 테이블을 지정하는 기능인 듯
@DynamicUpdate
public class HospitalInfoDomain {
    @Id // 기본키라는 뜻임  //@GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
    private String hospitalId; // 계정

    @Column(name="hospital_pw")
    private String hospitalPw; // 비밀번호

    @Column(name="corporate_no")
    private String corporateNo; // 사업자등록번호

    @Column(name="group_id")
    private String groupId; // 기관ID

    @Column(name="hospital_name")
    private String hospitalName; // 병원명    
   
    @Column(name="hospital_address")
    private String hospitalAddress; // 병원주소

    @Column(name="tell_no")
    private String tellNo; // 연락처

    @Column(name="insert_date")
    private Timestamp insertDate; // 회원가입일

    @Column(name="update_date")
    private Timestamp updateDate; // 정보수정일

    @Column
    private String jwtRole; // jwt 로그인시 권한 검증 필요 

    @Column
    private String jwtRefresh; // jwt refresh token 값 저장


    // dto -> entity 객체로 변환하는 메서드
    public static HospitalInfoDomain ToHospitalInfoDomain(HospitalInfoDto hospitalInfoDto){

        HospitalInfoDomain hospitalInfoDomain = new HospitalInfoDomain();

        hospitalInfoDomain.setHospitalId(hospitalInfoDto.getHospitalId());
        hospitalInfoDomain.setHospitalPw(hospitalInfoDto.getHospitalPw());

        return hospitalInfoDomain;
    }

    
}
