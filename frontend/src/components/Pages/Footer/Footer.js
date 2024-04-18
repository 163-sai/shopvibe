import React from 'react'
import style from "../../css/footer.module.css"
import { IoLogoWhatsapp } from "react-icons/io";
import { BsFacebook } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { Link } from 'react-router-dom'


function Footer() {
  return (
    <div className={style.footer}>
      <div className={style.firstline}>
        <div className={style.box1}>
         
            <div className={style.box3}>
              <h6>COD Available </h6>
              <h6>30 Days Easy Returns</h6> 
            </div>

            <div className={style.box2}>
              <h3>Explore </h3>
              <li><Link className={style.lists} to='/Aboutus'> About us</Link> </li>
              <li ><Link className={style.lists} to='/Faq'> Help & FAQs</Link> </li> 
            </div>
            <div className={style.box3}>
              <h3>Our links </h3>
              <li ><Link className={style.lists} to='/Contact'> Contact us</Link> </li> 
              <li ><Link className={style.lists} to='/Locate'> Locate Store</Link> </li>
            </div>
          <div className={style.icon}>
              <h3>Follow us on</h3>
              <div className={style.social}>
                <div className={style.log} >
                  <BsFacebook/>
                </div>
                 <div className={style.log}>
                  <AiFillInstagram/>
                </div>
                <div className={style.log}>
                  <BsTwitter/>
                </div>
                <div className={style.log}>
                  <IoLogoWhatsapp/>
                </div>
              </div></div>
               
      </div>
        </div>
          <div className={style.lastline}>
            <Link to='/terms' className={style.lii}> Terms and Conditions </Link>
            <Link to='/privacypolicy' className={style.lii}> Our Privacy Policy  </Link>
            <Link to='/shipping details' className={style.lii}> Shipping Details  </Link>
            <Link to='/refund' className={style.lii}> Refund Policy </Link>
          </div>
    </div>
  )
}

export default Footer