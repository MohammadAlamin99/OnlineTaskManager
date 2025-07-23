import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Dashboard/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { getToken } from "./Helper/SessionHelper";
import TaskPage from "./pages/TaskPage";
import ProfilePage from "./pages/ProfilePage";
import MembersPage from "./pages/MembersPage";


function App() {
if(getToken()){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/task" element={<TaskPage/>} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/member" element={<MembersPage/>} />
      </Routes>
    </BrowserRouter>
  );
}
else{
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Navigate to="/login" replace/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
}

export default App;
