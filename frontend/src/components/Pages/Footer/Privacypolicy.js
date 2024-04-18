import React from 'react'
import style from '../../css/about.module.css'
import { Link } from 'react-router-dom'

function Privacypolicy() {
  return (
    <div className={style.aboutuscontainer}>
        <h1>Our Privacy Policy</h1>
      <div className={style.section}>
        <h2>Privacy Policy</h2>
        <p>
        This Privacy Policy describes how ShopVibe ("we", "us", or "our") collects, uses, and discloses your personal information when you use our website (the "Site") and the services offered through the Site (the "Services").
        </p>
      </div>

      <div className={style.section}>
        <h2>Information We Collect</h2>
        <p>
        We collect personal information that you provide to us, such as your name, email address, shipping address, and payment information, when you use our Services. We also collect information automatically when you visit our Site, such as your IP address, browser type, and operating system.
        </p>
      </div>

      <div className={style.section}>
        <h2>How We Use Your Information</h2>
        <p>
        We use your personal information to provide and improve our Services, process your orders, communicate with you, and personalize your experience on our Site. We may also use your information to send you marketing communications and promotional offers.
        </p>
      </div>

      <div className={style.section}>
        <h2>Sharing of Your Information</h2>
        <p>
        We may share your personal information with third-party service providers who help us operate our business, such as payment processors, shipping carriers, and marketing partners. We may also share your information in response to legal requests or to protect our rights and interests.
        </p>
      </div>

      <div className={style.section}>
        <h2>Data Retention</h2>
        <p>
        We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
        </p>
      </div>

      <div className={style.section}>
        <h2>Your Rights</h2>
        <p>
        You have the right to access, correct, or delete your personal information. You may also have the right to object to or restrict certain types of processing of your information. To exercise these rights, please contact us using the contact information provided below.
        </p>
      </div>

      <div className={style.section}>
        <h2>Changes to This Privacy Policy</h2>
        <p>
        We may update this Privacy Policy from time to time. If we make material changes, we will notify you by email or by posting a notice on our Site prior to the change becoming effective. We encourage you to review this Privacy Policy periodically for any changes.
        </p>
      </div>

      <div className={style.section}>
        <h2>Contact Us</h2>
        <p>
        If you have any questions or concerns about this Privacy Policy, please contact us at <Link to='/Contact'>here</Link>
        </p>
      </div>
      
    </div>
  )
}

export default Privacypolicy
