import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

import { useAuth } from '../../Auth/AuthContext';
import logo from '../../Images/logo.jpg';
import './Login.css';
import ResetPassword from '../../Components/ResetPassword/ResetPassword';


axios.defaults.baseURL = 'http://localhost:5000/logistics';


const Login = ()=>{

    const {isAuthenticated, setIsAuthenticated, isLoading, setIsLoading} = useAuth();

    const [showResetModal, setShowResetModal] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();

        if(!username || !password){
            const errorMsg = 'Please enter username and password to login';
            setError(errorMsg);
            alert(error);
            return;
        }

        try{
            const response = await axios.post('/login',{username,password},
            { 
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
            // alert(response.data.message);
            if (response.status === 200) {
                 setIsAuthenticated(true); // This will now also set the cookie              
                    navigate('/home');
            }
            
        }catch(error){
            console.log('Full error object:', error); // Add this line
            if (error.response) {
                setError(error.response.data.message);
                alert(error.response.data.message);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
                alert('No response received from server. Please check your connection.');
            } else {
                // Something happened in setting up the request
                console.error('Error:', error.message);
                alert('An unexpected error occurred. Please try again.');
            }     
        }
    };
    
    return(
        <div className='login-container'>
            <div className='logo-container'>
                <img src={logo} alt='logo' className='logo1'/>
            </div>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <div className='form-control'>
                    <label htmlFor='username'>Username: </label>
                    <input 
                        type='text'
                        id='username'
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                        required
                    />    
                </div>
                <div className='form-control'>
                    <label htmlFor='password'>Password: </label>
                    <input 
                        type='password'
                        id='password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                    />    
                </div>

                <button className='login-button' type='submit'>Login</button>
            </form>

            <p>Don't have an account yet?{' '}
                <span
                    onClick={()=>navigate('/signup')}
                    style={{cursor:'pointer', color:'blue'}}
                >Signup</span>    
            </p>
            <p className='Reset-text'>
                <span 
                    onClick={() => setShowResetModal(true)}
                    style={{cursor:'pointer', color:'blue'}}
                >Reset Password</span>
            </p>

            {showResetModal && <ResetPassword onClose={() => setShowResetModal(false)} />}
        </div>
    );
};

export default Login;