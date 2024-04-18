import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios'; 

const OrderManagement = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
  
    axios.get('http://localhost:5001/orders')
      .then(response => setOrders(response.data))
      .catch(error => console.error('Error fetching orders:', error));
  }, []);


  const updateOrderStatus = (orderId, newStatus) => {
  
    axios.put(`http://localhost:5001/orders/${orderId}`, { status: newStatus })
      .then(response => {
        console.log('Order status updated successfully:', response.data);
        const updatedOrders = orders.map(order => {
          if (order.id === orderId) {
            return { ...order, status: newStatus };
          }
          return order;
        });
        setOrders(updatedOrders);
      })
      .catch(error => console.error('Error updating order status:', error));
  };

  return (
    <div>
      <h2>Order Management</h2>
      <Table striped bordered hover style={{marginBottom:'50px'}}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Payment Method</th>
            <th>Products</th>
            <th>Total</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.name}</td>
              <td>{order.address}</td>
              <td>{order.paymentMethod}</td>
              <td>{order.products}</td>
              <td>{order.total}</td>
              <td>{order.email}</td>
              <td>{order.status}</td>
              <td>
                <Button variant="info" onClick={() => updateOrderStatus(order.id, 'Shipped')} style={{width:'fit-content'}}>Mark as Shipped</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OrderManagement;
