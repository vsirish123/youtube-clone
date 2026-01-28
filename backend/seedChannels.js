import mongoose from "mongoose";
import Channel from "./models/Channel.js";

const MONGO_URI = "mongodb://localhost:27017/users-data";

const channelsData = [
  {
    name: "Code with John",
    description: "High-quality coding tutorials and software engineering tips.",
    bannerSeed: "code"
  },
  {
    name: "Tech Explained",
    description: "Technology explained in simple terms.",
    bannerSeed: "tech"
  },
  {
    name: "React Mastery",
    description: "Master React, JavaScript, and frontend development.",
    bannerSeed: "react"
  },
  {
    name: "AI Simplified",
    description: "Artificial Intelligence, ML & future tech explained.",
    bannerSeed: "ai"
  },
  {
    name: "Design Sense",
    description: "UI/UX design tutorials and inspiration.",
    bannerSeed: "design"
  },
  {
    name: "Daily Vlogs",
    description: "Lifestyle, travel and daily experiences.",
    bannerSeed: "vlog"
  },
  {
    name: "Music Hub",
    description: "Original music, beats and playlists.",
    bannerSeed: "music"
  },
  {
    name: "Gaming World",
    description: "Gameplay, reviews and live streams.",
    bannerSeed: "gaming"
  },
  {
    name: "Finance Explained",
    description: "Money, investing and financial freedom.",
    bannerSeed: "finance"
  },
  {
    name: "Photography Pro",
    description: "Photography tutorials and camera gear reviews.",
    bannerSeed: "photo"
  }
];

const seedChannels = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    await Channel.deleteMany();

    const channels = channelsData.map((c, index) => ({
      _id: new mongoose.Types.ObjectId(
        `65a1000000000000000000${(index + 1).toString().padStart(2, "0")}`
      ),
      channelName: c.name,
      owner: new mongoose.Types.ObjectId(),
      description: c.description,
      channelBanner: `https://picsum.photos/seed/${c.bannerSeed}/1200/300`,
      subscribers: Math.floor(Math.random() * 500000),
    }));

    await Channel.insertMany(channels);
    console.log("✅ Channels seeded:", channels.length);
    process.exit(0);
  } catch (err) {
    console.error("❌ Channel seed error:", err);
    process.exit(1);
  }
};

seedChannels();
