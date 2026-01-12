import { AiFillHome,AiOutlineClockCircle,AiOutlineLike,AiShorts } from "react-icons/ai";
import { MdSubscriptions} from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
function Sidebar(){
    return (
        <div>
            <div className="sidebar-item">
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