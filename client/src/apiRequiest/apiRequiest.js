import axios from "axios";
import { getToken, setUserDetails } from "../Helper/SessionHelper";

let BaseURL = "http://localhost:5000";
const Headers ={headers:{"token":getToken()}};

// registraion
export  async function UserRegistrationRequiest(email,firstName,lastName,mobile,password,photo) {
    try {
        let reqBody={email:email,firstName:firstName,lastName:lastName,mobile:mobile,password:password, photo:photo}
        let result = await axios.post(BaseURL+'/api/v1/registration',reqBody);
        return result;
    }
    catch (e) {
        return false
    }
 }


//  login
export  async function UserLoginRequiest(email,password) {
    try {
        let reqBody={email:email,password:password}
        let result = await axios.post(BaseURL+'/api/v1/userLogin',reqBody);
        return result;
    }
    catch (e) {
        return false
    }
 }
//  user details 
export  async function getUsersRequest() {
    try {
        let result = await axios.get(BaseURL+'/api/v1/userDetails',Headers);
        let data = result['data']
        return data;
    }
    catch (e) {
        return false
    }
 }

//  create task


 export  async function CreateTaskRequiest(users,title,description,dueDate,priority,status, category) {
    try {
        let reqBody ={users:users, title:title, description:description,dueDate:dueDate,priority:priority, status:status, category:category};
        let result = await axios.post(BaseURL+'/api/v1/createTask',reqBody,Headers);
        return result;
    }
    catch (e) {
        return false
    }
 }

// get task request
 export async function getTaskRequest(status){
    try {
        let result = await axios.get(BaseURL+'/api/v1/getTaskController/'+status,Headers);
        let data = result['data']['data']
        return data;
    } catch (e) {
        return false 
    }
}
// get In Progress request
 export async function getInProgressRequest(status){
    try {
        let result = await axios.get(BaseURL+'/api/v1/getInprogress/'+status,Headers);
        let data = result['data']['data']
        return data;
    } catch (e) {
        return false 
    }
}
// get In Completed request
 export async function getCompletedRequest(status){
    try {
        let result = await axios.get(BaseURL+'/api/v1/getInprogress/'+status,Headers);
        let data = result['data']['data']
        return data;
    } catch (e) {
        return false 
    }
}


 //  List by status requiest
export  async function ListByStatusRequiest(status) {
    try {
        let result = await axios.get(BaseURL+'/api/v1/listByStatus/'+status,Headers);
        let data = result.data["data"];
        return data
    }
    catch (e) {
        return false
    }
 }

//  Task list count
 export async function ListTaskCountRequiest() {
    try {
        let result = await axios.get(BaseURL+'/api/v1/listTaskCount',Headers);
        let data = result.data["data"];
        return data
    }
    catch (e) {
        return false
    }
 }

//  Delete Task
export async function DeleteTaskRequest(id) {
    try {
        let result = await axios.delete(BaseURL+'/api/v1/taskDelete/'+id,Headers);
        return result;
    }
    catch (e) {
        return false
    }
 }

//  update status task
export  async function UpdateStatusRequiest(id, status) {
    try {
        let result = await axios.get(BaseURL+'/api/v1/updateStatus/'+id+"/"+status,Headers);
        return result 
    }
    catch (e) {
        return false
    }
 }

//  User profile update

export async function UserProfileUpdateRequest(email,firstName,lastName,mobile,password,photo) {
    try {
        let reqBody={email:email,firstName:firstName,lastName:lastName,mobile:mobile,password:password, photo:photo}
        let UserDetails={email:email,firstName:firstName,lastName:lastName,mobile:mobile,photo:photo}
        let result = await axios.post(BaseURL+'/api/v1/upadateProfile', reqBody, Headers);
        setUserDetails(UserDetails);
        return result
    }
    catch (e) {
        return false
    }
 }
 
 //  User profile details

export  async function userDetailsRequest() {
    try {
        let result = await axios.get(BaseURL+'/api/v1/profileDetails', Headers);
        let data = result['data'];
        return data;
    }
    catch (e) {
        return false
    }
 }


