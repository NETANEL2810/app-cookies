import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Header from './components/general/header'
import Home from './components/pages/home'
import Page404 from './components/pages/page404'
import Login from './components/pages/login'
import UserInfo from './components/pages/userInfo'

export default function AppRouters() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user_info" element={<UserInfo />} />
  
        
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  )
}
