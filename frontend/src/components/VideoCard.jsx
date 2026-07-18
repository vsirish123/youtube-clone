import { Link, useNavigate } from "react-router-dom";

function VideoCard({ video }) {
  const navigate = useNavigate();

  const channelId =
    typeof video.channel === "string"
      ? video.channel
      : video.channel?._id;

  return (
    <div className="video-card">
      {/* Thumbnail */}
      <Link to={`/video/${video._id}`}>
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="video-thumbnail"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/400x225/png?text=No+Thumbnail";
          }}
        />
      </Link>

      {/* Video Title */}
      <h4>{video.title}</h4>

      {/* Channel Name */}
      {channelId && (
        <p
          style={{ cursor: "pointer", color: "#aaa" }}
          onClick={() => navigate(`/channels/${channelId}`)}
        >
          {video.channel?.channelName || "Unknown Channel"}
        </p>
      )}
    </div>
  );
}

export default VideoCard;