package aphamale.project.appointment.Dto;

import java.security.Timestamp;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TestDto {
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

    public TestDto(String id, String password, String name, String gender, int age, String phone, String user_gbn, String remark, Timestamp insert_date, Timestamp update_date){

        this.id = id;
        this.password = password;
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.phone = phone;
        this.user_gbn = user_gbn;
        this.remark = remark;
        this.insert_date = insert_date;
        this.update_date = update_date;
    }

}
