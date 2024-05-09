import React from 'react'
import NAV from '../Navbar/NAV'
import Sidebar from './Sidebar/Sidebar'

function Admin() {
  return (
    <div > 
      <div><NAV/></div>
      <div><Sidebar/></div>
      <div className='background' style={{height:'100vh'}}></div>
    
     </div>
  )
}

export default Admin