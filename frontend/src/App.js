import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/sidebar';
import { UPDATE_USER_DATA_URL, UPDATE_USER_FROM_BACKEND_URL } from './api';

function App() {

  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const handleEditClick = () => {
    setIsEditing(true);
    setFormData({
      firstName: selectedUser.firstName,
      lastName: selectedUser.lastName,
      age: selectedUser.age,
      gender: selectedUser.gender,
      email: selectedUser.email,
      phone: selectedUser.phone,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`${UPDATE_USER_FROM_BACKEND_URL + selectedUser.id}`, {     // For DummyJSON use UPDATE_USER_DATA_URL
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const updatedUser = await response.json();
      setSelectedUser(updatedUser);       // Update view with response data
      setIsEditing(false);                // Exit edit mode
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div>
      <Sidebar onSelectUser={setSelectedUser} selectedUser={selectedUser} />

      <div className='mainContent'>
        {selectedUser ? (
          <div className='userDetails'>
            {isEditing ? (
              <div className='editForm'>
                <div className='detailBlock'>
                  <label>Name: </label>
                  <input
                    type='text'
                    name='firstName'
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='detailBlock'>
                  <label>Surname: </label>
                  <input
                    type='text'
                    name='lastName'
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='detailBlock'>
                  <label>Age: </label>
                  <input
                    type='number'
                    name='age'
                    value={formData.age}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='detailBlock'>
                  <label>Gender: </label>
                  <input
                    type='text'
                    name='gender'
                    value={formData.gender}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='detailBlock'>
                  <label>Email: </label>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='detailBlock'>
                  <label>Phone: </label>
                  <input
                    type='text'
                    name='phone'
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <button onClick={handleSaveClick} id='saveBtn'>Save</button> <br></br>
                <button onClick={() => setIsEditing(false)} id='cancelBtn'>Cancel</button>
              </div>
            ) : (
              <>
              <div className='userDetails'>
                <div className='detailBlock'><p><strong>Name:</strong> {selectedUser.firstName}</p></div>
                <div className='detailBlock'><p><strong>Surname:</strong> {selectedUser.lastName}</p></div>
                <div className='detailBlock'><p><strong>User ID:</strong> {selectedUser.id}</p></div>
                <div className='detailBlock'><p><strong>Age:</strong> {selectedUser.age}</p></div>
                <div className='detailBlock'><p><strong>Gender:</strong> {selectedUser.gender}</p></div>
                <div className='detailBlock'><p><strong>Email:</strong> {selectedUser.email}</p></div>
                <div className='detailBlock'><p><strong>Phone:</strong> {selectedUser.phone}</p></div>
              </div>
              <button onClick={handleEditClick} id='editBtn'>Edit</button>
              </>
            )}
          </div>
        ) : (
          <p id='welomeText'>Select a user from the sidebar to see details.</p>
        )}
      </div>
    </div>
  );
}

export default App;
