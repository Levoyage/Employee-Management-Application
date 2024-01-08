package net.javaguides.emsbackend.repository;

import net.javaguides.emsbackend.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

//JpaRepository is used to let EmployeeRepository get a CRUD methods to perform CRUD database operations on this Employee entity
public interface EmployeeRepository extends JpaRepository<Employee,Long> {
}
