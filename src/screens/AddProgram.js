import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import CloudinaryUploadWidget from "../components/CloudinaryUpload";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";


const AddProgramPage = () => {
  const [title, setTitle] = useState('');
  const [image_banner, setImage] = useState(null);
  const [time_start, setTimeStart] = useState('');
  const [time_end, setTimeEnd] = useState('');
  const [location, setLocation] = useState('');
  const [keynote_speaker, setKeynoteSpeaker] = useState('');
  const [description, setDescription] = useState('');
  const [survey_link, setSurveyLink] = useState('');
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
      let token = localStorage.getItem("token");

      await axios({
        headers: {
          authorization: "Bearer " + token,
        },
        method: "get",
        url: "http://localhost:5000/validateLogin",
      })
        .then(function (response) {
          console.log(response);
          if (response.data.message == "Unauthorized access") {
            localStorage.clear();
            window.location.replace("../login");
          }
        })
        .catch(function (response) {
          //Handle error
          console.dir(response);
        });
    };
    fetchData();
  });
  const handleImageUpload = (publicId) => {
    setPublicId(publicId);
  };
  
  const myImage = cld.image(publicId);
  const handleAddEvent = async () => {
    try {
      const response = await axios.post('http://localhost:5000/events', {
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
      NotificationManager.success('Important information added successfully');



      // Auto-refresh the page after a short delay (you can adjust the delay as needed)
      setTimeout(() => {
        window.location.replace('/');
      }, 600);
    } catch (error) {
      console.error('Error adding information:', error);
      // Show error notification
      NotificationManager.error('Error adding important information');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">

      <h1 className="text-2xl font-bold mb-4">Add Program</h1>
            
      
        <div id="form" className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-600">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="mt-1 p-2 w-full border rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
        <label htmlFor="cloudinary" className="block text-sm font-medium text-gray-600">
          Cloudinary Upload
        </label>
        <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} />
        <div style={{ width: "400px" }}>
                
                <AdvancedImage
                style={{ maxWidth: "100%" }}
                cldImg={cld.image(publicId || image_banner)}
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
            value={time_start}
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
            value={time_end}
            onChange={(e) => setTimeEnd(e.target.value)}


          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-600">
            Location
          </label>
          <input
            type="text"
            id="location"
            className="mt-1 p-2 w-full border rounded-md"
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
            value={survey_link}
            onChange={(e) => setSurveyLink(e.target.value)}
          />
        </div>

        <button
          type="button"
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
          onClick={handleAddEvent}
        >
          Add Event
        </button>
      
    </div>
  );
};

export default AddProgramPage;
