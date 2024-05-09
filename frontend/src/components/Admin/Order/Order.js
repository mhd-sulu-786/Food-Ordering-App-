import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NAV from '../../Navbar/NAV';
import Footer from '../../Frontpage/Footer';
import Sidebar from '../Sidebar/Sidebar';

function AdminOrder() {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/orderHistory`);
        console.log('Order history response:', response.data); // Log the response data
        setOrderHistory(response.data); // Assuming the response data contains order history
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };

    fetchOrderHistory();
  }, []);

  console.log('Order history state:', orderHistory); // Log the order history state

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:4000/updateOrderStatus/${orderId}`, { status: newStatus });
      // Update order status in the UI
      const updatedOrderHistory = orderHistory.map(order => {
        if (order._id === orderId) {
          return { ...order, status: newStatus };
        }
        return order;
      });
      setOrderHistory(updatedOrderHistory);
    } catch (error) {
      console.error('Error updating order status:', error);
      // Handle error
    }
  };

  return (
    <div style={{ marginTop: '5rem' }}>
        <div>  <NAV/></div>
     <div><Sidebar/></div>

        
     <div className='background' style={{height:'100%',display:'flex',flexDirection:'column'}}>
     <h1 style={{ textAlign: 'center', marginTop: '2rem',color:'white' }}>Admin Page - Order Management</h1>
        <table id='table' className="table">
          <thead>
            <tr>
              {/* <th>Order ID</th> */}
              <th>Food</th>
              <th>Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orderHistory.map((order, index) => (
              <tr key={index}>
                {/* <td>{order.orderId}</td> */}
                <td>{order.foodname}</td>
                <td>{order.description}</td>
                <td>{order.price}</td>
                <td>
                  <img src={`http://localhost:4000/${order.image}`} alt={order.foodname} style={{ width: '100px', height: '100px',objectFit:'contain' }} />
                </td>
                <td>{order.status}</td>
                <td>
                  <select onChange={(e) => handleUpdateStatus(order._id, e.target.value)}>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    
    </div>
  );
}

export default AdminOrder;
