import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import SignUp from './Pages/SignUp/SignUp';
import Login from './Pages/Login/Login';
import HomePage from './Pages/HomePage/HomePage';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<HomePage/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
