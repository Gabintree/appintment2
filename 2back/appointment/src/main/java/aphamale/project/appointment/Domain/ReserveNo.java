package aphamale.project.appointment.Domain;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Data
public class ReserveNo implements Serializable{

    @Column(name = "reserve_no")
    private String reserveNo; // 예약번호

    @Column(name = "user_id")
    private String userId; // 예약자 계정

    @Column(name = "group_id")
    private String groupId; // 기관Id
    
}
