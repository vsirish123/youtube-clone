import mongoose from "mongoose";
import dotenv from "dotenv";
import Video from "./models/Video.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const categories = {
  Music: [
    "Top 10 Music Beats You Must Hear",
    "Relaxing Music for Coding & Study",
    "How This Song Was Made 🎵",
    "Best Lo-Fi Music Playlist 2026",
    "Music Theory Explained Simply",
  ],

  Gaming: [
    "I Played This Game for 24 Hours 🎮",
    "Top 5 Games You Should Play in 2026",
    "Gaming Setup Tour 🔥",
    "Can I Win Without Weapons?",
    "Pro Gamer Tips & Tricks",
  ],

  Sports: [
    "Top 10 Sports Moments of the Year",
    "This Match Changed Everything",
    "Training Like a Professional Athlete",
    "Sports Facts You Didn’t Know",
    "How Champions Are Made",
  ],

  Technology: [
    "React JS Full Course 2026",
    "Build a YouTube Clone with MERN",
    "AI Explained in 10 Minutes",
    "Top Tech Skills to Learn in 2026",
    "JavaScript Mistakes Beginners Make",
  ],
};

const seedVideos = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("✅ MongoDB Atlas Connected");

    // Delete existing videos
    await Video.deleteMany({});

    const videos = [];
    let seedCount = 1;

    // Existing channel IDs
    for (let channelIndex = 1; channelIndex <= 20; channelIndex++) {
      const channelId = new mongoose.Types.ObjectId(
        `65a1000000000000000000${channelIndex
          .toString()
          .padStart(2, "0")}`
      );

      for (const category in categories) {
        for (const title of categories[category]) {
          videos.push({
            title: `[${category}] ${title}`,

            description: `${title}

📌 Category: ${category}

Learn with practical examples and real-world concepts.

👍 Like • Share • Subscribe`,

            videoUrl:
              "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",

            thumbnailUrl: `https://picsum.photos/seed/${category}${seedCount}/400/225`,

            channel: channelId,

            category,

            likes: Math.floor(Math.random() * 5000),

            dislikes: Math.floor(Math.random() * 300),

            views: Math.floor(Math.random() * 500000),
          });

          seedCount++;
        }
      }
    }

    await Video.insertMany(videos);

    console.log(`✅ ${videos.length} Videos Seeded Successfully`);

    process.exit(0);
  } catch (err) {
    console.error("❌ Seed Error:", err);
    process.exit(1);
  }
};

seedVideos();