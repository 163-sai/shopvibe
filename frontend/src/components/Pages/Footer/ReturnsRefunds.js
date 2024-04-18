import React from 'react';
import style from '../../css/about.module.css'

const ReturnsRefunds = () => {
  return (
    <>
    <div className={style.aboutuscontainer}>
      <h2>Returns & Refunds</h2>
      <p>
        We want you to be completely satisfied with your purchase. If you're not happy with your
        order for any reason, we're here to help.
      </p>
    </div>
    <div className={style.aboutuscontainer}>
      <h3>Returns</h3>
      <p>
        You can return items within 30 days of purchase. To be eligible for a return, your item
        must be unused and in the same condition that you received it. It must also be in the
        original packaging.
      </p>
      <p>
        Please contact our customer support team to initiate a return. Once we receive your item,
        we will inspect it and notify you that we have received your returned item. We will
        immediately notify you on the status of your refund after inspecting the item.
      </p>
    </div>
    <div className={style.aboutuscontainer}>
      <h3>Refunds</h3>
      <p>
        If your return is approved, we will initiate a refund to your original method of payment.
        You will receive the credit within a certain amount of days, depending on your card issuer's
        policies.
      </p>
    </div>
    <div className={style.aboutuscontainer}>
      <h3>Exchanges</h3>
      <p>
        We do not offer exchanges at this time. If you need a different item, please return the
        item you have and place a new order.
      </p>
    </div>
    <div className={style.aboutuscontainer}>
      <h3>Contact Us</h3>
      <p>
        If you have any questions about our returns and refunds policy, please contact us:
        <br />
        Email: support@example.com
        <br />
        Phone: 123-456-7890
      </p>
    </div>
    </>
  );
};

export default ReturnsRefunds;
