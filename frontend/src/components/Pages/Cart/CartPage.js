import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IconTrash, IconPlus, IconMinus } from '@tabler/icons-react'; 
import ship from '../../Images/shipping.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
// import { Badge } from 'primereact/badge';
        

function CartPage() {
  const [cart, setCart] = useState([]);
  const cartItemCount = cart.reduce((total, product) => total + product.quantity, 0);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.location.href = window.location.href;
  };

  const incrementQuantity = (index) => {
    const newCart = [...cart];
    newCart[index].quantity++;
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const decrementQuantity = (index) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity--;
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  return (
    <div style={{  display: 'flex', flexDirection: 'column', marginTop:'50px' }}>
      <Container>
        <h1>Shopping Cart  ({cartItemCount} Items) </h1>
        <Table striped bordered hover style={{border:'none', borderBottom:'2px solid blue' }}  responsive>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th  style={{width:'50px', textAlign:'center'}}>Quantity</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((product, index) => (
              <tr key={index}>
                <td>{product.name}{product.size ? ` - Size: ${product.size}` : ''}</td>
                <td>₹{product.price}</td>
                <td>
                <div style={{display:'flex',justifyContent:'center', alignItems:'center', width:'min-content'}}>
                  {/* <Button variant="light" onClick={() => decrementQuantity(index)} style={{width:'fit-content', marginRight: '30px' }}><IconMinus /></Button> */}
                  <button className='btn-add-minus' onClick={() => decrementQuantity(index)}><IconMinus /></button>
                 <span className='qtn-display'> {product.quantity}</span>
                  <button className='btn-add-minus' onClick={() => incrementQuantity(index)}><IconPlus /></button>
                  {/* <Button variant="light" onClick={() => incrementQuantity(index)} style={{width:'fit-content', marginLeft: '30px', marginRight: '0px' }}><IconPlus /></Button> */}
                </div>
                </td>

                <td>₹{product.price * product.quantity}</td>
                <td>
                <div style={{display:'flex',justifyContent:'center', alignItems:'center' }}>
                  <Button variant="danger" onClick={() => removeFromCart(index)}><IconTrash /></Button>
                </div>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="3"><strong>Total</strong></td>
              <td><strong>₹{calculateTotal()}</strong></td>
              <td>
                <div style={{display:'flex',justifyContent:'center', alignItems:'center' }}>
                <Link to={`/checkoutpage?names=${cart.map(product => product.name).join(',')}&total=${calculateTotal()}`}>
                  <Button variant="primary" style={{width:'100%' }}>Checkout</Button>
                </Link>
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
        <Link to='/'>
          <Button variant='primary' style={{display: 'flex', justifyContent: 'center',  width:'fit-content'}}><FontAwesomeIcon icon={faBackward} style={{marginRight:'10px'}} />Back to Shopping</Button>
        </Link>
      </Container>
      <Container style={{display: 'flex', justifyContent: 'center',alignItems:'center', padding:'100px 0px' }}>
      <img src={ship} alt="Ship" style={{ maxWidth: '100%', height: '100%', objectFit: 'contain' }} />
    </Container>
    </div>
  );
}

export default CartPage;




{/*
import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons';
import { IconTrash } from '@tabler/icons-react';

function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  const handleProceedToCheckout = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate(`/checkoutpage?names=${cart.map(product => product.name).join(',')}&total=${calculateTotal()}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container>
        <h1>Shopping Cart</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((product, index) => (
              <tr key={index}>
                <td>{product.name}{product.size ? ` - Size: ${product.size}` : ''}</td>
                <td>₹{product.price}</td>
                <td>{product.quantity}</td>
                <td>₹{product.price * product.quantity}</td>
                <td>
                  <Button variant="danger" onClick={() => removeFromCart(index)}><IconTrash /></Button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="3"><strong>Total</strong></td>
              <td><strong>₹{calculateTotal()}</strong></td>
              <td>
                <Button variant="primary" onClick={handleProceedToCheckout}>Proceed to Checkout</Button>
              </td>
            </tr>
          </tbody>
        </Table>
        
        <Link to='/'>
          <Button variant='primary' style={{display: 'flex', justifyContent: 'center' }}><ArrowLeft />Back to Shopping</Button>
        </Link>
      </Container>
    </div>
  );
}

export default CartPage;

*/ }