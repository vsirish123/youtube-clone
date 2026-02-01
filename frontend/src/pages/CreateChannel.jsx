import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateChannel = () => {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const createChannel = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5002/api/channels/create",
        { channelName, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.setItem("myChannelId", res.data.channel._id);

      navigate(`/channels/${res.data.channel._id}`);
    } catch (error) {
      alert(error.response?.data?.message || "Create channel failed");
    }
  };

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h2>Create Channel</h2>

      <input
        placeholder="Channel name"
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={createChannel}>Create Channel</button>
    </div>
  );
};

export default CreateChannel;
