import React, { useState } from 'react';
import './Profile.css';
import image from './admin.jpg';

const tableData = [
    {
        image: image,
    },
];

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('John Doe');
  const [address, setAddress] = useState('123 Main Street');
  const [username, setUsername] = useState('johndoe123');
  const [phone, setPhone] = useState('555-555-5555');
  const [email, setEmail] = useState('johndoe@example.com');
//   const handleEdit = () => {
//     setIsEditing(!isEditing); // Mengganti status edit
//   };

//   const handleSave = () => {
//     setIsEditing(false);
//     // Di sini Anda dapat menambahkan logika untuk menyimpan perubahan ke server atau penyimpanan lokal.
//   };


  return (
    <div className="profile">
      <div className="profile-identity">
        {isEditing ? (
            
          <div className="identity-input">
            <div className="identity-item">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="identity-item">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="identity-item">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="identity-item">
              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="identity-item">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button>Save</button>
          </div>
        ) : (
            <div className="identity-input">
            <div className="profile-image">
                <img src={image} alt="admin" />
            </div>
            <div className="identity-item">
              <label htmlFor="name">Name:</label>
              <span className='spann'>{name}</span>
            </div>
            <div className="identity-item">
              <label htmlFor="address">Address:</label>
              <span className='spann'>{address}</span>
            </div>
            <div className="identity-item">
              <label htmlFor="username">Username:</label>
              <span className='spann'>{username}</span>
            </div>
            <div className="identity-item">
              <label htmlFor="phone">Phone:</label>
              <span className='spann'>{phone}</span>
            </div>
            <div className="identity-item">
              <label htmlFor="email">Email:</label>
              <span className='spann'>{email}</span>
            </div>
            <div className="profile-actions">
                <button>Edit</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
