import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      // Send a POST request to your authentication endpoint
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });

      // Assuming your server responds with a token upon successful login
      const token = response.data.token;

      // Here you can handle the token, for example, store it in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);

      console.log('Logged in successfully');

      // Reset the form fields after login
      setUsername('');
      setPassword('');
      navigate('/')
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div>
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-600">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 p-3 border border-gray-300 rounded-full w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-3 border border-gray-300 rounded-full w-full"
          />
        </div>

        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 focus:outline-none"
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default AdminLoginScreen;
