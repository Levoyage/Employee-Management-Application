import React, { useEffect, useState } from 'react'
import { createDepartment, getDepartmentById, updateDepartment } from '../services/DepartmentService';
import { useNavigate, useParams } from 'react-router-dom';

const DepartmentComponent = () => {

    const [departmentName, setDepartmentName] = useState('')
    const [departmentDescription, setDepartmentDescription] = useState('')

    const { id } = useParams();

    const navigator = useNavigate();

    useEffect(() => {
        getDepartmentById(id).then(response => {
            setDepartmentName(response.data.departmentName);
            setDepartmentDescription(response.data.departmentDescription);
        }).catch(error => {
            console.log(error);
        })
    }, [id])

    function saveOrUpdateDepartment(e) {
        e.preventDefault();
        const department = { departmentName, departmentDescription }
        console.log(department);

        if (id) {
            updateDepartment(id, department).then(res => {
                console.log(res.data);
                navigator('/departments');
            }).catch(error => {
                console.log(error);
            })
        } else {
            createDepartment(department).then(res => {
                console.log(res.data);
                navigator('/departments');
            }).catch(error => {
                console.log(error);
            })
        }
    }

    function pageTitle() {
        if (id) {
            return <h2 className='text-center'>Update Department</h2>
        } else {
            return <h2 className='text-center'>Add Department</h2>
        }
    }

    return (
        <div className='container'>
            <br /><br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <br />
                    {pageTitle()}
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Department Name:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Department Name'
                                    name='department'
                                    className='form-control'
                                    value={departmentName}
                                    //we can get the value in input text box by using event.target.value.
                                    //updating in a department name state variable by using set department name method.
                                    onChange={(e) => setDepartmentName(e.target.value)} />
                            </div>
                            <div className='form-group mb-2'>
                                <label>Department Description</label>
                                <input
                                    type='text'
                                    placeholder='Enter Department Description'
                                    name='departmentDescription'
                                    className='form-control'
                                    value={departmentDescription}
                                    onChange={(e) => setDepartmentDescription(e.target.value)} />
                            </div>
                            <button className='btn btn-success mb-2' onClick={(e) => saveOrUpdateDepartment(e)}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DepartmentComponent
