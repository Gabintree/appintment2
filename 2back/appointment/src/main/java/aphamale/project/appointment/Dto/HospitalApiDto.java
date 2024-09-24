package aphamale.project.appointment.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // getter, setter 만들어 줌
@AllArgsConstructor // 여기에 필드에 쓴 모든 생성자 만들어 줌
@NoArgsConstructor // 기본 생성자를 자동으로 만들어 줌
public class HospitalApiDto {
     
    private String dutyAddr; // 주소 ex) 서울특별시 강남구 봉은사로 612 (삼성동)
    private String dutyDiv; // 병원 구분(병원 : B, 의원 : C) ex) B   
    private String dutyDivNam; // 병원 분류명 ex) 병원
    private String dutyEmcls; // 응급의료기관코드 ex) G099
    private String dutyEmclsName; // 응급의료기관코드명 ex) 응급의료기관 이외
    private String dutyEryn; // 응급실운영여부(1/2) 1 : 운영 2 : 미운영 ex) 2
    private String dutyEtc; // 비고 
    private String dutyInf; // 기관설명상세
    private String dutyMapimg; // 간이약도    
    private String dutyName; // 기관명(병원명) ex) (의)가산의료재단광동병원
    private String dutyTel1; // 대표전화 ex) 02-2222-4888
    private String dutyTel3; // 응급실전화
    private String hpid; // 기관ID
    private String postCdn1; // 우편번호
    private String postCdn2; // 우편번호2
    private String rnum; // 순번
    
    // S 시작시간, C 종료시간 
    private String dutyTime1s; // 진료시간(월요일)S ex) 0900
    private String dutyTime1c; // 진료시간(월요일)C ex) 1800
    private String dutyTime2s; // 진료시간(화요일)S
    private String dutyTime2c; // 진료시간(화요일)C
    private String dutyTime3s; // 진료시간(수요일)S
    private String dutyTime3c; // 진료시간(수요일)C
    private String dutyTime4s; // 진료시간(목요일)S 
    private String dutyTime4c; // 진료시간(목요일)C
    private String dutyTime5s; // 진료시간(금요일)S
    private String dutyTime5c; // 진료시간(금요일)C
    private String dutyTime6s; // 진료시간(토요일)S
    private String dutyTime6c; // 진료시간(토요일)C
    private String dutyTime7s; // 진료시간(일요일)S 
    private String dutyTime7c; // 진료시간(일요일)C
    private String dutyTime8s; // 진료시간(공휴일)S 
    private String dutyTime8c; // 진료시간(공휴일)C

    private String wgs84Lat; // 병원 위도 ex) 37.5142810376461
    private String wgs84Lon; // 병원 경도 ex) 127.062146778337


    public HospitalApiDto(String  hpid, String dutyName, String dutyAddr, 
                                  String dutyTime1s, String dutyTime1c,
                                  String dutyTime2s, String dutyTime2c,
                                  String dutyTime3s, String dutyTime3c,
                                  String dutyTime4s, String dutyTime4c,
                                  String dutyTime5s, String dutyTime5c,
                                  String dutyTime6s, String dutyTime6c,
                                  String dutyTime7s, String dutyTime7c,
                                  String dutyTime8s, String dutyTime8c){
        this.hpid = hpid;
        this.dutyName = dutyName;
        this.dutyAddr = dutyAddr;
        this.dutyTime1s = dutyTime1s;
        this.dutyTime1c = dutyTime1c;        
        this.dutyTime2s = dutyTime2s;
        this.dutyTime2c = dutyTime2c;    
        this.dutyTime3s = dutyTime3s;
        this.dutyTime3c = dutyTime3c;           
        this.dutyTime4s = dutyTime4s;
        this.dutyTime4c = dutyTime4c;           
        this.dutyTime5s = dutyTime5s;
        this.dutyTime5c = dutyTime5c;           
        this.dutyTime6s = dutyTime6s;
        this.dutyTime6c = dutyTime6c;           
        this.dutyTime7s = dutyTime7s;
        this.dutyTime7c = dutyTime7c;   
        this.dutyTime8s = dutyTime8s;
        this.dutyTime8c = dutyTime8c;   
    }
}
