import { Route,Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import VideoPage from "./pages/VideoPage";
function App()
{
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/video/:id" element={<VideoPage />}/>
        </Routes>
    )
}
export default App;