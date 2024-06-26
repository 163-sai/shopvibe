import React, { useState }  from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import axios from 'axios';
import Register from "./components/Login/Register";
import NavBar from './components/Pages/Nav/NavBar';
import Home from "./components/Pages/Nav/Home";
import Login from "./components/Login/Login";
import Categories from './components/Pages/Category/Categories'
import Contact from './components/Pages/Footer/Contact';
import Aboutus from './components/Pages/Footer/Aboutus';
import Terms from './components/Pages/Footer/Terms';
import Privacypolicy from "./components/Pages/Footer/Privacypolicy";
import Electronics from "./components/Pages/Category/Electronics";
import Fashion from "./components/Pages/Category/Fashion";
import MobileProducts from "./components/Pages/Category/Electronics/Mobile/MobileProducts";
import LaptopProducts from "./components/Pages/Category/Electronics/Laptop/LaptopProducts";
import SmartwatchProducts from "./components/Pages/Category/Electronics/Smart Watch/SmartwatchProducts";
import MenFashion from "./components/Pages/Category/Fashion/Men/MenFashion";
import ProductDetails from "./components/Pages/Category/Electronics/Mobile/ProductDetails";
import LaptopProductDetails from "./components/Pages/Category/Electronics/Laptop/LaptopProductDetails";
import SmartwatchProductDetails from "./components/Pages/Category/Electronics/Smart Watch/SmartwatchProductDetails";
import MenFashionDetails from "./components/Pages/Category/Fashion/Men/MenFashionDetails";
import CartPage from "./components/Pages/Cart/CartPage";
import CheckoutPage from "./components/Pages/Checkout/CheckoutPage";
import Profile from "./components/Pages/Profile/Profile";
import WomenFashion from "./components/Pages/Category/Fashion/Women/WomenFashion";
import KidFashion from "./components/Pages/Category/Fashion/Kid/KidFashion";
import WomenFashionDetails from "./components/Pages/Category/Fashion/Women/WomenFashionDetails";
import KidFashionDetails from "./components/Pages/Category/Fashion/Kid/KidFashionDetails";
import Membership from "./components/Pages/Nav/Membership";
import AdminDashboard from "./components/Pages/Admin/AdminDashboard";
import ProductManagement from "./components/Pages/Admin/ProductManagement";
import OrderManagement from "./components/Pages/Admin/OrderManagement";
import UserManagement from "./components/Pages/Admin/UserManagement";
import FooterUpdated from "./components/Pages/Footer/FooterUpdated";
import TrackOrder from "./components/Pages/Profile/TrackOrder";
import ReturnsRefunds from "./components/Pages/Footer/ReturnsRefunds";
import Faq from "./components/Pages/Footer/Faq";
import Orders from "./components/Pages/Profile/Orders";
import OfferProducts from "./components/Pages/Nav/OfferProducts";
import ScrollToTop from "./components/Pages/Nav/ScrollToTop";
import TrackOrders from "./components/Pages/Footer/TrackOrders";
import ProfilePage from "./components/Pages/Profile/ProfilePage";
import { CartItemCountProvider } from './components/Pages/Cart/CartItemCount';



function App() {

  const [user, setUser] = useState(null);
  
  const fetchUserData = () => {
    axios.get('http://localhost:5001/profile')
      .then(res => {
        setUser(res.data); 
      })
      .catch(err => console.error(err));
  };

  

  return (
  <>
  <CartItemCountProvider>
  <PrimeReactProvider>
   <MantineProvider>
    <Router>
      <ScrollToTop />
      <div className="navbar-container">
        <NavBar />
      </div>
    <div className="body-wrapper">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setUser={setUser} fetchUserData={fetchUserData}/>} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/profilepage" element={<ProfilePage />} />
        <Route path="/myorders" exact element ={<Orders/>}/>
        <Route path="/category" exact element ={<Categories/>}/>
        <Route path="/electronics" exact element ={<Electronics/>}/>
        <Route path="/fashion" exact element ={<Fashion/>}/>
        <Route path="/offerproducts" exact element ={<OfferProducts/>}/>
        <Route path="/mobileproducts" exact element ={<MobileProducts/>}/>
        <Route path="/laptopproducts" exact element ={<LaptopProducts/>}/>
        <Route path="/smartwatchproducts" exact element ={<SmartwatchProducts/>}/>
        <Route path="/menfashion" exact element ={<MenFashion/>}/>
        <Route path="/womenfashion" exact element ={<WomenFashion/>}/>
        <Route path="/kidfashion" exact element ={<KidFashion/>}/>
        <Route path="/cartpage" exact element ={<CartPage />}/>
        <Route path="/checkoutpage" exact element ={<CheckoutPage />}/>
        <Route path="/productdetails/:productId" exact element ={<ProductDetails/>}/>
        <Route path="/laptopproductdetails/:productId" exact element ={<LaptopProductDetails/>}/>
        <Route path="/smartwatchproductdetails/:productId" exact element ={<SmartwatchProductDetails/>}/>
        <Route path="/menfashiondetails/:productId" exact element ={<MenFashionDetails/>}/>
        <Route path="/womenfashiondetails/:productId" exact element ={<WomenFashionDetails/>}/>
        <Route path="/kidfashiondetails/:productId" exact element ={<KidFashionDetails/>}/>
        <Route path="/Aboutus"exact element={<Aboutus/>}/>
        <Route path="/Contact"exact element={<Contact/>}/>
        <Route path="/Terms" exact element={<Terms/>}/>
        <Route path="/faq" exact element={<Faq/>}/>
        <Route path="/trackorder" exact element={<TrackOrder/>}/>
        <Route path="/trackorders" exact element={<TrackOrders/>}/>
        <Route path="/return&refund" exact element={<ReturnsRefunds/>}/>
        <Route path="/membership" exact element={<Membership/>}/>
        <Route path="/privacypolicy" exact element={<Privacypolicy/>}/>
        <Route path="/admindashboard" exact element={<AdminDashboard/>}/>
        <Route path="/productmanagement" exact element={<ProductManagement/>}/>
        <Route path="/ordermanagement" exact element={<OrderManagement/>}/>
        <Route path="/usermanagement" exact element={<UserManagement/>}/>
      </Routes>
    </div>
      <FooterUpdated />
      {/*<Footer />*/}
    </Router>
    </MantineProvider>
    </PrimeReactProvider>
    </CartItemCountProvider>
  </>
  );
}

export default App;


