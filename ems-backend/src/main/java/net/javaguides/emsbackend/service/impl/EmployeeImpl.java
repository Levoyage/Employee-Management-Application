package net.javaguides.emsbackend.service.impl;

import lombok.AllArgsConstructor;
import net.javaguides.emsbackend.dto.EmployeeDto;
import net.javaguides.emsbackend.entity.Department;
import net.javaguides.emsbackend.entity.Employee;
import net.javaguides.emsbackend.exception.ResourceNotFoundException;
import net.javaguides.emsbackend.mapper.EmployeeMapper;
import net.javaguides.emsbackend.repository.DepartmentRepository;
import net.javaguides.emsbackend.repository.EmployeeRepository;
import net.javaguides.emsbackend.service.EmployeeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;

    private DepartmentRepository departmentRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);

        //增加了部门信息后，保存员工对象也需要能保存部门信息
        Department department = departmentRepository.findById(employeeDto.getDepartmentId())
                .orElseThrow(()->
                        new ResourceNotFoundException("Department does not exist with id:" +employeeDto.getDepartmentId()));
        //为员工设置所属的部门，以确保员工和部门之间建立正确的关系
        employee.setDepartment(department);

        Employee savedEmployee= employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee is not exists with given id:" + employeeId));
    return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream().map((employee) -> EmployeeMapper.mapToEmployeeDto(employee))
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(
                ()-> new ResourceNotFoundException("Employee does not exists with given id:"+employeeId)
        );

        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setLastName(updatedEmployee.getLastName());
        employee.setEmail(updatedEmployee.getEmail());

        //增加了部门信息后，更新员工对象也需要能更新部门信息
        Department department = departmentRepository.findById(updatedEmployee.getDepartmentId())
                .orElseThrow(()->
                        new ResourceNotFoundException("Department does not exist with id:" +updatedEmployee.getDepartmentId()));
        //为员工设置所属的部门，以确保员工和部门之间建立正确的关系
        employee.setDepartment(department);

        Employee updatedEmployeeObj =  employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(
                ()-> new ResourceNotFoundException("Employee does not exists with given id:"+employeeId)
        );

        employeeRepository.deleteById(employeeId);
    }
}
