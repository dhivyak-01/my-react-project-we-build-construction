import React, { useEffect, useState } from 'react';

const callBackRequest = () => {
    const [callbacks, setCallbacks] = useState([]);
  
    useEffect(() => {
      const fetchCallbacks = async () => {
        const response = await fetch('http://localhost:5000/api/callbacks');
        const data = await response.json();
        setCallbacks(data);
      };
  
      fetchCallbacks();
    }, []);
  
    const handleToggleRead = async (id, isRead) => {
      const response = await fetch(`http://localhost:5000/api/callbacks/${id}/read`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isRead: !isRead }),
      });
  
      if (response.ok) {
        const updatedCallback = await response.json();
        setCallbacks((prev) =>
          prev.map((cb) => (cb._id === id ? updatedCallback : cb))
        );
      }
    };
  
    return (
      <div>
        <h1>Admin Panel</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Callback Date</th>
              <th>Callback Time</th>
              <th>Message</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {callbacks.map((callback) => (
              <tr key={callback._id}>
                <td>{callback.yourname}</td>
                <td>{callback.youremail}</td>
                <td>{callback.callbackdate}</td>
                <td>{callback.callbacktime}</td>
                <td>{callback.message}</td>
                <td>{callback.isRead ? 'Read' : 'Unread'}</td>
                <td>
                  <button onClick={() => handleToggleRead(callback._id, callback.isRead)}>
                    Mark as {callback.isRead ? 'Unread' : 'Read'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default callBackRequest;