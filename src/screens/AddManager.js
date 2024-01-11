import React, { useState } from 'react';
import axios from 'axios';

const AddManagerScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');

  const handleAddManager = async () => {
    try {
      // Send a POST request to the API to add a new manager
      const response = await axios.post('http://localhost:5000/adduser', {
        username,
        password,
        type,
      });

      console.log('Added Manager:', response.data);

      // Reset the form fields after adding
      setUsername('');
      setPassword('');
      setType('');
    } catch (error) {
      console.error('Error adding manager:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Add Manager</h1>

      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium text-gray-600">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
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
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="type" className="block text-sm font-medium text-gray-600">
          Type
        </label>
        <select
          id="type"
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        >
          <option value="" disabled>Select a role</option>
          <option value="event-manager">Event Manager</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <button
        onClick={handleAddManager}
        className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
      >
        Add Manager
      </button>
    </div>
  );
};

export default AddManagerScreen;
