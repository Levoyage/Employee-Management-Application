package net.javaguides.emsbackend.service.impl;

import lombok.AllArgsConstructor;
import net.javaguides.emsbackend.dto.DepartmentDto;
import net.javaguides.emsbackend.dto.EmployeeDto;
import net.javaguides.emsbackend.entity.Department;
import net.javaguides.emsbackend.entity.Employee;
import net.javaguides.emsbackend.exception.ResourceNotFoundException;
import net.javaguides.emsbackend.mapper.DepartmentMapper;
import net.javaguides.emsbackend.mapper.EmployeeMapper;
import net.javaguides.emsbackend.repository.DepartmentRepository;
import net.javaguides.emsbackend.service.DepartmentService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class DepartmentImpl implements DepartmentService {

    private DepartmentRepository departmentRepository;

    @Override
    public DepartmentDto createDepartment(DepartmentDto departmentDto) {
        Department department = DepartmentMapper.mapToDepartment(departmentDto);
        Department savedDepartment = departmentRepository.save(department);
        return DepartmentMapper.mapToDepartmentDto(savedDepartment);
    }

    @Override
    public DepartmentDto getDepartmentById(Long departmentId) {
        Department department = departmentRepository.findById(departmentId).orElseThrow(
                ()->new ResourceNotFoundException("Department does not exists with a given id: " + departmentId)
        );
        return DepartmentMapper.mapToDepartmentDto(department);
    }

    @Override
    public List<DepartmentDto> getAllDepartments() {
        List<Department> departments = departmentRepository.findAll();
        return departments.stream().map((department) -> DepartmentMapper.mapToDepartmentDto(department))
                .collect(Collectors.toList());
    }

    @Override
    public DepartmentDto updateDepartment(Long departmentId, DepartmentDto updatedDepartment) {
        //if it can not find the id, throw the exception
        Department department = departmentRepository.findById(departmentId).orElseThrow(
                ()->new ResourceNotFoundException("Department does not exist with a given id:" + departmentId)
        );
        //update new info
        department.setDepartmentName(updatedDepartment.getDepartmentName());
        department.setDepartmentDescription(updatedDepartment.getDepartmentDescription());

        Department savedDepartment = departmentRepository.save(department);
        //save 方法返回更新的 department 对象，我们将部门实体对象转换为 DTO
        return DepartmentMapper.mapToDepartmentDto(savedDepartment);
    }

    @Override
    public void deleteDepartment(Long departmentId) {
        Department department = departmentRepository.findById(departmentId).orElseThrow(
                ()-> new ResourceNotFoundException("Department does not exists with given id:"+departmentId)
        );

        departmentRepository.deleteById(departmentId);
    }
}
