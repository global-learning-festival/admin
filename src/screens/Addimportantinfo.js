import React, { useState } from 'react';
import axios from 'axios';

const AddImportantInformation = () => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = async () => {
    try {
      // Send a POST request to your API endpoint to add information
      const response = await axios.post('http://localhost:5000/importantInformation', {
        title,
        subtitle,
        description,
      });

      // Handle the response as needed
      console.log('Added Information:', response.data);

      // Reset the form fields after adding
      setTitle('');
      setSubtitle('');
      setDescription('');
    } catch (error) {
      console.error('Error adding information:', error);
      // Handle the error as needed
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Important Information</h1>

      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-600">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="subtitle" className="block text-sm font-medium text-gray-600">
          Subtitle
        </label>
        <input
          type="text"
          id="subtitle"
          name="subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-600">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        ></textarea>
      </div>

      <button
        onClick={handleAdd}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
      >
        Add Information
      </button>
    </div>
  );
};

export default AddImportantInformation;
