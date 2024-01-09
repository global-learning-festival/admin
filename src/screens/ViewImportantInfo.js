import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPencilAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ImportantInfoCard = ({ infoid, title, subtitle, onClick  }) => {
  return (
    <div
      className='flex-1 block m-2 p-4 bg-white border border-gray-200 rounded-md shadow cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 relative'
      onClick={onClick}
    >
      <h5 className='mb-2 text-2xl font-bold tracking-tight text-black'>{title}</h5>
      <p className='text-xs text-gray-500'>{subtitle}</p>
      <FaPencilAlt className='absolute right-2 top-2 text-gray-500 cursor-pointer' />
      <a href={'editimportantinfo?infoid=' + infoid}/>
    </div>
  );
};



const ImportantInfoList = () => {
  const [importantInformation, setImportantInformation] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const navigate = useNavigate(); // Add this line

  useEffect(() => {
    const fetchImportantInformation = async () => {
      try {
        const response = await axios.get('http://localhost:5000/importantInformation');
        setImportantInformation(response.data);
        console.log("info", response.data)
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchImportantInformation();
  }, []);


  const handleEditInformationClick = (ImportantInfoCard) => {
    navigate(`/editimportantinfo/${ImportantInfoCard}`); 
    console.log('indidcheck', ImportantInfoCard.infoid)// Redirect to the specified route
  };

  const handleAddInformationClick = () => {
    navigate('/addimportantinfo'); // Redirect to the specified route
  };

  const rows = [];
  const cardsPerRow = 4;

  for (let i = 0; i < importantInformation.length; i += cardsPerRow) {
    const row = importantInformation.slice(i, i + cardsPerRow);
    rows.push(
      <div key={i / cardsPerRow} className='sm:flex sm:flex-wrap justify-center'>
        {row.map((info, index) => (
          
          <ImportantInfoCard key={index} {...info} onClick={()=>handleEditInformationClick(info.infoid)}  />
           
        

        )
        )
        }
      </div>
    );
  }

  return (
    <>
      <button
        className='bg-blue-500 text-white px-4 py-2 rounded-md mb-4 focus:outline-none'
        onClick={handleAddInformationClick}
      >
        Add Information
      </button>
      {rows}
      
    </>
  );
};

export default ImportantInfoList;
