import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
function Login()
{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      "http://localhost:5002/api/auth/login",
      { email, password }
    );

    // STORE USER CORRECTLY
    localStorage.setItem("token", res.data.token);
    localStorage.setItem(
      "user",
      JSON.stringify({
        _id: res.data._id,
        name: res.data.name,   
        email: res.data.email,
      })
    );

    navigate("/");
  };

    return (
        <div className="login-container">
            <div className="login-form">
                <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input type="text" placeholder="Email or phone" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <input type="text" placeholder="Enter your password " value={password} onChange={(e)=>setPassword(e.target.value)} />
                <button type="submit">Login</button>
                <button type="button" onClick={()=>navigate("/register")}>
                    Register
                </button>
                </form>

            </div>
        </div>
    )
}
export default Login;