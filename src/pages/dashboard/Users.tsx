import React, { useState, useEffect } from 'react';
import '../../styles/Dashboard.css';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      status: 'active',
      lastLogin: '2024-03-15 10:30'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Editor',
      status: 'active',
      lastLogin: '2024-03-14 15:45'
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'User',
      status: 'inactive',
      lastLogin: '2024-03-10 09:15'
    }
  ]);

  return (
    <div className="activities-table-container">
      <table className="activities-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Last Login</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <span className={`status-badge ${user.status}`}>
                  {user.status}
                </span>
              </td>
              <td>{user.lastLogin}</td>
              <td>
                <div className="action-buttons">
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users; 