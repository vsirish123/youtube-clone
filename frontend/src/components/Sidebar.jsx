import { AiFillHome,AiOutlineClockCircle,AiOutlineLike,AiShorts } from "react-icons/ai";
import { MdSubscriptions} from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function Sidebar(){
    const navigate=useNavigate();
    return (
        <div>
            <div className="sidebar-item" onClick={()=>navigate("/")}>
                <AiFillHome className="sidebar-icon"/>
            </div>
            <div className="sidebar-item">
                <MdSubscriptions className="sidebar-icon"/>
            </div>
            <div className="sidebar-item">
                <AiShorts className="sidebar-icon"/>
            </div>
            <div className="sidebar-item">
                <FaUserCircle className="sidebar-icon"/>
            </div>
        </div>

    )
}
export default Sidebar;