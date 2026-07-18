import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";

const UploadVideo = () => {
  const { channelId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    videoUrl: "",
    thumbnailUrl: "",
    category: "",
  });

  const uploadVideo = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login again");
      return;
    }

    if (
      !form.title ||
      !form.description ||
      !form.videoUrl ||
      !form.thumbnailUrl ||
      !form.category
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/videos", {
        ...form,
        channelId,
      });

      console.log("UPLOAD RESPONSE:", res.data);

      alert("Video uploaded successfully");

      navigate(`/channels/${channelId}`);
    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      alert(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px", color: "white" }}>
      <h2>Upload Video</h2>

      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Video URL"
        value={form.videoUrl}
        onChange={(e) =>
          setForm({ ...form, videoUrl: e.target.value })
        }
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Thumbnail URL"
        value={form.thumbnailUrl}
        onChange={(e) =>
          setForm({
            ...form,
            thumbnailUrl: e.target.value,
          })
        }
      />

      <br />
      <br />

      <select
        value={form.category}
        onChange={(e) =>
          setForm({
            ...form,
            category: e.target.value,
          })
        }
      >
        <option value="">Select Category</option>
        <option value="Music">Music</option>
        <option value="Gaming">Gaming</option>
        <option value="Sports">Sports</option>
        <option value="Technology">Technology</option>
      </select>

      <br />
      <br />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({
            ...form,
            description: e.target.value,
          })
        }
      />

      <br />
      <br />

      <button
        onClick={uploadVideo}
        disabled={loading}
        style={{
          background: "red",
          color: "white",
          padding: "10px 20px",
          border: "none",
          cursor: "pointer",
        }}
      >
        {loading ? "Uploading..." : "Upload Video"}
      </button>
    </div>
  );
};

export default UploadVideo;