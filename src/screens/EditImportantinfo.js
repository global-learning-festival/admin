import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditImportantInformation = () => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [infodata, setInfodata] = useState([]);
  const { infoid } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/info/${infoid}`);
        setInfodata(response.data);
      } catch (error) {
        console.error('Error fetching information:', error);
      }
    };

    fetchData();
  }, [infoid]);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/importantinfo/${infoid}`, {
        title,
        subtitle,
        description,
      });
      console.log('API Response:', response.data);
    } catch (error) {
      console.error('Error updating information:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/delete/${infoid}`);
      console.log('API Response:', response.data);
    } catch (error) {
      console.error('Error deleting information:', error);
    }
  };

  return (
    <div>
      {infodata.map((infolist) => (
        <div className="container mx-auto p-4" key={infolist.id}>
          <h1 className="text-2xl font-bold mb-4">Edit Important Information</h1>
          <form onSubmit={handleEdit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-600">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder={infolist.title}
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
                placeholder={infolist.subtitle}
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
                placeholder={infolist.description}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Edit Information
            </button>
          </form>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Delete Information
          </button>
        </div>
      ))}
    </div>
  );
};

export default EditImportantInformation;
