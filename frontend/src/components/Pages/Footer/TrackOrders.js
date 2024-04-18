import React, { useEffect, useState } from 'react';
import { Timeline } from 'primereact/timeline';
import axios from 'axios';

function TrackOrders({ orderId }) {
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        if (orderId) {
            fetchOrderDetails(orderId);
        }
    }, [orderId]);

    const fetchOrderDetails = (orderId) => {
        axios.get(`http://localhost:5001/api/orders/${orderId}`)
            .then(res => {
                setOrderDetails(res.data);
            })
            .catch(err => console.error(err));
    };

    const getEvents = () => {
        if (orderDetails) {
            return [
                { status: 'Ordered', date: orderDetails.orderedDate, icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
                { status: 'Processing', date: orderDetails.processingDate, icon: 'pi pi-cog', color: '#673AB7' },
                { status: 'Shipped', date: orderDetails.shippedDate, icon: 'pi pi-shopping-cart', color: '#FF9800' },
                { status: 'Delivered', date: orderDetails.deliveredDate, icon: 'pi pi-check', color: '#607D8B' }
            ];
        }
        return [];
    };

    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: '100px 0px' }}>
            <h2>Order ID: {orderId}</h2>
            <Timeline value={getEvents()} opposite={(item) => item.status} content={(item) => <small className="text-color-secondary">{item.date}</small>} />
        </div>
    );
}

export default TrackOrders;
