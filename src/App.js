import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import { Routes, Route } from 'react-router-dom';

//Importing Navbar
import Navbar from './components/Navbar';

//Importing Screens

import Home from './screens/Home'

import { AuthContextProvider } from './context/AuthContext';


class App extends React.Component {
  render() {
    return (
      <div className="body">
        <AuthContextProvider>
          <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              
            </Routes>
          </AuthContextProvider>
      </div>
    );
  }
}

export default App;
