import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const toggleUserSelection = (userId) => {
    setSelectedUsers((prevSelectedUsers) => {
      const isSelected = prevSelectedUsers.includes(userId);
      if (isSelected) {
        return prevSelectedUsers.filter((id) => id !== userId);
      } else {
        return [...prevSelectedUsers, userId];
      }
    });
  };

  const UserTableRow = ({ userId, username, type }) => (
    <tr>
      <td className="p-2 text-center">
        <input
          type="checkbox"
          checked={selectedUsers.includes(userId)}
          onChange={() => toggleUserSelection(userId)}
        />
      </td>
      <td className="p-2 text-center">{username}</td>
      <td className="p-2 text-center">{type}</td>
    </tr>
  );

  return (
    <div className="">
      {/* Add Manager Button */}
      <Link to="/addmanager">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md my-2">
          Add Manager
        </button>
      </Link>
      {/* User Table */}
      <div className="flex flex-col items-center">
      <table className="w-full max-w-md bg-white border border-gray-300 shadow-md mt-4">
        <thead>
          <tr>
            <th className="p-2 text-center">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Select</span>
            </th>
            <th className="p-2 text-center">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Username</span>
            </th>
            <th className="p-2 text-center">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Type</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <UserTableRow
              key={index}
              userId={user.userId}
              username={user.username}
              type={user.type}
            />
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default UserList;
