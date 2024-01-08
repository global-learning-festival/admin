import React from 'react';
import Hero from "../images/Hero.png";
import Programme from "../images/Programme.png";
import '../styles/Home.css';

const data = [
  {
    image: Programme,
    title: 'ISATE Council Meeting 2',
    description: 'Another description for item 2.',
  },
  {
    image: Programme,
    title: 'ISATE Council Meeting 3',
    description: 'Description for item 3.',
  },
  {
    image: Programme,
    title: 'ISATE Council Meeting 4',
    description: 'Description for item 4.',
  },
  {
    image: Programme,
    title: 'ISATE Council Meeting 5',
    description: 'Description for item 5.',
  },
  
  
  // Add more objects as needed
];

const Home = () => {
  return (
    <>
      <div className="relative">
        <img
          className="w-full h-auto brightness-50"
          src={Hero}
          alt="Hero"
        />
       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white xl:text-3xl md:text-xl" id="title-font" >
  INTERNATIONAL LEARNING FESTIVAL
</div>


      </div>

      <div className="flex flex-wrap justify-center">
        <div className="w-65 mt-8">
          <div className='flex flex-wrap '  style={{ marginLeft: '200px' }}>
            {data.map((item, index) => (
              <div key={index} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 my-3 mx-3">
                <div className="bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                  <img className="rounded-t-lg object-cover w-full h-28" src={item.image} alt="" />
                  <div className="p-3">
                    <h5 className="text-lg font-bold text-black">{item.title}</h5>
                    <p className="font-normal text-gray-700 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;






