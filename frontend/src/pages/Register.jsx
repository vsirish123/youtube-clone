import { useNavigate } from "react-router-dom";

function Register()
{
    const navigate=useNavigate();
    return(
        <div className="register-container">
            <div className="register-form">
                <p>create an account</p>
                <input type="text" placeholder="username"/>
                <input type="text" placeholder="Email or phone"/>
                <input type="text" placeholder="Enter your password " />
                <button onClick={()=>navigate("/login")}>Register</button>
            </div>
        </div>
    )
}
export default Register;