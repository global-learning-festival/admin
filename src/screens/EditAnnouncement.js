import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import CloudinaryUploadWidget from "../components/CloudinaryUpload";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
const EditAnnouncement = () => {
  const [publicId, setPublicId] = useState("");
  // Replace with your own cloud name
  const [cloudName] = useState("dxkozpx6g");
  // Replace with your own upload preset
  const [uploadPreset] = useState("jcck4okm");
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [announcementData, setAnnouncementData] = useState([])
  const { announcementid } = useParams();
  const navigate = useNavigate();
  const cld = new Cloudinary({
    cloud: {
      cloudName
    }
  });

  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    cropping: true, //add a cropping step
    // showAdvancedOptions: true,  //add advanced options (public_id and tag)
    // sources: [ "local", "url"], // restrict the upload sources to URL and local files
    multiple: false,  //restrict upload to a single file
    // folder: "user_images", //upload files to the specified folder
    // tags: ["users", "profile"], //add the given tags to the uploaded files
    // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
    // clientAllowedFormats: ["images"], //restrict uploading to image files only
    // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
    // maxImageWidth: 500, //Scales the image down to a width of 2000 pixels before uploading
    // theme: "purple", //change to a purple theme
  });
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/announcements/${announcementid}`);
        setAnnouncementData(response.data)
        console.log(response.data)
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
        publicId
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
  <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} />

      {announcementData.map((announcementlist) => (
        <div className="container mx-auto p-4" key={announcementlist.announcementid} >
          <div style={{ width: "800px" }}>
            <AdvancedImage
            style={{ maxWidth: "100%" }}
            cldImg={cld.image(publicId || announcementlist.image)}
            plugins={[responsive(), placeholder()]}
            />
          </div>
          <h1 className="text-2xl font-bold mb-4">Edit Announcements</h1>
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
              Edit Announcement
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
