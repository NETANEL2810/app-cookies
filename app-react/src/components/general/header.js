import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import cookies from "js-cookie";
import axios from 'axios';

export default function Header() {
  // each change --> refresh the componenet
  const nav=useNavigate();
  const onLogOut=async()=>{
    axios.defaults.withCredentials=true;
    const {data}=await axios.delete("http://localhost:3001/users/logout");
    console.log(data);
    nav("/");//return home page
  }
  return (
    <header className='container-fluid p-2 bg-info'>
      <div className='container'>
        <div className='row align-items-center'>
          <div className='logo col-auto'>
            <h2>My logo</h2>
          </div>
          <nav className='col-auto'>
            <ul>
              <li><Link to="/">Home</Link></li>
              {!cookies.get("token") ? 
              <li><Link to="/login">Log in</Link></li> : 
              <li><Link to="#" onClick={onLogOut}>Log out</Link></li>
              }
              <li><Link to="/user_info" >User info</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
