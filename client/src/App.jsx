import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./assets/css/style.css";
import Home from "./components/Dashboard/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { getToken } from "./Helper/SessionHelper";
import TaskPage from "./pages/TaskPage";


function App() {
if(getToken()){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/task" element={<TaskPage/>} />
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
