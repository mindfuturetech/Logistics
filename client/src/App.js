import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import SignUp from './Components/SignUp/SignUp';
import Login from './Components/Login/Login';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/' element={<Login/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
