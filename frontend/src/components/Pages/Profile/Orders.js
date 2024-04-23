import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Orders() {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5001/profile')
            .then(res => {
                setUser(res.data);
                if (res.data && res.data.email) {
                    fetchOrders(res.data.email);
                    setLoggedIn(true); 
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

    return (
        <Container style={{ display: 'flex', flexDirection: 'column', textAlign: 'center',padding:'100px 0px' }}>
            {loggedIn ? (
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
                                            <Link to={`/trackorders`}>
                                                <Button variant="primary">Track Order</Button>
                                            </Link>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            ) : (
                <div style={{padding:'100px 0px 500px 0px'}}>
                    <h2>Please Login to View Orders</h2>
                    <Link to="/login">
                        <Button>Login</Button>
                    </Link>
                </div>
            )}
        </Container>
    );
}

export default Orders;
