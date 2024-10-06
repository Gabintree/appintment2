package aphamale.project.appointment.Service;

import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import aphamale.project.appointment.Domain.HospitalReserveDomain;
import aphamale.project.appointment.Dto.Interface.GetCurrentReserveDto;
import aphamale.project.appointment.Dto.Interface.GetHospitalReserveListDto;
import aphamale.project.appointment.Dto.Interface.GetSmsContentsDto;
import aphamale.project.appointment.Repository.HospitalReserveRepository;
import aphamale.project.appointment.Repository.HospitalSubjectInfoRepository;

@Service
public class HospitalReserveService {

    private final HospitalReserveRepository hospitalReserveRepository;
    private final MessageApiService messageApiService;

    public HospitalReserveService(HospitalReserveRepository hospitalReserveRepository,
                                  MessageApiService messageApiService){
        this.hospitalReserveRepository = hospitalReserveRepository;
        this.messageApiService = messageApiService;
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
            
            // 예약 취소 안내 문자 전송
            List<GetSmsContentsDto> smsContentDto = hospitalReserveRepository.getItemOfbSmsContent(reserveNo);
            
            if(smsContentDto.get(0) != null){
                String userPhone = smsContentDto.get(0).getUserPhone();
                String adminPhone = smsContentDto.get(0).getAdminPhone();
                String sendReserveNo = smsContentDto.get(0).getReserveNo();
                String sendMsgFlag = smsContentDto.get(0).getSendMessageFlag();
                String userName = smsContentDto.get(0).getUserName();
                String hospitalName = smsContentDto.get(0).getHospitalName();
                String reserveDate = smsContentDto.get(0).getReserveDate();
                String reserveTime = smsContentDto.get(0).getReserveTime();

                // 수신자는 환자가 됨
                messageApiService.sendMessage("ADMIN", userPhone, adminPhone, sendMsgFlag, sendReserveNo, userName, hospitalName, reserveDate, reserveTime);
            }   
        }catch(Exception ex){
            System.out.println(ex.toString());
        } 

        return bool;
    }

    // 팝업 기존 예약정보 조회
    public List<GetCurrentReserveDto> currentReserveData(String reserveNo){

        // 데이터 담을 list 생성
        List<GetCurrentReserveDto> currentReserveList = new ArrayList<>();
        
        currentReserveList = hospitalReserveRepository.getItemsOfCurrentReserveNo(reserveNo);
        
        return currentReserveList;

    }

    // 팝업 해당 일자 예약된 시간 조회
    public List<String> selectBookedList(String groupId, String reserveDate){

        // 데이터 담을 list 생성
        List<String> bookedList = new ArrayList<>();
        
        bookedList = hospitalReserveRepository.getItemsOfBookedReserveDate(groupId, reserveDate);

        return bookedList;
    }

    // 팝업 예약 일자 및 시간 변경
    public boolean updateDateAndTime(String reserveNo, Timestamp reserveDate, Timestamp reserveTime){

        boolean updateResult = false;

        // 현재 시간
        Timestamp timestampToday = new Timestamp(System.currentTimeMillis()); 

        try{

            HospitalReserveDomain hospitalReserveDomain = hospitalReserveRepository.findByReserveNo(reserveNo);
            hospitalReserveDomain.setReserveDate(reserveDate);
            hospitalReserveDomain.setReserveTime(reserveTime);
            hospitalReserveDomain.setReserveStatus("U"); // 변경
            hospitalReserveDomain.setUpdateDate(timestampToday);
            hospitalReserveDomain.setUpdateUser(hospitalReserveDomain.getHospitalName()); // 변경자는 관리자가 변경했다.
    
            updateResult = true;

            
            // 예약 변경 안내 문자 전송
            List<GetSmsContentsDto> smsContentDto = hospitalReserveRepository.getItemOfbSmsContent(reserveNo);
            
            if(smsContentDto.get(0) != null){
                String userPhone = smsContentDto.get(0).getUserPhone();
                String adminPhone = smsContentDto.get(0).getAdminPhone();
                String sendReserveNo = smsContentDto.get(0).getReserveNo();
                String sendMsgFlag = smsContentDto.get(0).getSendMessageFlag();
                String userName = smsContentDto.get(0).getUserName();
                String hospitalName = smsContentDto.get(0).getHospitalName();
                String changeDate = smsContentDto.get(0).getReserveDate();
                String changeTime = smsContentDto.get(0).getReserveTime();

                // 수신자는 환자가 됨
                messageApiService.sendMessage("ADMIN", userPhone, adminPhone, sendMsgFlag, sendReserveNo, userName, hospitalName, changeDate, changeTime);
            }
        }catch(Exception ex){
            System.out.println(ex.toString());
        }



        return updateResult;
    }


}


