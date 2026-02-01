// React Router hook used to programmatically navigate between routes
import { useNavigate } from "react-router-dom";
// React hook for managing component state
import { useState } from "react";
// Axios instance used to make API requests
import API from "../api/api.js";
function Register()
{
     // Used to redirect user after successful registration
    const navigate = useNavigate();
     // Controls loading state while API request is in progress
    const [loading, setLoading] = useState(false);
     // Stores form input values
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });
    // Updates form state dynamically based on input name
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    // Regex: password must be at least 6 characters
    // and contain at least one special character
    const passwordRegex =/^(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?]).{6,}$/;
     // Handles form submission
    const handleRegister = async (e) => {
        e.preventDefault();
    // Validate password before sending request
    if (!passwordRegex.test(form.password)) {
        return alert(
        "Password must be at least 6 characters and contain 1 special character"
        );
    }
        try {
            setLoading(true);
            const res = await API.post("/auth/register", form);
            alert(res.data.message);
            // Redirect user to login page
            navigate("/login");
            } catch (err) {
             // Log error for debugging
            console.error(err);
            alert(err.response?.data?.message || "Registration failed");
           }
            finally {
                // Stop loading regardless of success or error
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