import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Container, Dropdown, DropdownButton, Row, Table, Form, Button, Modal } from 'react-bootstrap';
import Chart from 'chart.js/auto';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import PDFReport from './PDFReport';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
// import '../../css/custom-date-range-theme.css'




const ProductInsights = () => {
  const [productInsights, setProductInsights] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('All');
  const [selectedProductName, setSelectedProductName] = useState('All');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [minPrice, setMinPrice] = useState('500');
  const [maxPrice, setMaxPrice] = useState('');
  let barChartRef = null;
  const [showModal, setShowModal] = useState(false);



  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    fetchData();
  }, [selectedUserId, selectedProductName,selectedDate, selectedEndDate, minPrice, maxPrice]);

  const fetchData = async () => {
    try {
      let url = 'http://localhost:5001/api/sales';

      const startDateParam = selectedDate ? `&start_date=${selectedDate.toISOString()}` : '';
      const endDateParam = selectedEndDate ? `&end_date=${selectedEndDate.toISOString()}` : '';
      const priceRangeParam = minPrice && maxPrice ? `&min_price=${minPrice}&max_price=${maxPrice}` : '';


      url += `?user_id=${selectedUserId}&product_id=${selectedProductName}${startDateParam}${endDateParam}${priceRangeParam}`;

      const response = await axios.get(url);
      if (response.data.length > 0) {
        setProductInsights(response.data);
        updateBarChart(response.data);
      } else {
        setProductInsights([]);
      }
    } catch (error) {
      console.error('Error fetching product insights:', error);
    }
  };

  const updateBarChart = (data) => {
    if (!barChartRef) return;

    const labels = data.map(insight => insight.product_name);
    const quantities = data.map(insight => insight.quantity);

    if (barChartRef.chart) {
      barChartRef.chart.destroy();
    }

    barChartRef.chart = new Chart(barChartRef, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Quantity',
          data: quantities,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            suggestedMin: 1,
          }
        }
      }
    });
  };

  const handleUserIdSelect = (userId) => {
    setSelectedUserId(userId);
  };

  const handleProductNameSelect = (productName) => {
    setSelectedProductName(productName);
  };



  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };


  const handleDateRangeChange = (ranges) => {
    setSelectedDate(ranges.selection.startDate);
    setSelectedEndDate(ranges.selection.endDate);
  };
  

  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const toggleFilterPanel = () => {
    setShowFilterPanel(!showFilterPanel);
  };
  


  



  return (
    <Container style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', marginTop: '50px', marginBottom: '100px', width:'fit-content' }}>
      <h1>Sales Report</h1>
      <Row className="mb-3">
        <Col>
          <DropdownButton variant="dark" id="user-dropdown" title={`User ID: ${selectedUserId}`} style={{ backgroundColor:'black', width:'fit-content' }}>
            <Dropdown.Item onClick={() => handleUserIdSelect('All')}>All</Dropdown.Item>
            <Dropdown.Item onClick={() => handleUserIdSelect('1')}>user1</Dropdown.Item>
            <Dropdown.Item onClick={() => handleUserIdSelect('2')}>user2</Dropdown.Item>
            <Dropdown.Item onClick={() => handleUserIdSelect('3')}>user3</Dropdown.Item>
          </DropdownButton>
        </Col>
        <Col>
          <DropdownButton variant="dark"id="product-dropdown" title={`Product ID: ${selectedProductName}`} style={{ backgroundColor:'black', width:'fit-content' }}>
            <Dropdown.Item onClick={() => handleProductNameSelect('All')}>All</Dropdown.Item>
            <Dropdown.Item onClick={() => handleProductNameSelect('101')}>Samsung S23 Ultra </Dropdown.Item>
            <Dropdown.Item onClick={() => handleProductNameSelect('102')}>Mac Book Pro</Dropdown.Item>
            <Dropdown.Item onClick={() => handleProductNameSelect('103')}>Men's Shirt </Dropdown.Item>
            <Dropdown.Item onClick={() => handleProductNameSelect('107')}>Men's Jean </Dropdown.Item>
            <Dropdown.Item onClick={() => handleProductNameSelect('104')}>Huawei Watch GT 3 Smartwatch </Dropdown.Item>
            <Dropdown.Item onClick={() => handleProductNameSelect('105')}>Samsung Galaxy Watch4 </Dropdown.Item>
            <Dropdown.Item onClick={() => handleProductNameSelect('106')}>Apple Watch Ultra</Dropdown.Item>
            <Dropdown.Item onClick={() => handleProductNameSelect(['104','105', '106'])}>Smartwatches </Dropdown.Item>
          </DropdownButton>
        </Col>
        <Col>
    <Button onClick={toggleFilterPanel} className="btn btn-dark" style={{width:'fit-content'}}>Filter by</Button>
  </Col>
  {showFilterPanel && (
  <Col className='date-section'>
    <DateRangePicker
      ranges={[{
        startDate: selectedDate,
        endDate: selectedEndDate,
        key: 'selection',
      }]}
      onChange={handleDateRangeChange}
      moveRangeOnFirstSelection={false}
      className="custom-date-range-picker"
    />
  </Col>
)}
        <Col>
          <Form.Group controlId="minPrice">
            <Form.Control type="number" placeholder="Min Price" value={minPrice} onChange={handleMinPriceChange} style={{ width: '100%', borderRadius: '5px' }} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="maxPrice">
            <Form.Control type="number" placeholder="Max Price" value={maxPrice} onChange={handleMaxPriceChange} style={{ width: '100%', borderRadius: '5px' }} />
          </Form.Group>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Purchase Date</th>
            <th>Created On</th>
            <th>Created By</th>
            <th>Modified On</th>
            <th>Modified By</th>
          </tr>
        </thead>
        <tbody>
          {productInsights.map(insight => (
            <tr key={insight.id}>
              <td>{insight.id}</td>
              <td>{insight.user_id}</td>
              <td>{insight.product_id}</td>
              <td>{insight.product_name}</td>
              <td>{insight.quantity}</td>
              <td>{insight.price}</td>
              <td>{new Date(insight.purchase_datetime).toLocaleString()}</td>
              <td>{new Date(insight.created_on).toLocaleString()}</td>
              <td>{insight.created_by}</td>
              <td>{new Date(insight.modified_on).toLocaleString()}</td>
              <td>{insight.modified_by}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Row className="mb-3">
        <Col>
          <canvas ref={(ref) => barChartRef = ref}></canvas>
        </Col>
      </Row>
      <Button onClick={toggleModal} className="btn btn-dark" style={{display:'flex', justifyContent:'center',alignItems:'center',width: 'fit-content' }}
      ><FontAwesomeIcon icon={faDownload} beat style={{marginRight:'5px',color: "#74C0FC",}} />Download</Button>

      <Modal show={showModal} onHide={toggleModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Sales Report PDF</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PDFReport data={productInsights} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>Close</Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
};

export default ProductInsights;

