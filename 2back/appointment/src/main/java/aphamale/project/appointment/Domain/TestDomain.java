package aphamale.project.appointment.Domain;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="userInfo")
public class TestDomain {
    @Id // 기본키라는 뜻임  //@GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
    private String id;

    @Column
    private String password;

    @Column
    private String name;
   
    @Column
    private String gender;

    @Column
    private int age;

    @Column
    private String phone;

    @Column
    private String userGbn;

    @Column
    private String hospitalId;

    @Column
    private Timestamp insertDate;

    @Column
    private Timestamp updateDate;

    
}
