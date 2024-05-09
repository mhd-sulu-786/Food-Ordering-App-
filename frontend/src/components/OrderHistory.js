// OrderHistory.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NAV from './Navbar/NAV';
import Footer from './Frontpage/Footer';
import { useParams } from 'react-router-dom';

function OrderHistory() {
  const { id } = useParams();
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/cartData`);
        setOrderHistory(response.data); // Assuming the response data contains order history
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };

    fetchOrderHistory();
  }, []);

  const handleTrackOrder = async (orderId) => {
    try {
      const response = await axios.get(`http://localhost:4000/trackOrder/${orderId}`);
      console.log(`Order status: ${response.data.status}`);
      // You can update the UI to display the order status here
    } catch (error) {
      console.error('Error tracking order:', error);
      // Handle error
    }
  };

  return (
    <div  style={{ marginTop: '5rem' }}>
      <NAV />
      <div>
        <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Order History</h1>
        <table className="table " style={{marginLeft:'12rem',borderRadius:'10px'}}>
          <thead>
            <tr>
              <th>Food</th>
         
              <th>Price</th>
              <th>Image</th> {/* New column for image */}
              <th>Track Order</th> {/* New column for track order */}
            </tr>
          </thead>
          <tbody>
            {orderHistory.map((order, index) => (
              <tr key={index}>
                <td><b>{order.foodname}</b></td>
              
                <td><b>{order.price}</b></td>
                <td>
                  <img src={`http://localhost:4000/${order.image}`} alt={order.foodname} style={{ width: '100px', height: '100px',objectFit:'contain' }} />
                </td>
                <td>
                  <button onClick={() => handleTrackOrder(order._id)}>Track Order</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
}

export default OrderHistory;
// UserOrderHistory.js

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import NAV from './Navbar/NAV';
// import Footer from './Frontpage/Footer';
// import { useParams } from 'react-router-dom';

// function OrderHistory() {
//   const { id } = useParams();
//   const [orderHistory, setOrderHistory] = useState([]);

//   useEffect(() => {
//     const fetchOrderHistory = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/orderHistory/${id}`);
//         setOrderHistory(response.data); // Assuming the response data contains user's order history
//       } catch (error) {
//         console.error('Error fetching order history:', error);
//       }
//     };

//     fetchOrderHistory();
//   }, [id]); // Fetch order history whenever the user ID changes

//   return (
//     <div style={{ marginTop: '5rem' }}>
//       <NAV />
//       <div>
//         <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Your Order History</h1>
//         <table className="table " style={{ marginLeft: '12rem', borderRadius: '10px' }}>
//           <thead>
//             <tr>
//               <th>Food</th>
//               <th>Name</th>
//               <th>Price</th>
//               <th>Image</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orderHistory.map((order, index) => (
//               <tr key={index}>
//                 <td><b>{order.foodname}</b></td>
//                 <td><b>{order.description}</b></td>
//                 <td><b>{order.price}</b></td>
//                 <td>
//                   <img src={`http://localhost:4000/${order.image}`} alt={order.foodname} style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
//                 </td>
//                 <td><b>{order.status}</b></td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default OrderHistory;

