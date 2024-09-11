package aphamale.project.appointment.Dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HospitalApiDto {
     
    private String sido;
    private String sigungu;
    private String orgGubun; // CODE_MST의'H000' 참조(B:병원, C:의원)
    private String subject; // CODE_MST의'D000' 참조(D001~D029)
    private int medicalDay; // 월~일요일(1~7), 공휴일(8)
    private String hospitalName;
    private String orderBy;
    private int pageNo;
    private int cnt;



    
}
