import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import CloudinaryUploadWidget from "../components/CloudinaryUpload";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";

const EditProgram = () => {

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [image_banner, setImageBanner] = useState('');
  const [image, setImage] = useState(null);
  const [time_start, setTimeStart] = useState('');
  const [time_end, setTimeEnd] = useState('');
  const [location, setLocation] = useState('');
  const [keynote_speaker, setKeynoteSpeaker] = useState('');
  const [description, setDescription] = useState('');
  const [survey_link, setSurveyLink] = useState('');
  const [programData, setProgramData] = useState([]);
  const { eventid } = useParams();
  const [publicId, setPublicId] = useState('');
  const [cloudName] = useState('dxkozpx6g');
  const [uploadPreset] = useState('jcck4okm');

  const cld = new Cloudinary({
    cloud: {
      cloudName
    }
  });
  const uwConfig = {
    cloudName,
    uploadPreset,
    cropping: true,
    multiple: false,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/events/${eventid}`);
  
        // Check if the response data is an array and set programData accordingly
        if (Array.isArray(response.data)) {
          setProgramData(response.data);
        } else {
          // If the response data is not an array, wrap it in an array
          setProgramData([response.data]);
        }
  
        const data = response.data[0];
        console.log('Response Data:', data);
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
      }
    };
  
    fetchData();
  }, [eventid]);
  
  const myImage = cld.image(publicId);
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/events/${eventid}`, {
        title,
        publicId,
        time_start,
        time_end,
        location,
        keynote_speaker,
        description,
        survey_link,
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
      window.location.replace('/');
    }, 900);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/deleteevent/${eventid}`);
      console.log('API Response:', response.data);

      // Show success notification
      NotificationManager.success('Information deleted successfully');
    } catch (error) {
      console.error('Error deleting information:', error);
      // Show error notification
      NotificationManager.error('Error deleting information');
    }
    setTimeout(() => {
      window.location.replace('/');
    }, 900);
  };


  return (
    <div>
      {programData &&programData.map((programData, index) => (
        <div className="container mx-auto p-4" key={programData.id}>
          <div id="form" onSubmit={handleEdit}>
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
            <div>
              <label htmlFor="cloudinary" className="block text-sm font-medium text-gray-600">
                Cloudinary Upload
              </label>
              <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} />
              <div style={{ width: "400px" }}>
                <AdvancedImage
                  style={{ maxWidth: "100%" }}
                  cldImg={cld.image(publicId || programData.image_banner)}
                  plugins={[responsive(), placeholder()]}
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="timestamp" className="block text-sm font-medium text-gray-600">
                Choose Date and Time: Event Start
              </label>

              <input
                type="datetime-local"
                id="startTimestamp"
                name="startTimestamp"
                className="mt-1 p-2 w-full border rounded-md"
                value={time_start || programData.time_start}  
                placeholder={programData.time_start}
                onChange={(e) => setTimeStart(e.target.value)}
              />

            </div>


            <div className="mb-4">
              <label htmlFor="timestamp" className="block text-sm font-medium text-gray-600">
                Choose Date and Time: Event End
              </label>
              <input
                type="datetime-local"
                id="endTimestamp"
                name="endTimestamp"
                className="mt-1 p-2 w-full border rounded-md"
                value={time_end || programData.time_end}
                onChange={(e) => setTimeEnd(e.target.value)}


              />
            </div>

            {/* <div className="mb-4">
              <label htmlFor="eventDate" className="block text-sm font-medium text-gray-600">
                Event Date
              </label>
              <input
                type="date"
                id="eventDate"
                className="mt-1 p-2 w-full border rounded-md"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
      </div>*/}
            <div className="mb-4">
              <label htmlFor="location" className="block text-sm font-medium text-gray-600">
                Location
              </label>
              <input
                type="text"
                id="location"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder={programData.location}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >

              </input>
            </div>
            <div className="mb-4">
              <label htmlFor="keynoteSpeaker" className="block text-sm font-medium text-gray-600">
                Keynote Speaker
              </label>
              <input
                type="text"
                id="keynoteSpeaker"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder={programData.keynote_speaker}
                value={keynote_speaker}
                onChange={(e) => setKeynoteSpeaker(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-600">
                Description
              </label>
              <textarea
                id="description"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder={programData.description}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>



            <div className="mb-4">
              <label htmlFor="surveyLink" className="block text-sm font-medium text-gray-600">
                Survey Link
              </label>
              <input
                type="text"
                id="surveyLink"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder={programData.survey_link}
                value={survey_link}
                onChange={(e) => setSurveyLink(e.target.value)}
              />
            </div>




            <button
            onClick={handleEdit}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Edit Program
            </button>
          </div>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Delete Information
          </button>
          <NotificationContainer />
        </div>
      ))};
    </div>
  )
};

export default EditProgram;
