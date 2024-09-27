package aphamale.project.appointment.Service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import aphamale.project.appointment.Dto.HospitalReserveDto;

@Service
public class HospitalReserveService {

    // 예약 목록 조회 
    public List<HospitalReserveDto> selectReserveList(String userId, String groupId, Date fromDate, Date toDate){

        // 데이터 담을 list 생성
        List<HospitalReserveDto> hospitalList = new ArrayList<>();

        return hospitalList;
    }
    
}
