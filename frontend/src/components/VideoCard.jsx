import { Link } from "react-router-dom";

function VideoCard({video}){
    return (
        <Link to={`/video/${video.videoId}`} className="video-card">
            <img src={video.thumbnailUrl}/>
            <div className="video-info">
                <h4>{video.title}</h4>
                <p>{video.uploader}</p>
                <p>{video.views} views</p>
            </div>
        </Link>
    );
}
export default VideoCard;