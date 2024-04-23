import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import OverallStarRating from '../../Rating/OverallStarRating';
import { addToCart } from '../../../Cart/cartFunctions';
import { IconShoppingCart } from '@tabler/icons-react';

function MobileProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const color = 'gold';
  const [cart] = useState([]);
  const [addedToCartMessage, setAddedToCartMessage] = useState('');

  useEffect(() => {
    console.log('fetching!')
    fetch('http://localhost:5001/api/mobile-products')
    .then(response => {
        console.log(response)
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
    })
    .then(data => {
        console.log('Products:', data);
        setProducts(data)
    })
    .catch(error => {
        console.error('Error fetching products:', error);
        setError(error.message)
    });
  }, []);

  const handleAddToCart = (productName, productPrice) => {
    const newProduct = { name: productName, price: productPrice, quantity: 1 };
    addToCart([newProduct]);
    setAddedToCartMessage(`${productName} added to cart.`);
        setTimeout(() => {
            setAddedToCartMessage('');
        }, 3000);
  };

  const buyNow = (productId) => {
    console.log(`Buying product with ID ${productId} now`);
  };

  return (
    <div style={{  display: 'flex', flexDirection: 'column', marginTop:'50px', marginBottom:'100px' }}>
      <Container>
        <h1 style={{marginBottom:'50px'}}>Mobile Products</h1>
        {error && <p>{error}</p>}
        {addedToCartMessage && <Alert variant="success">{addedToCartMessage}</Alert>}
        <Row xs={1} md={2} lg={3} className="g-4">
          {products.map(product => (
            <Col key={product.id}>
              <Card className="mb-4" style={{ height: '100%',border:'none', borderBottom:'3px solid lightgrey', borderTop:'3px solid lightgrey'}}>
                <Link to={`/productdetails/${product.id}`}>
                <Card.Img
                    variant="top"
                    src={`data:image/png;base64,${product.image}`}
                    style={{ height:'500px', objectFit:'cover',transition: 'transform 0.2s ease-in-out' }}
                    onMouseOver={e => { e.target.style.transform = 'scale(1.05)'; }}
                    onMouseOut={e => { e.target.style.transform = 'scale(1)'; }}
                  />
                </Link>
                <Card.Body>
                <div style={{display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text style={{ fontWeight: 'bold', color: 'black', fontSize: '20px' }}>Price: ₹{product.price}</Card.Text>
                  <OverallStarRating color={color}  />
                  </div>
                </Card.Body>
                <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Card.Footer>
                  <Link to='/cartpage'>
                    <Button variant="primary" onClick={() => handleAddToCart(product.name, product.price)} style={{width:'fit-content'}}>
                    <IconShoppingCart stroke={3} />Add to Cart</Button>
                  </Link>
                </Card.Footer>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default MobileProducts;
