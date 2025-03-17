import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/api"; 

export const ProfileInfo = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          setError('User is not authenticated');
          setLoading(false);
          return;
        }
        const response = await axios.get(`${API_URL}/profile/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log('Profile data:', response.data); 
        setUserData(response.data);
      } catch (err) {
        console.error("Error fetching profile:", err.response || err.message);
        if (err.response && err.response.status === 401) {
          setError('Session expired. Please log in again.');
          localStorage.removeItem('access_token');
        } else {
          setError('Failed to fetch user details');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <p>Loading user details...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="profile-info">
      <h2>My Info</h2>
      <ul>
        <li><strong>Username:</strong> {userData?.username || 'Not provided'}</li>
        <li><strong>Email:</strong> {userData?.email || 'Not provided'}</li>
        <li><strong>First Name:</strong> {userData?.first_name || 'Not provided'}</li>
        <li><strong>Last Name:</strong> {userData?.last_name || 'Not provided'}</li>
        <li><strong>Phone:</strong> {userData?.phone_number || 'Not provided'}</li>
      </ul>
    </div>
  );
};
