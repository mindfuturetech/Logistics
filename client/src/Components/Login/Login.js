import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import logo from '../../Images/logo.jpg';
import '../Login/Login.css';


axios.defaults.baseURL = 'http://localhost:5000/logistics';


const Login = ()=>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();

        if(!username || !password){
            setError('Please enter username and password to login');
            alert(setError);
            return;
        }

        try{
            const response = await axios.post('/login',{username,password},{
                withCredentials: true
            });
            alert(response.data.message);
            
        }catch(error){
            alert(error.response.data.message);
        }
    };
    
    return(
        <div className='login-container'>
            <div className='logo-container'>
                <img src={logo} alt='logo' className='logo'/>
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
                    style={{cursor:'pointer', color:'blue', textDecoration:'underline'}}
                >Signup</span>    
            </p>
        </div>
    );
};

export default Login;