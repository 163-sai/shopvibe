import React from 'react'
import style from '../../css/terms.module.css'
import { Link } from 'react-router-dom'

function Terms() {
  return (
    <div className={style.termscontainer}>
    <h1 className={style.title}>Terms and Conditions</h1>
    <p>Welcome to SHOPVIBE!</p>

    <h2>1. License to Use</h2>
    <p>1.1. You must be at least 18 years of age to use this website...</p>
    <p>1.2. Subject to the terms and conditions set forth herein...</p>

    <h2>2. Ordering and Payment</h2>
    <p>2.1. When placing an order through Shopvibe...</p>
    <p>2.2. You agree to pay all charges incurred by users of your credit card...</p>
    <p>2.3. Shopvibe reserves the right to refuse any order you place with us...</p>

    <h2>3. Delivery and Returns</h2>
    <p>3.1. Shopvibe will make every effort to deliver the products to you...</p>
    <p>3.2. For information regarding returns and refunds, please refer to our <a href="/returns-policy">Returns Policy</a>...</p>

    <h2>4. Privacy Policy</h2>
    <p>4.1. Your use of Shopvibe is also governed by our Privacy Policy...</p>
    <p>Please review our Privacy Policy <Link to="/privacypolicy">here..</Link></p>

    <h2>5. User Account</h2>
    <p>5.1. You are responsible for maintaining the confidentiality of your account and password...</p>
    <p>5.2. Step Fresh reserves the right to refuse service, terminate accounts...</p>

    <h2>6. Changes to Terms</h2>
    <p>6.1. Shopvibe reserves the right to modify these terms and conditions at any time...</p>
    <p>Changes will be effective immediately upon posting to the website...</p>

    <h2>7. Governing Law</h2>
    <p>7.1. These terms and conditions are governed by and construed in accordance with the laws of  Jurisdiction...</p>

    <h2>Contact Information</h2>
    <p>If you have any questions or concerns regarding these terms and conditions, please contact us at shopvibe@gmail.com...</p>

    <p className={style.lastupdated}>Last updated: 2024</p>
  </div>
  )
}

export default Terms