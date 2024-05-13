import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import OverallStarRating from '../../Rating/OverallStarRating';
import { addToCart } from '../../../Cart/cartFunctions';
import { IconShoppingCart } from '@tabler/icons-react';

function MenFashion() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const color = 'gold';
  const [cart, setCart] = useState([]);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5001/api/menfashion')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const handleAddToCart = (productName, productPrice) => {
    if (!selectedSize) { 
      console.error('Please select a size.');
      return;
    }
    const newProduct = { name: productName, price: productPrice, quantity: 1, size: selectedSize };
    addToCart([newProduct]);
    setShowAddedMessage(true);
    setTimeout(() => {
      setShowAddedMessage(false);
    }, 3000);
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', padding:'50px 0px' }}>
      <Container>
        {showAddedMessage && <Alert variant="success">Added to Cart!</Alert>}
        <h1 style={{marginBottom:'50px'}}>Men Fashions</h1>
        {error && <p>{error}</p>}
        <Row xs={12} sm={6} md={4} lg={3} className='g-4'>
          {products.map(product => (
            <Col key={product.id}>
              <div style={{padding:'10px 0px'}}>
              <Card className="mb-4" style={{ height: '100%',border:'none', borderBottom:'3px solid lightgrey', borderTop:'3px solid lightgrey'}}>
                <Link to={`/menfashiondetails/${product.id}`}>
                  <Card.Img
                    variant="top"
                    src={`data:image/png;base64,${product.image}`}
                    style={{ transition: 'transform 0.2s ease-in-out' }}
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
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between' }}>
                <h3 style={{fontWeight:'bold', fontSize:'20px', marginRight: '10px', marginBottom: '0'}}>Select Size</h3>
                      <Button
                        variant="outline-secondary"
                        className={selectedSize === 'S' ? 'active' : ''}
                        onClick={() => setSelectedSize('S')} 
                        style={{ width: '40px', height: '40px', borderRadius: '50%', textAlign: 'center', padding: '0', lineHeight: '40px', marginBottom: '10px' }}
                      >
                        S
                      </Button>
                      <Button
                        variant="outline-secondary"
                        className={selectedSize === 'M' ? 'active' : ''}
                        onClick={() => setSelectedSize('M')} 
                        style={{ width: '40px', height: '40px', borderRadius: '50%', textAlign: 'center', padding: '0', lineHeight: '40px', marginBottom: '10px' }}
                      >
                        M
                      </Button>
                      <Button
                        variant="outline-secondary"
                        className={selectedSize === 'L' ? 'active' : ''}
                        onClick={() => setSelectedSize('L')} 
                        style={{ width: '40px', height: '40px', borderRadius: '50%', textAlign: 'center', padding: '0', lineHeight: '40px', marginBottom: '10px' }}
                      >
                        L
                      </Button>
                      <Button
                        variant="outline-secondary"
                        className={selectedSize === 'XL' ? 'active' : ''}
                        onClick={() => setSelectedSize('XL')} 
                        style={{ width: '40px', height: '40px', borderRadius: '50%', textAlign: 'center', padding: '0', lineHeight: '40px', marginBottom: '10px' }}
                      >
                        XL
                      </Button>
                      <Button
                        variant="outline-secondary"
                        className={selectedSize === 'XXL' ? 'active' : ''}
                        onClick={() => setSelectedSize('XXL')} 
                        style={{ width: '40px', height: '40px', borderRadius: '50%', textAlign: 'center', padding: '0', lineHeight: '40px', marginBottom: '10px' }}
                      >
                        XXL
                      </Button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '30px',marginTop:'30px', border:'none', borderBottom:'2px solid lightgrey', padding:'10px' }}>
                    <Button
                      variant="primary"
                      onClick={() => handleAddToCart(product.name, product.price)}
                      disabled={!selectedSize} 
                      style={{ width: 'fit-content' }}
                    >
                  <IconShoppingCart stroke={3} />Add to Cart</Button>
                  </div>
                </Card.Footer>
                </div>
              </Card>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default MenFashion;

