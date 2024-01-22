import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import OdinLogo from '../assets/logo.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom'
const Login = () => {

    const [formState, setFormState] = useState({
        email: '',
        password: ''
    })
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        let { email, password } = formState;
         let emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/;
         let passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        //Form validation
        emailRegex.test(email) ? null : toast.error("Invalid email type")
        // passwordRegex.test(password) ? null : toast.error("Your password must be a minimum of eight characters, at least one letter, one number and one special character");
        password.length != 0 ? null : toast.error("Please enter your password");
        if (emailRegex.test(email) && password.length != 0) {
            axios.post('https://chatapp-backend-htbo.onrender.com/login',
                { 
                    email: email, 
                    password: password 
                })
                .then((res) => {
                    if (res.status === 200) {
                        toast.success("Logging in...")
                        setLoggedIn(true)
                        localStorage.setItem('token', res.data.token)
                   
                        navigate("/chatrooms")
                    }
                    else if (res.status === 401) {
                        toast.error(res.data.message);
                    }
                    else {
                        toast.error(`Unexpected status: ${res.status}`);
                    }
                    // setLoggedIn(true);
                    // toast.success("Logging in...");
                })
                .catch((error) => {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        toast.error(error.response.data.message);
                    } else if (error.request) {
                        // The request was made but no response was received
                        toast.error('No response received from the server');
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        toast.error(`Error: ${error.message}`);
                    }
                });


        }
    }

    return (
        <div className="container mx-auto">
            <ToastContainer />
            <div className="flex flex-row items-center gap-3">
                <Link to="/"><img src={OdinLogo} alt="Logo" /></Link>
                <h2 className="text font-bold text-xl" style={{ fontSize: '30px', fontFamily: 'Poppins' }}>
                    Odin Chat
                </h2>
            </div>
            <h1 className="text font-bold text-2xl m-4" style={{ fontSize: '30px', fontFamily: 'Poppins' }}>
                Login🚀
            </h1>
            <form className="flex flex-col items-center gap-[0.47rem]" action="" method="">
                <label htmlFor="email" className="text-left">
                    Email:
                </label>
                <input type="email"
                    name="email"
                    id="email"
                    className="h-9 rounded outline-none px-3 w-2/4 text-slate-600 shadow-sm shadow-blue-400 mb-[2rem]"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })} />
                <label htmlFor="password" className="text-left">
                    Password:
                </label>
                <input type="password"
                    name="password"
                    id="password"
                    className="h-9 rounded outline-none px-3 w-2/4 text-slate-600 shadow-sm shadow-blue-400 mb-[2rem]"
                    value={formState.password}
                    onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })} />
                <input type="submit"
                    className="bg-blue-500 text-white rounded h-10 w-2/4 m-3 shadow-md shadow-slate-400"
                    value="Log In"
                    onClick={(e) => handleSubmit(e)} />
                <p className="m-2">Are you new? <Link to="/signup" className="hover:text-blue-400">Sign Up</Link></p>
               <Link className="hover:text-blue-400" to="#">Forgotten Password?</Link>
                <button className="flex flex-row items-center justify-center w-2/4 h-10 bg-gray-500 text-white p-3 focus:outline-none  gap-3 border-lg rounded shadow shadow-blue-500">
                    <FaGithub style={{ fontSize: '20px' }} />
                    Sign In With GitHub
                </button>
            </form>

        </div>
    );
};

export default Login;
