import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";

const ChannelPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const res = await API.get(`/channels/${id}`);

        setChannel(res.data.channel);
        setVideos(res.data.videos);
      } catch (err) {
        console.error("Channel fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChannel();
  }, [id]);

  if (loading) {
    return <p className="channel-loading">Loading...</p>;
  }

  if (!channel) {
    return <p className="channel-loading">Channel not found</p>;
  }

  const isOwner =
    user &&
    String(channel.owner?._id || channel.owner) === String(user._id);

  const deleteVideo = async (videoId) => {
    try {
      await API.delete(`/videos/${videoId}`);

      setVideos((prev) => prev.filter((video) => video._id !== videoId));

      alert("Video deleted successfully");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete video");
    }
  };

  return (
    <div className="channel-page">
      {/* Banner */}
      <div className="channel-banner">
        <img
          src={channel.channelBanner || "https://picsum.photos/1200/300"}
          alt="Channel Banner"
        />
      </div>

      {/* Channel Header */}
      <div className="channel-header">
        <div className="channel-avatar">
          {channel.channelName.charAt(0)}
        </div>

        <div className="channel-info">
          <h2>{channel.channelName}</h2>
          <p>{channel.description}</p>
        </div>

        {isOwner && (
          <button
            className="upload-btn"
            onClick={() => navigate(`/upload-video/${channel._id}`)}
          >
            Upload Video
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="channel-tabs">
        <button className="active">Videos</button>
      </div>

      {/* Videos */}
      <div className="channel-videos">
        {videos.length === 0 ? (
          <p>No videos uploaded yet.</p>
        ) : (
          videos.map((video) => (
            <div key={video._id} className="channel-video-card">
              <img
                src={video.thumbnailUrl || "https://picsum.photos/300/180"}
                alt={video.title}
                onClick={() => navigate(`/video/${video._id}`)}
              />

              <h4>{video.title}</h4>

              {isOwner && (
                <div className="video-actions">
                  <button
                    onClick={() => navigate(`/edit-video/${video._id}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="danger"
                    onClick={() => deleteVideo(video._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChannelPage;