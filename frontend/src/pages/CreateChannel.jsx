import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

const CreateChannel = () => {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const createChannel = async () => {
    if (!channelName.trim()) {
      return alert("Channel name is required");
    }

    try {
      setLoading(true);

      const res = await API.post("/channels/create", {
        channelName,
        description,
      });

      localStorage.setItem("myChannelId", res.data.channel._id);

      alert("Channel created successfully");

      navigate(`/channels/${res.data.channel._id}`);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Create channel failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h2>Create Channel</h2>

      <input
        type="text"
        placeholder="Channel Name"
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
      />

      <br />
      <br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br />
      <br />

      <button onClick={createChannel} disabled={loading}>
        {loading ? "Creating..." : "Create Channel"}
      </button>
    </div>
  );
};

export default CreateChannel;