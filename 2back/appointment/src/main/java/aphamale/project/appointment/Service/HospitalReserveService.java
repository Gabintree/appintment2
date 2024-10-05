package aphamale.project.appointment.Service;

import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import aphamale.project.appointment.Domain.HospitalReserveDomain;
import aphamale.project.appointment.Dto.Interface.GetHospitalReserveListDto;
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
    
    // 예약 취소(관리자)
    public boolean deleteReserveAdminCancel(String reserveNo){

        Boolean bool = false;

        try{

            // 현재 시간
            Timestamp timestampToday = new Timestamp(System.currentTimeMillis()); 

            // 취소하기 버튼 클릭시 reserve_status "D"로 변경
            HospitalReserveDomain hospitalReserveDomain = hospitalReserveRepository.findByReserveNo(reserveNo);
            hospitalReserveDomain.setReserveStatus("D");
            hospitalReserveDomain.setUpdateDate(timestampToday);
            hospitalReserveDomain.setUpdateUser(hospitalReserveDomain.getHospitalName()); // 변경자는 관리자가 변경했다.

            hospitalReserveRepository.save(hospitalReserveDomain);

            bool = true;

        }catch(Exception ex){
            System.out.println(ex.toString());
        } 

        return bool;
    }
}


