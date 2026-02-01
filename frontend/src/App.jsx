import { Route,Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import VideoPage from "./pages/VideoPage";
import UploadVideo from "./pages/UploadVideo";
import ChannelPage from "./pages/ChannelPage";
import CreateChannel from "./pages/CreateChannel"
import EditVideo from "./pages/EditVideo"
import Layout from "./layout/Layout";
function App()
{
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/video/:id" element={<VideoPage />} />
                <Route path="/channels/:id" element={<ChannelPage />} />
                <Route path="/upload-video/:channelId" element={<UploadVideo />} />
                <Route path="/edit-video/:videoId" element={<EditVideo />} />
                <Route path="/create-channel" element={<CreateChannel />} />
            </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
        </Routes>
    )
}
export default App;