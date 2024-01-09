import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import { Routes, Route } from 'react-router-dom';

//Importing Navbar
import Navbar from './components/Navbar';

//Importing Screens

import Home from './screens/Home'
import AddImportantInfo from './screens/Addimportantinfo';
import EditImportantInfo from './screens/EditImportantinfo';
import AddManager from './screens/AddManager';
import LogIn from './screens/Login';
import ImportantInfo from './screens/ViewImportantInfo';
import { AuthContextProvider } from './context/AuthContext';


class App extends React.Component {
  render() {
    return (
      <div className="body">
        <AuthContextProvider>
          <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/viewimportantinfo" element={<ImportantInfo />} />s
              <Route path="/addimportantinfo" element={<AddImportantInfo />} />
              <Route path="/editimportantinfo" element={<EditImportantInfo />} /> 
              <Route path="/addmanager" element={<AddManager />} />   
              <Route path="/login" element={<LogIn />} /> 
            </Routes>
          </AuthContextProvider>
      </div>
    );
  }
}

export default App;
