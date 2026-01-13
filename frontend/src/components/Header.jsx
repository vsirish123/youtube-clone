import { FaBars,FaSearch,FaMicrophone,FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Header(){
    const [text,setText]=useState("");
    const navigate=useNavigate();
    return (
        <div className="header">
            <div className="header-left">
                <FaBars size={22}/>
            </div>
            <div className="search-box">
                <input value={text} placeholder="search" onChange={(e)=>{
                    setText(e.target.value);
                }}
                />
                <button className="search-btn">
                    <FaSearch/>
                </button>
                <button className="mic-btn">
                    <FaMicrophone/>
                </button>
            </div>

            <div className="sign-btn" onClick={()=>navigate("/login")} style={{cursor:"pointer"}}>
                <FaUserCircle size={28}/>
            </div>
        </div>
    )
}
export default Header;