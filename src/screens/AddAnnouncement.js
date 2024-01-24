import { useState, useEffect } from "react";
import CloudinaryUploadWidget from "../components/CloudinaryUpload";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [publicId, setPublicId] = useState("");
  const [cloudName] = useState("dxkozpx6g");
  const [uploadPreset] = useState("jcck4okm");
  const [title, setTitle] = useState("");
  const [event, setEvent] = useState("");
  const [eventlist, setEventlist] = useState([]);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    cropping: true, //add a cropping step
    // showAdvancedOptions: true,  //add advanced options (public_id and tag)
    // sources: [ "local", "url"], // restrict the upload sources to URL and local files
    multiple: false, //restrict upload to a single file
    // folder: "user_images", //upload files to the specified folder
    // tags: ["users", "profile"], //add the given tags to the uploaded files
    // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
    // clientAllowedFormats: ["images"], //restrict uploading to image files only
    // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
    // maxImageWidth: 500, //Scales the image down to a width of 2000 pixels before uploading
    // theme: "purple", //change to a purple theme
  });

  // Create a Cloudinary instance and set your cloud name

  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  const myImage = cld.image(publicId);

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
            if (response.data.message == "Unauthorized access") {
              localStorage.clear();
              window.location.replace("../login");
            }
          })
          .catch(function (response) {
            //Handle error
            console.dir(response);
          });
        const response = await axios.get(
          "http://localhost:5000/eventsannouncement"
        );
        setEventlist(response.data);
        console.log("Event List", response.data);
      } catch (error) {
        console.error("Error fetching events", error);
      }
    };

    fetchData();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      console.log(publicId);
      const response = await axios.post(`http://localhost:5000/announcement`, {
        title,
        description,
        publicId,
        eventid: event,
      });
      console.log("API Response:", response.data);
      return navigate("/viewannouncements");
    } catch (error) {
      console.error("Error updating information:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} />
      <div style={{ maxWidth: "800px" }}>
        <AdvancedImage
          style={{ maxWidth: "100%" }}
          cldImg={myImage}
          plugins={[responsive(), placeholder()]}
        />
      </div>
      <form onSubmit={handleAdd}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-600"
          >
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
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600"
          >
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
        <div className="mb-4">
          <label
            htmlFor="eventlist"
            className="block text-sm font-medium text-gray-600"
          >
            Event list
          </label>
          <select
            id="eventlist"
            name="eventlist"
            value={event}
            onChange={(e) => setEvent(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          >
            {eventlist.map((eventlisting, index) => (
              <option key={index} value={eventlisting.eventid}>
                {eventlisting.title}
              </option>
            ))}
          </select>
        </div>
        <label
          htmlFor="imageupload"
          className="block text-sm font-medium text-gray-600"
        >
          Image
        </label>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Announcement
        </button>
      </form>
    </div>
  );
}
