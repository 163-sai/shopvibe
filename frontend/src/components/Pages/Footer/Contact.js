import React from 'react'
import style from '../../css/contact.module.css'

function Contact() {
  return (
    
 
    <div className={style.contactUsContainer} style={{marginTop:'50px', marginBottom:'50px'}}>
      <div className={style.quoteContainer}>
        <h2>Experience the Convenience of Online  Shopping</h2>
        <p>
          "Shop from the comfort of your home and have your products delivered right to your doorstep.
          Enjoy a hassle-free shopping experience with a wide range of products at your fingertips."
        </p>
      </div>
      <div className={style.formContainer}>
        <h2>Contact Us</h2>
        <form>
        
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="phone">Phone:</label>
          <input type="tel" id="phone" name="phone" required />

          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" rows="4" required></textarea>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}



export default Contact