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

@Entity
@Getter
@Setter
@Table(name="hospital_info") // 테이블을 지정하는 기능인 듯
@DynamicUpdate
public class HospitalInfoDomain {
    @Id // 기본키라는 뜻임  //@GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
    private String hospitalId; // 계정

    @Column
    private String hospitalPw; // 비밀번호

    @Column
    private String corporateNo; // 사업자등록번호

    @Column
    private String groupId; // 기관ID

    @Column
    private String hospitalName; // 병원명    
   
    @Column
    private String hospitalAddress; // 병원주소

    @Column
    private String tellNo; // 연락처

    @Column
    private Timestamp insertDate; // 회원가입일

    @Column
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
