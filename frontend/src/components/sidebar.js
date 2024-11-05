import React, { useEffect, useState } from 'react';
import { LIMIT_USERS_API_URL, USERS_FROM_BACKEND_URL } from "../api";
import './sidebar.css';

function Sidebar({ onSelectUser, selectedUser }) {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${USERS_FROM_BACKEND_URL}`)        // For the DummyJSON use LIMIT_USERS_API_URL
      .then((response) => response.json())
      .then((data) => setUsers(data.users))
      .catch((error) => console.error("Error fetching users", error));
  }, []);
  console.log(users);

  return (
    <div className='sidebar'>
      <img alt='Logo' className='logo' src='syyclopsLogo.png'></img>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <button onClick={() => onSelectUser(user)} className={`sidebar-button ${selectedUser?.id === user.id ? 'selected' : ''}`}>
              {user.firstName} {user.lastName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
