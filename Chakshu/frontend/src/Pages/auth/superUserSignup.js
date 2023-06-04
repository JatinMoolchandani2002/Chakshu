import React, { useEffect, useState, useRef } from 'react'
import stateArray from '../../Components/utils/state.json'
import { useNavigate } from 'react-router-dom'
import { FiUpload } from "react-icons/fi"
import { AiFillHome, AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { TiTick } from 'react-icons/ti'
import { GoAlert } from 'react-icons/go'
import { toast, Toaster } from 'react-hot-toast'
import axios from 'axios'

export default function SuperUserSignup(){

    let initialImage = {
        userProfileImage: "profileImage2.png"
    }
    const [image, setImage] = useState(initialImage)
    const states = stateArray.states
    const [form, setForm] = useState({userName:'', password:'', name:'', locality:'', city:'', state:'', pincode:'', userType:'', contactNum:''})
    const [errorList, setErrorList] = useState({
        userNameError:'', passwordError:'',nameError:'',
        pincodeError:'', contactNumError:'',profileImageError:''
    })
    const [showModal, setShowModal] = React.useState(false)
    const [submit, setSubmit] = useState(false)

    const inputFileRef = useRef(null);
    const onFilechange = (e) => {
        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage(image =>({...image, userProfileImage: reader.result }))
                setForm(form =>({...form, profileImage:e.target.files[0]}))
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    const onBtnClick = () => {
        inputFileRef.current.click();
    }

    const navigate = useNavigate()

    const [isPasswordSeen, setIsPasswordSeen] = useState('password')
    const [disableLogin, setDisableLogin] = useState(true)

    useEffect(()=>{
        let flag = 0
        Object.entries(form).forEach((element)=>{
            // eslint-disable-next-line
            const [key, value] = element
            if(value === ''){
                setDisableLogin(true)
                flag = 1
            }
        })

        if(flag === 0){
            setDisableLogin(false)
        }
        
    },[form])

    const handleFormChange = (e)=>{
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleConfirm = ()=>{
        setShowModal(false)
        setDisableLogin(true)
        const formData = new FormData();
        Object.entries(form).forEach((element)=>{
            const [key, value] = element
            formData.append(key, value)
        })
        let config = {
            method: 'post',
            url: 'http://localhost:4000/api/auth/superUserSignup',
            data : formData
          };
        axios(config).then((response)=>{
            if(response.status === 201){
                let tid;
                toast.custom((t) => (
                    <div
                      className={`${
                        t.visible ? 'animate-enter' : 'animate-leave'
                      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                    >
                      <div className="flex-1 w-0 p-4">
                        <div className="flex items-center">
                            <TiTick className='text-3xl p-1 text-green-600 bg-green-200 rounded-full'/>

                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              Signup Successful!
                            </p>
                            
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        <button
                          onClick={() => {toast.dismiss(t.id); navigate('/'); tid=t.id}}
                          className="w-full rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 outline-none cursor-pointer"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  ))

                setTimeout(()=>{
                    toast.dismiss(tid)
                    navigate('/')
                }, 1000)
            }
        }).catch((err)=>{
            let message = ''
            err.response.data?.data?.map((data)=>(
                message += data.msg + '\n'
            ))
            message += err.response.data.message
            toast.error(message)
            setDisableLogin(false)
        })
    }

    const handleCancel = ()=>{
        setShowModal(false)
        setSubmit(false)
        setErrorList(errorList=>({...errorList, 
            userNameError:'', passwordError:'',nameError:'',
            pincodeError:'', contactNumError:'',profileImageError:''
        }))
    }

    const handleFormSubmit = async()=>{

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/
        let flag = 0

        if(form.userName.length<6 || form.userName.length>15){
            flag = 1
            const errorMessage = 'User Name must contain min 6 characters, max 15 characters'
            setErrorList(errorList=>({...errorList, userNameError:errorMessage}))
        }
        if(!passwordRegex.test(form.password)){
            flag = 1
            const errorMessage = 'Password must contain min 8 characters, max 15 characters, at least one Uppercase, one Lowercase and one special symbol'
            setErrorList(errorList=>({...errorList, passwordError:errorMessage}))
        }
        if(form.contactNum.length !== 10){
            flag = 1
            const errorMessage = 'Contact Number must contain 10 characters'
            setErrorList(errorList=>({...errorList, contactNumError:errorMessage}))
        }
        if(form.pincode.length !== 6){
            flag = 1
            const errorMessage = 'Pincode must contain 6 characters'
            setErrorList(errorList=>({...errorList, pincodeError:errorMessage}))
        }
        if(form.name.length>20 || form.name.length<3){
            flag = 1
            const errorMessage = 'User Name must contain min 3 characters, max 20 characters'
            setErrorList(errorList=>({...errorList, nameError:errorMessage}))
        }
        if(form.profileImage === undefined){
            flag = 1
            const errorMessage = 'Upload Profile Image'
            setErrorList(errorList=>({...errorList, profileImageError:errorMessage}))
        }

        if(flag){
            setShowModal(true)
        }
        else{
            setSubmit(true)
            setShowModal(true)
        }
    }

    return(
        <div className='h-full'>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div className='h-max flex flex-col justify-start items-start select-none'>
                <div className='h-[6vh] z-10' onClick={()=>navigate('/')}>
                    <AiFillHome className='text-[30px] mx-6 my-3 hover:scale-105 cursor-pointer text-gray-800'/>
                </div>
                <div className='min-h-[100vh] w-full max-h-max flex items-center z-10 overflow-y-scroll py-8'>
                    <div className='w-[90vw] md:w-1/2 flex flex-col items-center justify-start mx-auto bg-white opacity-100 border-t-[6px] border-gray-800 shadow-xl rounded-lg h-max gap-6 py-8'>
                        <h1 className='w-10/12 font-[Poppins] font-medium text-xl text-black pb-4 text-center border-b-[2px] border-gray-600'>Signup</h1>
                        
                        <div className='my-0 ml-10 md:ml-0 md:flex md:flex-row md:items-center md:justify-center md:gap-8 w-full md:w-9/12'>
                            <div className='mt-3 md:my-0 w-full md:w-9/12 md:flex md:flex-col md:items-start md:justify-center md:gap-2'>
                                <h1 className='font-[Poppins] font-medium text-xs md:text-sm text-black'>Username</h1>
                                <input type="text" name='userName' placeholder='User@123' value={form.userName} onChange={handleFormChange} autoComplete='off' className='mt-1 font-[Poppins] text-[11px] md:text-base placeholder:text-[#c5bfbf] w-[80%] md:w-full rounded-lg shadow-md focus:outline-none py-2 px-4 focus:ring-1 ring-gray-400'></input>
                            </div>
                        
                            <div className='mt-3 md:my-0 w-full md:w-9/12 md:flex md:flex-col md:items-start md:justify-center md:gap-2'>
                                <h1 className='font-[Poppins] font-medium text-xs md:text-sm text-black'>Password</h1>
                                <div className='flex flex-row w-full items-center'>
                                    <input type={isPasswordSeen} name='password' placeholder='••••••••' value={form.password} onChange={handleFormChange} autoComplete='off' className='mt-1 font-[Poppins] text-[11px] md:text-base placeholder:text-[#c5bfbf] w-[80%] md:w-full rounded-lg shadow-md focus:outline-none py-2 px-4 focus:ring-1 ring-gray-400'></input>
                                    {isPasswordSeen==='password' && <span className='relative mx-[-30px] text-xl text-black'><AiFillEye onClick={()=>setIsPasswordSeen('text')} className='hover:cursor-pointer'/></span>}
                                    {isPasswordSeen==='text' && <span className='relative mx-[-30px] text-xl text-black'><AiFillEyeInvisible onClick={()=>setIsPasswordSeen('password')} className='hover:cursor-pointer'/></span>}
                            </div>
                            </div>
                        </div>

                        <div className='my-0 ml-10 md:ml-0 md:flex md:flex-row md:items-center md:justify-center md:gap-8 w-full '>
                            <div className='mt-3 md:my-0 w-full md:w-9/12 md:flex md:flex-col md:items-start md:justify-center md:gap-2'>
                                <h1 className='font-[Poppins] font-medium text-xs md:text-sm text-black'>Name</h1>
                                <input type="text" name='name' placeholder='Pune City Police' value={form.name} onChange={handleFormChange} autoComplete='off' className='mt-1 font-[Poppins] text-[11px] md:text-base placeholder:text-[#c5bfbf] w-[80%] md:w-full rounded-lg shadow-md focus:outline-none py-2 px-4 focus:ring-1 ring-gray-400'></input>
                            </div>
                        </div>

                        <div className='my-0 ml-10 md:ml-0 md:flex md:flex-row md:items-center md:justify-center md:gap-8 w-full md:w-9/12'>
                            <div className='mt-3 md:my-0 w-full md:w-9/12 md:flex md:flex-col md:items-start md:justify-center md:gap-2'>
                                <h1 className='font-[Poppins] font-medium text-xs md:text-sm text-black'>Contact</h1>
                                <input type="text" name='contactNum' placeholder='9874569872' value={form.contactNum} onChange={handleFormChange} autoComplete='off' className='mt-1 font-[Poppins] text-[11px] md:text-base placeholder:text-[#c5bfbf] w-[80%] md:w-full rounded-lg shadow-md focus:outline-none py-2 px-4 focus:ring-1 ring-gray-400'></input>
                            </div>
                        
                            <div className='mt-3 md:my-0 w-full md:w-9/12 md:flex md:flex-col md:items-start md:justify-center md:gap-2'>
                                <h1 className='font-[Poppins] font-medium text-xs md:text-sm text-black'>Member Type</h1>
                                <div className='flex flex-row w-full items-center'>
                                <select name='userType' onChange={handleFormChange} value={form.userType} className='mt-1 font-[Poppins] text-[11px] md:text-base placeholder:text-[#c5bfbf] w-[80%] md:w-full rounded-lg shadow-md focus:outline-none py-2 px-4 focus:ring-1 ring-gray-400'>
                                <option value='' className='font-[Poppins] text-sm text-gray-500'>Select Member Type</option>
                                <option value='Police' className='font-[Poppins] text-sm text-black'>Police</option>
                                <option value='Media Agency' className='font-[Poppins] text-sm text-black'>Media Agency</option>
                            </select>
                                </div>
                            </div>
                        </div>

                        <div className='my-0 ml-10 md:ml-0 md:flex md:flex-row md:items-center md:justify-center md:gap-8 w-full md:w-9/12'>
                            <div className='mt-3 md:my-0 w-full md:w-9/12 md:flex md:flex-col md:items-start md:justify-center md:gap-2'>
                                <h1 className='font-[Poppins] font-medium text-xs md:text-sm text-black'>Locality</h1>
                                <input type="text" name='locality' placeholder='Viman Nagar' value={form.locality} onChange={handleFormChange} autoComplete='off' className='mt-1 font-[Poppins] text-[11px] md:text-base placeholder:text-[#c5bfbf] w-[80%] md:w-full rounded-lg shadow-md focus:outline-none py-2 px-4 focus:ring-1 ring-gray-400'></input>
                            </div>
                        
                            <div className='mt-3 md:my-0 w-full md:w-9/12 md:flex md:flex-col md:items-start md:justify-center md:gap-2'>
                                <h1 className='font-[Poppins] font-medium text-xs md:text-sm text-black'>City</h1>
                                <div className='flex flex-row w-full items-center'>
                                    <input type="text" name='city' placeholder='Pune' value={form.city} onChange={handleFormChange} autoComplete='off' className='mt-1 font-[Poppins] text-[11px] md:text-base placeholder:text-[#c5bfbf] w-[80%] md:w-full rounded-lg shadow-md focus:outline-none py-2 px-4 focus:ring-1 ring-gray-400'></input>
                                </div>
                            </div>
                        </div>

                        <div className='my-0 ml-10 md:ml-0 md:flex md:flex-row md:items-center md:justify-center md:gap-8 w-full md:w-9/12'>
                            <div className='mt-3 md:my-0 w-full md:w-9/12 md:flex md:flex-col md:items-start md:justify-center md:gap-2'>
                            <h1 className='font-[Poppins] font-medium text-xs md:text-sm text-black'>State</h1>
                            <select name='state' onChange={handleFormChange} value={form.state} className='mt-1 font-[Poppins] text-[11px] md:text-base placeholder:text-[#c5bfbf] w-[80%] md:w-full rounded-lg shadow-md focus:outline-none py-2 px-4 focus:ring-1 ring-gray-400'>
                                <option value='' className='font-[Poppins] text-sm text-gray-500'>Select State / Union Territory</option>
                                {
                                    states.map((data, index)=>
                                        <option key={index} value={data.value} className='font-[Poppins] text-sm'>{data.label}</option>
                                    )
                                }
                            </select>
                            </div>
                        
                            <div className='mt-3 md:my-0 w-full md:w-9/12 md:flex md:flex-col md:items-start md:justify-center md:gap-2'>
                                <h1 className='font-[Poppins] font-medium text-xs md:text-sm text-black'>Pincode</h1>
                                <div className='flex flex-row w-full items-center'>
                                    <input type="text" name='pincode' placeholder='411014' value={form.pincode} onChange={handleFormChange} autoComplete='off' className='mt-1 font-[Poppins] text-[11px] md:text-base placeholder:text-[#c5bfbf] w-[80%] md:w-full rounded-lg shadow-md focus:outline-none py-2 px-4 focus:ring-1 ring-gray-400'></input>
                                </div>
                            </div>
                        </div>

                        <div className="w-9/12 items-center justify-center">
                            <div className='w-1/2 h-[250px] mx-auto bg-white rounded-md'>
                                <div className='flex flex-row justify-center items-center w-full h-full mx-auto overflow-hidden'>
                                    <img src={image.userProfileImage} alt="Uploaded Profile" className="rounded-md object-contain border-2 border-white"></img>
                                </div>
                            </div>
                            <div onClick={onBtnClick} className={`cursor-pointer flex flex-row justify-center mx-0 xl:mx-auto items-center rounded-3xl shadow-3xl shadow-gray-900 mt-4 w-1/2 px-0 py-2 gap-4 bg-white text-blue-900 hover:bg-red-200 hover:text-black`}>
                                <i className='text-sm xl:text-2xl cursor-pointer'><FiUpload /></i>
                                <button className='font-[Poppins] font-bold xl:font-extrabold text-xs xl:text-sm'>Upload Profile Image</button>
                                <input type="file" ref={inputFileRef} onChange={onFilechange} className='hidden'></input>
                            </div>
                        </div>

                        <div className='md:my-0 w-full md:w-9/12 md:flex md:flex-col md:items-start md:justify-center md:gap-2 mt-3'>
                            <button disabled={disableLogin} onClick={handleFormSubmit} className='font-[Poppins] w-full rounded-lg shadow-md py-2 px-4 bg-[#353535] text-white hover:bg-[#212121] disabled:text-gray-400 disabled:bg-orange-100 disabled:cursor-not-allowed'>Signup</button>
                        </div>
                        <h1 onClick={()=>{navigate('/superlogin')}} className='font-[Poppins] font-medium text-sm text-gray-500 mt-2 w-5/12 text-center hover:text-gray-800 cursor-pointer'>Already Registered? Login</h1>
                    </div>
                </div>
            </div>


            {showModal ? (
                    <div id='popup' className="fixed inset-0 z-10 overflow-y-auto select-none">
                        <button onClick={() => setShowModal(false)} className="fixed inset-0 w-full h-full bg-black opacity-40"></button>
                        <div className="flex items-center min-h-screen px-4 py-8">
                            <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-lg shadow-lg">
                                <div className='flex flex-col items-start justify-center gap-4'>
                                    <div className="flex flex-row items-center justify-start mx-auto w-full gap-8">
                                        <div className='bg-red-100 rounded-full p-2'>
                                            <GoAlert className='text-red-500 text-2xl'/>
                                        </div>
                                        {!submit && <h1 className='font-[Poppins] font-medium text-black'>Signup Error</h1>} 
                                        {submit && <h1 className='font-[Poppins] font-medium text-black'>Confirmation</h1>} 
                                    </div>

                                    {!submit && <h1 className='font-[Poppins] font-medium text-sm text-justify px-2 text-black'>Please input correct data. Following are the errors observed:</h1>}
                                    {submit && <h1 className='font-[Poppins] font-medium text-sm text-justify px-2 text-black'>Please verify the following details, click on Confirm to Proceed or Cancel to recheck the data.</h1>}
                                    {submit && <h1 className='font-[Poppins] font-medium text-xs text-justify px-2 text-black'>* Please note the Username and Password for later uses.</h1>}
                                    {
                                        !submit &&
                                        Object.entries(errorList).map((key, index)=>{

                                            return  key[1]!=='' && <li className='text-justify list-outside px-2 font-[Poppins] text-xs font-medium' key={index}>{key[1]}</li>
                                            
                                        })
                                    }

                                    {
                                        submit &&
                                        Object.entries(form).map((key, index)=>{
                                            return  key[0].toString()!=='password' && key[0].toString()!=='profileImage' && <li className='text-justify list-outside px-2 font-[Poppins] text-xs font-medium' key={index}>{key[0].toUpperCase()} : {key[1]}</li>
                                            
                                        })
                                    }

                                </div>

                                <div className='flex flex-row items-center justify-start gap-8 py-3 mt-1 px-2'>
                                    {!submit && <button onClick={handleCancel} id='clickOK' className='hover:cursor-pointer font-[Poppins] text-white hover:bg-red-500 bg-red-400 shadow-lg px-3 py-1 text-sm font-medium rounded-lg'>OK</button>}
                                    {submit && <button onClick={handleConfirm} id='clickOK' className='hover:cursor-pointer font-[Poppins] text-white hover:bg-red-500 bg-red-400 shadow-lg px-3 py-1 text-sm font-medium rounded-lg'>Confirm</button>}
                                    {submit && <button onClick={handleCancel} id='clickOK' className='hover:cursor-pointer font-[Poppins] text-white hover:bg-green-500 bg-green-400 shadow-lg px-3 py-1 text-sm font-medium rounded-lg'>Cancel</button>}
                                </div>
                            </div>
                        </div>
                    </div>
            ) : null}
        </div>
    )
}