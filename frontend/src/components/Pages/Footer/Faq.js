import React from 'react';
import style from '../../css/about.module.css'

const Faq = () => {
  return (
    <div className={style.aboutuscontainer}>
      <h2>Frequently Asked Questions (FAQs)</h2>
      <div>
        <h3>How do I place an order?</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin blandit mauris in
          tellus elementum, in facilisis nulla fringilla.
        </p>
      </div>
      <div>
        <h3>What payment methods do you accept?</h3>
        <p>
          We accept credit/debit cards, PayPal, and bank transfers as payment methods. For more
          details, please visit our Payment Methods page.
        </p>
      </div>
      <div>
        <h3>How can I track my order?</h3>
        <p>
          Once your order is shipped, you will receive a tracking number via email. You can use
          this tracking number to track your order on our website or through the shipping carrier's
          website.
        </p>
      </div>
    </div>
  );
};

export default Faq;
