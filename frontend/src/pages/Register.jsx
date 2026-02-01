import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/api.js";
function Register()
{
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const passwordRegex =/^(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?]).{6,}$/;
    const handleRegister = async (e) => {
        e.preventDefault();
    if (!passwordRegex.test(form.password)) {
        return alert(
        "Password must be at least 6 characters and contain 1 special character"
        );
    }
        try {
            setLoading(true);
            const res = await API.post("/auth/register", form);
            alert(res.data.message);
            navigate("/login");
            } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Registration failed");
           }
            finally {
        setLoading(false);
    }
    };
    return(
        <div className="register-container">
            <form className="register-form" onSubmit={handleRegister}>
                <p>create an account</p>
                <input type="text" name="username" placeholder="username" value={form.username} onChange={handleChange}/>
                <input type="email" name="email" placeholder="Email or phone" value={form.email} onChange={handleChange}/>
                <input type="password" name="password" placeholder="Password (min 6 chars + 1 special)" value={form.password} onChange={handleChange} />
                <button disabled={loading}>
                {loading ? "Registering..." : "Register"}
                </button>
                <p> 
                    Already have an account?{" "}
                    <span style={{color:"blue",cursor:"pointer"}} onClick={()=>navigate("/login")}>Login</span>
                </p>
            </form>
        </div>
    )
}
export default Register;