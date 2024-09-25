package aphamale.project.appointment.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

import aphamale.project.appointment.Dto.HospitalApiDto;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HospitalApiService {

    // 병원 목록 조회 
    public List<HospitalApiDto> SelectListApi(String selectedSido, String selectedGugun, String selectedBorC, String dayOfWeek){

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
            urlBuilder.append("&" + URLEncoder.encode("QZ","UTF-8") + "=" + URLEncoder.encode(selectedBorC, "UTF-8"));  // 모두
            /* CODE_MST의'D000' 참조(D001~D029) 진료과목 */ 
            urlBuilder.append("&" + URLEncoder.encode("QD","UTF-8") + "=" + URLEncoder.encode("D001", "UTF-8"));  // 
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
                    // String dutyTel1 = GetElementValue(itemElement, "dutyTel1");
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
                    
                    HospitalApiDto hospitalApiDto = new HospitalApiDto(hpid, dutyName, dutyAddr,
                                                                       dutyTime1s, dutyTime1c,
                                                                       dutyTime2s, dutyTime2c,
                                                                       dutyTime3s, dutyTime3c,
                                                                       dutyTime4s, dutyTime4c,
                                                                       dutyTime5s, dutyTime5c,
                                                                       dutyTime6s, dutyTime6c,
                                                                       dutyTime7s, dutyTime7c,
                                                                       dutyTime8s, dutyTime8c);

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


}




