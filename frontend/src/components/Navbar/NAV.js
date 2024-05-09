// // import React from 'react';
// // import logo from '../Images/food img2.png';
// // import { Link } from 'react-router-dom';
// // import '../Navbar/NAV.css'
// // import { useCart } from '../Frontpage/CartContext'; // Import the CartContext
// // import {useSelector} from "react-redux"

// // function NAV() {
// //    const { cartItems } = useCart() || {}; // Ensure cartItems is initialized even if context is undefined
// //   const state  =useSelector((state)=> state.handleCart)
// //   return (
// //     <div>
// //       <span>Cart Items: {cartItems ? cartItems.length : 0}</span>
// //       <section id="Home">
// //         <nav style={{ position: 'fixed' }}>
// //           <div className="logo">
// //             <img src={logo} alt="logo" />
// //           </div>

// //           <ul>
// //             <Link to={'/frontpage'}><li><a href="#home">Home</a></li></Link>
// //             <li><a href="#offer">Offers</a></li>
// //             <li><a href="#Gallary">Gallery</a></li>
// //             <li><a href="#Menu">Menu</a></li>
// //             <li><a href="#Review">Review</a></li>
// //             <li><a href="#Order">Order</a></li>
// //           </ul>

// //           <div className="icon">
// //             <i className="fa-solid fa-magnifying-glass"></i>
// //             <i className="fa-solid fa-heart"></i>
// //             {/* Display the number of items in the cart */}
// //             <Link to={'/cart'}><button style={{ textDecoration: 'none' }} alt=''><i className="fa-solid fa-cart-shopping"></i>Cart({state.length})</button></Link>
// //           </div>
// //         </nav>
// //       </section>
// //     </div>
// //   );
// // }

// // export default NAV;
// import React, { useState } from 'react';
// import logo from '../Images/food img2.png';
// import { Link, useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import '../Navbar/NAV.css';

// function NAV({ userId }) {
//   const [isNavOpen, setIsNavOpen] = useState(false); // State to manage Navbar collapse
//   const state = useSelector((state) => state.handleCart);
//   const { id } = useParams();

//   // Function to toggle Navbar collapse state
//   const toggleNav = () => {
//     setIsNavOpen(!isNavOpen);
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top" style={{height:'73px'}}>
//       <div className="container">
//         <Link className="navbar-brand" to={`/frontpage/${id}`}>
//           <img src={logo} alt="logo" style={{ width: '90px' }} />
//         </Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           onClick={toggleNav} // Toggle Navbar collapse state on button click
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbarNav">
//           <ul className={`navbar-nav me-auto mb-2 mb-lg-0 ${isNavOpen ? 'bg' : ''}`}>
//             <li className="nav-item">
//               <a className="nav-link" href="#home">
//                 Home
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="#offer">
//                 Offers
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="#Gallary">
//                 Gallery
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="#Menu">
//                 Menu
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="#Chefs">
//                 Chefs
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="#Review">
//                 Review
//               </a>
//             </li>
//           </ul>
//           <ul className="navbar-nav">
//             <li className="nav-item">
//               <Link className="nav-link" to={`/cart/${id}`}>
//                 <button className="btn btn-outline-dark">
//                   <i className="fa-solid fa-cart-shopping me-1"></i> Cart({state.length})
//                 </button>
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default NAV;


// import React from 'react';
// import logo from '../Images/food img2.png';
// import { Link } from 'react-router-dom';
// import '../Navbar/NAV.css'
// import { useCart } from '../Frontpage/CartContext'; // Import the CartContext
// import {useSelector} from "react-redux"

// function NAV() {
//    const { cartItems } = useCart() || {}; // Ensure cartItems is initialized even if context is undefined
//   const state  =useSelector((state)=> state.handleCart)
//   return (
//     <div>
//       <span>Cart Items: {cartItems ? cartItems.length : 0}</span>
//       <section id="Home">
//         <nav style={{ position: 'fixed' }}>
//           <div className="logo">
//             <img src={logo} alt="logo" />
//           </div>

//           <ul>
//             <Link to={'/frontpage'}><li><a href="#home">Home</a></li></Link>
//             <li><a href="#offer">Offers</a></li>
//             <li><a href="#Gallary">Gallery</a></li>
//             <li><a href="#Menu">Menu</a></li>
//             <li><a href="#Review">Review</a></li>
//             <li><a href="#Order">Order</a></li>
//           </ul>

//           <div className="icon">
//             <i className="fa-solid fa-magnifying-glass"></i>
//             <i className="fa-solid fa-heart"></i>
//             {/* Display the number of items in the cart */}
//             <Link to={'/cart'}><button style={{ textDecoration: 'none' }} alt=''><i className="fa-solid fa-cart-shopping"></i>Cart({state.length})</button></Link>
//           </div>
//         </nav>
//       </section>
//     </div>
//   );
// }

// export default NAV;
import React, { useEffect, useState } from 'react';
import logo from '../Images/food img2.png';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../Navbar/NAV.css';
import axios from 'axios';

function NAV({ userId, cartItems })  {
  const [isNavOpen, setIsNavOpen] = useState(false); // State to manage Navbar collapse
  const state = useSelector((state) => state.handleCart);
  const { id } = useParams();
  const navigate = useNavigate()
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


  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });


  

  // Function to toggle Navbar collapse state
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  const handleLogout = (e) => {
    e.preventDefault();
    const confirmLogout = window.confirm("Do you want to exit the website?");
  
    if (confirmLogout) {
      // Use navigate function to navigate to the login page
      navigate("/login");
    }
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top" style={{height:'73px'}}>
      <div className="container">
        <Link className="navbar-brand" to={`/frontpage/${id}`}>
          <img src={logo} alt="logo" style={{ width: '90px' }} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNav} // Toggle Navbar collapse state on button click
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbarNav">
          <ul className={`navbar-nav me-auto mb-2 mb-lg-0 ${isNavOpen ? 'bg' : ''}`} style={{gap:'2rem',marginLeft:'3rem'}}>
            <li className="nav-item" style={{textDecoration:'none'}}>
            <Link to={`/frontpage/${id}`} style={{textDecoration:'none'}}> <a className="nav-link" href="#home" style={{textDecoration:'none'}}>
                <b>Home</b>
              </a></Link> 
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#offer">
                <b>Offers</b>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#Gallary">
                <b>Gallery</b>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#Menu">
                <b>Menu</b>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#Chefs">
              <b>  Chefs</b>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#Review">
                <b>Review</b>
              </a>
            </li>
            <li className="nav-item" style={{textDecoration:'none'}}>
            <Link to={`/orderhistory/${id}`} style={{textDecoration:'none'}}> <a className="nav-link" href="#home" style={{textDecoration:'none'}}>
                <b>OrderHistory</b>
              </a></Link> 
            </li>
          </ul>
          <ul className="navbar-nav">
        
            
            <li className="nav-item">
              <Link className="nav-link" to={`/cart/${id}`}>
                <button className="btn">
                <i className="fa-solid fa-cart-shopping me-1"></i> Cart({cartItems ? cartItems.length : 0})
                </button>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to={"/login"}>
                <button className="btn" onClick={handleLogout}>
                  <i className="fa-solid fa-sign-out-alt me-1"></i> Logout
                </button>
              </Link>
            </li>
          </ul>
         
        </div>
        
      </div>
      <ul  className="navbar-nav">
          <li className="nav-item">
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',paddingRight:'2rem'}}>
              <i style={{fontSize:'30px'}} className="fa-solid fa-user me-1"></i><p style={{marginBottom:'0',fontSize:'13px'}}>{formData.name}</p>
              </div>
          
            </li>
          </ul>
    </nav>
  );
}

export default NAV;