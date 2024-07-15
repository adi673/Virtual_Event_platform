import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../hooks/AuthContext';
const Profile = () => {
  const [profile, setProfile] = useState({});
  const [editingProfile, setEditingProfile] = useState(false);
  const {token}=useContext(AuthContext)
  // console.log("got token",token)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("Statement 1")
        const response = await axios.get('http://localhost:3001/api/dashboard/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(response.data);
        console.log("Profile",response.data)
      } catch (error) {
        console.error(error.response.data);
      }
    };
    fetchProfile();
  }, [token]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    console.log("Statement 2")
    try {
      const response = await axios.put('http://localhost:3001/api/dashboard/profile', profile, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      <form onSubmit={handleUpdateProfile}>
        <div>
          <label>Username:</label>
          <input type="text" value={profile.username} onChange={(e) => setUsername(e.target.value)} disabled={!editingProfile} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={profile.email} disabled />
        </div>
        <div>
          <label>Profile Picture:</label>
          <input type="text" value={profile.profile_picture} onChange={(e) => setProfilePicture(e.target.value)} disabled={!editingProfile} />
        </div>
        <div>
          <label>Bio:</label>
          <textarea value={profile.bio} onChange={(e) => setBio(e.target.value)} disabled={!editingProfile}></textarea>
        </div>
        <div>
          <label>Social Links:</label>
          
        </div>
        <div>
          <label>Private Account:</label>
          <input type="checkbox" checked={profile.isPrivate} onChange={(e) => setIsPrivate(e.target.checked)} disabled={!editingProfile} />
        </div>
        {!editingProfile && (
          <button type="button" onClick={() => setEditingProfile(true)}>Edit Profile</button>
        )}
        {editingProfile && (
          <button type="submit">Save Changes</button>
        )}
      </form>
    </div>
  );
};

export default Profile;




