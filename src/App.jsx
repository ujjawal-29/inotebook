
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Navewar from './components/Navewar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';

import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import { useState } from 'react';


function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });

    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <>
      <NoteState>
        <Router>
          <Navewar />
          <Alert alert={alert} />

          <div className="container">
            <Routes>

              {/* 🔐 Protected Home Route */}
              <Route 
                path="/" 
                element={
                  localStorage.getItem("token") 
                    ? <Home showAlert={showAlert} /> 
                    : <Navigate to="/login" />
                } 
              />

              {/* 🔓 Public Routes */}
              <Route path="/login" element={<Login showAlert={showAlert} />} />
              <Route path="/signup" element={<Signup showAlert={showAlert} />} />

              

              
              <Route 
                path="/about" 
                element={
                  localStorage.getItem("token") 
                    ? <About /> 
                    : <Navigate to="/login" />
                } 
              />

            </Routes>
          </div>

        </Router>
      </NoteState>
    </>
  );
}

export default App;



