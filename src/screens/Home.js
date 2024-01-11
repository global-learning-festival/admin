import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Home = ({ title, description, event_posted }) => {
  // Function to limit words in a string
  const limitWords = (str, limit) => {
    const words = str.split(' ');
    return words.slice(0, limit).join(' ') + (words.length > limit ? '...' : '');
  };

  const limitedDescription = limitWords(description, 10);
  return (
    <div
      className='flex-1 block m-2 max-w-sm p-4 md:p-6 bg-white border border-gray-200 rounded-md shadow cursor-pointer transition duration-300 ease-in-out transform hover:scale-105'
    >
      <h5 className='mb-2 text-xl md:text-2xl font-bold tracking-tight text-black'>{title}</h5>
      <p className='font-normal text-sm md:text-base text-gray-500 mb-4'>{limitedDescription}</p>
      <div className='bg-teal-700 text-white rounded-full py-1 px-2 absolute bottom-2 right-2 h-6 md:h-8'>
        <p className='text-xs md:text-sm'>
          {event_posted}
        </p>
      </div>
    </div>
  );
};

const EventsList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []); 
  
  const rows = [];
  const cardsPerRow = 4;

  for (let i = 0; i < events.length; i += cardsPerRow) {
    const row = events.slice(i, i + cardsPerRow);
    rows.push(
      <div key={i / cardsPerRow} className='sm:flex sm:flex-wrap justify-center'>
        {row.map((events, index) => (
          <Home
            key={index}
            title={events.title}
            description={events.description}
            event_posted={events.time_start}
          />
        ))}
      </div>
    );
  }
  
  return (
    <>
      {/* Add Event Button */}
      <Link to="/addprogram">
        <button className="bg-green-500 text-white px-4 py-2 rounded-md m-2"
        >
          Add Event
          
        </button>
      </Link>
      {/* Events List */}
      {rows}
    </>
  );
};

export default EventsList;
