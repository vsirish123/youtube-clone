import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditVideo = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    description: "",
    videoUrl: "",
    thumbnailUrl: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);

  // ===============================
  // FETCH VIDEO DATA
  // ===============================
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5002/api/videos/${videoId}`
        );

        setForm({
          title: res.data.title || "",
          description: res.data.description || "",
          videoUrl: res.data.videoUrl || "",
          thumbnailUrl: res.data.thumbnailUrl || "",
          category: res.data.category || "",
        });
      } catch (error) {
        console.error("FETCH VIDEO ERROR:", error);
        alert("Failed to load video");
      }
    };

    fetchVideo();
  }, [videoId]);

  // ===============================
  // UPDATE VIDEO
  // ===============================
  const updateVideo = async () => {
    if (!form.category) {
      alert("Category is required");
      return;
    }

    try {
      setLoading(true);

      await axios.put(
        `http://localhost:5002/api/videos/${videoId}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Video updated successfully ");
      navigate(-1);
    } catch (error) {
      console.error("UPDATE VIDEO ERROR:", error);
      alert(
        error.response?.data?.message ||
          "Update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // UI
  // ===============================
  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Video</h2>

      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      <input
        placeholder="Video URL"
        value={form.videoUrl}
        onChange={(e) =>
          setForm({ ...form, videoUrl: e.target.value })
        }
      />

      <input
        placeholder="Thumbnail URL"
        value={form.thumbnailUrl}
        onChange={(e) =>
          setForm({ ...form, thumbnailUrl: e.target.value })
        }
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <select
        value={form.category}
        onChange={(e) =>
          setForm({ ...form, category: e.target.value })
        }
      >
        <option value="">Select category</option>
        <option value="Music">Music</option>
        <option value="Gaming">Gaming</option>
        <option value="Sports">Sports</option>
        <option value="Technology">Technology</option>
      </select>

      <br />

      <button
        onClick={updateVideo}
        disabled={loading}
      >
        {loading ? "Updating..." : "Update"}
      </button>
    </div>
  );
};

export default EditVideo;
