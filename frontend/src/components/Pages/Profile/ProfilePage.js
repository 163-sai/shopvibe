import React, { useState, useEffect, useRef  } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { SpeedDial } from 'primereact/speeddial';
import { Toast } from 'primereact/toast';

function ProfilePage() {
  const toast = useRef(null);

  const items = [
    {
      label: 'Update',
      icon: 'pi pi-refresh',
      command: () => {
          toast.current.show({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
      }
  },
  {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: () => {
          toast.current.show({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
      }
  },
  ]
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    dob: '',
    mobile: '',
    address: '',
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    axios.get('http://localhost:5001/profile')
      .then(res => {
        setFormData(res.data); // Assuming the API response structure matches the formData state
      })
      .catch(err => {
        console.error(err);
        // Handle error state here
      });
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    // Handle saving data to backend or perform validation if needed
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Container style={{ padding: '30px 0px' }}>
      <div style={{padding:'10px 0px',border:'2px solid lightgrey'}}>
      <h3>Edit Profile</h3>
      <Row>
        <Col xs={6}  style={{borderRight:'2px solid lightgrey'}}>
          <Form.Group controlId="formEmail" style={{padding:'10px 0px',borderBottom:'2px solid lightgrey'}}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              readOnly={!editMode}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formName" style={{padding:'10px 0px',borderBottom:'2px solid lightgrey'}}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              readOnly={!editMode}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formGender" style={{padding:'10px 0px',borderBottom:'2px solid lightgrey'}}>
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              name="gender"
              value={formData.gender}
              readOnly={!editMode}
              onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group controlId="formDOB" style={{padding:'10px 0px',borderBottom:'2px solid lightgrey'}}>
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dob"
              value={formData.dob}
              readOnly={!editMode}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formMobile" style={{padding:'10px 0px',borderBottom:'2px solid lightgrey'}}>
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="text"
              name="mobile"
              value={formData.contactNumber}
              readOnly={!editMode}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formAddress" style={{padding:'10px 0px',borderBottom:'2px solid lightgrey'}}>
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="address"
              value={formData.Address}
              readOnly={!editMode}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      {editMode ? (
        <Button variant="primary" onClick={handleSave} style={{width:'fit-content'}}>Save</Button>
      ) : (
        <Button variant="outline-primary" onClick={handleEdit} style={{width:'fit-content', margin:'0px 10px'}}>Edit</Button>
      )}
      </div>
      <div style={{ position: 'relative', height: '500px' }}>
                <Toast ref={toast} />
                <SpeedDial model={items} direction="right" style={{ top: 'calc(50% - 2rem)', left: 0 }} />
      </div>
    </Container>
  );
}

export default ProfilePage;
