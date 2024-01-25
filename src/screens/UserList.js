import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [filter, setFilter] = useState('All'); // 'all', 'admin', 'event-manager', 'user'
  const navigate = useNavigate();

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
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data);

        const rolesResponse = await axios.get('http://localhost:5000/roles');
        const usersResponse = await axios.get('http://localhost:5000/users');

        console.log('Roles data:', rolesResponse.data);
        console.log('Users data:', usersResponse.data);

        setRoles(rolesResponse.data);
        setUsers(usersResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const getTypeCount = (type) => {
    if (type === 'All') {
      return roles.length + users.length;
    }

    return (
      roles.filter((role) => role.type === type).length +
      users.filter((user) => user.type === type).length
    );
  };

  const filterOptions = ['All', 'Admin', 'Event Manager', 'User'];

  const combinedData = [...roles, ...users];

  return (
    <div className="flex flex-col items-center mt-8">

      {/* Filter Buttons */}
      <div className="flex space-x-4">
        {filterOptions.map((option, index) => (
          <React.Fragment key={option}>
            <span
              className={`cursor-pointer ${
                filter === option ? 'text-blue-500 font-bold' : ''
              }`}
              onClick={() => handleFilterChange(option)}
            >
              {option} ({getTypeCount(option)})
            </span>
            {index !== filterOptions.length - 1 && (
              <span className="border-r mx-2 h-5 border-gray-300"></span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Combined User and Role Table */}
      <table className="w-full max-w-md bg-white border border-gray-300 shadow-md mt-4">
        <thead>
          <tr>
            <th className="p-2 text-center">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Username</span>
            </th>
            <th className="p-2 text-center">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Type</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {combinedData
            .filter((data) => filter === 'All' || data.type === filter)
            .map((data, index) => (
              <tr
                key={data.userId || data.roleId}
                className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
              >
                <td className="p-2 text-center">
                  {data.username || `${data.first_name || 'N/A'} ${data.last_name || 'N/A'}`}
                </td>
                <td className="p-2 text-center">{data.type || 'N/A'}</td>
              </tr>
            ))}
        </tbody>
      </table>
            {/* Add Manager Button */}
            <Link to="/addmanager">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md my-2">
          Add Manager
        </button>
      </Link>
    </div>
  );
};

export default UserList;
