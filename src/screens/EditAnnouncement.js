import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditAnnouncement = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [announcementData, setAnnouncementData] = useState([])
  const { announcementid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/announcements/${announcementid}`);
        setAnnouncementData(response.data)
    } catch (error) {
        console.error('Error fetching information:', error);
      }
    };

    fetchData();
  }, [announcementid]);

    const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/announcements/${announcementid}`, {
        title,
        description,
      });
      console.log('API Response:', response.data);
      return navigate('/viewannouncements')
    } catch (error) {
      console.error('Error updating information:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/announcements/${announcementid}`);
      console.log('API Response:', response.data);
      return navigate('/viewannouncements')

    } catch (error) {
      console.error('Error deleting information:', error);
    }
  };

  return (
    <div>
      {announcementData.map((announcementlist) => (
        <div className="container mx-auto p-4" key={announcementlist.announcementid}>
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
                placeholder={announcementlist.title}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                placeholder={announcementlist.description}
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
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            onClick={handleDelete}

          >
            Delete Information
          </button>
        </div>
      ))}
    </div>
  );
};

export default EditAnnouncement;
