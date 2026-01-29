import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import VideoCard from "../components/VideoCard";
import FilterBar from "../components/FilterBar";
import API from "../api/api.js";
import { useState,useEffect } from "react";

function Home()
{
        const [collapsed, setCollapsed] = useState(false);
        const [category, setCategory] = useState("All");
        const [searchText, setSearchText] = useState("");
        const [videos, setVideos] = useState([]);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const fetchVideos = async () => {
            try {
                const res = await API.get("/videos");
                setVideos(res.data);
            } catch (err) {
                console.error("Fetch videos failed:", err);
            } finally {
                setLoading(false);
            }
            };

            fetchVideos();
        }, []);

        //FILTER BY TITLE USING FILTER BAR
        const titleFiltered =
            category === "All"
            ? videos
            : videos.filter((v) =>
                v.title.toLowerCase().includes(category.toLowerCase())
                );

        // SEARCH FILTER (ALSO TITLE BASED)
        const finalVideos = titleFiltered.filter((v) =>
            v.title.toLowerCase().includes(searchText.toLowerCase())
        );

        if (loading) return <h2>Loading...</h2>;

    return (
        <>
            <Header toggleSidebar={()=>setCollapsed(!collapsed)} setSearchText={setSearchText}/>
            <div className="app-body">
                <Sidebar collapsed={collapsed}/>
                <div className={`main ${collapsed ? "main-collapsed":""}`}>
                    <FilterBar setCategory={setCategory}/>
                    <div className="video-grid">
                        {finalVideos.map((v)=>(
                            <VideoCard key={v._id} video={v}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )

}
export default Home;