import React from 'react'
import {FaArrowCircleLeft} from 'react-icons/fa'
import {Link} from 'react-router-dom'
const NotFound = () => {
  return (
    <> 
    <div className="container">
    <h1 style={{fontSize:"10em", textAlign:"center", color:"tomato"}}>404</h1>
     <p className="text text-white text-lg">Oops! This page wasn't found on this server</p>
     <Link to="/" style={{color:"white", fontSize:"4rem", textAlign:"center", display: 'flex', justifyContent: 'center'}}>
     <FaArrowCircleLeft/>
     </Link>
     </div>
    </>
  )
}

export default NotFound
