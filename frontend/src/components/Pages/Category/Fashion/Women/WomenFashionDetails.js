import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form,Accordion,Modal,Alert } from 'react-bootstrap';
import StarRating from '../../Rating/StarRating';
import OverallStarRating from '../../Rating/OverallStarRating';
import { addToCart } from '../../../Cart/cartFunctions';
import { IconShoppingCart } from '@tabler/icons-react';
import Membership from '../../../Nav/Membership';

function WomenFashionDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const color = 'gold';
  const [selectedSize, setSelectedSize] = useState(''); 
  const [showModal, setShowModal] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState({
    NEW200: '',
    PARTY: '',
  });
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  useEffect(() => {
    fetch(`http://localhost:5001/api/womenfashion/${productId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [productId]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Loading...</p>;
  }

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = (productName, productPrice) => {
    if (!selectedSize) {
      console.error('Please select a size.');
      return;
    }
  
    const newProduct = { name: productName, price: productPrice, quantity: 1,  size: selectedSize };
    addToCart([newProduct]);
    setShowAddedMessage(true);
    setTimeout(() => {
      setShowAddedMessage(false);
    }, 3000);
  };
  const handleCopyClick = (couponCode) => {
    navigator.clipboard.writeText(couponCode);
    setCopiedMessage((prevMessages) => ({
      ...prevMessages,
      [couponCode]: 'Copied!',
    }));
    setTimeout(() => {
      setCopiedMessage((prevMessages) => ({
        ...prevMessages,
        [couponCode]: '',
      }));
    }, 3000); 
  };

 

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className=''style={{display: 'flex', flexDirection: 'column', marginTop:'50px', marginBottom:'100px' }}>
      <Container>
      {showAddedMessage && <Alert variant="success">Added to Cart!</Alert>}
        <Row>
          <Col xs={12} md={6}>
            <div style={{ position: 'sticky', top: '50px', zIndex: 1 }}>
                <Card style={{ border: 'none', borderBottom: '5px solid lightgray' }}>
                  <Card.Img variant="top" src={`data:image/png;base64,${product.image}`} />
                </Card>
            </div>
          </Col>
          <Col xs={12} md={6} lg={6}  >
            <Card style={{ border: 'none', borderBottom: '2px solid lightgray' }}>
              <Card.Body>
              <Card.Title style={{ fontSize: '40px' }} >{product.name}</Card.Title>
              <Card.Text style={{color:'gray'}}>{product.description}</Card.Text>
              <OverallStarRating  color={color} />
              <Card.Text style={{ fontWeight: 'bold', color: 'black', fontSize: '20px' }}>₹{product.price}</Card.Text>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h3 style={{fontWeight:'bold', fontSize:'20px'}}>Select Size</h3>
                <Button variant="outline-secondary" className={selectedSize === 'S' ? 'active' : ''} onClick={() => handleSizeChange('S')}
                style={{width:'40px', height:'40px', borderRadius:'50%',textAlign:'center', padding:'0', lineHeight:'40px'}}>S</Button>
                <Button variant="outline-secondary" className={`rounded-circle ${selectedSize === 'M' ? 'active' : ''}`} onClick={() => handleSizeChange('M')}
                style={{width:'40px', height:'40px', borderRadius:'50%',textAlign:'center', padding:'0', lineHeight:'40px'}}>M</Button>
                <Button variant="outline-secondary" className={`rounded-circle ${selectedSize === 'L' ? 'active' : ''}`} onClick={() => handleSizeChange('L')}
                style={{width:'40px', height:'40px', borderRadius:'50%',textAlign:'center', padding:'0', lineHeight:'40px'}}>L</Button>
                <Button variant="outline-secondary" className={`rounded-circle ${selectedSize === 'XL' ? 'active' : ''}`} onClick={() => handleSizeChange('XL')}
                style={{width:'40px', height:'40px', borderRadius:'50%',textAlign:'center', padding:'0', lineHeight:'40px'}}>XL</Button>
                <Button variant="outline-secondary" className={`rounded-circle ${selectedSize === 'XXL' ? 'active' : ''}`} onClick={() => handleSizeChange('XXL')}
                style={{width:'40px', height:'40px', borderRadius:'50%',textAlign:'center', padding:'2px', lineHeight:'40px'}}>XXL</Button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '30px',marginTop:'30px' }}>
                  <Button
                    variant="primary"
                    onClick={() => handleAddToCart(product.name, product.price)}
                    disabled={!selectedSize}
                    style={{width:'fit-content', fontSize:'20px', backgroundColor:'#009FFD', border:'none', borderBottom:'3px solid black'}}
                  >{/*<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="#303030" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 4.8a.08.08 0 0 1 .014-.05h16.471a.081.081 0 0 1 .015.05v14.4a.081.081 0 0 1-.015.05H3.765a.08.08 0 0 1-.015-.05V4.8Z"/><path stroke="#303030" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.75 8a3.75 3.75 0 0 1-7.5 0"/></svg>*/}
                    <IconShoppingCart stroke={3} />
                    Add to Cart
                  </Button>
                </div>
                {' '}
                <div style={{ display: 'flex', justifyContent:'center',alignItems:'center'}}>
                <Card style={{ border: 'none', borderBottom: '2px solid lightgray', borderTop:'2px solid lightgrey' }}>
                  <Card.Body>
                    <Card.Text style={{fontSize:'15px'}}>Members can get additional discount of ₹40 and Free Shipping.
                    <Button variant="link" onClick={handleShowModal} style={{ paddingLeft: '0', paddingRight: '0', textDecoration:'none'}}>Learn more</Button></Card.Text>
                  </Card.Body>
                </Card>
                </div>
                <Modal show={showModal} onHide={handleCloseModal} size="lg">
                  <Modal.Header closeButton>
                    <Modal.Title>Membership Details</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Membership />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                  </Modal.Footer>
                </Modal>
                <Accordion defaultActiveKey="" style={{ marginTop: '20px' }}>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                    <div style={{ display: 'flex', flexDirection: 'column'}}>
                      <h3 style={{fontWeight:'bold'}}>Offers</h3> 
                      <p>Save extra with 2 offers</p>
                    </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <p>Get Rs.200 instant discount on your First Purchase above Rs.999. Coupon code -{' '}
                      <strong style={{ fontWeight: 'bold', fontSize: '15px' }}>NEW200</strong></p>
                      <p>
                        <Button onClick={() => handleCopyClick('NEW200')}>Tap to Copy</Button>
                        {copiedMessage['NEW200'] && <span style={{ marginLeft: '10px', color: 'green' }}>{copiedMessage['NEW200']}</span>}
                      </p>
                      <p>Whistles! Get extra 15% cashback on prepaid orders above Rs.699. Coupon code -{' '}
                        <strong style={{ fontWeight: 'bold', fontSize: '15px' }}>PARTY</strong></p>
                        <p>
                          <Button onClick={() => handleCopyClick('PARTY')}>Tap to Copy</Button>
                          {copiedMessage['PARTY'] && <span style={{ marginLeft: '10px', color: 'green' }}>{copiedMessage['PARTY']}</span>}
                        </p>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                    <div style={{ display: 'flex', flexDirection: 'column'}}>
                      <h3 style={{ fontWeight: 'bold' }}>15 DAY RETURNS</h3>
                      <p style={{ marginTop: '5px' }}>Know about return & exchange policy</p>
                    </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <p>Easy returns up to 15 days of delivery.</p>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Card.Body>
              </Card>
              <Card style={{marginTop:'30px', border:'none'}}>
              <Col style={{marginTop:'30px', marginBottom:'30px'}}>

             <Accordion>
              <Accordion.Item eventKey="0">
                    <Accordion.Header style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <h3 style={{ fontWeight: 'bold' }}>Reviews</h3>
                    </Accordion.Header>
                    <Accordion.Body>
                    <Card style={{marginRight:'10px', border: 'none', borderBottom: '2px solid lightgray'}}>
                        <Card.Body>
                          <Card.Text>
                            Be the first to review {product.name}
                          </Card.Text>
                          <Card.Text>
                          Your email address will not be published. Required fields are marked *
                          </Card.Text>
                          <Form>
                            <Form.Label>your rating*
                            <StarRating rating={rating} color={color}  onChange={handleRatingChange}  required/>
                            </Form.Label>
                            <Form.Label>your review*</Form.Label>
                            <textarea required />
                            <Form.Label>Name*</Form.Label>
                            <Col><input type='text' required/></Col>
                            <Form.Label>Email*</Form.Label>
                            <Col><input type='email' required/></Col>
                            <Button type='submit' style={{marginTop:'20px', marginLeft:'150px', width:'fit-content'}}>Submit</Button>
                          </Form>
                        </Card.Body>
                      </Card>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
          </Col>
            </Card>
          </Col>
        </Row>
        
      </Container>
    </div>
  );
}

export default WomenFashionDetails;
