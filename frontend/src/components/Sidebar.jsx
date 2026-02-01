import { AiFillHome } from "react-icons/ai";
import { MdSubscriptions} from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function Sidebar({collapsed}){
    const navigate=useNavigate();
    return (
        <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
            <div className="sidebar-item" onClick={()=>navigate("/")}>
                <AiFillHome className="sidebar-icon"/>
                {!collapsed && <span className="sidebar-text">Home</span>}
            </div>
            <div className="sidebar-item">
                <MdSubscriptions className="sidebar-icon"/>
                {!collapsed && <span className="sidebar-text">subcriptions</span>}
            </div>
            <div className="sidebar-item">
                <FaClock className="sidebar-icon"/>
                {!collapsed && <span className="sidebar-text">History</span>}
            </div>
            <div className="sidebar-item">
                <FaUserCircle className="sidebar-icon"/>
                {!collapsed && <span className="sidebar-text">user</span>}
            </div>
        </div>
    )
}
export default Sidebar;