import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { FaSignOutAlt } from 'react-icons/fa';
import {useAuth} from '../../Auth/AuthContext';
import './Logout.css';

axios.defaults.baseURL = 'http://localhost:5000/logistics';

const Logout = ()=>{
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const { setIsAuthenticated } = useAuth();
    const navigate = useNavigate();


    const handleLogout= async()=>{
        try{
            setIsLoading(true);
            const response = await axios.post('/logout',{},{
                withCredentials:true
            });

            if(response.status === 200){
                setIsAuthenticated(false);
                navigate('/');
            }
        }catch(error){
            if(error.response){
                alert(error.response.data.message);
            }
            else{
                alert('An unexpected error occurred. Please try again.');;
            }
        }finally{
            setIsLoading(false);
            setShowConfirm(false);
        }
    };


    return(
        <div className='logout-wrapper'>
            <button
                className={`logout-btn ${isLoading ? 'loading' : ''}`}
                onClick= {()=>setShowConfirm(true)}
                disabled={isLoading}
            >
                <FaSignOutAlt className='logout-icon'/>
                <span>Logout</span>
            </button>

            {showConfirm && (
                <div className="logout-confirm-overlay">
                    <div className="logout-confirm-modal">
                        <h3>Confirm Logout</h3>
                        <p>Are you sure you want to logout?</p>
                        <div className="logout-confirm-buttons">
                            <button 
                                className="confirm-btn confirm-yes"
                                onClick={handleLogout}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Logging out...' : 'Yes, Logout'}
                            </button>
                            <button 
                                className="confirm-btn confirm-no"
                                onClick={() => setShowConfirm(false)}
                                disabled={isLoading}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Logout;


