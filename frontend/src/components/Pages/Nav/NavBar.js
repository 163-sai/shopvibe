import React, { useState} from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Popover, OverlayTrigger, CardTitle, Button,Tooltip } from 'react-bootstrap';
import axios from 'axios';
import logo from '../../Images/SVS.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faRightFromBracket, faRightToBracket, faUser } from '@fortawesome/free-solid-svg-icons';



function NavBar({ cartItemCount }) {
  const [userData, setUserData] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);
  const navigate = useNavigate();




  const handleProfileClick = async () => {
    try {
      const response = await axios.get('http://localhost:5001/profile', { withCredentials: true });
      const { name, email } = response.data;
      console.log('User data:', name, email);
      setUserData({ name, email });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5001/logout');
      setUserData(null);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };


  
  const renderTooltip = (text) => (
    <Tooltip>{text}</Tooltip>
  );


  const ProfilePopover = (
    <Popover id="popover-trigger-click-root-close" title="Popover bottom">
      <Popover.Header style={{ backgroundColor: 'black', color:'white' }}>{userData?.name}</Popover.Header>
      <Popover.Body>
        <p style={{ backgroundColor: 'white' }}>{userData?.email}</p>
        <Link to='/myorders'><Button style={{width:'fit-content'}} className='bg-dark'>My Orders</Button></Link>
        {userData ? (
          <Button variant="primary" onClick={handleLogout} style={{ width: 'fit-content', justifyItems: 'center', marginLeft:'10px' }} className='bg-dark'><FontAwesomeIcon icon={faRightFromBracket} /></Button>
        ) : (
          <NavLink to='/login'>
            <Button variant="primary" style={{ width: 'fit-content', justifyContent:'center', marginLeft:'10px'}} className='bg-dark'><FontAwesomeIcon icon={faRightToBracket} /></Button>
          </NavLink>
        )}
      </Popover.Body>
    </Popover>
  );
  

  return (
    <>
    <Navbar expand="lg" className="bg-light text-dark">
      <Container fluid>
        <Navbar.Brand style={{marginBottom:'5px',marginRight:'50px'}}>
          <NavLink to='/'>
            <img
              src={logo}
              width="fit-content"
              height="50"
              className="d-inline-block align-top"
              alt="ShopVibe Logo"
            />
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" style={{width:'100%'}}>
{/* category */}
          <Nav className="me-auto " style={{width:'100%', alignItems: 'center', display: 'flex', flexWrap: 'wrap',justifyContent:'center', alignItems:'center', gap:'20px', marginRight:'auto',marginLeft:'auto'}}>
            <div style={{display:'flex', flexDirection:'row', flexGrow:'1'}} className='test'> 
                <NavLink to='/mobileproducts' className="nav-link" activeClassName="active"  style={{ textDecoration: 'none', fontWeight: 'bold', color: 'black'}}>Mobile</NavLink><span className='seperator' style={{display:'flex', alignItems:'center'}}>|</span>
                <NavLink to='/laptopproducts' className="nav-link" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'black' }}>Laptop</NavLink><span className='seperator' style={{display:'flex', alignItems:'center'}}>|</span>
                <NavLink to='/smartwatchproducts' className="nav-link" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'black' }}>Smartwatch</NavLink><span className='seperator' style={{display:'flex', alignItems:'center'}}>|</span>
                <NavLink to='/menfashion' className="nav-link" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'black' }}>Men</NavLink><span className='seperator' style={{display:'flex', alignItems:'center'}}>|</span>
                <NavLink to='/womenfashion' className="nav-link" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'black' }}>Women</NavLink><span className='seperator' style={{display:'flex', alignItems:'center'}}>|</span>
                <NavLink to='/kidfashion' className="nav-link" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'black' }}>Kid</NavLink>
            </div>           

  {/* user */}
  <div style={{display:'flex', flexDirection:'row' }} className='procart'> 
            <OverlayTrigger
              trigger="click"
              rootClose
              placement="bottom"
              overlay={ProfilePopover}
            >
              <NavLink onClick={handleProfileClick} style={{display:'flex',alignItems:'center', padding:'0 10px',color: 'black', textDecoration: 'none', fontSize: '20px', cursor: 'pointer',
               borderBottom: hoveredLink === 'profile' ? '2px solid #333' : 'none',
              }}
              onMouseEnter={() => setHoveredLink('profile')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <FontAwesomeIcon icon={faUser} /></NavLink>
            </OverlayTrigger>
            
  {/* cart */}

            <OverlayTrigger placement="bottom" overlay={renderTooltip('Cart')}>
            <NavLink to='/cartpage' style={{ padding:'0 10px', color: 'black', textDecoration: 'none', fontSize: '20px',
             borderBottom: hoveredLink === 'cart' ? '2px solid #333' : 'none'
            }}
            onMouseEnter={() => setHoveredLink('cart')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <FontAwesomeIcon icon={faCartShopping} />Cart({ cartItemCount })</NavLink>
            </OverlayTrigger>


{/* login/logout */}
            {userData ? (
                  <OverlayTrigger placement="bottom" overlay={renderTooltip('Logout')}>
                    {/* <Nav.Link> */}
                      <NavLink to='/' onClick={handleLogout} style={{ padding:'0 10px',  color: 'black', textDecoration: 'none', fontSize: '20px',
                        borderBottom: hoveredLink === 'logout' ? '2px solid #333' : 'none',
                      }}
                      onMouseEnter={() => setHoveredLink('logout')}
                      onMouseLeave={() => setHoveredLink(null)}
                      ><FontAwesomeIcon icon={faRightFromBracket} />
                      </NavLink>
                    {/* </Nav.Link> */}
                  </OverlayTrigger>
            ) : (
              <OverlayTrigger placement="bottom" overlay={renderTooltip('Login')}>
              {/* <Nav.Link> */}
                <NavLink to='/login' style={{ padding:'0 10px',  color: 'black', textDecoration: 'none', fontSize: '20px' ,
                  borderBottom: hoveredLink === 'login' ? '2px solid #333' : 'none',
                }}
                onMouseEnter={() => setHoveredLink('login')}
                onMouseLeave={() => setHoveredLink(null)}
                ><FontAwesomeIcon icon={faRightToBracket} />
                </NavLink>
              {/* </Nav.Link> */}
            </OverlayTrigger>            
            )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    {/* <Navbar expand="lg" className="bg-light text-dark second-navbar">
        <Container fluid>
          <Nav className="me-auto test" style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', gap:'20px', width:'100%'}}>
            
                <NavLink to='/mobileproducts' className="nav-link" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'black' }}>Mobile</NavLink><span className='seperator'>|</span>
                <NavLink to='/laptopproducts' className="nav-link" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'black' }}>Laptop</NavLink><span className='seperator'>|</span>
                <NavLink to='/smartwatchproducts' className="nav-link" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'black' }}>Smartwatch</NavLink><span className='seperator'>|</span>
                <NavLink to='/menfashion' className="nav-link" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'black' }}>Men</NavLink><span className='seperator'>|</span>
                <NavLink to='/womenfashion' className="nav-link" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'black' }}>Women</NavLink><span className='seperator'>|</span>
                <NavLink to='/kidfashion' className="nav-link" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'black' }}>Kid</NavLink>
             
          </Nav>
        </Container>
      </Navbar> */}
    </>
  );
}

export default NavBar;



