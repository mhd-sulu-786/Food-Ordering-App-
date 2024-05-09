// import React, { useEffect, useState } from 'react';
// import '../Payment/payment.css';
// import visa from "../../components/Images/visa.png";
// import axios from 'axios';
// import { useNavigate, useParams, useLocation } from 'react-router-dom';
// import NAV from '../Navbar/NAV';
// import Footer from '../Frontpage/Footer';

// function Payment() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [payData, setPayData] = useState({
//     name: '',
//     address: '',
//     total: location.state ? location.state.total : 0, // Get total from location state
//     place: ''
//   });

//   const [formData, setFormData] = useState({
//     name: '',
//     email: ''
//   });

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/user/${id}`);
//         const userData = response.data;
//         setFormData(prevState => ({
//           ...prevState,
//           email: userData.email,
//           name: userData.name
//         }));
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };
  
//     fetchUserData();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const parsedValue = name === 'total' ? parseFloat(value) : value; // Parse total to number
//     setFormData({ ...formData, [name]: value });
//     setPayData({ ...payData, [name]: parsedValue }); // Set parsedValue
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!payData.name || !payData.address || !payData.total || !payData.place) {
//       alert('Fill all forms');
//       return;
//     }
//     try {
//       await axios.post("http://localhost:4000/payment", payData);
//       console.log("Payment added successfully");
//       alert('Payment added successfully');
//       navigate(`/cart/${id}`)
//       // Handle navigation after successful payment
//     } catch (error) {
//       console.error('Error adding payment details:', error);
//       alert('Error adding payment details');
//     }
//   };

//   return (
//     <>
//     <NAV/>
//     <div className="containerr" style={{marginTop:'5rem'}}>
//       <form onSubmit={handleSubmit} action="">
//         <div className="row">
//           <div className="col">
//             <h3 className="title" style={{ fontWeight: '600' }}>billing address</h3>
//             <div className="inputBox">
//               <span className='spanPayment'>full name :</span>
//               <input type="text" placeholder="name"  value={formData.name} name="name" onChange={handleChange} />
//             </div>
//             <div className="inputBox">
//               <span className='spanPayment'>email :</span>
//               <input 
//           type="email" 
//           placeholder="example@example.com" 
//           name="email" 
//           value={formData.email} 
//           onChange={handleChange} 
//         />
//             </div>
//             <div className="inputBox">
//               <span className='spanPayment'>address :</span>
//               <input type="text" placeholder="adress...."  name = "address" value={payData.address}  onChange={handleChange}  />
//             </div>
//             <div className="inputBox">
//               <span className='spanPayment'>city :</span>
//               <input type="text" placeholder="city"  name = "place" value={payData.place}  onChange={handleChange}  />
//             </div>
//             <div className="flex">
//               <div className="inputBox">
//                 <span className='spanPayment'>state :</span>
//                 <input type="text" placeholder="state" />
//               </div>
//               <div className="inputBox">
//                 <span className='spanPayment'>zip code :</span>
//                 <input type="text" placeholder="zip code" />
//               </div>
//             </div>
//           </div>
//           <div className="col">
//             <h3 className="title" style={{ fontWeight: '600' }}>payment</h3>
//             <div className="inputBox">
//               <span className='spanPayment' >Total Amount :</span>
//               <input type="number" placeholder="123"  name = "total" value={payData.total} readOnly />
//             </div>
//             <div className="inputBox">
//               <span className='spanPayment'>cards accepted :</span>
//               <img src={visa} alt="Visa" />
//             </div>
//             <div className="inputBox">
//               <span className='spanPayment'>name on card :</span>
//               <input type="text" placeholder="name"  name = "name" value={payData.name}  onChange={handleChange}  />
//             </div>
//             <div className="inputBox">
//               <span className='spanPayment'>credit card number :</span>
//               <input type="number" placeholder="1111-2222-3333-4444" />
//             </div>
//             <div className="inputBox">
//               <span className='spanPayment'>exp month :</span>
//               <input type="text" placeholder="month" />
//             </div>
//             <div className="flex">
//               <div className="inputBox">
//                 <span className='spanPayment'>exp year :</span>
//                 <input type="number" placeholder="2022" />
//               </div>
//               <div className="inputBox">
//                 <span className='spanPayment'>CVV :</span>
//                 <input type="text" placeholder="1234" />
//               </div>
//             </div>
//           </div>
//         </div>
//         <button type="submit" className="submit-btn" onClick={handleSubmit}>Proceed to Checkout</button>
//       </form>
//     </div>
//     <Footer/>
//     </>
//   );
// }

// export default Payment;


import '../Payment/payment.css';

// Payment.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import NAV from '../Navbar/NAV';
import Footer from '../Frontpage/Footer';
import visa from "../../components/Images/visa.png";

function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [payData, setPayData] = useState({
    name: '',
    address: '',
    total: location.state ? location.state.total : 0, // Accessing total from location state
    place: ''
  });

  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const [showLoader, setShowLoader] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/user/${id}`);
        const userData = response.data;
        setFormData(prevState => ({
          ...prevState,
          email: userData.email,
          name: userData.name
        }));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'total' ? parseFloat(value) : value;
    setFormData({ ...formData, [name]: value });
    setPayData({ ...payData, [name]: parsedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!payData.name || !payData.address || !payData.total || !payData.place) {
      alert('Fill all forms');
      return;
    }
    try {
      setShowLoader(true);
      await axios.post("http://localhost:4000/payment", payData);
      console.log("Payment added successfully");
      alert('Payment added successfully');
      setTimeout(() => {
        setShowLoader(false);
        setPaymentSuccess(true);
        setTimeout(() => {
          navigate(`/orderhistory/${id}`);
        }, 3000);
      }, 3000);
    } catch (error) {
      console.error('Error adding payment details:', error);
      alert('Error adding payment details');
      setShowLoader(false);
    }
  };

  return (
    <>
    <NAV/>
    <div className="containerr" style={{ marginTop: '5rem' }}>
      {showLoader ? (
        <div className="loader-container" style={{ textAlign: 'center', marginTop: '2rem' }}>
          <div className="loader" style={{ border: '16px solid #f3f3f3', borderTop: '16px solid #3498db', borderRadius: '50%', width: '120px', height: '120px', animation: 'spin 2s linear infinite', margin: 'auto' }}></div>
          <p style={{ marginTop: '1rem', color: '#333', fontSize: '1.2rem', fontWeight: 'bold' }}>Processing Payment...</p>
        </div>
      ) : paymentSuccess ? (
        <div className="success-message" style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p style={{ color: 'green', fontSize: '1.2rem', fontWeight: 'bold' }}>Payment Successful!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} action="">
          <div className="row">
            <div className="col">
              <h3 className="title" style={{ fontWeight: '600' }}>Billing Address</h3>
              <div className="inputBox">
                <span className='spanPayment'>Full Name :</span>
                <input type="text" placeholder="Name" value={formData.name} name="name" onChange={handleChange} />
              </div>
              <div className="inputBox">
                <span className='spanPayment'>Email :</span>
                <input type="email" placeholder="example@example.com" name="email" value={formData.email} onChange={handleChange} />
              </div>
              <div className="inputBox">
                <span className='spanPayment'>Address :</span>
                <input type="text" placeholder="Address...." name="address" value={payData.address} onChange={handleChange} />
              </div>
              <div className="inputBox">
                <span className='spanPayment'>City :</span>
                <input type="text" placeholder="City" name="place" value={payData.place} onChange={handleChange} />
              </div>
              <div className="flex">
                <div className="inputBox">
                  <span className='spanPayment'>State :</span>
                  <input type="text" placeholder="State" />
                </div>
                <div className="inputBox">
                  <span className='spanPayment'>Zip Code :</span>
                  <input type="text" placeholder="Zip Code" />
                </div>
              </div>
            </div>
            <div className="col">
              <h3 className="title" style={{ fontWeight: '600' }}>Payment</h3>
              <div className="inputBox">
                <span className='spanPayment'>Total Amount :</span>
                <input
            type="text"
            name="total"
            value={payData.total}
            onChange={handleChange}
            readOnly
          />
              </div>
              <div className="inputBox">
                <span className='spanPayment'>Cards Accepted :</span>
                <img src={visa} alt="Visa" />
              </div>
              <div className="inputBox">
                <span className='spanPayment'>Name on Card :</span>
                <input type="text" placeholder="Name" name="name" value={payData.name} onChange={handleChange} />
              </div>
              <div className="inputBox">
                <span className='spanPayment'>Credit Card Number :</span>
                <input type="number" placeholder="1111-2222-3333-4444" />
              </div>
              <div className="inputBox">
                <span className='spanPayment'>Expiration Month :</span>
                <input type="text" placeholder="Month" />
              </div>
              <div className="flex">
                <div className="inputBox">
                  <span className='spanPayment'>Expiration Year :</span>
                  <input type="number" placeholder="2022" />
                </div>
                <div className="inputBox">
                  <span className='spanPayment'>CVV :</span>
                  <input type="text" placeholder="1234" />
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="submit-btn" onClick={handleSubmit}>Proceed to Checkout</button>
        </form>
      )}
    </div>
    <Footer/>
    </>
  );
}

export default Payment;
