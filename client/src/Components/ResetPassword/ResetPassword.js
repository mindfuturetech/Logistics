import React, {useState} from 'react';
import axios from 'axios';
import './ResetPassword.css';

axios.defaults.baseURL = 'http://localhost:5000/logistics';

const ResetPassword = ({onClose}) => {
    const [username, setUsername] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();

      if(!username || !currentPassword || !newPassword || !retypePassword){
        alert('Please fill all fields');
        return;
      }

      try{
        const response = await axios.post('/reset-password',{username,currentPassword,newPassword,retypePassword});
        onClose();

        setTimeout(() => {
        alert(response.data.message);
        }, 500);

      }catch(error){
        alert(error.response.data.message);
      }
    }

  return (
    <div className= 'modal-overlay'>
        <div className='modal-content'>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="currentPassword">Current Password:</label>
                        <input
                            type="password"
                            id="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="newPassword">New Password:</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="retypePassword">Retype New Password:</label>
                        <input
                            type="password"
                            id="retypePassword"
                            value={retypePassword}
                            onChange={(e) => setRetypePassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="modal-buttons">
                        <button type="submit" className="reset-button" >Reset Password</button>
                        <button type="button" className="cancel-button" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>    
        </div>


    </div>
  )
}

export default ResetPassword

