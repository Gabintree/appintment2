package aphamale.project.appointment.Service;

import java.sql.Timestamp;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import aphamale.project.appointment.Domain.HospitalInfoDomain;
import aphamale.project.appointment.Dto.HospitalInfoDto;
import aphamale.project.appointment.Repository.HospitalInfoRepository;

@Service
public class HospitalInfoService {
    
    private final HospitalInfoRepository hospitalInfoRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public HospitalInfoService(HospitalInfoRepository hospitalInfoRepository, BCryptPasswordEncoder bCryptPasswordEncoder){
       
        this.hospitalInfoRepository = hospitalInfoRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;

    }

    // 회원가입
    public String JoinProcess(HospitalInfoDto hospitalInfoDto){

        String hospitalId = hospitalInfoDto.getHospitalId();
        String hospitalPw = hospitalInfoDto.getHospitalPw();
        String jwtRole = "ROLE_ADMIN"; // 병원 계정의 ROLE은 ADMIN으로 저장.
        String corporateNo = hospitalInfoDto.getCorporateNo();
        String groupId = hospitalInfoDto.getGroupId();
        String hospitalName = hospitalInfoDto.getHospitalName();
        String hospitalAddress = hospitalInfoDto.getHospitalAddress();
        String tellNo = hospitalInfoDto.getTellNo();

        String bool = "false"; // 리턴 값

    try{
        // 검증
        Boolean isExist = hospitalInfoRepository.existsByHospitalId(hospitalId);

        if (isExist){
            // 이미 존재한다면,
            bool = "false";
        }
        else{

            java.util.Date date = new java.util.Date();

            HospitalInfoDomain hospitalInfoDomain = new HospitalInfoDomain();

            hospitalInfoDomain.setHospitalId(hospitalId);
            hospitalInfoDomain.setHospitalPw(bCryptPasswordEncoder.encode(hospitalPw)); // 암호화
            hospitalInfoDomain.setJwtRole(jwtRole);
            hospitalInfoDomain.setCorporateNo(corporateNo);
            hospitalInfoDomain.setGroupId(groupId);
            hospitalInfoDomain.setHospitalName(hospitalName);
            hospitalInfoDomain.setHospitalAddress(hospitalAddress);
            hospitalInfoDomain.setTellNo(tellNo);
            hospitalInfoDomain.setInsertDate(new Timestamp(date.getTime()));

            // 저장
            hospitalInfoRepository.save(hospitalInfoDomain);

            bool = "true";

        }

    }catch(Exception ex){
        System.out.println("회원가입 오류 : " + ex.toString());
        bool = "false";
    } 

        return bool;
    }
    
}
