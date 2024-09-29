package aphamale.project.appointment.Service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import aphamale.project.appointment.Dto.GetHospitalReserveListDto;
import aphamale.project.appointment.Repository.HospitalReserveRepository;

@Service
public class HospitalReserveService {

    private final HospitalReserveRepository hospitalReserveRepository;

    public HospitalReserveService(HospitalReserveRepository hospitalReserveRepository){
        this.hospitalReserveRepository = hospitalReserveRepository;
    }

    // 예약 목록 조회 
    public List<GetHospitalReserveListDto> selectReserveList(String groupId, Date fromDate, Date toDate){


        // 데이터 담을 list 생성
        List<GetHospitalReserveListDto> HospitalList = new ArrayList<>();

        HospitalList = hospitalReserveRepository.getItemsOfByReserveNo(groupId, fromDate, toDate);

        return HospitalList;
    }
    
}


