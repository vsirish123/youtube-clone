import { Route,Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import VideoPlayer from "./pages/VideoPlayer";
function App()
{
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/video/:id" element={<VideoPlayer />}/>
        </Routes>
    )
}
export default App;