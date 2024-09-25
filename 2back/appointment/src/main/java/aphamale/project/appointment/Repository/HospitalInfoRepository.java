package aphamale.project.appointment.Repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import aphamale.project.appointment.Domain.HospitalInfoDomain;

@Repository
public interface HospitalInfoRepository extends JpaRepository<HospitalInfoDomain, String>{

    // id로 회원 정보 조회 (select * from user_info where user_id = ?)
    // Optional은 null 방지 기능이라고 함.
    // findBy + 컬럼명
    Optional<HospitalInfoDomain> findByHospitalId(String hospitalId);
    
    //HospitalInfoDomain findByHospitalId(String hospitalId);

    // ID 존재 여부 true, false, JPA 내장 existsBy + 컬럼명
    Boolean existsByHospitalId(String hospitalId);

    // DB에 저장된 refresh token 값 조회 
    //HospitalInfoDomain findByJwtRefresh(String JwtRefresh);
    
    
    }
