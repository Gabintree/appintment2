package aphamale.project.appointment.Repository;


import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import aphamale.project.appointment.Domain.TestDomain;

public interface TestRepository extends JpaRepository<TestDomain, String> {
    @EntityGraph(attributePaths = {"testList"})
    @Query("select T1 from user T1 where T1.id = :id")
    TestDomain getTesTList(@Param("id") String id);
    

}
