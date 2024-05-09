// // import React, { useState } from 'react';
// // import * as FaIcons from 'react-icons/fa';
// // import * as AiIcons from 'react-icons/ai';
// // import { Link } from 'react-router-dom';
// // import { SidebarData } from './SidebarData';
// // import './sidebar.css';
// // import { IconContext } from 'react-icons';

// // function Sidebar() {
// //   const [sidebar, setSidebar] = useState(false);

// //   const showSidebar = () => setSidebar(!sidebar);

// //   return (
// //     <>
// //       <IconContext.Provider value={{ color: '#fb2157' }}>
// //         <div className='navbar'>
// //           <Link to='#' className='menu-bars'>
// //             <FaIcons.FaBars onClick={showSidebar} />
// //           </Link>
// //         </div>
// //         <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
// //           <ul className='nav-menu-items' onClick={showSidebar}>
// //             <li className='navbar-toggle'>
// //               <Link to='#' className='menu-bars'>
// //                 <AiIcons.AiOutlineClose />
// //               </Link>
// //             </li>
// //             {SidebarData.map((item, index) => {
// //               return (
// //                 <li key={index} className={item.cName}>
// //                   <Link to={item.path}>
// //                     <span style={{fontSize:'30px'}}>{item.icon}</span>
// //                     <span style={{color:'#fb2157'}}>{item.title}</span>
// //                   </Link>
// //                 </li>
// //               );
// //             })}
// //           </ul>
// //         </nav>
// //       </IconContext.Provider>
// //     </>
// //   );
// // }

// // export default Sidebar;
// import React from 'react';
// import * as FaIcons from 'react-icons/fa';
// import * as AiIcons from 'react-icons/ai';
// import { Link } from 'react-router-dom';
// import { SidebarData } from './SidebarData';
// import './sidebar.css';
// import { IconContext } from 'react-icons';

// function Sidebar() {
//   return (
//     <IconContext.Provider value={{ color: '#fb2157' }}>
      
//       <nav className='nav-menu active'> {/* Always visible */}
//         <ul className='nav-menu-items'>
//           <li className='navbar-toggle'>
//             <Link to='#' className='menu-bars'>
//               <AiIcons.AiOutlineClose />
//             </Link>
//           </li>
//           {SidebarData.map((item, index) => (
//             <li key={index}  style={{rowGap:'1rem'}} className={item.cName}>
//               <Link to={item.path}>
//                 <span style={{ fontSize: '30px' }}>{item.icon}</span>
//                 <span style={{ color: '#fb2157',fontSize:'17px' ,paddingLeft:'1rem'}}>{item.title}</span>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </IconContext.Provider>
//   );
// }

// export default Sidebar;

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';
import SidebarData from './SidebarData'; // Import SidebarData as default
import './sidebar.css';
import { IconContext } from 'react-icons';

function Sidebar() {
  const isAdmin = true;
  const {id} = useParams();
  const state = useSelector((state) => state.handleCart);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section'); // Assuming each section has a unique ID
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 0 && rect.bottom > 0) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <IconContext.Provider value={{ color: '#fb2157' }}>
      <nav className='nav-menu active'>
        <ul className='nav-menu-items'>
        {/* {isAdmin && (
  <Link to={{ pathname: '/admin/orders', state: { foodNames: state.map(item => item.foodname) } }}>
  <div>ORDERS PAGE</div>
</Link>

)} */}
<Link to={`/order/${id}`}><button>Admin Order</button></Link>
          {SidebarData.map((item, index) => (
            <li
              key={index}
              style={{ rowGap: '1rem' }}
              className={`${item.cName} ${activeSection === item.path ? 'active' : ''}`}
            >
              <Link to={item.path}>
                <span style={{ fontSize: '30px' }}>{item.icon}</span>
                <span style={{ color: 'black', fontSize: '17px', paddingLeft: '1rem' }}>{item.title}</span>
              </Link>
            </li>
          ))}
                {/* <Link to={`/ordersPage/${id}`}><button ><b>Order</b></button></Link> */}
        </ul>
      </nav>
    </IconContext.Provider>
  );
}

export default Sidebar;
