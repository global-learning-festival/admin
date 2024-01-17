import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

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

        // Check if the response data is an array and set infodata accordingly
        if (Array.isArray(response.data)) {
          setInfodata(response.data);
        } else {
          // If the response data is not an array, wrap it in an array
          setInfodata([response.data]);
        }

        const {title, subtitle, description } = response.data[0]; // Assuming the data is an array
        setTitle(title);
        setSubtitle(subtitle);
        setDescription(description);
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

      // Show success notification
      NotificationManager.success('Information updated successfully');
    } catch (error) {
      console.error('Error updating information:', error);
      // Show error notification

      NotificationManager.error('Error updating information');

    }
    setTimeout(() => {
      window.location.replace('/viewimportantinfo');
    }, 900);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/delete/${infoid}`);
      console.log('API Response:', response.data);

      // Show success notification
      NotificationManager.success('Information deleted successfully');
    } catch (error) {
      console.error('Error deleting information:', error);
      // Show error notification
      NotificationManager.error('Error deleting information');
    }
    setTimeout(() => {
      window.location.replace('/viewimportantinfo');
    }, 900);
  };


  return (
    <div>
      {infodata && infodata.map((infolist, index) => (
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
      <NotificationContainer />
    </div>
  );
};

export default EditImportantInformation;
