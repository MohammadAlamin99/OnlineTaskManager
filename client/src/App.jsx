import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Dashboard/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { getToken } from "./Helper/SessionHelper";
import TaskPage from "./pages/TaskPage";
import CompletePage from "./pages/CompletePage";
import InProgressPage from "./pages/InProgressPage";
import TodoPage from "./pages/TodoPage";
import TeamTaskPage from "./pages/TeamTaskPage";
import ProfilePage from "./pages/ProfilePage";


function App() {
if(getToken()){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/task" element={<TaskPage/>} />
        <Route path="/complete" element={<CompletePage/>} />
        <Route path="/inprogress" element={<InProgressPage/>} />
        <Route path="/todo" element={<TodoPage/>} />
        <Route path="/teamTasks" element={<TeamTaskPage/>} />
        <Route path="/profile" element={<ProfilePage/>} />
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
