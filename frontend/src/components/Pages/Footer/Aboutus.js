import React from 'react'
import style from '../../css/about.module.css'
import img1 from '../../Images/content1.jpeg'
import img2 from '../../Images/content2.jpg'
import img3 from '../../Images/content3.jpg'
import { Link } from 'react-router-dom'

function Aboutus() {
  return (
    <div className={style.aboutuscontainer}>
      <div className={style.logocontainer}>
      <img
        className={style.logoimage}
        src={img1}  
        alt='electronics and fashiion'
      />
      <img
        className={style.logoimage}
        src={img2} 
        alt='electronics and fashiion'
      />
      <img
        className={style.logoimage}
        src={img3} 
        alt='electronics and fashiion'
      />
      </div>
      <h1>Welcome to step fresh</h1>

      <div className={style.section}>
        <h2>Our Story</h2>
        <p>
        ShopVibe started with a simple idea: to create a one-stop shop for fashion and electronics enthusiasts. Founded by a group of passionate individuals, our journey has been driven by a desire to offer curated collections that cater to diverse tastes and preferences.
        </p>
      </div>

      <div className={style.section}>
        <h2>Our Mission</h2>
        <p>
        At ShopVibe, our mission is to provide a seamless shopping experience that combines the latest fashion trends with cutting-edge electronics. We aim to inspire and empower our customers to express their unique style and stay ahead of the curve.
        </p>
      </div>

      <div className={style.section}>
        <h2>Quality You Can Trust</h2>
        <p>
        We take pride in offering products of the highest quality. Each item in our collection undergoes rigorous testing to ensure durability, performance, and style. We believe that quality is not just a feature; it's a commitment to our customers.
        </p>
      </div>

      <div className={style.section}>
        <h2>Convenience Redefined</h2>
        <p>
          Embrace a new era of convenience with  SHOPVIBE. Bid farewell to long queues and heavy bags our user-friendly website and mobile app empower you to effortlessly browse, select, and order your groceries with just a few clicks. Customize your delivery preferences, and let us handle the rest while you savor the ease of modern  shopping.
        </p>
      </div>

      <div className={style.section}>
        <h2>Community Matters</h2>
        <p>
          Beyond being a virtual  store, we are proud members of your community. SHOPVIBE is committed to supporting local initiatives, minimizing our environmental footprint, and giving back to the neighborhoods we serve. Together, with your support, we can make a positive impact that resonates far beyond the realm of shopping.
        </p>
      </div>

      <div className={style.section}>
        <h2>Join Us on This Journey</h2>
        <p>
        Join the ShopVibe community and be part of a vibrant and dynamic shopping experience. Sign up for our newsletter to stay informed about the latest trends, exclusive offers, and exciting promotions. Let's shop smart and vibe right together!
        </p>
      </div>

      <footer className={style.footer}>
        <p>For inquiries, feedback, or just to say hello, <Link to='/Contact'>Contact us</Link>.</p>
        <p>Happy shopping!</p>
      </footer>
    </div>
  )
}

export default Aboutus