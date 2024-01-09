import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ImportantInfoCard = ({ title, subtitle, onClick }) => {
  return (
      <div
        className='flex-1 block m-2 p-4 bg-white border border-gray-200 rounded-md shadow cursor-pointer transition duration-300 ease-in-out transform hover:scale-105'
        onClick={onClick}
      >
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-black'>{title}</h5>
        <p className='text-xs text-gray-500'>{subtitle}</p>
      </div>
  );
};

const PopupCard = ({ title, description, onClose }) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-6 border border-gray-200 rounded-md shadow'>
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-black'>{title}</h5>
        <p className='text-sm text-gray-500'>{description}</p>
        <button onClick={onClose} className='mt-4 bg-blue-500 text-white px-4 py-2 rounded-md'>
          Close
        </button>
      </div>
    </div>
  );
};

const ImportantInfoList = () => {
  const [importantInformation, setImportantInformation] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState(null);

  useEffect(() => {
    const fetchImportantInformation = async () => {
      try {
        const response = await axios.get('http://localhost:5000/importantInformation');
        setImportantInformation(response.data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchImportantInformation();
  }, []);

  const handleCardClick = (info) => {
    setSelectedInfo(info);
  };

  const handlePopupClose = () => {
    setSelectedInfo(null);
  };

  const rows = [];
  const cardsPerRow = 4;

  for (let i = 0; i < importantInformation.length; i += cardsPerRow) {
    const row = importantInformation.slice(i, i + cardsPerRow);
    rows.push(
      <div key={i / cardsPerRow} className='sm:flex sm:flex-wrap justify-center'>
        {row.map((info, index) => (
          <ImportantInfoCard key={index} {...info} onClick={() => handleCardClick(info)} />
        ))}
      </div>
    );
  }

  return (
    <>
      {rows}
      {selectedInfo && (
        <PopupCard {...selectedInfo} onClose={handlePopupClose} />
      )}
    </>
  );
};

export default ImportantInfoList;
