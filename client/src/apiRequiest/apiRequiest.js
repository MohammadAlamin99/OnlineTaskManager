import axios from "axios";
import { getToken, setUserDetails } from "../Helper/SessionHelper";

let BaseURL = "http://localhost:5000";
const Headers = { headers: { "token": getToken() } };

// registraion
export async function UserRegistrationRequiest(email, name, mobile, password, adminCode, designation, photo) {
    try {
        let reqBody = { email: email, name: name, mobile: mobile, password: password, adminCode: adminCode, designation: designation, photo: photo }
        let result = await axios.post(BaseURL + '/api/v1/registration', reqBody);
        return result;
    }
    catch (e) {
        return false
    }
}

//  login
export async function UserLoginRequiest(email, password) {
    try {
        let reqBody = { email: email, password: password }
        let result = await axios.post(BaseURL + '/api/v1/userLogin', reqBody);
        return result;
    }
    catch (e) {
        return false
    }
}
//  user details 
export async function getUsersRequest() {
    try {
        let result = await axios.get(BaseURL + '/api/v1/userDetails', Headers);
        let data = result['data'];
        return data;
    }
    catch (e) {
        return false
    }
}
//  user update 
export async function userUpdateRequest(id, isActive) {
    try {
        let reqbody = { id: id, isActive: isActive }
        let result = await axios.post(BaseURL + '/api/v1/updateUser', reqbody, Headers);
        let data = result['data']
        return data;
    }
    catch (e) {
        return false
    }
}

// create task 
export async function CreateTaskRequest(reqbody) {
    try {
        let result = await axios.post(BaseURL + '/api/v1/createTask', reqbody, Headers);
        return result;
    } catch (e) {
        return false;
    }
}

// get all task request
export async function getAllTaskRequest(createdBy, assignTo) {
    try {
        const params = {};
        // ধাপ ২: যদি createdBy আছে, তাহলে params এ add করি
        if (createdBy) params.createdBy = createdBy;
        // ধাপ ৩: যদি assignTo আছে, তাহলে params এ add করি
        if (assignTo) params.assignTo = assignTo;
        const response = await axios.get(`${BaseURL}/api/v1/getAllTask`, {
            params,        // এখানে params automatically ?createdBy=value&assignTo=value বানায়
            ...Headers     // Headers গুলো spread করে দিয়ে দিলাম
        });
        return response?.data?.data || [];
    } catch (e) {
        return [];
    }
}
export async function getTaskbyIdRequest(id) {
    try {
        const result = await axios.get(`${BaseURL}/api/v1/taskById?id=${id}`, Headers);
        const data = result.data.data;
        return data;
    } catch (e) {
        return false;
    }
}


// GET Notification 
export async function getNotificationRequest(users) {
    const params = {};
    if (users) {
        params.users = users;
    }
    try {
        let result = await axios.get(`${BaseURL}/api/v1/notification`, {
            params,
            ...Headers,
        });
        return result.data.data;
    }
    catch (e) {
        return [];
    }
}

// mark as read notification
export async function getMarkAsReadRequest(notificationId, userID) {
    try {
        let reqbody = { notificationId: notificationId, userId: userID }
        let result = await axios.post(`${BaseURL}/api/v1/markAsRead`, reqbody, Headers);
        return result.data.data;
    }
    catch (e) {
        return [];
    }
}


//  Delete Task
export async function DeleteTaskRequest(id) {
    try {
        let result = await axios.delete(BaseURL + '/api/v1/taskDelete/' + id, Headers);
        return result;
    }
    catch (e) {
        return false
    }
}
export async function UpdateTaskRequest(
    id,
    title,
    description,
    dueDate,
    priority,
    status,
    todoCheckList = [],
    attachments = [],
    assignTo = [],
    createdBy,
) {
    try {
        const reqBody = {
            id,
            title,
            description,
            dueDate,
            priority,
            status,
            todoCheckList,
            attachments,
            assignTo,
            createdBy,
        };
        const result = await axios.post(
            `${BaseURL}/api/v1/taskUpdate`,
            reqBody,
            Headers
        );

        return result.data;
    } catch (e) {
        return { status: "fail", message: e.response?.data?.message || "Failed to update task" };
    }
}
//  status update task
export async function StatusUpdateRequest(id, status) {
    try {
        let reqBody = { id: id, status: status };
        let result = await axios.post(BaseURL + '/api/v1/taskUpdate', reqBody, Headers);
        return result
    }
    catch (e) {
        return false
    }
}


//  User profile update

export async function UserProfileUpdateRequest(email, name, mobile, oldPassword, password, designation, photo) {
    try {
        let reqBody = { email: email, name: name, mobile: mobile, oldPassword: oldPassword, password: password, designation: designation, photo: photo }
        let UserDetails = { email: email, name: name, mobile: mobile, designation: designation, photo: photo }
        let result = await axios.post(BaseURL + '/api/v1/upadateProfile', reqBody, Headers);
        setUserDetails(UserDetails);
        return result
    }
    catch (e) {
        return false
    }
}

//  User profile details

export async function userDetailsRequest() {
    try {
        let result = await axios.get(BaseURL + '/api/v1/profileDetails', Headers);
        let data = result['data'];
        return data;
    }
    catch (e) {
        return false
    }
}


//  get Task 
export async function getUpdateTaskRequest(id) {
    try {
        let result = await axios.get(BaseURL + '/api/v1/getTask/' + id, Headers);
        let data = result['data']['data'];
        return data;
    } catch (e) {
        return false
    }
}

