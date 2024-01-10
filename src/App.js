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
<<<<<<< Updated upstream
=======
import AddProgram from './screens/AddProgram';
import EditProgram from './screens/EditProgram';
>>>>>>> Stashed changes
import LogIn from './screens/Login';
import ImportantInfo from './screens/ViewImportantInfo';
import AdminMap from './screens/mapedit';
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
<<<<<<< Updated upstream
=======
              <Route path="/addprogram" element={<AddProgram />} />
              <Route path="/editprogram" element={<EditProgram/>} />
              <Route path="/editprogram/:eventid" element={<EditProgram/>} />
>>>>>>> Stashed changes
              <Route path="/editimportantinfo" element={<EditImportantInfo />} />
              <Route path="/editimportantinfo/:infoid" element={<EditImportantInfo />} />  
              <Route path="/addmanager" element={<AddManager />} />   
              <Route path="/login" element={<LogIn />} /> 
              <Route path="/mapediting" element={<AdminMap />} /> 
            </Routes>
          </AuthContextProvider>
      </div>
    );
  }
}

export default App;
