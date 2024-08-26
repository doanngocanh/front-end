import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [id, setID] =useState(''); 
  const apiUrl1 = 'https://879xdukmr4.execute-api.us-east-1.amazonaws.com/Prod/users/get'; // Thay đổi URL API của bạn
  const apiUrl2 = 'https://879xdukmr4.execute-api.us-east-1.amazonaws.com/Prod/users';
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${apiUrl1}`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCreateUser = async () => {
    try {
      await axios.post(`${apiUrl2}`, { id,name });
      setName('');
      fetchUsers(); // Refresh user list after creation
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div>
      <h1>User Management</h1>
      <div>
        <h2>Users List</h2>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              ID: {user.id}, Name: {user.name}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Create New User</h2>
        <input
          type="text"
          value={id}
          onChange={e => setID(e.target.value)}
          placeholder="Enter id"
        />
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter user name"
        />
        <button onClick={handleCreateUser}>Create User</button>
      </div>
    </div>
  );
}

export default App;
