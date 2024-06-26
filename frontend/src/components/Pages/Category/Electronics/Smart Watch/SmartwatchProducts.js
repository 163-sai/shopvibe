import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button,Alert } from 'react-bootstrap';
import OverallStarRating from '../../Rating/OverallStarRating';
import { addToCart } from '../../../Cart/cartFunctions';
import { IconShoppingCart } from '@tabler/icons-react';

function SmartwatchProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const color = 'gold';
  const [cart, setCart] = useState([]);
  const [addedToCartMessage, setAddedToCartMessage] = useState('');

  useEffect(() => {
    console.log('fetching!')
    fetch('http://localhost:5001/api/smartwatch-products')
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
  

  const buyNow = (productId) => {
    console.log(`Buying product with ID ${productId} now`);
  };

  return (
    <Container  style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', marginTop:'50px', marginBottom:'100px' }}>
      <h1 style={{marginBottom:'50px'}}>SmartWatch Products</h1>
      {error && <p>{error}</p>}
      {addedToCartMessage && <Alert variant="success">{addedToCartMessage}</Alert>}
      <Row xs={12}  md={4} lg={3} className='g-4'>
        {products.map(product => (
          <Col key={product.id}>
            
            <Card className="mb-4" style={{ height: '100%',border:'none', borderBottom:'3px solid lightgrey', borderTop:'3px solid lightgrey'}}>
                <Link to={`/smartwatchproductdetails/${product.id}`}>
                <Card.Img
                    variant="top"
                    src={`data:image/png;base64,${product.image}`}
                    style={{objectFit:'cover', transition: 'transform 0.2s ease-in-out' }}
                    onMouseOver={e => { e.target.style.transform = 'scale(1.1)'; }}
                    onMouseOut={e => { e.target.style.transform = 'scale(1)'; }}
                  />
                </Link>
                <Card.Body>
                <div style={{display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                  <Card.Title>{product.name}</Card.Title>
                  {/*<Card.Text style={{ fontWeight: 'bold', color: 'black', fontSize: '20px' }}>Price: ₹{product.price}</Card.Text>*/}
                  <Card.Text style={{ fontWeight: 'bold', color: 'black', fontSize: '20px' }}>Price: ₹{parseInt(product.price)}</Card.Text>
                  <OverallStarRating color={color}  />
                  </div>
                </Card.Body>
                <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Card.Footer>
                  <Link to='/cartpage'>
                    <Button variant="primary" onClick={() => handleAddToCart(product.name, product.price)} 
                    style={{width:'fit-content', fontSize:'20px', backgroundColor:'#009FFD', border:'none', borderBottom:'3px solid black'}}>
                    <IconShoppingCart stroke={3} />Add to Cart</Button>
                  </Link>
                </Card.Footer>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
  );
}

export default SmartwatchProducts;
