import { useParams } from "react-router-dom";
import { sampleVideos } from "../utils/sampleVideos";

function VideoPlayer()
{
    const {id}=useParams();
    const video=sampleVideos.find((v)=>v.videoId===id);
    return (
        <div style={{padding:50}}>
            <video width="100%" controls src={video.videoUrl}/>
            <h2>{video.title}</h2>
            <p>{video.description}</p>
        </div>
    )
}

export default VideoPlayer;