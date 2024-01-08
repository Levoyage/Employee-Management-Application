import React, { useEffect, useState } from 'react'
import { createEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom';
import { getEmployee } from '../services/EmployeeService'
import { getAllDepartments } from '../services/DepartmentService'

const EmployeeComponent = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [departmentId, setDepartmentId] = useState('')
  const [departments, setDepartments] = useState([])

  useEffect(() => {
    getAllDepartments().then((response) => {
      setDepartments(response.data);
    }).catch(error => {
      console.log(error);
    })
  }, [])

  const { id } = useParams();
  //Use the useState hook to initialize state variables that will hold validation errors
  const [error, setError] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: ''
  })

  const navigator = useNavigate();

  //useEffect两个参数，第一个是回调函数，第二个是依赖数组（这里是id）
  //通过 response.data 获取服务器返回的数据
  useEffect(() => {
    if (id) {
      getEmployee(id).then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
        setDepartmentId(response.data.departmentId);
      }).catch(error => {
        console.log(error);
      })
    }
  }, [id])



  function saveOrUpdateEmployee(event) {
    event.preventDefault()

    if (validateForm()) {
      const employee = { firstName, lastName, email, departmentId }
      console.log(employee)

      if (id) {
        updateEmployee(id, employee).then(response => {
          console.log(response.data);
          navigator('/employees')
        }).catch(error => {
          console.log(error);
        })
      } else {
        createEmployee(employee).then(response => {
          console.log(response.data);
          navigator('/employees')
        }).catch(error => {
          console.log(error);
        })
      }
    }
  }

  //验证表单是否有效，如果无效会显示红字错误消息
  function validateForm() {
    let valid = true;
    // use the spread operator to make a copy of the error object
    //the error object is the state variable above that holds the validation errors
    const errorsCopy = { ...error };

    //trim is used to remove any whitespace
    //After trim(), if the firstName is not empty, then set the error message to a blank space
    //if else, set the error message to 'First Name is required',and set valid to false
    if (firstName.trim()) {
      errorsCopy.firstName = ' ';
    } else {
      errorsCopy.firstName = 'First Name is required';
      valid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = ' ';
    } else {
      errorsCopy.lastName = 'Last Name is required';
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = ' ';
    } else {
      errorsCopy.email = 'Email is required';
      valid = false;
    }

    if (departmentId) {
      errorsCopy.department = ' ';
    } else {
      errorsCopy.department = 'Select Department';
      valid = false;
    }

    //set the error state variable to the updated copy
    //return the valid variable
    setError(errorsCopy);
    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h2 className='text-center'>Update Employee</h2>
    } else {
      return <h2 className='text-center'>Add Employee</h2>
    }
  }

  return (
    <div className='container'>
      <br /><br />
      <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3 '>
          <br />
          {pageTitle()}
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label className='form-label'>First Name:</label>
                <input
                  type='text'
                  placeholder='Enter Employee First Name'
                  name='firstName'
                  className={`form-control ${error.firstName ? 'is-invalid' : ''}`}
                  value={firstName}
                  //get the value of 'firstName' from input field
                  onChange={(e) => setFirstName(e.target.value)} />
                {/* 当 error.firstName 存在且不为空时，渲染一个带有相应错误消息的 <div> 元素，用于在用户界面中显示 "firstName" 字段的验证错误。 */}
                {error.firstName && <div className='invalid-feedback'>{error.firstName}</div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Last Name:</label>
                <input placeholder='Enter Employee Last Name'
                  type='text'
                  name='lastName'
                  className={`form-control ${error.lastName ? 'is-invalid' : ''}`}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)} />
                {error.lastName && <div className='invalid-feedback'>{error.lastName}</div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Email:</label>
                <input placeholder='Enter Employee Email'
                  type='text'
                  name='email'
                  className={`form-control ${error.email ? 'is-invalid' : ''}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />
                {error.email && <div className='invalid-feedback'>{error.email}</div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Select Department:</label>
                <select
                  className={`form-control ${error.department ? 'is-invalid' : ''}`}
                  value={departmentId}
                  onChange={(e) => setDepartmentId(e.target.value)}>
                  <option value='Select Department'>Select Department</option>
                  {
                    departments.map(department =>
                      <option key={department.id} value={department.id}>{department.departmentName}</option>
                    )
                  }
                </select>
                {error.department && <div className='invalid-feedback'>{error.department}</div>}
              </div>

              <button className='btn btn-success mb-2' onClick={saveOrUpdateEmployee}>Submit</button>
            </form>
          </div>
        </div>
      </div >

    </div >
  )
}

export default EmployeeComponent