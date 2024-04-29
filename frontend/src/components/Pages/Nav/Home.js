import React, { useEffect, useState } from 'react';
import { Card, Carousel, Col, Container, Row, Button, Image, Figure, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ban from '../../Images/homebanner.webp';
import ban4 from '../../Images/hb4.webp';
import ban7 from '../../Images/smartwatch.jpg';
import offer from '../../Images/smiling-girl.png';
import men from '../../Images/offer5-removebg-preview.png';
import women from '../../Images/women.webp';
import kid from '../../Images/kid.jpg';
import mobile from '../../Images/mobile.jpg';
import laptop from '../../Images/laptop.jpg';
import smartwatch from '../../Images/smartwatch.jpg';
import membership from '../../Images/subscription banner.webp';
import axios from 'axios';
import { addToCart } from '../Cart/cartFunctions';
import OverallStarRating from '../Category/Rating/OverallStarRating';
import { IconShoppingCart } from '@tabler/icons-react';
import ChatBot from 'react-simple-chatbot';
// import { ThemeProvider } from 'styled-components';



const Home = () => {
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const color = 'gold';
  const [addedToCartMessage, setAddedToCartMessage] = useState('');
  const navigate = useNavigate();

 const steps=[
    {
      id: '1',
      message: 'What is your name?',
      trigger: '2',
    },
    {
      id: '2',
      user: true,
      trigger: '3',
    },
    {
      id: '3',
      message: 'Hi {previousValue}, nice to meet you!',
      trigger: '4',
    },
    {
      id: '4',
      options: [
        { value: 1, label: 'electronics', handler: () => navigate('/electrnics'),},
        { value: 2, label: 'fashion', handler: () => navigate('/fashion'),},

    ],
      end: true,
    },
  ]



const config = {
  floating: true,
};

  useEffect(() => {
    axios.get('http://localhost:5001/api/top-selling-products')
      .then(response => {
        setTopSellingProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching top selling products:', error);
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



  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <>
    <div className='home'>
    <Carousel >
      <Carousel.Item as={Link} to="/menfashion"  interval={3000}>
        <img src={ban} alt="First slide" style={{ width: '100%', height: '700px', objectFit: 'cover' }} />
        <Carousel.Caption>
          <h3>MENS</h3>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item as={Link} to="/womenfashion"  interval={1000}>
        <img src={ban4} alt="Second slide" style={{ width: '100%', height: '700px', objectFit: 'cover' }} />
        <Carousel.Caption>
          <h3>Womens</h3>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item as={Link} to="/smartwatchproducts"  interval={3000}>
        <img src={ban7} alt="Third slide" style={{ width: '100%', height: '700px', objectFit: 'cover' }} />
        <Carousel.Caption>
          <h3>Smart Watches</h3>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

    <div style={{ display: 'flex', flexDirection: 'column',padding:'50px 0px 200px 0px' }} className='bg-light rounded'>
    <Container>
      <h1 style={{textAlign:"center"}}>Top Selling Products</h1>
      {addedToCartMessage && <Alert variant="success">{addedToCartMessage}</Alert>}
      <Row style={{marginTop:'50px'}} className="mt-3" >
        {topSellingProducts.map(product => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card className='h-100' style={{ border: 'none', borderBottom: '2px solid lightgray' }}>
            <Card.Img
                  variant='top'
                  src={`data:image/png;base64,${product.image}`}
                  onMouseEnter={() => setHoveredCard(product.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    height: '300px',
                    objectFit:'cover',
                    transform: hoveredCard === product.id ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.2s ease-in-out'
                  }}
                />
              <Card.Body style={{display:'flex', flexDirection:'column',justifyContent:'center', alignItems:'center'}}>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>Price: ₹{product.price}</Card.Text>  
                <OverallStarRating color={color}  />
              </Card.Body>
              <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '30px',marginTop:'30px' }}>
              <Card.Footer>
              <Button variant="primary" onClick={() => handleAddToCart(product.name, product.price)} 
               style={{width:'fit-content', fontSize:'20px', backgroundColor:'#009FFD', border:'none', borderBottom:'3px solid black'}}
              ><IconShoppingCart stroke={3} />Add to Cart</Button>
              </Card.Footer>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    </div>
    
    <Container fluid className="offer-container" style={{  display: 'flex', flexDirection: 'column' }}>
      <Row className="justify-content-center align-items-center bg-light rounded " style={{border:'none',borderTop:'5px solid grey',borderBottom:'5px solid grey'}}>
        <Col xs={12} sm={6} md={4} lg={4} className="text-center mb-3 mb-md-0 " style={{marginTop:'-200px'}}>
          <Image  variant='top'  src={offer} alt="Offer" fluid className="offer-image" 
          onMouseOver ={() => setHoveredCard('offer')} 
          onMouseLeave={() => setHoveredCard(null)}
          style={{
            transform: hoveredCard === 'offer' ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.2s ease-in-out'
          }}
         />
        </Col>
        <Col xs={12} sm={6} md={4} lg={4} className="text-md-start">
          <h2 className="mb-3">Products On OFFER!</h2>
          <Link to='/offerproducts'><Button variant="dark" className="px-4 py-2">GRAB THIS OFFER</Button></Link>
        </Col>
      </Row>
    </Container>
    
    <Container className='figure' style={{  display: 'flex', flexDirection: 'column',padding:'10px 0px', justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{textAlign:"center", marginBottom:'30px'}} className="text-center mb-3">Our Categories Of Products</h1>
    <Row>
      <Col>
        <Figure>
          <Link to='/menfashion'>
            <Figure.Image   className='p-4 bg-light rounded ' alt='men' src={men} 
            onMouseOver ={() => setHoveredCard('men')} 
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              transform: hoveredCard === 'men' ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.2s ease-in-out'
            }} />
          </Link>
        </Figure>
      </Col>
      <Col>
        <Figure>
          <Link to='/womenfashion'>
            <Figure.Image   className='p-4 bg-light rounded' alt='women' src={women} 
            onMouseOver ={() => setHoveredCard('women')} 
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              transform: hoveredCard === 'women' ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.2s ease-in-out'
            }}/>
          </Link>
        </Figure>
      </Col>
      <Col>
        <Figure>
          <Link to='/kidfashion'>
            <Figure.Image  className='p-4 bg-light rounded' alt='kid' src={kid} 
            onMouseOver ={() => setHoveredCard('kid')} 
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              transform: hoveredCard === 'kid' ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.2s ease-in-out',width: '416px', height: '416px'
            }}/>
          </Link>
        </Figure>
      </Col>
    </Row>
    <Row>
    <Col>
        <Figure>
          <Link to='/mobileproducts'>
            <Figure.Image  className='p-4 bg-light rounded ' alt='mobile' src={mobile}
            onMouseOver ={() => setHoveredCard('mobile')} 
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              transform: hoveredCard === 'mobile' ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.2s ease-in-out',width: '416px', height: '416px'
            }}             />
          </Link>
        </Figure>
      </Col>
      <Col>
        <Figure>
          <Link to='/laptopproducts'>
            <Figure.Image   className='p-4 bg-light rounded ' alt='laptop' src={laptop} 
             onMouseOver ={() => setHoveredCard('laptop')} 
             onMouseLeave={() => setHoveredCard(null)}
             style={{
               transform: hoveredCard === 'laptop' ? 'scale(1.1)' : 'scale(1)',
               transition: 'transform 0.2s ease-in-out',width: '416px', height: '416px'
             }}  />
          </Link>
        </Figure>
      </Col>
      <Col>
        <Figure>
          <Link to='/smartwatchproducts'>
            <Figure.Image   className='p-4 bg-light rounded ' alt='laptop' src={smartwatch} 
             onMouseOver ={() => setHoveredCard('swatch')} 
             onMouseLeave={() => setHoveredCard(null)}
             style={{
               transform: hoveredCard === 'swatch' ? 'scale(1.1)' : 'scale(1)',
               transition: 'transform 0.2s ease-in-out',width: '416px', height: '416px'
             }}  />
          </Link>
        </Figure>
      </Col>
    </Row>
    </Container> 

    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Link to='/membership'>
      <Figure.Image className='p-4 bg-light rounded' alt='laptop' src={membership} fluid  style={{justifyContent:'center'}} />
    </Link>
    </Container>
    <Container>
                <ChatBot
                    headerTitle="ShopVibeBot"
                    steps={steps}
                    {...config}
 
                />
          
    </Container>
    </div>
  </>
  );
};

export default Home;




