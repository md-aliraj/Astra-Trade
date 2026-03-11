
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/signup", { fullName, email, password });
            alert("Signup Successful! Please Login.");
            navigate("/login"); 
        } catch (err) {
            alert("Error: Email already registered!");
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
            <div style={{ width: "400px", padding: "40px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)", borderRadius: "8px", border: "1px solid #eee", textAlign: "center" }}>
                <h2>Signup</h2>
                <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
                    <input type="text" placeholder="Full Name" onChange={(e) => setFullName(e.target.value)} required style={inputStyle} />
                    <input type="email" placeholder="Email ID" onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required style={inputStyle} />
                    <button type="submit" style={btnStyle}>Create Account</button>
                </form>
                <p style={{ marginTop: "20px" }}>
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </div>
        </div>
    );
}

const inputStyle = { padding: "12px", border: "1px solid #ddd", borderRadius: "4px" };
const btnStyle = { padding: "14px", backgroundColor: "#387ed1", color: "white", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" };

export default Signup;