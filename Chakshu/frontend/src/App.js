import React, {useEffect, useState} from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom' 
import Home from './Pages/Home'
import Login from './Pages/auth/login'
import Signup from './Pages/auth/signup'
import SuperUserSignup from './Pages/auth/superUserSignup'
import ReportCrime from './Pages/reportCrime'
import Map2 from './Components/Map2'
import NoticeBoard from './Pages/NoticeBoard'
// import socketIO from 'socket.io-client';
// const socket = socketIO.connect('http://localhost:4000');
export default function App() {

  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)
    }, 1500)
  }, [])

  if(loading){
    return (
      <div className='h-[100vh] bg-white flex flex-col items-center justify-center gap-3 w-full select-none'>
        <img onMouseDown={(e)=>e.preventDefault()} src='map.png' alt='splash screen map' className='animate-pulse w-full h-full absolute opacity-bg z-0'></img>
        <h1 className='text-black text-[25px] font-[Metamorphous] font-bold first-letter:text-[45px] first-letter:font-medium z-10'>CHAKSHU</h1>
          <div className="relative w-1/4 bg-gray-900 rounded">
            <div className="absolute top-0 h-1 rounded shim-red"></div>
          </div>
      </div>
    )
  }
  return (
    <div className='bg-[#fefafd] min-h-[100vh] h-max select-none'>
      <Router>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login loginType={'userLogin'}/>} />
            <Route path="/superlogin" element={<Login loginType={'superUserLogin'}/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/supersignup" element={<SuperUserSignup/>} />
            <Route path="/report" element={<ReportCrime/>}/>
            <Route path="/map" element={<Map2/>}/>
            <Route path="/notice" element={<NoticeBoard/>}/>
          </Routes>
        </Router>
    </div>
  )
}