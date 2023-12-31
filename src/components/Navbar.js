import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu, AiOutlineInfoCircle } from 'react-icons/ai';
import isate from "../images/isate2024-logo.png"
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import '../styles/navbar.css'

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const {user, logout} = UserAuth();

  const handleSignOut = async () => {
    try {
      await logout();

    } catch (error) {
      console.log(error);
    }
  }

  return (
    
    <div className='bg-[#000] flex justify-between items-center h-20 mt-auto px-4 text-black z-10'>
        <div onClick={handleNav} className='block md:hidden'>
          {nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20} />}
        </div>
        <div className='md:hidden pt-2'>
            <Link to="/importantinfo"><AiOutlineInfoCircle className='text-black' size={25}/></Link>
        </div>

        


      <div className='hidden md:flex ml-10'>
        
          <h4 className='w-full font-bold text-[#000] mt-2 mr-3'>{ user?.displayName }</h4>
          { user ? (<button className='text-white bg-red font-medium rounded-md text-sm px-5 hover:bg-[#fff] hover:drop-shadow-xl' 
          onClick={handleSignOut}>Logout</button>) 
          : <button className='text-white bg-[#4B558A] font-medium rounded-md text-sm px-5 hover:bg-[#3A426C] hover:drop-shadow-xl'>
            <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Login</Link></button>}
    
      </div>

      <ul className='hidden md:flex mr-20 pt-3'>
        
        <li className='p-4'><Link to="/" className='no-underline text-white' onClick={handleNav}>Home</Link></li>
          <li className='p-4'><Link to="/addannouncements" className='no-underline text-white' onClick={handleNav}>Announcements</Link></li>
          <li className='p-4 '><Link to="/userlist" className='no-underline text-white' onClick={handleNav}>User List</Link></li>
          <li className='p-4'><Link to="/mapediting" className='no-underline text-white' onClick={handleNav}>Map Editing</Link></li>
          <li className='p-4'><Link to="/viewimportantinfo" className='no-underline text-white' onClick={handleNav}>Important Info</Link></li>
      </ul>
    </div>
  );
};

export default Navbar;