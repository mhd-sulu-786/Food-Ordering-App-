// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { addCart } from '../../redux/action';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function Menu({ selectedCategory }) {
//     const [foods, setFoods] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const dispatch = useDispatch();

//     useEffect(() => {
//         axios.get("http://localhost:4000/getFood")
//             .then((res) => {
//                 console.log("Data received:", res.data);
//                 setFoods(res.data.foods);
//             })
//             .catch((err) => {
//                 console.log("Error fetching data:", err);
//             });
//     }, []);

//     const addToCart = (food, quantity = 1) => {
//         dispatch(addCart({ ...food, qty: quantity }));
//         toast.success(`${food.foodname} added to cart`);
//     };

//     const filteredFoods = selectedCategory === "All" ? foods : foods.filter(food => food.category === selectedCategory);

//     const sortedFoods = filteredFoods.sort((a, b) => {
//         return a.price - b.price; // Sorting by price
//     });

//     const searchedFoods = sortedFoods.filter(food =>
//         food.foodname.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <div style={{ overflowX: 'hidden' }}>
//             <div className="menu" id="Menu">
//                 <h1>Our<span>Menu</span></h1>

//                 <form className="form" style={{border:'1px solid black',width:'18%',marginLeft:'41%',marginBottom:'3rem'}}>
//                     <button>
//                         <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
//                             <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round"></path>
//                         </svg>
//                     </button>
//                     <input   
//                         style={{width:"100%",border:'none'}}
//                         type="text"
//                         placeholder="Search food..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                 </form>
              
//                 <div className="menu_box">
//                     {searchedFoods.map((food, index) => (
//                         <div className="menu_card" key={index}>
//                             <div className="menu_image">
//                                 <img src={`http://localhost:4000/${food.image}`} alt={`Food ${food.foodname}`} />
//                             </div>
//                             <div className='info'>
//                                 <p><b>{food.foodname}</b></p>
//                                 <p>{food.description}</p>
//                                 <p>Price:<b>{food.price}</b></p>
//                                 <p>{food.category}</p>
//                                 <div style={{ position: 'relative', left: '31%' }}>
//                                     <input
//                                         type="number"
//                                         defaultValue={1}
//                                         min={1}
//                                         onChange={(e) => addToCart(food, parseInt(e.target.value))}
//                                         style={{ width: '14%', height: '70%', border: '1px solid black', borderRadius: '5px' }}
//                                     />
//                                     <button
//                                         onClick={() => addToCart(food)}
//                                         style={{ color: 'white', background: '#fb2157', border: 'none', borderRadius: '1rem', padding: '4px 23px', textDecoration: 'none', marginLeft: '15px' }}
//                                     >
//                                         Add
//                                     </button>
//                                 </div>
//                             </div>
//                             <div className="menu_info"></div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <hr></hr>
//             <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
//         </div>
//     );
// }

// export default Menu;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Menu({ selectedCategory,addToCart }) {
    const [foods, setFoods] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [cartItems, setCartItems] = useState([]);
   

    useEffect(() => {
        axios.get("http://localhost:4000/getFood")
            .then((res) => {
                console.log("Data received:", res.data);
                setFoods(res.data.foods);
            })
            .catch((err) => {
                console.log("Error fetching data:", err);
            });
    }, []);

  const handleAddToCart = async (food) => {
    try {
      console.log("Adding food to cart:", food);
      const response = await axios.post('http://localhost:4000/addToCart', food);
      addToCart(food);
      toast.success(`"${food.foodname}" added to cart!`);
      console.log('Item added to cart:', response.data);
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast.error('Failed to add item to cart. Please try again.');
    }
  };


  

  const filteredFoods = foods.filter(food =>
    (food.category === selectedCategory || selectedCategory === "All") &&
    food.foodname.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div>
         
    <div style={{ overflowX: 'hidden' }}>
      <div className="menu" id="Menu">
        <h1>Our<span>Menu</span></h1>
        <form className="form" style={{border:'1px solid black',width:'18%',marginLeft:'41%',marginBottom:'3rem'}}>
          <button>
            <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
              <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
          <input   
            style={{width:"100%",border:'none'}}
            type="text"
            placeholder="Search food..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <div className="menu_box">
          {filteredFoods.map((food, index) => (
            <div className="menu_card" key={index}>
              <div className="menu_image">
                <img src={`http://localhost:4000/${food.image}`} alt={`Food ${food.foodname}`} />
              </div>
              <div className='info'>
                <p><b>{food.foodname}</b></p>
                <p style={{fontSize:'11px',padding:'2px'}}>{food.description}</p>
                <p>Price:<b>{food.price}</b></p>
                <p>{food.category}</p>
                <div>
                  
                  
                  <button
                 onClick={() => handleAddToCart(food)}
                      style={{ color: 'white', background: '#fb2157', border: 'none', borderRadius: '1rem', padding: '4px 23px', textDecoration: 'none', marginLeft: '15px' }}>
                      Add
                       </button>



                </div>
              </div>
              <div className="menu_info"></div>
            </div>
          ))}
        </div>
      </div>
      <hr></hr>
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
    </div>
  );
}

export default Menu;
