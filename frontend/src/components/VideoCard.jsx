import { Link,useNavigate } from "react-router-dom";

function VideoCard({video}){
    const navigate=useNavigate();
    const channelId=typeof video.channel==="string"?video.channel:video.channel?._id;
    return (
        <div className="video-card">
            <Link to={`/video/${video._id}`} className="video-card">
                <img src={video.thumbnailUrl} alt={video.title}/>
            </Link>     
            <h4>{video.title}</h4> 
            {channelId&&(
                <p onClick={()=>navigate(`/channels/${channelId}`)}>
                    {video.channel?.channelName}
                </p>
            )}     
        </div>

    );
}
export default VideoCard;