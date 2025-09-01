// src/components/Login.js
import React, { useEffect, useState } from "react";
import './Login.css';
import { useNavigate } from "react-router-dom";
import { JSEncrypt } from 'jsencrypt';
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify'; // Importing Toastify components
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import logo from '../ey.png'
import axios from "axios";
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [responseData, setResponseData] = useState([]);
    const [config, setConfig] = useState("");
    const navigate = useNavigate();
    const publicKey = config.publicKey;

    useEffect(() => {
        fetch('./config.json')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setConfig(data);
            })
            .catch((error) => console.error('Error loading config:', error));
    }, []);

    const validateCredentials = async (e) => {
    e.preventDefault();

    if (!config || !publicKey) {
        toast.error("Configuration not loaded yet. Please try again.");
        return;
    }

    if (username && password) {
        const encrypt = new JSEncrypt();
        encrypt.setPublicKey(publicKey);

        const encryptedEmail = encrypt.encrypt(username);
        const encryptedPassword = encrypt.encrypt(password);

        if (!encryptedEmail || !encryptedPassword) {
            toast.error("Encryption failed. Please try again.");
            return;
        }

        try {
            const response = await axios.post(config.apiUrl, {
                encryptedEmail: encryptedEmail,
                encryptedPassword: encryptedPassword,
                serviceName: "authenticate",
                authId: "result"
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            console.log("Login Response:", response.data);

            if (response.data.token) {
                localStorage.setItem("jwtToken", response.data.token);
                navigate('/RunScript');
            } else {
                toast.warn(response.data.message || "Invalid credentials");
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error('Login failed. Server rejected the request.');
        }
    } else {
        toast.warn('Username and password are required');
    }
};
    
    return (
        <div className="flex items-center justify-center min-h-dvh background" >
            <div className="screen">
                <div className="screen__content ">
                    <form className="login" onSubmit={validateCredentials}>
                        <img src={logo} width='100px' className="t-2" />
                        <div className="login__field">
                            <i className="login__icon fas fa-user"></i>
                            <input type="text" className="login__input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="User name / Email" />
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-lock"></i>
                            <input type="password" className="login__input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                        </div>
                        <button type="submit" className="button login__submit" >
                            <div className="button__text">Log In Now</div>
                        </button>
                    </form>
                </div>
                <div className="screen__background overflow-hidden">
                    <span className="screen__background__shape screen__background__shape4"></span>
                    <span className="screen__background__shape screen__background__shape3"></span>
                    <span className="screen__background__shape screen__background__shape2"></span>
                    <span className="screen__background__shape screen__background__shape1"></span>
                </div>
            </div>
            <ToastContainer />
        </div >
    )
}

export default Login;