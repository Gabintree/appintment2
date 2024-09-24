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
 
        public void sendMessage(){

            try{
                Message message = new Message();
                message.setFrom("01027037196");
                message.setTo("01027037196");
                message.setText("보낼 메세지");

                messageService.send(message);

            } catch(NurigoMessageNotReceivedException exception){

                  // 발송에 실패한 메시지 목록
                  System.out.println(exception.getFailedMessageList());
                  System.out.println(exception.getMessage());  

            }catch (Exception exception) {
                System.out.println(exception.getMessage());
              }
        
        }



    


}