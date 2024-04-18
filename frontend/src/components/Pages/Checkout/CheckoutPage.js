import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';
import { useLocation , useNavigate } from 'react-router-dom';
import axios from 'axios';

function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const productNames = searchParams.get('names');
  const totalAmount = parseInt(searchParams.get('total'));

  const [showModal, setShowModal] = useState(false);
  const [showCreditCardModal, setShowCreditCardModal] = useState(false);
  const [showDebitCardModal, setShowDebitCardModal] = useState(false);
  const [showNetBankingModal, setShowNetBankingModal] = useState(false);
  const [showUpiModal, setShowUpiModal] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    paymentMethod: 'Credit Card',
    email: '',
  });

  useEffect(() => {
    fetchUserEmail();
  }, []);

  const fetchUserEmail = async () => {
    try {
      const response = await axios.get('http://localhost:5001/profile');
      if (response.data && response.data.email) {
        setFormData((prevData) => ({
          ...prevData,
          email: response.data.email,
        }));
      } else {
        console.error('Failed to fetch user email');
      }
    } catch (error) {
      console.error('Error fetching user email:', error);
    }
  };

  const handlePlaceOrder = () => {
    if (!isLogggedIn()) {
      navigate('/login');
    } else {
      switch (formData.paymentMethod) {
        case 'Credit Card':
          setShowCreditCardModal(true);
          break;
        case 'Debit Card':
          setShowDebitCardModal(true);
          break;
        case 'Net Banking':
          setShowNetBankingModal(true);
          break;
        case 'UPI':
          setShowUpiModal(true);
          break;
        case 'Cash On Delivery':
          setShowModal(true);
          break;
        default:
          break;
      }
    }
  };
  

  const handlePlaceOrderFinal = async () => {
    if (!formData.name || !formData.address || !formData.paymentMethod || !formData.email) {
  
      alert('Please enter name, address, payment method,and email.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5001/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          address: formData.address,
          paymentMethod: formData.paymentMethod,
          products: productNames,
          total: totalAmount,
          email: formData.email
        }),
      });
      if (response.ok) {
        setShowModal(false); 
        setShowSuccessModal(true); 
      } 
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const handlePlaceOrderCreditCard = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setShowModal(true);
      setShowSuccessModal(false);
      console.log('CreditCard payment successful!');
    } catch (error) {
      console.error('Error processing CreditCard payment:', error);
      alert('Error processing payment. Please try again later.');
    }
  };

  const handlePlaceOrderDebitCard = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setShowModal(true);
      setShowSuccessModal(false);
      console.log('DebitCard payment successful!');
    } catch (error) {
      console.error('Error processing DebitCard payment:', error);
      alert('Error processing payment. Please try again later.');
    }
  };

  const handlePlaceOrderNetBanking = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setShowModal(true);
      setShowSuccessModal(false);
      console.log('Net banking payment successful!');
    } catch (error) {
      console.error('Error processing net banking payment:', error);
      alert('Error processing payment. Please try again later.');
    }
  };
  
  const handlePlaceOrderUpi = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setShowModal(true);
      setShowSuccessModal(false);
      console.log('UPI payment successful!');
    } catch (error) {
      console.error('Error processing UPI payment:', error);
      alert('Error processing payment. Please try again later.');
    }
  };
  
  

  const handleCloseModal = () => {
    setShowModal(false);
    setShowCreditCardModal(false);
    setShowDebitCardModal(false);
    setShowNetBankingModal(false);
    setShowUpiModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isLogggedIn = () => {
    return !!formData.email;
  }

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', marginTop:'150px' }}>
      <Container style={{ flex: '1' }}>
        <h1>Checkout</h1>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Form>
                  <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your name" />
                  </Form.Group>
                  <Form.Group controlId="formAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Enter your address" />
                  </Form.Group>
                  <Form.Group controlId="formPayment">
                    <Form.Label>Payment Method</Form.Label>
                    <Form.Control as="select" name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange}>
                      <option>Credit Card</option>
                      <option>Debit Card</option>
                      <option>Net Banking</option>
                      <option>UPI</option>
                      <option>Cash On Delivery</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your address" />
                  </Form.Group>
                  {' '}
                  <Button variant="primary" onClick={handlePlaceOrder} className="mb-2">
                    Place Order
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <h3>Order Summary</h3>
                <p>Products: {productNames}</p>
                <p>Total: ₹{totalAmount}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <footer style={{ textAlign: 'center', padding: '10px', backgroundColor: '#f8f9fa' }}>
        © {new Date().getFullYear()} shopvibe
      </footer>


      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Order Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Name: {formData.name}</p>
          <p>Email: {formData.email}</p>
          <p>Address: {formData.address}</p>
          <p>Payment Method: {formData.paymentMethod}</p>
          <p>Products: {productNames}</p>
          <p>Total: ₹{totalAmount}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePlaceOrderFinal}>
            Place Order
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      

      <Modal show={showCreditCardModal} onHide={handleCloseModal}>
  <Modal.Header closeButton>
    <Modal.Title>Enter Credit Card Details</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group controlId="formCreditCardNumber">
        <Form.Label>Credit Card Number</Form.Label>
        <Form.Control type="text" placeholder="Enter credit card number" />
      </Form.Group>
      <Form.Group controlId="formExpirationDate">
        <Form.Label>Expiration Date</Form.Label>
        <Form.Control type="text" placeholder="MM/YY" />
      </Form.Group>
      <Form.Group controlId="formCVV">
        <Form.Label>CVV</Form.Label>
        <Form.Control type="text" placeholder="CVV" />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseModal}>
      Close
    </Button>
    <Button variant="primary" onClick={handlePlaceOrderCreditCard}>
      Place Order
    </Button>
  </Modal.Footer>
</Modal>


<Modal show={showDebitCardModal} onHide={handleCloseModal}>
  <Modal.Header closeButton>
    <Modal.Title>Enter Debit Card Details</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group controlId="formDebitCardNumber">
        <Form.Label>Debit Card Number</Form.Label>
        <Form.Control type="text" placeholder="Enter Debit card number" />
      </Form.Group>
      <Form.Group controlId="formExpirationDate">
        <Form.Label>Expiration Date</Form.Label>
        <Form.Control type="text" placeholder="MM/YY" />
      </Form.Group>
      <Form.Group controlId="formCVV">
        <Form.Label>CVV</Form.Label>
        <Form.Control type="text" placeholder="CVV" />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseModal}>
      Close
    </Button>
    <Button variant="primary" onClick={handlePlaceOrderDebitCard}>
      Place Order
    </Button>
  </Modal.Footer>
</Modal>

<Modal show={showNetBankingModal} onHide={handleCloseModal}>
  <Modal.Header closeButton>
    <Modal.Title>Net Banking Payment</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group controlId="formBankName">
        <Form.Label>Bank Name</Form.Label>
        <Form.Control type="text" placeholder="Enter bank name" />
      </Form.Group>
      <Form.Group controlId="formAccountNumber">
        <Form.Label>Account Number</Form.Label>
        <Form.Control type="text" placeholder="Enter account number" />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseModal}>
      Close
    </Button>
    <Button variant="primary" onClick={handlePlaceOrderNetBanking}>
      Place Order
    </Button>
  </Modal.Footer>
</Modal>

<Modal show={showUpiModal} onHide={handleCloseModal}>
  <Modal.Header closeButton>
    <Modal.Title>UPI Payment</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group controlId="formUpiId">
        <Form.Label>UPI ID</Form.Label>
        <Form.Control type="text" placeholder="Enter UPI ID" />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseModal}>
      Close
    </Button>
    <Button variant="primary" onClick={handlePlaceOrderUpi}>
      Place Order
    </Button>
  </Modal.Footer>
</Modal>



      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Order Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your order has been placed successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSuccessModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CheckoutPage;

