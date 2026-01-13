import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import VideoCard from "../components/VideoCard";
import FilterBar from "../components/FilterBar";
import { sampleVideos } from "../utils/sampleVideos";
import { useState } from "react";

function Home()
{
    const [collapsed,setCollapsed]=useState(false);
    const [category,setCategory]=useState("All");
    const [searchText,setSearchText]=useState("");

    const categoryFiltered=category==="All"? sampleVideos:sampleVideos.filter((v)=>v.category===category);

    const finalVideos=categoryFiltered.filter((v)=>v.title.toLowerCase().includes(searchText.toLowerCase()));

    return (
        <>
            <Header toggleSidebar={()=>setCollapsed(!collapsed)} setSearchText={setSearchText}/>
            <Sidebar collapsed={collapsed}/>
            <div className={`main ${collapsed ? "main-collapsed":""}`}>
                <FilterBar setCategory={setCategory}/>
                <div className="video-grid">
                    {finalVideos.map((v)=>{
                        <VideoCard key={v.videoId} video={v}/>
                    })}
                </div>
            </div>
        </>
    )

}
export default Home;