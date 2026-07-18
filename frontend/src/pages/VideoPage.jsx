import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/api.js";
import CommentSection from "../components/CommentSection";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

function VideoPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [loading, setLoading] = useState(true);

  const getChannelId = (channel) =>
    typeof channel === "object" ? channel?._id : channel;

  useEffect(() => {
    const fetchVideoAndSuggestions = async () => {
      try {
        const videoRes = await API.get(`/videos/${id}`);
        const videoData = videoRes.data;

        setVideo(videoData);

        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
          setLiked(videoData.likedBy?.includes(user._id));
          setDisliked(videoData.dislikedBy?.includes(user._id));
        } else {
          setLiked(false);
          setDisliked(false);
        }

        const allVideosRes = await API.get("/videos");
        setVideos(allVideosRes.data || []);
      } catch (err) {
        console.error(err);
        alert("Failed to load video");
      } finally {
        setLoading(false);
      }
    };

    fetchVideoAndSuggestions();
  }, [id]);

  const handleLike = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (liked) return;

    try {
      const res = await API.put(`/videos/${id}/like`);
      setVideo(res.data);
      setLiked(true);
      setDisliked(false);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Like failed");
    }
  };

  const handleDislike = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (disliked) return;

    try {
      const res = await API.put(`/videos/${id}/dislike`);
      setVideo(res.data);
      setDisliked(true);
      setLiked(false);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Dislike failed");
    }
  };

  if (loading) return <h2>Loading...</h2>;

  if (!video) return <h2>Video not found</h2>;

  const suggestedVideos = videos.filter((v) => v._id !== id);

  return (
    <div className="watch-container">
      <div className="watch-left">
        <div className="video-wrapper">
          <video controls src={video.videoUrl}></video>
        </div>

        <h2 className="video-title">{video.title}</h2>

        <div className="channel-row">
          <div className="channel-left">
            <div className="channel-avatar">
              {video.channel?.channelName?.charAt(0) || "C"}
            </div>

            <div>
              <h4
                style={{ cursor: "pointer", color: "#3ea6ff" }}
                onClick={() =>
                  navigate(`/channels/${getChannelId(video.channel)}`)
                }
              >
                {video.channel?.channelName || "Unknown Channel"}
              </h4>

              <p>{video.views} views</p>
            </div>
          </div>

          <div className="action-buttons">
            <button
              className={`like-btn ${liked ? "active" : ""}`}
              onClick={handleLike}
            >
              <FaThumbsUp /> {video.likes}
            </button>

            <button
              className={`dislike-btn ${disliked ? "active" : ""}`}
              onClick={handleDislike}
            >
              <FaThumbsDown /> {video.dislikes}
            </button>

            <button className="subscribe-btn">
              Subscribe
            </button>
          </div>
        </div>

        <p className="video-desc">{video.description}</p>

        <hr />

        <CommentSection videoId={id} />
      </div>

      <div className="watch-right">
        {suggestedVideos.map((v) => (
          <div
            key={v._id}
            className="suggest-card"
            onClick={() => navigate(`/video/${v._id}`)}
            style={{ cursor: "pointer" }}
          >
            <img src={v.thumbnailUrl} alt={v.title} />

            <div className="suggest-info">
              <h4>{v.title}</h4>
              <p>{v.channel?.channelName || "Unknown Channel"}</p>
              <p>{v.views} views</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoPage;