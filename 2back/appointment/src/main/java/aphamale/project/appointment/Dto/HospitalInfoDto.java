package aphamale.project.appointment.Dto;

import java.sql.Timestamp;

import aphamale.project.appointment.Domain.HospitalInfoDomain;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor // 기본 생성자를 자동으로 만들어 줌
@ToString
public class HospitalInfoDto {
    private String hospitalId;
    private String hospitalPw;
    private String corporateNo;
    private String groupId;
    private String hospitalName;
    private String hospitalAddress;
    private String tellNo;
    private Timestamp insertDate;
    private Timestamp updateDate;
    private String jwtRole; // jwt 로그인시 권한 검증
    private String jwtRefresh; // jwt refresh token 값

    // entity -> dto  객체로 변환하는 메서드
    public static HospitalInfoDto ToHospitalInfoDto(HospitalInfoDomain hospitalInfoDomain){
        HospitalInfoDto hospitalInfoDto = new HospitalInfoDto();
        hospitalInfoDto.setHospitalId(hospitalInfoDomain.getHospitalId());
        hospitalInfoDto.setHospitalPw(hospitalInfoDomain.getHospitalPw());

        return hospitalInfoDto;
    }



}
