import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form,Accordion,Modal,Alert} from 'react-bootstrap';
import StarRating from '../../Rating/StarRating';
import OverallStarRating from '../../Rating/OverallStarRating';
import { addToCart } from '../../../Cart/cartFunctions';
import { IconShoppingCart } from '@tabler/icons-react';
import Membership from '../../../Nav/Membership';
import Viewer from 'react-360-view';




function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const color = 'gold';
  const [showModal, setShowModal] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState({
    NEW200: '',
    PARTY: '',
  });

  const [reviews, setReviews] = useState([]);
const [reviewFormData, setReviewFormData] = useState({
  rating: 0,
  text: "",
  name: "",
  email: "",
});


  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [staticReviews] = useState([
    { id: 1, rating: 4.5, text: 'Great product! Highly recommended.' },
    { id: 2, rating: 3.8, text: 'Good quality, but could be better.' },
    { id: 3, rating: 5, text: 'Excellent service and fast delivery.' },
    { id: 4, rating: 4.2, text: 'Satisfied with the purchase.' },
    { id: 5, rating: 3.5, text: 'Average product, nothing special.' },
  ]);

  const [showFullDescription, setShowFullDescription] = useState(false);
  const maxLength = 150; 


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const newReview = {
      id: reviews.length + 1,
      rating: reviewFormData.rating,
      text: reviewFormData.text,
    };
    setReviews([...reviews, newReview]);
    // Clear the form data after submission
    setReviewFormData({
      rating: 0,
      text: "",
      name: "",
      email: "",
    });
  };

  
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  useEffect(() => {
    fetch(`http://localhost:5001/api/mobile-products/${productId}`)
    .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        return response.json();
    })
    .then(data => {
        setProduct(data);
    })
    .catch(error => {
        setError(error.message)
    });
  }, [productId]);

  
  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Loading...</p>;
  }

  const handleAddToCart = (productName, productPrice) => {
    const newProduct = { name: productName, price: productPrice, quantity: 1 };
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



  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginTop:'50px', marginBottom:'100px' }}>
    <Container>
    {showAddedMessage && <Alert variant="success">Added to Cart!</Alert>}
      <Row style={{ marginBottom: '20px' }}>
        <Col xs={12} md={6} style={{ marginBottom: '20px' }}>
        <div style={{ position: 'sticky', top: '50px', zIndex: 1 }}>
          <Card style={{border:'none',borderBottom:'3px solid lightgrey'}}>
            <Card.Img variant="top" src={`data:image/png;base64,${product.image}`}/>
          </Card>
          </div>
        </Col>
        {/* <Col xs={12} md={6} style={{ marginBottom: '20px' }}>
  <Viewer
    imagePath={`data:image/png;base64,${product.image}`}
    width="100%"
    height="500px"
    autoplay
    loop
  /> 
</Col>*/}

        <Col xs={12} md={6} style={{ marginBottom: '20px' }}>
        <Card style={{ border: 'none', borderBottom: '2px solid lightgray' }}>
            <Card.Body>
              <Card.Title style={{ fontSize: '40px' }} >{product.name}</Card.Title>
              <Card.Text style={{color:'gray'}}>
                {showFullDescription ? product.description : product.description.slice(0, maxLength)}
                {product.description.length > maxLength && !showFullDescription && (
                  <span className="read-more" onClick={toggleDescription}>
                    ...Read More
                  </span>
                )}
             </Card.Text>  
              <OverallStarRating  color={color} />
              <Card.Text style={{ fontWeight: 'bold', color: 'black', fontSize: '30px', padding:'10px' }}>Price: ₹{product.price}</Card.Text>
              <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '30px',marginTop:'30px', border:'none', borderBottom:'2px solid lightgrey', padding:'10px' }}>
              <Link to='/cartpage'><Button variant="primary" onClick={() => handleAddToCart(product.name, product.price)} 
               style={{width:'fit-content', fontSize:'20px', backgroundColor:'#009FFD', border:'none', borderBottom:'4px solid black'}}
              ><IconShoppingCart stroke={3} />Add to Cart</Button></Link></div>

<Card style={{ border: 'none', borderBottom: '2px solid lightgray', borderTop:'2px solid lightgrey'}}>
                  <Card.Body >
                    <Card.Text style={{fontSize:'15px'}}>Members can get additional discount of ₹40 and Free Shipping.
                    <Button variant="link" onClick={handleShowModal} style={{ paddingLeft: '0', paddingRight: '0', textDecoration:'none'}}>Learn more</Button></Card.Text>
                  </Card.Body>
                </Card>
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
                      <h3 style={{fontWeight:'bold'}}>Coupons</h3> 
                      <p>Save extra with 2 Coupons</p>
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

                    {staticReviews.map((review) => (
                <Card key={review.id} style={{ border: 'none', borderBottom: '2px solid lightgray' }}>
                  <Card.Body>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', gap:'10px' }}> 
                      <span style={{ marginLeft: '10px', fontWeight:'bold' }}>{review.rating}/5</span>
                    <Card.Text >{review.text}</Card.Text>
                    </div>
                    </Card.Body>
                </Card>
              ))}
              <Card style={{ border: 'none', borderTop: '2px solid lightgray', marginTop: '30px' }}>
  <Card.Body>
    <Card.Title>Reviews</Card.Title>
    {reviews.map((review) => (
      <Card key={review.id} style={{ border: 'none', borderBottom: '2px solid lightgray' }}>
        <Card.Body>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', gap: '10px' }}>
            <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>{review.rating}/5</span>
            <Card.Text>{review.text}</Card.Text>
          </div>
        </Card.Body>
      </Card>
    ))}
                    <Card style={{marginRight:'10px', border: 'none',borderTop:'5px solid lightgrey', borderBottom: '2px solid lightgray'}}>
                        <Card.Body>
                          <Card.Text style={{fontWeight:'bold'}}>
                            Your review for {product.name}
                          </Card.Text>
                          <Card.Text>
                          Your email address will not be published. Required fields are marked *
                          </Card.Text>
                          <Form onSubmit={handleSubmitReview}>
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

export default ProductDetails;

    {/*<Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Additional Images</Card.Title>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {product.additionalImages.map((image, index) => (
                  <img key={index} src={`data:image/png;base64,${image}`} alt={`Product Image ${index}`} style={{ width: '100px', height: '100px', margin: '5px' }} />
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>*/}
 