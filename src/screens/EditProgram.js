import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditProgram = () => {
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [image_banner, setImageBanner] = useState('');
  const [time_start, setTimeStart] = useState('');
  const [time_end, setTimeEnd] = useState('');
  const [location, setLocation] = useState('');
  const [keynote_speaker, setKeynoteSpeaker] = useState('');
  const [description, setDescription] = useState('');
  const [survey_link, setSurveyLink] = useState('');
  const [programData, setProgramData] = useState([]);
  const { eventid } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/events/${eventid}`);
        const data = response.data;
        console.log('Response Data:', response.data);
        setProgramData(data);
        setTitle(data.title);
        setImageBanner(data.image_banner);
        setTimeStart(data.time_start);
        setTimeEnd(data.time_end);
        setLocation(data.location);
        setKeynoteSpeaker(data.keynote_speaker);
        setDescription(data.description);
        setSurveyLink(data.survey_link);
      } catch (error) {
        console.error('Error fetching program information:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [eventid]);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/events/${eventid}`, {
        title,
        image_banner,
        time_start,
        time_end,
        location,
        keynote_speaker,
        description,
        survey_link,
      });
      console.log('API Response:', response.data);
    } catch (error) {
      console.error('Error updating program information:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Edit Program</h1>
        <form onSubmit={handleEdit}>
          {/* Title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-600">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder={programData.title}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          {/* Image Banner */}
          {/* ... (similar structure for other input fields) */}

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Edit Program
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProgram;
