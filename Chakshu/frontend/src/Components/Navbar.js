import React, {useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillHome } from "react-icons/ai"
import { MdDeveloperBoard } from "react-icons/md"
import { BsFileEarmarkBarGraph, BsFillCaretDownFill } from "react-icons/bs";
import './styles.css'
import userimg from '../assets/user.webp'
import { FiLogIn } from 'react-icons/fi';

function Navbar() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [dropDown, setDropDown] = useState(false)
    const dropDownRef = useRef()
    const navigate = useNavigate()

    useEffect(()=>{
      const closeDropDown = e =>{
      if(dropDown && dropDownRef.current && !dropDownRef.current.contains(e.target))
      {
        setDropDown(false)
      }
    }
    document.addEventListener('mousedown', closeDropDown)
    return () => document.body.removeEventListener('mousedown', closeDropDown)
  
  }, [dropDown])

    const dropLinks = [
        {
            name:'Settings',
            link:'/settings'
        },
        {
            name:'Crime Stats',
            link:'/stats'
        },
        {
            name:'Report Crime',
            link:'/report'
        },
        {
            name:'Logout',
            link:'/logout'
        }
    ]

  return (
    <div className='bg-black min-h-[6vh] min-w-[20vw] mt-2 mx-4 rounded-xl select-none'>
        <div className='min-h-[6vh] min-w-[20vw] flex flex-row justify-between items-center px-8'>
            <h1 className='text-white text-[15px] font-[Metamorphous] font-bold first-letter:text-[25px] first-letter:font-medium z-10'>CHAKSHU</h1>
            <div className='flex flex-row items-center justify-end'>
                <div className='mx-8 flex flex-row items-end gap-2 cursor-pointer'>
                    <AiFillHome size={25} className='text-white'/>
                    <p className='text-sm text-white'>Home</p>
                </div>
                <div className='mx-8 flex flex-row items-end gap-2 cursor-pointer'>
                    <MdDeveloperBoard size={25} className='text-sm text-white'/>
                    <p className='text-sm text-white'>Police Notice Board</p>
                </div>
                <div className='mx-8 flex flex-row items-end gap-2 cursor-pointer'>
                    <BsFileEarmarkBarGraph size={25} className='text-sm text-white'/>
                    <p className='text-sm text-white'>Local Crime Stats</p>
                </div>
                <div onClick={()=>navigate('/report')} className='ml-5 mr-12 flex flex-row items-end gap-2 cursor-pointer'>
                    <button className='bg-[#BB3330] py-1 px-4 rounded-full'>
                        <p className='text-sm text-white'>Report Crime</p>
                    </button>
                </div>
                {!loggedIn ? (
                <>
                <div ref={dropDownRef} onClick={()=>setDropDown(!dropDown)} className='cursor-pointer flex flex-row items-center justify-center gap-2'>
                    <img src={userimg} alt="userimage" className='w-[45px] h-[45px] object-cover p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500' />
                    {!dropDown && <BsFillCaretDownFill  className='text-white'/>}
                    {dropDown && <BsFillCaretDownFill  className='text-white rotate-180'/>}
                
                </div>
                    {
                        dropDown && 
                        <div id='links' className='absolute text-justify py-4 flex flex-col gap-[5px] bg-black text-white h-max w-max right-[2vh] top-[7vh] rounded-lg z-10'>
                            {
                                dropLinks.map((data, index)=>(
                                    <li key={index} onClick={()=>navigate(data.link.toString())} className='list-none cursor-pointer hover:bg-white px-4 py-1 rounded-sm font-[Poppins] text-[15px] hover:text-black w-full'>{data.name}</li>
                                ))
                            }
                        </div>
                    }
                </>
                ):(
                    <div className='flex flex-row items-end justify-center gap-2 cursor-pointer hover:text-[#ffb0ae] text-white'>
                        <FiLogIn size={20} className='text-sm'/>
                        <p className='text-sm'>Login</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default Navbar