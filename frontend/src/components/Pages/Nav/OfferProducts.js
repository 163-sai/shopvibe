import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { addToCart } from '../Cart/cartFunctions';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import OverallStarRating from '../Category/Rating/OverallStarRating';
import { IconShoppingCart } from '@tabler/icons-react';

function OfferProducts() {
  const [offerProducts, setOfferProducts] = useState([]);
  const [error] = useState(null);
  const color = 'gold';
  const [addedToCartMessage, setAddedToCartMessage] = useState('');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/offerproducts');
        setOfferProducts(response.data); 
      } catch (error) {
        console.error('Error fetching offer products:', error);
      }
    };

    fetchData(); 
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const handleAddToCart = (productName, productPrice) => {
    const newProduct = { name: productName, price: productPrice, quantity: 1 };
    addToCart([newProduct]);
    setAddedToCartMessage(`${productName} added to cart.`);
    setTimeout(() => {
      setAddedToCartMessage('');
    }, 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '100px 0px' }}>
      <Container>
        <h1>Products On Offer</h1>
        {error && <p>{error}</p>}
        {addedToCartMessage && <Alert variant="success">{addedToCartMessage}</Alert>}
        <Row className='g-4'>
          {offerProducts.map(product => (
            <Col key={product.id} xs={12} md={6} lg={4} className='mb-4'>
              <Card className='h-100' style={{ height: '100%',border:'none', borderBottom:'3px solid lightgrey', borderTop:'3px solid lightgrey'}}>
                <Card.Img variant="top" src={`data:image/png;base64,${product.image}`} />
                <Card.Body className='d-flex flex-column justify-content-center align-items-center'>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>Offer Price: ₹{product.price}</Card.Text>
                  <Card.Text style={{ textDecoration: 'line-through' }}>Original MRP: ₹{product.mrp}</Card.Text>
                  <OverallStarRating color={color} />
                </Card.Body>
                <div className='d-flex justify-content-center mt-3' style={{padding:'20px 0'}}>
                  <Button variant="primary" onClick={() => handleAddToCart(product.name, product.price)} 
                   style={{width:'fit-content', fontSize:'20px', backgroundColor:'#009FFD', border:'none', borderBottom:'3px solid black'}}>
                    <IconShoppingCart /> Add to Cart
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default OfferProducts;
