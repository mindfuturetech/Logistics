import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import SignUp from './Pages/SignUp/SignUp';
import Login from './Pages/Login/Login';

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
