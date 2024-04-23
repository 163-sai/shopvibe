import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

function ProfilePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    Address: '',
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    axios.get('http://localhost:5001/profile')
      .then(res => {
        console.log('API Response:', res.data); // Log the entire API response
        if (res.data && res.data.email) {
          setFormData(prevData => ({
            ...prevData,
            name: res.data.name,
            email: res.data.email,
            contactNumber: res.data.contactNumber,
            Address: res.data.Address,
          }));
        } else {
          console.error('Failed to fetch user data:', res.data);
        }
      })
      .catch(err => {
        console.error('Error fetching user data:', err);
      });
  };

  return (
    <Container>
      <h3>Edit Profile</h3>
      <Form>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formContactNumber">
          <Form.Label>Contact Number</Form.Label>
          <Form.Control
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={e => setFormData({ ...formData, contactNumber: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="Address"
            value={formData.Address}
            onChange={e => setFormData({ ...formData, Address: e.target.value })}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </Container>
  );
}

export default ProfilePage;
