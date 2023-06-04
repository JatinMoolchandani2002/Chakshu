import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiFillHome, AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { toast, Toaster } from 'react-hot-toast'
import axios from 'axios'

export default function Login(){

    const [form, setForm] = useState({userName:'',password:''})
    const navigate = useNavigate()

    const [isPasswordSeen, setIsPasswordSeen] = useState('password')
    const [disableLogin, setDisableLogin] = useState(false)
    const [submitCount, setSubmitCount] = useState(0)
    const [isDisabled, setIsDisabled] = useState(false)

    const checkAttempts = ()=>{
        let setAttemptAfterTime = localStorage.getItem('setAttemptAfterTime')
        if(setAttemptAfterTime){
            const checkDate = new Date(setAttemptAfterTime)
            const currentDate = new Date(Date.now())
            const timeDiff = Math.abs(checkDate - currentDate) / 1000
            const timeDiffMin = Math.floor(timeDiff/60)%60 
            const timeDiffSecond = timeDiff % 60
            if(timeDiffMin < 2 && timeDiff < 60){
                setIsDisabled(true)
                return {valid:false, min:timeDiffMin, sec:timeDiffSecond}
            }
            else{
                setIsDisabled(false)
                localStorage.removeItem('setAttemptAfterTime')
                return {valid:true, min:timeDiffMin, sec:timeDiffSecond}
            }
        }
        return {valid:true}
    }

    useEffect(()=>{
        let value = checkAttempts()
        if(!value.valid){
            toast.error(`Max Attempts Already Reached! Try after ${1-value.min} min ${Math.floor(60-value.sec)} sec.`)
        }
        // eslint-disable-next-line
    },[])

    setInterval(()=>{
        checkAttempts()
    }, 10000)

    useEffect(()=>{
        if(form.password === '' || form.userName === ''){
            setDisableLogin(true)
        }
        else if(!isDisabled){
            setDisableLogin(false)
        }
        // eslint-disable-next-line
    },[form])

    const handleFormChange = (e)=>{
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleFormSubmit = ()=>{
        setSubmitCount((submitCount)=>submitCount+1)

        axios.post('http://localhost:4000/api/auth/userLogin', form).then((response)=>{
            if(response.status===200){
                setDisableLogin(true)
                localStorage.setItem('token', response.data.data.JWT)
                toast.success('Logged In Successfully!')
                setTimeout(()=>{
                    navigate('/')
                },400)
            }
        }).catch((err)=>{
    
            if(submitCount >= 3 && submitCount <=5){             
                if(5-submitCount === 0){
                    toast.error('Max Attempts Reached! Try again after 2 minutes.')
                    setDisableLogin(true)
                    localStorage.setItem('setAttemptAfterTime', new Date(Date.now()))
                }
                else{
                    toast.error(`Login Failed! ${5-submitCount} attempts remaining!`)
                }
            }
            else{
                let message = ''
                err.response.data?.data?.map((data)=>(
                    message += data.msg + '\n'
                ))
                message += err.response.data.message

                toast.error('Login Failed! ' + message)
            }
        })
    }

    return(
        <div className='h-max flex flex-col justify-start select-none'>
            <Toaster position="top-center" reverseOrder={false}/>
            <div className='z-10 h-[6vh]' onClick={()=>navigate('/')}>
                <AiFillHome className='text-[30px] z-10 mx-6 my-3 hover:scale-105 cursor-pointer text-gray-800'/>
            </div>
            <div className='h-[100vh] flex items-center z-10'>
                <div className='w-[90vw] md:w-[27%] flex flex-col items-center justify-start mx-auto bg-white border-t-[6px] border-gray-800 shadow-xl rounded-lg h-max gap-6 py-8'>
                    <h1 className='w-10/12 font-[Poppins] font-medium text-xl text-black pb-4 text-center border-b-[2px] border-gray-400'>Login</h1>
                    <div className='w-9/12 flex flex-col items-start justify-center gap-2'>
                        <h1 className='font-[Poppins] font-medium text-sm text-black'>Username</h1>
                        <input type="text" name='userName' placeholder='User@123' value={form.userName} onChange={handleFormChange} autoComplete='off' className='font-[Poppins] placeholder:text-[#c5bfbf] w-full rounded-lg shadow-md focus:outline-none py-2 px-4 focus:ring-1 ring-gray-400'></input>
                    </div>
                    
                    <div className='w-9/12 flex flex-col items-start justify-center gap-2'>
                        <h1 className='font-[Poppins] font-medium text-sm text-black'>Password</h1>
                        <div className='flex flex-row w-full items-center'>
                            <input type={isPasswordSeen} name='password' placeholder='••••••••' value={form.password} onChange={handleFormChange} autoComplete='off' className='font-[Poppins] placeholder:text-[#c5bfbf] w-full rounded-lg shadow-md focus:outline-none py-2 px-4 focus:ring-1 ring-gray-400'></input>
                            {isPasswordSeen==='password' && <span className='relative mx-[-30px] text-xl text-black'><AiFillEye onClick={()=>setIsPasswordSeen('text')} className='hover:cursor-pointer'/></span>}
                            {isPasswordSeen==='text' && <span className='relative mx-[-30px] text-xl text-black'><AiFillEyeInvisible onClick={()=>setIsPasswordSeen('password')} className='hover:cursor-pointer'/></span>}
                        </div>
                    </div>

                    <div className='w-9/12 flex flex-col items-start justify-center gap-2 mt-3'>
                        <button disabled={disableLogin} onClick={handleFormSubmit} className='font-[Poppins] w-full rounded-lg shadow-md py-2 px-4 bg-[#353535] text-white hover:bg-[#212121] disabled:text-gray-400 disabled:bg-orange-100 disabled:cursor-not-allowed'>Login</button>
                    </div>
                    <h1 onClick={()=>{navigate('/signup')}} className='font-[Poppins] font-medium text-sm text-gray-500 mt-2 w-5/12 text-center hover:text-gray-800 cursor-pointer'>New User? Signup</h1>
                </div>
            </div>
        </div>
    )
}