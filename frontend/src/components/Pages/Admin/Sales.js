import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Dropdown, DropdownButton, Table } from 'react-bootstrap';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Sales = () => {
  // Sample static data
  const [salesData, setSalesData] = useState([
    { date: '2022-01-01', user: 'User1', product: 'mobile', qtn: 50 },
    { date: '2022-01-02', user: 'User2', product: 'laptop', qtn: 70 },
    { date: '2022-01-03', user: 'User1', product: 'mobile', qtn: 60 },
    { date: '2022-01-04', user: 'User2', product: 'laptop', qtn: 80 },
    { date: '2022-01-05', user: 'User1', product: 'mobile', qtn: 90 },
  ]);
  const [selectedUser, setSelectedUser] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState('All');

  const handleUserChange = (user) => {
    setSelectedUser(user);
  };

  const handleProductChange = (product) => {
    setSelectedProduct(product);
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h1>Product Insights</h1>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <DropdownButton title={`User: ${selectedUser}`}>
            <Dropdown.Item onClick={() => handleUserChange('All')}>All Users</Dropdown.Item>
            <Dropdown.Item onClick={() => handleUserChange('User1')}>User1</Dropdown.Item>
            <Dropdown.Item onClick={() => handleUserChange('User2')}>User2</Dropdown.Item>
          </DropdownButton>
        </Col>
        <Col>
          <DropdownButton title={`Product: ${selectedProduct}`}>
            <Dropdown.Item onClick={() => handleProductChange('All')}>All Products</Dropdown.Item>
            <Dropdown.Item onClick={() => handleProductChange('mobile')}>Mobile</Dropdown.Item>
            <Dropdown.Item onClick={() => handleProductChange('laptop')}>Laptop</Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <LineChart width={800} height={400} data={salesData}>
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid stroke="#eee" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="qtn" stroke="#8884d8" />
          </LineChart>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <BarChart width={800} height={400} data={salesData}>
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid stroke="#eee" />
            <Tooltip />
            <Legend />
            <Bar dataKey="qtn" fill="#8884d8" />
          </BarChart>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>User</th>
                <th>Product</th>
                <th>Qunatity</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.user}</td>
                  <td>{item.product}</td>
                  <td>{item.qtn}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Sales;
