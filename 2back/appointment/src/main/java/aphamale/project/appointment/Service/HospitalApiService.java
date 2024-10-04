package aphamale.project.appointment.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.net.URLEncoder;
import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.time.LocalTime;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

import aphamale.project.appointment.Domain.HospitalSubjectDomain;
import aphamale.project.appointment.Dto.HospitalApiDto;
import aphamale.project.appointment.Repository.HospitalReserveRepository;
import aphamale.project.appointment.Repository.HospitalSubjectInfoRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

public class HospitalApiService {

    private final HospitalSubjectInfoRepository hospitalSubjectInfoRepository;
    private final HospitalReserveRepository hospitalReserveRepository;


    // 병원 목록 조회 
    public List<HospitalApiDto> SelectListApi(String selectedSido, String selectedGugun, String selectedBorC, String selectedSubject, String dayOfWeek){

        // 데이터 담을 list 생성
        List<HospitalApiDto> hospitalList = new ArrayList<>();

        try{
            /* URL */
            StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlMdcncListInfoInqire"); 
            /* Service Key */
            urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=d3KfOE1rDJV%2B5DY%2BZbASj4tiwcbnOGVHXorQOI7Bk4SPggD3%2FgMOQa0jhRzs0GO%2FEPpcuEXEzeIJpy9AncxJNg%3D%3D"); 
            /* 주소(시도) */
            urlBuilder.append("&" + URLEncoder.encode("Q0","UTF-8") + "=" + URLEncoder.encode(selectedSido, "UTF-8")); 
            /* 주소(시군구) */
            urlBuilder.append("&" + URLEncoder.encode("Q1","UTF-8") + "=" + URLEncoder.encode(selectedGugun, "UTF-8")); 
            /* CODE_MST의'H000' 참조(B:병원, C:의원) */
            urlBuilder.append("&" + URLEncoder.encode("QZ","UTF-8") + "=" + URLEncoder.encode(selectedBorC, "UTF-8"));  
            /* CODE_MST의'D000' 참조(D001~D029) 진료과목 */ 
            urlBuilder.append("&" + URLEncoder.encode("QD","UTF-8") + "=" + URLEncoder.encode(selectedSubject, "UTF-8"));  // 진료과목 
            /* 월~일요일(1~7), 공휴일(8) */
            urlBuilder.append("&" + URLEncoder.encode("QT","UTF-8") + "=" + URLEncoder.encode(dayOfWeek, "UTF-8")); // ??
             /* 기관명 */
            urlBuilder.append("&" + URLEncoder.encode("QN","UTF-8") + "=" + URLEncoder.encode("%", "UTF-8"));
            /* 순서 */
            urlBuilder.append("&" + URLEncoder.encode("ORD","UTF-8") + "=" + URLEncoder.encode("NAME", "UTF-8")); // 이름 순으로
             /* 페이지 번호 */
            urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); // ??
            /* 목록 건수 */
            urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("100", "UTF-8")); // ??
        
            // URL 객체 생성
            //URL url = new URL(urlBuilder.toString()); // JAVA 20부터 사용불가 URI를 URL로 변환하는 방식으로 대체
            URL url = URI.create(urlBuilder.toString()).toURL();
            
            // 요청하고자 하는 URL과 통신하기 위한 Connection 객체 생성
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-type", "application/json");

            // 통신 응답코드 확인
            System.out.println("Response code: " + conn.getResponseCode());

            // 전달받은 데이터를 BufferedReader 객체로 저장
            BufferedReader rd;
            if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
                rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            } else {
                rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
            }

            // 저장된 데이터를 라인별로 읽어 StringBuilder 객체로 저장
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = rd.readLine()) != null) {
                sb.append(line);
            }
            
            // 객체 해제.
            rd.close();
            conn.disconnect();
            
            // System.out.println(sb.toString()); // sb에 담긴 문자열 확인

            // XML형식을 Object 형식으로 변환
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder build = factory.newDocumentBuilder();
            Document doc = build.parse(new InputSource(new StringReader(sb.toString())));

            
            //여기서 부터 각 컬럼별로 값 가져오는 방법 작업
            NodeList nodeItemList = doc.getElementsByTagName("item");
            System.out.println("item수 : " + nodeItemList.getLength() );
            
            for(int i = 0; i < nodeItemList.getLength(); i++){
                Node itemNode = nodeItemList.item(i);

                //System.out.println(itemNode.getTextContent()); // item별(row) 값 확인

                if (itemNode.getNodeType() == Node.ELEMENT_NODE) {
                    Element itemElement = (Element) itemNode; 

                    String hpid = GetElementValue(itemElement, "hpid");
                    String dutyName = GetElementValue(itemElement, "dutyName");
                    String dutyAddr = GetElementValue(itemElement, "dutyAddr"); 
                    String dutyTel1 = GetElementValue(itemElement, "dutyTel1"); // 대표전화

                    String dutyTime1s = GetElementValue(itemElement, "dutyTime1s");
                    String dutyTime1c = GetElementValue(itemElement, "dutyTime1c");
                    String dutyTime2s = GetElementValue(itemElement, "dutyTime2s");
                    String dutyTime2c = GetElementValue(itemElement, "dutyTime2c");
                    String dutyTime3s = GetElementValue(itemElement, "dutyTime3s");
                    String dutyTime3c = GetElementValue(itemElement, "dutyTime3c");
                    String dutyTime4s = GetElementValue(itemElement, "dutyTime4s");
                    String dutyTime4c = GetElementValue(itemElement, "dutyTime4c");
                    String dutyTime5s = GetElementValue(itemElement, "dutyTime5s");
                    String dutyTime5c = GetElementValue(itemElement, "dutyTime5c");
                    String dutyTime6s = GetElementValue(itemElement, "dutyTime6s");
                    String dutyTime6c = GetElementValue(itemElement, "dutyTime6c");
                    String dutyTime7s = GetElementValue(itemElement, "dutyTime7s");
                    String dutyTime7c = GetElementValue(itemElement, "dutyTime7c");
                    String dutyTime8s = GetElementValue(itemElement, "dutyTime8s");
                    String dutyTime8c = GetElementValue(itemElement, "dutyTime8c");

                    // String rnum = GetElementValue(itemElement, "rnum");  
                    // String postCdn1 = GetElementValue(itemElement, "postCdn1");
                    // String postCdn2 = GetElementValue(itemElement, "postCdn2");                    
                    // String dutyTel3 = GetElementValue(itemElement, "dutyTel3");                    
                    // String dutyDiv = GetElementValue(itemElement, "dutyDiv");
                    // String dutyDivNam = GetElementValue(itemElement, "dutyDivNam");
                    // String dutyEmcls = GetElementValue(itemElement, "dutyEmcls");
                    // String dutyEmclsName = GetElementValue(itemElement, "dutyEmclsName");
                    // String dutyEryn = GetElementValue(itemElement, "dutyEryn");
                    // String dutyEtc = GetElementValue(itemElement, "dutyEtc");
                    // String dutyInf = GetElementValue(itemElement, "dutyInf");
                    // String dutyMapimg = GetElementValue(itemElement, "dutyMapimg");
                    // String wgs84Lat = GetElementValue(itemElement, "wgs84Lat");
                    // String wgs84Lon = GetElementValue(itemElement, "wgs84Lon");
                    
                    HospitalApiDto hospitalApiDto = new HospitalApiDto(hpid, dutyName, dutyAddr, dutyTel1,
                                                                       dutyTime1s, dutyTime1c,
                                                                       dutyTime2s, dutyTime2c,
                                                                       dutyTime3s, dutyTime3c,
                                                                       dutyTime4s, dutyTime4c,
                                                                       dutyTime5s, dutyTime5c,
                                                                       dutyTime6s, dutyTime6c,
                                                                       dutyTime7s, dutyTime7c,
                                                                       dutyTime8s, dutyTime8c, ""); // subjectName은 컨트롤러에서 따로 

                    hospitalList.add(hospitalApiDto);             
                }
            }
        } catch(Exception e) {
            e.printStackTrace();
        }        
        return hospitalList;
    }

    // 요소값 찾기
    private String GetElementValue(Element element, String tagName){
        NodeList nodeList = element.getElementsByTagName(tagName);

        if(nodeList.getLength() > 0){
            Node node = nodeList.item(0);

            return node.getTextContent();
        }

        return null;
    }

    // 병원 목록 필터 
    public List<HospitalApiDto> SelectFilteredList(List<HospitalApiDto> list, String selectedDate, String selectedTime, String selectedSubject, String dayOfWeek){
    
        
        // 예약일자 remove
        List<HospitalApiDto> hospitalList1 = new ArrayList<HospitalApiDto>();
        // 예약 시간 remove
        List<HospitalApiDto> hospitalList2 = new ArrayList<HospitalApiDto>();
        // 데이터 담을 list 생성
        List<HospitalApiDto> filteredList = new ArrayList<>();


        try{

            // 날짜 형식으로 변경
            SimpleDateFormat formatDate = new SimpleDateFormat("yyyy-MM-dd"); // 0000년 00월 00일
            Date date = formatDate.parse(selectedDate);
            Date sqlDate = new Date(date.getTime());


            // SQL time형식으로 변경 (HH:mm:ss) 형식어야 변환이 된다고 함.
            String formattedTime = selectedTime.substring(0, 2) + ":" + selectedTime.substring(2, 4) + ":00";
            Time sqlTime = Time.valueOf(formattedTime);


                // 해당 요일에 진료시간이 null 이 아니면 add  
                for(int i = 0; i < list.size(); i++){
                    // dayofWeek가 1이면 월요일
                    if(dayOfWeek.equals("1")){
                        if(list.get(i).getDutyTime1s() != null || list.get(i).getDutyTime1c() != null){
                            hospitalList1.add(list.get(i));
                        }
                    }
                    // dayofWeek가 2면 화요일
                    else if(dayOfWeek.equals("2")){
                        if(list.get(i).getDutyTime2s() != null || list.get(i).getDutyTime2c() != null){
                            hospitalList1.add(list.get(i));
                        }
                    }
                    // dayofWeek가 3이면 수요일
                    else if(dayOfWeek.equals("3")){
                        if(list.get(i).getDutyTime3s() != null || list.get(i).getDutyTime3c() != null){
                            hospitalList1.add(list.get(i));
                        }
                    }   
                    // dayofWeek가 4면 목요일
                    else if(dayOfWeek.equals("4")){
                        if(list.get(i).getDutyTime4s() != null || list.get(i).getDutyTime4c() != null){
                            hospitalList1.add(list.get(i));
                        }
                    }
                    // dayofWeek가 5면 금요일
                    else if(dayOfWeek.equals("5")){
                        if(list.get(i).getDutyTime5s() != null || list.get(i).getDutyTime5c() != null){
                            hospitalList1.add(list.get(i));
                        }
                    }  
                    // dayofWeek가 6이면 토요일
                    else if(dayOfWeek.equals("6")){
                        if(list.get(i).getDutyTime6s() != null || list.get(i).getDutyTime6c() != null){
                            hospitalList1.add(list.get(i));
                        }
                    }
                    // dayofWeek가 7이면 일요일
                    else if(dayOfWeek.equals("7")){
                        if(list.get(i).getDutyTime7s() != null || list.get(i).getDutyTime7c() != null){
                            hospitalList1.add(list.get(i));
                        }
                    }
                    // dayofWeek가 8이면 공휴일
                    else if(dayOfWeek.equals("8")){
                    if(list.get(i).getDutyTime8s() != null || list.get(i).getDutyTime8c() != null){
                        hospitalList1.add(list.get(i));
                        }
                    }   
                }  
                
                // HospitalList1로 옮겼으니까 삭제하자.
                list.removeAll(list);


                // 예약 시간 분리
                int hh = Integer.parseInt(selectedTime.substring(0, 2)); 
                int mm = Integer.parseInt(selectedTime.substring(2, 4));

                LocalTime time = LocalTime.of(hh, mm, 0);
                System.out.println("time : " + time);

                // 예약 시간이 운영시간 내인 것만 add 
                for(int t = 0; t < hospitalList1.size(); t++){

                    LocalTime startTime = LocalTime.now();
                    LocalTime closeTime = LocalTime.now();

                    if(dayOfWeek.equals("1")){
                        // 시간 time 형식 변환
                        // 시작 시간
                        int startHh = Integer.parseInt(hospitalList1.get(t).getDutyTime1s().substring(0, 2)); 
                        int startMm = Integer.parseInt(hospitalList1.get(t).getDutyTime1s().substring(2, 4));

                        startTime = LocalTime.of(startHh, startMm, 0);
                        //System.out.println("startTime : " + startTime);

                        // 마감 시간
                        int closeHh = Integer.parseInt(hospitalList1.get(t).getDutyTime1c().substring(0, 2)); 
                        int closeMm = Integer.parseInt(hospitalList1.get(t).getDutyTime1c().substring(2, 4));

                        closeTime = LocalTime.of(closeHh, closeMm, 0);
                        //System.out.println("closeTime : " + closeTime);
                    }else if(dayOfWeek.equals("2")){
                        // 시간 time 형식 변환
                        // 시작 시간
                        int startHh = Integer.parseInt(hospitalList1.get(t).getDutyTime2s().substring(0, 2)); 
                        int startMm = Integer.parseInt(hospitalList1.get(t).getDutyTime2s().substring(2, 4));

                        startTime = LocalTime.of(startHh, startMm, 0);
                        //System.out.println("startTime : " + startTime);

                        // 마감 시간
                        int closeHh = Integer.parseInt(hospitalList1.get(t).getDutyTime2c().substring(0, 2)); 
                        int closeMm = Integer.parseInt(hospitalList1.get(t).getDutyTime2c().substring(2, 4));

                        closeTime = LocalTime.of(closeHh, closeMm, 0);
                        //System.out.println("closeTime : " + closeTime);
                    }else if(dayOfWeek.equals("3")){
                        // 시간 time 형식 변환
                        // 시작 시간
                        int startHh = Integer.parseInt(hospitalList1.get(t).getDutyTime3s().substring(0, 2)); 
                        int startMm = Integer.parseInt(hospitalList1.get(t).getDutyTime3s().substring(2, 4));

                        startTime = LocalTime.of(startHh, startMm, 0);
                        //System.out.println("startTime : " + startTime);

                        // 마감 시간
                        int closeHh = Integer.parseInt(hospitalList1.get(t).getDutyTime3c().substring(0, 2)); 
                        int closeMm = Integer.parseInt(hospitalList1.get(t).getDutyTime3c().substring(2, 4));

                        closeTime = LocalTime.of(closeHh, closeMm, 0);
                        //System.out.println("closeTime : " + closeTime);                    

                    }else if(dayOfWeek.equals("4")){
                        // 시간 time 형식 변환
                        // 시작 시간
                        int startHh = Integer.parseInt(hospitalList1.get(t).getDutyTime4s().substring(0, 2)); 
                        int startMm = Integer.parseInt(hospitalList1.get(t).getDutyTime4s().substring(2, 4));

                        startTime = LocalTime.of(startHh, startMm, 0);
                        //System.out.println("startTime : " + startTime);

                        // 마감 시간
                        int closeHh = Integer.parseInt(hospitalList1.get(t).getDutyTime4c().substring(0, 2)); 
                        int closeMm = Integer.parseInt(hospitalList1.get(t).getDutyTime4c().substring(2, 4));

                        closeTime = LocalTime.of(closeHh, closeMm, 0);
                        //System.out.println("closeTime : " + closeTime); 
                    }else if(dayOfWeek.equals("5")){
                        // 시간 time 형식 변환
                        // 시작 시간
                        int startHh = Integer.parseInt(hospitalList1.get(t).getDutyTime5s().substring(0, 2)); 
                        int startMm = Integer.parseInt(hospitalList1.get(t).getDutyTime5s().substring(2, 4));

                        startTime = LocalTime.of(startHh, startMm, 0);
                        //System.out.println("startTime : " + startTime);

                        // 마감 시간
                        int closeHh = Integer.parseInt(hospitalList1.get(t).getDutyTime5c().substring(0, 2)); 
                        int closeMm = Integer.parseInt(hospitalList1.get(t).getDutyTime5c().substring(2, 4));

                        closeTime = LocalTime.of(closeHh, closeMm, 0);
                        //System.out.println("closeTime : " + closeTime); 
                    }else if(dayOfWeek.equals("6")){
                        // 시간 time 형식 변환
                        // 시작 시간
                        int startHh = Integer.parseInt(hospitalList1.get(t).getDutyTime6s().substring(0, 2)); 
                        int startMm = Integer.parseInt(hospitalList1.get(t).getDutyTime6s().substring(2, 4));

                        startTime = LocalTime.of(startHh, startMm, 0);
                        //System.out.println("startTime : " + startTime);

                        // 마감 시간
                        int closeHh = Integer.parseInt(hospitalList1.get(t).getDutyTime6c().substring(0, 2)); 
                        int closeMm = Integer.parseInt(hospitalList1.get(t).getDutyTime6c().substring(2, 4));

                        closeTime = LocalTime.of(closeHh, closeMm, 0);
                        //System.out.println("closeTime : " + closeTime); 
                    }else if(dayOfWeek.equals("7")){
                        // 시간 time 형식 변환
                        // 시작 시간
                        int startHh = Integer.parseInt(hospitalList1.get(t).getDutyTime7s().substring(0, 2)); 
                        int startMm = Integer.parseInt(hospitalList1.get(t).getDutyTime7s().substring(2, 4));

                        startTime = LocalTime.of(startHh, startMm, 0);
                        //System.out.println("startTime : " + startTime);

                        // 마감 시간
                        int closeHh = Integer.parseInt(hospitalList1.get(t).getDutyTime7c().substring(0, 2)); 
                        int closeMm = Integer.parseInt(hospitalList1.get(t).getDutyTime7c().substring(2, 4));

                        closeTime = LocalTime.of(closeHh, closeMm, 0);
                        //System.out.println("closeTime : " + closeTime); 
                    }else if(dayOfWeek.equals("8")){
                        // 시간 time 형식 변환
                        // 시작 시간
                        int startHh = Integer.parseInt(hospitalList1.get(t).getDutyTime8s().substring(0, 2)); 
                        int startMm = Integer.parseInt(hospitalList1.get(t).getDutyTime8s().substring(2, 4));

                        startTime = LocalTime.of(startHh, startMm, 0);
                        //System.out.println("startTime : " + startTime);

                        // 마감 시간
                        int closeHh = Integer.parseInt(hospitalList1.get(t).getDutyTime8c().substring(0, 2)); 
                        int closeMm = Integer.parseInt(hospitalList1.get(t).getDutyTime8c().substring(2, 4));

                        closeTime = LocalTime.of(closeHh, closeMm, 0);
                        //System.out.println("closeTime : " + closeTime); 
                    }

                    System.out.println("병원명 " + hospitalList1.get(t).getDutyName());
                    System.out.println( "예약시간 : " + time + "시작 시간 : " + startTime + "마감시간 : " + closeTime + " 결과 : " + (time.isAfter(startTime) && time.isBefore(closeTime.minusMinutes(30))
                                                                                                    || (time.equals(startTime) || time.equals(closeTime.minusMinutes(30)))));

                    // 예약 시간이 시작시간 이후 이고, 예약시간이 마감시간 30분 전의 이전일 때 add
                    if((time.isAfter(startTime) && time.isBefore(closeTime.minusMinutes(30))) 
                        || (time.equals(startTime) || time.equals(closeTime.minusMinutes(30)))){
                            hospitalList2.add(hospitalList1.get(t));
                    }
                }   
                
                // HospitalList2에 다 넣었으니까 HospitalList1 삭제하자.
                hospitalList1.removeAll(hospitalList1);
            
                // 진료과목명 찾아오기
                HospitalSubjectDomain hospitalSubjectDomain = hospitalSubjectInfoRepository.findBySubjectCode(selectedSubject);
                String SubjectName = hospitalSubjectDomain.getSubjectName();

                // 진료과목명 리스트에 추가하기
                for(int j = 0; j < hospitalList2.size(); j++){
                    hospitalList2.get(j).setSubjectName(SubjectName);
                }

                // 예약된 시간이 있는지 체크 해야 함.
                for(int j = 0; j < hospitalList2.size(); j++){
                    // groupdId 찾기
                    String groupdId = hospitalList2.get(j).getHpid();

                    // 해당 내역 있는 지 count
                    int result = hospitalReserveRepository.countByGroupIdAndReserveDateAndReserveTime(groupdId, sqlDate, sqlTime);
                    
                    // count가 0 이면 예약 내역이 없다는 뜻
                    if(result == 0){
                        filteredList.add(hospitalList2.get(j));
                    }            
                }  

            // hospitalList2 삭제
            hospitalList2.removeAll(hospitalList2);


        }catch(Exception ex){
            System.out.println(ex.toString());

        }
        return filteredList;
    }
}




