import { FaBars,FaSearch,FaMicrophone,FaChevronDown } from "react-icons/fa";
import { useNavigate,useLocation } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

function Header({ toggleSidebar, setSearchText }){
    const [text,setText]=useState("");
    const [showMenu, setShowMenu] = useState(false);
    const [channelId, setChannelId] = useState(
        localStorage.getItem("myChannelId")
    );

    const navigate = useNavigate();
    const location = useLocation();

    // SAFE USER PARSE
    let user = null;
    try {
        user = JSON.parse(localStorage.getItem("user"));
    } catch {
        user = null;
    }

    const token = localStorage.getItem("token");

    //  SAFE FIRST LETTER
    const userName =
        user?.name ||
        user?.username ||
        user?.email?.split("@")[0] ||
        "";

    const firstLetter = userName
        ? userName.charAt(0).toUpperCase()
        : "U";

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    // ===============================
    // FETCH LOGGED-IN USER CHANNEL
    // ===============================
    useEffect(() => {
        if (!token) return;

        axios
        .get("http://localhost:5002/api/channels/my-channel", {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
        const id = res.data.channel?._id;
        if (id) {
          localStorage.setItem("myChannelId", id);
          setChannelId(id);
        }
      })
      .catch(() => {
        localStorage.removeItem("myChannelId");
        setChannelId(null);
      });
  }, [token]);

    useEffect(() => {
        setChannelId(localStorage.getItem("myChannelId"));
    }, [location]);
    return (
        <div className="header">
            <div className="header-left">
                    <FaBars
                    size={22}
                    onClick={toggleSidebar}
                    style={{ cursor: "pointer" }}
                    />
            </div>
            <div className="search-box">
                <input value={text} placeholder="search" onChange={(e)=>{
                    setText(e.target.value);
                    setSearchText(e.target.value);
                }}
                />
                <button className="search-btn">
                    <FaSearch/>
                </button>
                <button className="mic-btn">
                    <FaMicrophone/>
                </button>
            </div>
            {/* RIGHT */}
            <div className="header-right">
                {user ? (
                <div className="user-section">
                    <div
                    className="user-info"
                    onClick={() => setShowMenu((p) => !p)}
                    >
                    {/* USER CIRCLE */}
                    <div className="user-circle">
                        {firstLetter}
                    </div>

                    <span>{userName}</span>
                    <FaChevronDown size={12} />
                    </div>

                    {showMenu && (
                    <div className="user-dropdown">
                        {!channelId && (
                        <button onClick={() => navigate("/create-channel")}>
                            Create Channel
                        </button>
                        )}

                        {channelId && (
                        <button onClick={() => navigate(`/channels/${channelId}`)}>
                            My Channel
                        </button>
                        )}

                        <button onClick={handleLogout}>Logout</button>
                    </div>
                    )}
                </div>
                ) : (
                <div onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
                    <div className="user-circle">U</div>
                </div>
                )}
            </div>
        </div>
        );

}
export default Header;