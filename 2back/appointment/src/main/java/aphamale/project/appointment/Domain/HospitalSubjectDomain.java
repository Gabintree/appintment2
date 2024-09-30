package aphamale.project.appointment.Domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity(name="subject_info")
@Getter
@Setter
@Table(name="subject_info") // 테이블을 지정하는 기능인 듯
public class HospitalSubjectDomain {

    @Id // 기본키라는 뜻임  //@GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
    private String subjectCode; // 진료과목코드

    @Column(name="subject_name")
    private String subjectName; // 진료과목명
    
}
