package aphamale.project.appointment.Service;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.exception.NurigoMessageNotReceivedException;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.service.DefaultMessageService;

@Service
@RequiredArgsConstructor
public class MessageApiService {    

        final DefaultMessageService messageService;

        // 인증키, 시크릿키 입력 
        public MessageApiService(){
            this.messageService = NurigoApp.INSTANCE.initialize("NCSCKA2U5KM55KLM", "PVWD7MYI3RZW0E9LCFP7DQU19BTALKGZ", "https://api.coolsms.co.kr");
        }
 
        public void sendMessage(String fromFlag, String userPhone, String adminPhone, String sendMessageFlag, String reserveNo, String userName,  String hospitalName, String reserveDate, String reserveTime){

            try{
                //String lineSeparator = System.lineSeparator();

                // 관리자가 변경했을 때(수신자가 환자)
                if(fromFlag.equals("ADMIN")){
                    Message message = new Message();
                    message.setFrom(adminPhone); // "01027037196" 발신자 연락처
                    message.setTo(userPhone); // "01027037196" 수신자 연락처
    
                    if(sendMessageFlag.equals("U")){
                        message.setText(userName + " 고객님, 병원 담당자에 의해 진료 예약이 변경되었습니다. \n"
                                        + "병원명 : " + hospitalName + "\n" 
                                        + "변경 진료 일자 : " + reserveDate + "\n"
                                        + "변경 진료 시간 : " + reserveTime + "\n"
                                        + "예약번호 : " + reserveNo + "\n"
                                        + "감사합니다."); 
    
                    }else  if(sendMessageFlag.equals("D")){
                        message.setText(userName + " 고객님, 병원 담당자에 의해 진료 예약이 취소되었습니다. \n"
                                        + "병원명 : " + hospitalName + "\n" 
                                        + "취소 진료 일자 : " + reserveDate + "\n"
                                        + "취소 진료 시간 : " + reserveTime + "\n"
                                        + "예약번호 : " + reserveNo + "\n"
                                        + "감사합니다.");    
                    }
                    messageService.send(message);
                }
                // 사용자가 변경했을 때(수신자는 병원) 
                else {
                    Message message = new Message();
                    message.setFrom(adminPhone);
                    message.setTo(adminPhone); // 수신 대상자가 관리자일 때는, 수신/발신자 모두 병원 연락처.
                    if(sendMessageFlag.equals("I")){
                        message.setText(hospitalName + "님, 신규 예약이 추가되었습니다. " + "\n"
                                       + "환자명 : " + userName + "\n"
                                       + "예약 진료 일자 : " + reserveDate + "\n"
                                       + "예약 진료 시간 : " + reserveTime + "\n"
                                       + "예약 번호 : " + reserveNo + "\n"
                                       + "감사합니다."); 
                    }
                    else if(sendMessageFlag.equals("U")){
                        message.setText(hospitalName + "님, 신규 예약이 변경되었습니다. " + "\n"
                                       + "환자명 : " + userName + "\n"
                                       + "변경 진료 일자 : " + reserveDate + "\n"
                                       + "변경 진료 시간 : " + reserveTime + "\n"
                                       + "예약 번호 : " + reserveNo + "\n"
                                       + "감사합니다."); 
    
                    }else  if(sendMessageFlag.equals("D")){
                        message.setText(hospitalName + "님, 신규 예약이 취소되었습니다. " + "\n"
                                       + "환자명 : " + userName + "\n"
                                       + "취소 진료 일자 : " + reserveDate + "\n"
                                       + "취소 진료 시간 : " + reserveTime + "\n"
                                       + "예약 번호 : " + reserveNo + "\n"
                                       + "감사합니다.");    
                    }
                    messageService.send(message);
                }







            } catch(NurigoMessageNotReceivedException exception){

                  // 발송에 실패한 메시지 목록
                  System.out.println(exception.getFailedMessageList());
                  System.out.println(exception.getMessage());  

            }catch (Exception exception) {
                System.out.println(exception.getMessage());
              }
        
        }



    


}