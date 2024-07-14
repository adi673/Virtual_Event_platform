import React, { useState, useEffect } from 'react';
import axios from 'axios';

// const Profile = ({ token }) => {
//   const [profile, setProfile] = useState({});

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/profile', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setProfile(response.data);
//       } catch (error) {
//         console.error(error.response.data);
//       }
//     };
//     fetchProfile();
//   }, [token]);

//   const handleUpdateProfile = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.put('http://localhost:3000/api/profile', profile, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setProfile(response.data);
//     } catch (error) {
//       console.error(error.response.data);
//     }
//   };

//   return (
//     <div>
//       <h2>Profile</h2>
//       <form onSubmit={handleUpdateProfile}>
//         <div>
//           <label>Email:</label>
//           <input type="email" value={profile.email || ''} disabled />
//         </div>
//         <div>
//           <label>Username:</label>
//           <input type="text" value={profile.username || ''} onChange={(e) => setProfile({ ...profile, username: e.target.value })} />
//         </div>
//         <div>
//           <label>Bio:</label>
//           <textarea value={profile.bio || ''} onChange={(e) => setProfile({ ...profile, bio: e.target.value })}></textarea>
//         </div>
//         <button type="submit">Update Profile</button>
//       </form>
//     </div>
//   );
// };

// export default Profile;




export default function Profile() {
  return (
    <div>
      <h3>Profile</h3>
    </div>
  )
}
