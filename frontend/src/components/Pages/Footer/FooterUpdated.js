import React from 'react'
import { Col, Container, Nav, Row, Stack,Image } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import { IoLogoWhatsapp } from "react-icons/io";
import { BsFacebook } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { RiRefund2Fill } from 'react-icons/ri'; 
import { BiMoney } from 'react-icons/bi';
import '../../css/footer.updated.css'
import logo from '../../Images/SVS.png'

function FooterUpdated() {
  return (
    <>
    <footer>
       <Container fluid className="footer-container">
        <Row className='bg-black text-white p-4'>
            <Col>
                <Stack>
                    <Image src={logo} style={{width:'100px', height:'100px'}}/>
                </Stack>
            </Col>
            <Col>
                    <h2 className='footer-heading'>ShopVibe</h2>
                    <p className='footer-text'>Shop Smart, Vibe Right!</p>
            </Col>
            <Col>
                <Nav className="flex-column fs-5 col-sm-9 col-sm-6  footer-links">
                    <h2 className='footer-heading'>Company</h2>
                    <div className='footer-link'><NavLink to='/' className="text-white" style={{textDecoration:'none'}}>Home</NavLink></div>
                    <div className='footer-link'><NavLink to='/Aboutus' className="text-white" style={{textDecoration:'none'}}>Aboutus</NavLink></div>
                    <div className='footer-link'><NavLink to='/privacypolicy' className="text-white" style={{textDecoration:'none'}}>Privacy Policy</NavLink></div>
                    <div className='footer-link'><NavLink to='/terms' className="text-white" style={{textDecoration:'none'}}>Terms & Conditions</NavLink></div>
                </Nav>
            </Col>
            <Col>
                <Nav className="flex-column fs-5 col-sm-9 col-sm-6 footer-links">
                    <h2 className='footer-heading'>Explore</h2>
                    <div className='footer-link'><NavLink to='/electronics' className="text-white" style={{textDecoration:'none'}}>Electronics</NavLink></div>
                    <div className='footer-link'><NavLink to='/fashion' className="text-white" style={{textDecoration:'none'}}>Fashion</NavLink></div>
                </Nav>
            </Col>
            <Col>
                <Nav className="flex-column fs-5  col-sm-9 col-sm-6  footer-links">
                    <h2 className='footer-heading'>Customer Services</h2>
                    <div className='footer-link'><NavLink to='/contact' className="text-white" style={{textDecoration:'none'}}>Contact US</NavLink></div>
                    <div className='footer-link'><NavLink to='/trackorder' className="text-white" style={{textDecoration:'none'}}>Track Order</NavLink></div>
                    <div className='footer-link'><NavLink to='/return&refund' className="text-white" style={{textDecoration:'none'}}>Returns & Refunds</NavLink></div>
                    <div className='footer-link'><NavLink to='/faq' className="text-white" style={{textDecoration:'none'}}>FAQs</NavLink></div>
                    <div className='footer-link'><NavLink to='/profile' className="text-white" style={{textDecoration:'none'}}>My Account</NavLink></div>
                </Nav>
            </Col>
            <Col>
            <div style={{ textAlign: 'center' }}>

                <Nav className="flex-column fs-5 col-sm-9 col-sm-6 footer-links">
                    <h2 className='footer-heading'  >Connect With Us</h2>
                    <div style={{ display: 'inline-block' }}><NavLink to='https://www.facebook.com' className="text-white"><BsFacebook/></NavLink></div>
                    <div style={{ display: 'inline-block' }}><NavLink to='https://www.whatsapp.com' className="text-white"><IoLogoWhatsapp/></NavLink></div>
                    <div style={{ display: 'inline-block' }}><NavLink to='https://www.twitter.com' className="text-white"><BsTwitter/></NavLink></div>
                    <div style={{ display: 'inline-block' }}><NavLink to='https://www.instagram.com' className="text-white"><AiFillInstagram/></NavLink></div>
                </Nav>
            </div>
            </Col>
            <Row>
                <Col>
                <div><h5 className='mb-0 ms-2 col-sm-9 col-sm-6'><RiRefund2Fill className='me-2'/><Link to='/contact' className="text-decoration-none text-white">15 Days return policy*</Link></h5></div>
                </Col>
                <Col>
                <div><h5 className='mb-0 ms-2 col-sm-9 col-sm-6'><BiMoney className='me-2' />Cash on delivery Available*</h5></div>
                </Col>
            </Row>
        </Row>
        <Row className='bg-white text-black p-2'>
          <Col className='text-center'>
            <p className='mb-0'>&copy; {new Date().getFullYear()} ShopVibe. All rights reserved.</p>
          </Col>
        </Row>
       </Container>
    </footer>
    </> 
  )
}

export default FooterUpdated
