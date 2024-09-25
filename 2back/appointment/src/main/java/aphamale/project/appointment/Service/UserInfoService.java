package aphamale.project.appointment.Service;

<<<<<<< HEAD
import java.sql.Timestamp;

=======
>>>>>>> origin/front_y
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import aphamale.project.appointment.Domain.UserInfoDomain;
import aphamale.project.appointment.Dto.UserInfoDto;
import aphamale.project.appointment.Repository.UserInfoRepository;

@Service
//@RequiredArgsConstructor
public class UserInfoService {
    private final UserInfoRepository userInfoRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
<<<<<<< HEAD

    public UserInfoService(UserInfoRepository userInfoRepository, BCryptPasswordEncoder bCryptPasswordEncoder){
       
        this.userInfoRepository = userInfoRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;

    }

    // 회원가입
    public String JoinProcess(UserInfoDto userInfoDto){

        String userId = userInfoDto.getUserId();
        String userPw = userInfoDto.getUserPw();
        String jwtRole = "USER"; // 사용자 계정의 ROLE은 USER로 저장.
        String userName = userInfoDto.getUserName();
        String residentNo = userInfoDto.getResidentNo();
        String birthDate = userInfoDto.getBirthDate();
        String gender = userInfoDto.getGender();
        String phone = userInfoDto.getPhone();
        String agreeGPS = userInfoDto.getAgreeGPS();



        String bool = "false"; // 리턴 값

    try{
        // 검증
        Boolean isExist = userInfoRepository.existsByUserId(userId);

        if (isExist){
            // 이미 존재한다면,
            bool = "false";

=======

    public UserInfoService(UserInfoRepository userInfoRepository, BCryptPasswordEncoder bCryptPasswordEncoder){
       
        this.userInfoRepository = userInfoRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;

    }

    public String JoinProcess(UserInfoDto userInfoDto){

        String userId = userInfoDto.getUserId();
        String userPw = userInfoDto.getUserPw();
        String jwtRole = userInfoDto.getJwtRole();

        String bool = "false"; // 리턴 값

    try{
        // 검증
        Boolean isExist = userInfoRepository.existsByUserId(userId);

        if (isExist){
            // 이미 존재한다면,
            bool = "false";

>>>>>>> origin/front_y
            return bool;
        }
        else{

<<<<<<< HEAD
            java.util.Date date = new java.util.Date();

=======
>>>>>>> origin/front_y
            UserInfoDomain userInfoDomain = new UserInfoDomain();

            userInfoDomain.setUserId(userId);
            userInfoDomain.setUserPw(bCryptPasswordEncoder.encode(userPw)); // 암호화
            userInfoDomain.setJwtRole(jwtRole);
<<<<<<< HEAD
            userInfoDomain.setUserName(userName);
            userInfoDomain.setResidentNo(residentNo);
            userInfoDomain.setBirthDate(birthDate);
            userInfoDomain.setGender(gender);
            userInfoDomain.setPhone(phone);
            userInfoDomain.setAgreeGPS(agreeGPS);
            userInfoDomain.setInsertDate(new Timestamp(date.getTime()));
=======
>>>>>>> origin/front_y

            // 저장
            userInfoRepository.save(userInfoDomain);

            bool = "true";

            return bool;
        }

    }catch(Exception ex){
        System.out.println("회원가입 오류 : " + ex.toString());
    } 

        return bool;
    }

<<<<<<< HEAD

    // @Transactional
    // @Modifying
    // @Query("update userInfo a set a.jwtRefresh = :refresh where a.userId = :userId")
    // public void updatejwtRefreshToken(@Param("userId") String userId, @Param("jwtRefresh") String refresh){

    // }

=======
>>>>>>> origin/front_y
    // // jwt 시큐리티 적용 전
    // // 회원가입 
    // public void save(UserInfoDto userInfoDto){

    //     // 1. dto -> entity 변환
    //     // 2. repository의 save 메서드 호출
    //     UserInfoDomain userInfoDomain = UserInfoDomain.ToUserInfoDomain(userInfoDto); 
    //     userInfoRepository.save(userInfoDomain); // save는 jpa가 제공해주는 메서드로 이건 save 밖에 안 됨

    //     // repository의 save 메서드 호출(조건, domain(entity) 객체를 넘겨줘야 함)        
    // }

    // // 로그인
    // public UserInfoDto login(UserInfoDto userInfoDto){

    //     // 1. 회원이 입력한 id로 db에서 조회 함.
    //     // 2. db에서 조회된 비밀번호와 사용자가 입력한 비밀번호가 일치하는 지 판단
    //     Optional<UserInfoDomain> byUserId = userInfoRepository.findByUserId(userInfoDto.getUserId());

    //     if (byUserId.isPresent()) {
    //         // 조회 결과가 있다(해당 계정을 가진 회원 정보가 있다.)
    //         UserInfoDomain userInfoDomain = byUserId.get();

    //         // 비밀번호 일치 확인
    //         if (userInfoDomain.getUserPw().equals(userInfoDto.getUserPw())) {
    //             // 비밀번호 일치
    //             // entity 객체를 -> dto 변환 후 리턴
    //             UserInfoDto userInfoDto2 = UserInfoDto.ToUserinfoDto(userInfoDomain);
                
    //             return userInfoDto2;                
    //         }
    //         else{
    //             // 비밀번호 불일치
    //             return null;
    //         }

    //     }else{
    //         // 조회 결과가 없다.
    //         return null;
    //     }
    //}
}
