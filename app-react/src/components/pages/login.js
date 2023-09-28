import axios from 'axios';
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const nav = useNavigate();

  const onSub = (e) => {
    e.preventDefault();
    doApi()
  }

  const doApi = async () => {
    const item = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    try {
      axios.defaults.withCredentials = true
      const { data } = await axios({
        method: "POST",
        url: "http://localhost:3001/users/login",
        data: item
      })
      console.log(data);
      if(data.token){
        nav("/user_info")
      }
    
    }
    catch(err){
      console.log(err);
      alert("There problem come back later, user or password worng")
    }
    // console.log(item);
  }

  return (
    <div className='container'>
      <h1>Log in form</h1>
      <form onSubmit={onSub} className='col-md-6 p-2'>
        <label>Email:</label>
        <input ref={emailRef} type="email" className='form-control' />
        <label>Password:</label>
        <input ref={passwordRef} type="password" className='form-control' />
        <button className='btn btn-success mt-3'>Log in</button>
      </form>
    </div>
  )
}
