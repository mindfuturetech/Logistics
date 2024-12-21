import React from 'react';
import axios from 'axios';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import "./SignUp.css";

import logo from '../../Images/logo.jpg';

axios.defaults.baseURL = 'http://localhost:5000/logistics';       

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [profile, setProfile] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async(e)=>{
        e.preventDefault();

        if(!username || !profile){
            setError('Please select a valid profile and provide a username');
            alert(setError);
            return;
        }

        setError('');

        try{
        const response = await axios.post('/signup',{username,profile});
        alert(response.data.message);
        console.log(`Form submitted with ${username} and ${profile}`);

        navigate('/');
        }catch(error){
            alert(error.response.data.message);
        }

    };

  return (
    <div className='container'>
        <div className='logo-container'>
        <img src ={logo} alt ='logo' className='logo1'/>
        </div>

        <h2>Signup</h2>
        <form onSubmit = {handleSubmit}>
            <div className='form-control'>
               <label htmlFor='username'>Username:</label>
               <input 
                    type='text' 
                    id='username' 
                    name='username' 
                    value={username}
                    onChange={(e)=> setUsername(e.target.value)} 
                    required
                />    
            </div>

            <div className='form-control'>
                <label htmlFor='profile'>Profile:</label>
                <select 
                    id='profile'
                    name='profile'
                    value={profile}
                    onChange={(e)=> setProfile(e.target.value)}
                    required
                >
                    <option value=''>Select your profile</option>
                    <option value='loadingManager'>Loading Manager</option>    
                    <option value='admin'>Admin</option>
                    <option value='accountant'>Accountant</option>
                    <option value='unloadingManager'>Unloading Manager</option>

                </select>  

            </div>

            <button className='signup-button' type='submit'>Signup</button>

        </form>

            <p>Already have an account?{' '}
                <span
                    onClick={()=>navigate('/')}
                    style={{cursor:'pointer', color:'blue', textDecoration:'underline'}}
                >Login</span>    
            </p>
      
    </div>
  );
};

export default SignUp
