import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';
import axios from 'axios';
import { IconEdit } from '@tabler/icons-react';
import { Card, Container, Col, Row } from 'react-bootstrap'; 

function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    axios.get('http://localhost:5001/profile')
      .then(res => {
        setUser(res.data); 
        if (res.data && res.data.email) {
          fetchOrders(res.data.email);
        }
      })
      .catch(err => console.error(err));
  }, []); 

  const fetchOrders = (email) => {
    axios.get(`http://localhost:5001/api/orders?email=${email}`)
      .then(res => {
        setOrders(res.data); 
      })
      .catch(err => console.error(err));
  };

  const handleLogout = () => {
    axios.post('http://localhost:5001/logout')
      .then(() => {
        setUser(null);
        window.history.replaceState({}, document.title, "/login");
        navigate('/login');
      })
      .catch(err => console.error(err));
  };

  return (
    <>
      <Container style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' ,textAlign:'center'}}>
        <h1>Profile</h1>
        {user ? (
          <div >
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>


            <Button onClick={handleLogout} variant='primary'>Logout</Button>
          </div>
        ) : (
          <p>Please log in to view your profile</p>
        )}
        
        {user && orders.length > 0 && (
          <div>
            <h2>My Orders</h2>
            <Row>
              {orders.map(order => (
                <Col key={order.id} md={4} className="mb-4">
                  <Card style={{ height: '100%' }}>
                    <Card.Body>
                      <Card.Title>Order ID: {order.id}</Card.Title>
                      <Card.Text>
                        <p>Name: {order.name}</p>
                        <p>Address: {order.address}</p>
                        <p>Payment Method: {order.paymentMethod}</p>
                        <p>Products: {order.products}</p>
                        <p>Total: ₹{order.total}</p>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}

        {user ? null : (
          <Link to='/login'>
            <Button variant='primary'>Login</Button>
          </Link>
        )}
      </Container>
    </>
  );
}

export default Profile;
