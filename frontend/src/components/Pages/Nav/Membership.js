import React from 'react';
import { Container, Col, Row, Card, Button } from 'react-bootstrap';

const Membership = () => {
  return (
    <Container fluid className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <h1 className="my-5">Become a Member</h1>
      <Row className="w-100">
        <Col md={6} className="mb-4">
          <Card className="shadow-lg h-100 d-flex flex-column justify-content-between" style={{ borderRadius: '10px', width:'fit-content' }}>
            <Card.Body>
              <Card.Title className="fw-bold">Standard Membership</Card.Title>
              <Card.Text>
                Unlock exclusive deals and discounts on a wide range of products with our Standard Membership. 
              </Card.Text>
              <Card.Text>
                Enjoy priority customer support and early access to sales events as a Standard Member. 
              </Card.Text>
              <Card.Text>
                Get free shipping on all orders and earn reward points with every purchase as part of our Standard Membership program.
              </Card.Text>
              <h5 className="text-muted">₹500/year</h5>
            </Card.Body>
            <Button variant="gradient" size="lg" block  style={{ width:'100%',backgroundColor: 'black', color: 'white', borderRadius: '0 0 10px 10px' }}>
              Join Now
            </Button>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card className="shadow-lg h-100 d-flex flex-column justify-content-between" style={{ borderRadius: '10px' }}>
            <Card.Body>
              <Card.Title className="fw-bold">Premium Membership</Card.Title>
              <Card.Text>
                Elevate your shopping experience with our Premium Membership, offering VIP access to limited edition products and special promotions.
              </Card.Text>
              <Card.Text>
                Receive personalized recommendations and curated collections tailored to your preferences as a Premium Member.
              </Card.Text>
              <Card.Text>
                Access premium customer service, including dedicated support agents and expedited returns, with our Premium Membership tier.
              </Card.Text>
              <h5 className="text-muted">₹1000/year</h5>
            </Card.Body>
            <Button variant="gradient" size="lg" block  style={{width:'100%', backgroundColor: 'black', color: 'white', borderRadius: '0 0 10px 10px' }}>
              Join Now
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Membership;
