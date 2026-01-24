import { useNavigate } from "react-router-dom";

function Login()
{
    const navigate=useNavigate();

    return (
        <div className="login-container">
            <div className="login-form">
                <p>Sign In</p>
                <input type="text" placeholder="Email or phone"/>
                <input type="text" placeholder="Enter your password " />
                <button onClick={()=>navigate("/")}>
                    Sign in
                </button>
            </div>
        </div>
    )
}
export default Login;