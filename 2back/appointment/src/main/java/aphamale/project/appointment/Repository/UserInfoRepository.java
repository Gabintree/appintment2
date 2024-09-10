package aphamale.project.appointment.Repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import aphamale.project.appointment.Domain.UserInfoDomain;

@Repository
public interface UserInfoRepository extends JpaRepository<UserInfoDomain, String>{

    // id로 회원 정보 조회 (select * from user_info where user_id = ?)
    // Optional은 null 방지 기능이라고 함.
    Optional<UserInfoDomain> findByUserInfoId(String userId);
    
}
