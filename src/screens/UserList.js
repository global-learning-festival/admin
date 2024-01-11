import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users'); // Adjust the endpoint accordingly
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []); 

  return (
    <>
      {/* Add Manager Button */}
      <Link to="/addmanager">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md m-2">
          Add Manager
        </button>
      </Link>
      {/* User List */}
      <div className='flex flex-wrap justify-center'>
        {users.map((user, index) => (
          <UserCard key={index} username={user.username} email={user.email} role={user.role} />
        ))}
      </div>
    </>
  );
};

const UserCard = ({ username, email, role }) => {
  return (
    <div className='flex-1 block m-2 max-w-sm p-4 md:p-6 bg-white border border-gray-200 rounded-md shadow cursor-pointer transition duration-300 ease-in-out transform hover:scale-105'>
      <h5 className='mb-2 text-xl md:text-2xl font-bold tracking-tight text-black'>{username}</h5>
      <p className='font-normal text-sm md:text-base text-gray-500 mb-4'>{email}</p>
      <div className='bg-teal-700 text-white rounded-full py-1 px-2 absolute bottom-2 right-2 h-6 md:h-8'>
        <p className='text-xs md:text-sm'>{role}</p>
      </div>
    </div>
  );
};

export default UserList;
