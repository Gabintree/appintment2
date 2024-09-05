package aphamale.project.appointment.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import aphamale.project.appointment.Domain.TestDomain;

@Repository
public interface TestRepository extends JpaRepository<TestDomain, String>{
    

}
