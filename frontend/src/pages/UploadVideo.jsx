import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UploadVideo = () => {
  const { channelId } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    description: "",
    videoUrl: "",
    thumbnailUrl: "",
    category: "", // ADDED
  });

  const uploadVideo = async () => {
    if (!token) {
      alert("Please login again");
      return;
    }

    //  Frontend validation
    if (
      !form.title ||
      !form.videoUrl ||
      !form.thumbnailUrl ||
      !form.category
    ) {
      alert("All fields including category are required");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5002/api/videos",
        {
          ...form,      // includes category
          channelId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("UPLOAD RESPONSE:", res.data);
      navigate(`/channels/${channelId}`);
    } catch (err) {
      console.error("UPLOAD ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div style={{ padding: "30px", color: "white" }}>
      <h2>Upload Video</h2>

      <input
        placeholder="Title"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <input
        placeholder="Video URL"
        onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
      />

      <input
        placeholder="Thumbnail URL"
        onChange={(e) =>
          setForm({ ...form, thumbnailUrl: e.target.value })
        }
      />

      {/* CATEGORY DROPDOWN */}
      <select
        value={form.category}
        onChange={(e) =>
          setForm({ ...form, category: e.target.value })
        }
      >
        <option value="">Select Category</option>
        <option value="Music">Music</option>
        <option value="Gaming">Gaming</option>
        <option value="Sports">Sports</option>
        <option value="Technology">Technology</option>
      </select>

      <textarea
        placeholder="Description"
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <button
        style={{
          marginTop: "10px",
          background: "red",
          color: "white",
          padding: "10px",
          border: "none",
          cursor: "pointer",
        }}
        onClick={uploadVideo}
      >
        Upload
      </button>
    </div>
  );
};

export default UploadVideo;
