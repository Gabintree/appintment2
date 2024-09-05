package aphamale.project.appointment.Domain;

import java.sql.Timestamp;
import java.util.ArrayList;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;


@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString(exclude = "getTesTList")
@Table(name="user")
public class TestDomain {
    @Id 
    private String id;
    private String password;
    private String name;
    private String gender;
    private int age;
    private String phone;
    private String user_gbn;
    private String remark;
    private Timestamp insert_date;
    private Timestamp update_date;

    @ElementCollection(fetch = FetchType.LAZY)
    @Builder.Default
    private ArrayList<TestDomain> getTesTList = new ArrayList<>();

    public TestDomain(String id, String password, String name, String gender, int age, String phone, String user_gbn, String remark, Timestamp insert_date, Timestamp update_date){

    }
    
}
