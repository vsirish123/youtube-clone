import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";

const EditVideo = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();

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
        const res = await API.get(`/videos/${videoId}`);

        setForm({
          title: res.data.title || "",
          description: res.data.description || "",
          videoUrl: res.data.videoUrl || "",
          thumbnailUrl: res.data.thumbnailUrl || "",
          category: res.data.category || "",
        });
      } catch (error) {
        console.error("FETCH VIDEO ERROR:", error);
        alert(error.response?.data?.message || "Failed to load video");
      }
    };

    fetchVideo();
  }, [videoId]);

  // ===============================
  // UPDATE VIDEO
  // ===============================
  const updateVideo = async () => {
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

      await API.put(`/videos/${videoId}`, form);

      alert("Video updated successfully");

      navigate(-1);
    } catch (error) {
      console.error("UPDATE VIDEO ERROR:", error);
      alert(error.response?.data?.message || "Update failed");
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
          setForm({ ...form, thumbnailUrl: e.target.value })
        }
      />

      <br />
      <br />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <br />
      <br />

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
      <br />

      <button
        onClick={updateVideo}
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Video"}
      </button>
    </div>
  );
};

export default EditVideo;