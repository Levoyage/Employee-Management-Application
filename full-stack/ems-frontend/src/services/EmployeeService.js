import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8080/api/employees";

export const listEmployees = () => {
    return axios.get(REST_API_BASE_URL);
}

//因为上面这个箭头函数正文中只有一个语句
//所以也可以简化成下面的写法
//export const listEmployees = () =>  axios.get(REST_API_BASE_URL);

//发送POST请求到自定义的API服务器，目的是创建一个新的员工记录
//你需要提供API的基础URL和员工数据作为参数
export const createEmployee = (employee) => {
    return axios.post(REST_API_BASE_URL, employee);
}

//通过发起 HTTP GET 请求获取特定员工的数据。调用这个函数时，需要提供员工的唯一标识符（employeeId）
export const getEmployee = (employeeId) => {
    return axios.get(REST_API_BASE_URL + '/' + employeeId);
}

//两个参数，第一个是员工的id，第二个是更新后的员工对象
export const updateEmployee = (employeeId, employee) => {
    return axios.put(REST_API_BASE_URL + '/' + employeeId, employee);
}

export const deleteEmployee = (employeeId) => {
    return axios.delete(REST_API_BASE_URL + '/' + employeeId);
}