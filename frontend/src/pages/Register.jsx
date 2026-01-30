import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/api.js";
function Register()
{
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
        console.log("Sending:", form);

        const res = await API.post("/auth/register", form);

        alert(res.data.message);
        navigate("/login");
        } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Registration failed");
        }
    };
    return(
        <div className="register-container">
            <form className="register-form" onSubmit={handleRegister}>
                <p>create an account</p>
                <input type="text" name="username" placeholder="username" value={form.username} onChange={handleChange}/>
                <input type="text" name="email" placeholder="Email or phone" value={form.email} onChange={handleChange}/>
                <input type="text" name="password" placeholder="Enter your password " value={form.password} onChange={handleChange} />
                <button type="submit">Register</button>
                <p> 
                    Already have an account?{" "}
                    <span style={{color:"blue",cursor:"pointer"}} onClick={()=>navigate("/login")}>Login</span>
                </p>
            </form>
        </div>
    )
}
export default Register;