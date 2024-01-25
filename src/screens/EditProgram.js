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
  const [titleError, setTitleError] = useState('');
  const [timeStartError, setTimeStartError] = useState('');
  const [timeEndError, setTimeEndError] = useState('');
  const [locationError, setLocationError] = useState('');
  const [keynoteSpeakerError, setKeynoteSpeakerError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

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
            if (response.data.message === "Unauthorized access") {
              localStorage.clear();
              window.location.replace("../login");
            }
          })
          .catch(function (response) {
            //Handle error
            console.dir(response);
          });

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
        setPublicId(data.image_banner || '');
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

  const handleImageUpload = (publicId) => {
    setPublicId(publicId);
  };

  const myImage = cld.image(publicId);

  const handleEdit = async () => {
    if (!validateInput()) {
      // If input is not valid, stop the function
      return;
    }
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

  const validateInput = () => {
    let isValid = true;

    if (title.trim() === '') {
      setTitleError('Please enter a title');
      isValid = false;
    } else {
      setTitleError('');
    }

    // (rest of your validation logic)

    return isValid;
  };

  return (
    <div>
      {programData && programData.map((programData, index) => (
        <div className="container mx-auto p-4" key={programData.id}>
          <div id="form" onSubmit={handleEdit}>
            {/* (rest of your form inputs) */}
          </div>
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Edit Program
          </button>
        </div>
      ))}
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
      >
        Delete Information
      </button>
      <NotificationContainer />
    </div>
  );
};

export default EditProgram;
