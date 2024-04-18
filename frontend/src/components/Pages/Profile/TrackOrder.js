import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TrackOrder = () => {
  const { Id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5001/api/orders/${Id}`)
      .then(response => {
        setOrder(response.data);
      })
      .catch(error => {
        setError('Error fetching order. Please try again later.');
      });
  }, [Id]);

  return (
    <div>
      {order ? (
        <div>
          <h2>Order Details</h2>
          <p>Order ID: {order.Id}</p>
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default TrackOrder;
