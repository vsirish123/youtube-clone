import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
function Login()
{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return alert("All fields are required");
    }
    try {
      setLoading(true);
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
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
  };
}

    return (
        <div className="login-container">
            <div className="login-form">
                <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input type="email" placeholder="Email or phone" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <input type="password" placeholder="Enter your password " value={password} onChange={(e)=>setPassword(e.target.value)} />
                <button disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
                <button type="button" onClick={()=>navigate("/register")}>
                    Register
                </button>
                </form>

            </div>
        </div>
    )
}
export default Login;