import React, { useState } from 'react';

const AddProgramPage = () => {
  const [title, setTitle] = useState('');
  const [keynoteSpeaker, setKeynoteSpeaker] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [surveyLink, setSurveyLink] = useState('');
  const [image, setImage] = useState(null);
  const [eventTime, setEventTime] = useState('');
  const [eventDate, setEventDate] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleAddEvent = () => {
    // Handle adding event logic here
    console.log({
      title,
      keynoteSpeaker,
      description,
      location,
      surveyLink,
      image,
      eventTime,
      eventDate,
    });
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Add Program</h1>
      <form>
        <div className="mb-4">
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
          <label htmlFor="keynoteSpeaker" className="block text-sm font-medium text-gray-600">
            Keynote Speaker
          </label>
          <input
            type="text"
            id="keynoteSpeaker"
            className="mt-1 p-2 w-full border rounded-md"
            value={keynoteSpeaker}
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
          <label htmlFor="location" className="block text-sm font-medium text-gray-600">
            Location
          </label>
          <select
            id="location"
            className="mt-1 p-2 w-full border rounded-md"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">Select Location</option>
            <option value="location1">Location 1</option>
            <option value="location2">Location 2</option>
            {/* Add more locations as needed */}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="surveyLink" className="block text-sm font-medium text-gray-600">
            Survey Link
          </label>
          <input
            type="text"
            id="surveyLink"
            className="mt-1 p-2 w-full border rounded-md"
            value={surveyLink}
            onChange={(e) => setSurveyLink(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-600">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            className="mt-1 p-2 w-full border rounded-md"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="eventTime" className="block text-sm font-medium text-gray-600">
            Event Time
          </label>
          <input
            type="time"
            id="eventTime"
            className="mt-1 p-2 w-full border rounded-md"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
          />
        </div>

        <div className="mb-4">
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
        </div>

        <button
          type="button"
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
          onClick={handleAddEvent}
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddProgramPage;
