import { Route,Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import VideoPage from "./pages/VideoPage";
import UploadVideo from "./pages/UploadVideo";
import ChannelPage from "./pages/ChannelPage";
import CreateChannel from "./pages/CreateChannel"
import EditVideo from "./pages/EditVideo"
function App()
{
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/video/:id" element={<VideoPage/>}/>
            <Route path="/create-channel" element={<CreateChannel />}/>
            <Route path="/channels/:id" element={<ChannelPage />}/>
            <Route path="/upload-video/:channelId" element={<UploadVideo />}/>
            <Route path="/edit-video/:videoId" element={<EditVideo />}/>
        </Routes>
    )
}
export default App;