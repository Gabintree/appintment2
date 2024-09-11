package aphamale.project.appointment.Service;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
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
    public List<HospitalApiDto> SelectListApi(){

        // 데이터 담을 list 생성
        List<HospitalApiDto> hospitalList = new ArrayList<>();

        try{
            /* URL */
            StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlMdcncListInfoInqire"); 
            /* Service Key */
            urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=d3KfOE1rDJV%2B5DY%2BZbASj4tiwcbnOGVHXorQOI7Bk4SPggD3%2FgMOQa0jhRzs0GO%2FEPpcuEXEzeIJpy9AncxJNg%3D%3D"); 
            /* 주소(시도) */
            urlBuilder.append("&" + URLEncoder.encode("Q0","UTF-8") + "=" + URLEncoder.encode("서울특별시", "UTF-8")); 
            /* 주소(시군구) */
            urlBuilder.append("&" + URLEncoder.encode("Q1","UTF-8") + "=" + URLEncoder.encode("강남구", "UTF-8")); 
            /* CODE_MST의'H000' 참조(B:병원, C:의원) */
            urlBuilder.append("&" + URLEncoder.encode("QZ","UTF-8") + "=" + URLEncoder.encode("B", "UTF-8")); 
            /* CODE_MST의'D000' 참조(D001~D029) */
            urlBuilder.append("&" + URLEncoder.encode("QD","UTF-8") + "=" + URLEncoder.encode("D001", "UTF-8")); 
            /* 월~일요일(1~7), 공휴일(8) */
            urlBuilder.append("&" + URLEncoder.encode("QT","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); 
             /* 기관명 */
            urlBuilder.append("&" + URLEncoder.encode("QN","UTF-8") + "=" + URLEncoder.encode("%", "UTF-8"));
            /* 순서 */
            urlBuilder.append("&" + URLEncoder.encode("ORD","UTF-8") + "=" + URLEncoder.encode("NAME", "UTF-8")); 
             /* 페이지 번호 */
            urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8"));
            /* 목록 건수 */
            urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("10", "UTF-8")); 
        
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
            
            System.out.println(sb.toString());

            // XML형식을 Object 형식으로 변환
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder build = factory.newDocumentBuilder();
            Document doc = build.parse(new InputSource(new StringReader(sb.toString())));

            
            //여기서 부터 각 컬럼별로 값 가져오는 방법 작업하기 
            NodeList nodeItemList = doc.getElementsByTagName("item");
            
            for(int i = 0; i < nodeItemList.getLength(); i++){
                Node itemNode = nodeItemList.item(i);
                System.out.println(itemNode.getTextContent());
            }



            System.out.println(doc.getDocumentElement().getNodeName());


        } catch(Exception e) {
            e.printStackTrace();
        }
        
        return hospitalList;

    }
}




