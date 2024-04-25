import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UserManagement from './UserManagement';
import OrderManagement from './OrderManagement';
import ProductManagement from './ProductManagement';
import ProductInsights from './ProductInsights';
// import Sales from './Sales';

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
      {/* <Tab eventKey="Sales " title="Sales ">
        <Sales />
      </Tab> */}
    </Tabs>
  );
}

export default AdminDashboard;

