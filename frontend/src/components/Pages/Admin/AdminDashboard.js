import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UserManagement from './UserManagement';
import OrderManagement from './OrderManagement';
import ProductManagement from './ProductManagement';
import ProductInsights from './ProductInsights';
import Sales from './Sales';

function AdminDashboard() {
  return (
    <Tabs
      defaultActiveKey="Product Management"
      id="justify-tab-example"
      className="mb-3"
      justify
      style={{marginTop:'20px' }}
    >
      <Tab eventKey="Product Management" title="Product Management">
        <ProductManagement />
      </Tab>
      <Tab eventKey="Order Management" title="Order Management">
        <OrderManagement />
      </Tab>
      <Tab eventKey="User Management" title="User Management">
        <UserManagement />
      </Tab>
      <Tab eventKey="Product Insights" title="Product Insights">
        <ProductInsights />
      </Tab>
      <Tab eventKey="Sales " title="Sales ">
        <Sales />
      </Tab>
    </Tabs>
  );
}

export default AdminDashboard;





{/*
import React, { useState } from 'react';
import { Container, Nav, Tab } from 'react-bootstrap';
import ProductManagement from './ProductManagement';
import OrderManagement from './OrderManagement';
import UserManagement from './UserManagement';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products');

  return (
    <Container className="mt-4" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <h1 className="mb-4">Admin Dashboard</h1>
      <Nav variant="tabs" defaultActiveKey="products" className="mb-4">
        <Nav.Item>
          <Nav.Link eventKey="products" onSelect={() => {
            setActiveTab('products');
            navigate('/productmanagement');
          }}>
            Product Management
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="orders" onSelect={() => {
            setActiveTab('orders');
            navigate('/ordermanagement');
          }}>
            Order Management
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="users" onSelect={() => {
            setActiveTab('users');
            navigate('/usermanagement');
          }}>
            User Management
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Tab.Content>
        <Tab.Pane eventKey="products">
          <ProductManagement />
        </Tab.Pane>
        <Tab.Pane eventKey="orders">
          <OrderManagement />
        </Tab.Pane>
        <Tab.Pane eventKey="users">
          <UserManagement />
        </Tab.Pane>
      </Tab.Content>
    </Container>
  );
};

export default AdminDashboard;

*/}
