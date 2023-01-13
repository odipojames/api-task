import React from 'react';
import './header.css';




export const Header =()=>{


  
  return(
    <div>
    <div className='navbar'>
     <span className="header-item" onClick={()=>{window.location.reload(true)}}>Heroes  Records</span>
    </div>
    </div>
  )
}
