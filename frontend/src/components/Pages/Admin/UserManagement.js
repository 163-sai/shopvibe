import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { IconEdit, IconTrash } from '@tabler/icons-react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedUser, setEditedUser] = useState({ id: '', name: '', email: '' });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5001/api/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
      console.log('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditModalOpen = (user) => {
    setEditedUser(user);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setEditedUser({ id: '', name: '', email: '' });
    setShowEditModal(false);
  };

  const handleEditUser = async () => {
    try {
      await axios.put(`http://localhost:5001/api/users/${editedUser.id}`, {
        name: editedUser.name,
        email: editedUser.email,
      });
      setShowEditModal(false);
      console.log('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      <Table striped bordered hover style={{marginBottom:'50px'}}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>ContactNumber</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.contactNumber}</td>
              <td>
                <Button variant="danger" onClick={() => deleteUser(user.id)}><IconTrash /></Button>
                <Button variant="primary" onClick={() => handleEditModalOpen(user)}><IconEdit /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="editFormName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={editedUser.name}
              onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="editFormEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={editedUser.email}
              onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>Close</Button>
          <Button variant="primary" onClick={handleEditUser}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserManagement;
