import React, { useEffect, useRef, useState } from 'react'
import PostSmall from '../Molecules/PostsSmall';
import crimeimg from '../assets/crime.jpg'
import postsArray from '../Components/utils/posts.json'
import { FiFile, FiUpload } from 'react-icons/fi';
import { toast, Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { TiTick } from 'react-icons/ti'
import axios from 'axios'

export default function PostReports({form, setForm, title}) {
    const [showModal, setShowModal] = useState(false)
    const posts = postsArray.posts
    const [clickedIndex, setClickedIndex] = useState()
    const [check, setCheck] = useState(false)
    const [disableButton, setDisableButton] = useState(false)
    const [isFileUploaded, setIsFileUploaded] = useState(false)
    const inputFileRef = useRef(null);
    const navigate = useNavigate()

    const onBtnClick = () => {
        inputFileRef.current.click();
    }

    const handleMediaChange = (e)=>{

        if(e.target.files.length !== 0){
            setForm(form=>({...form, media:e.target.files}))
            setIsFileUploaded(true)
        }
        else{
            setIsFileUploaded(false)
            setForm(form=>({...form, media:[]}))
        }
    }

    const handleCheck = (e)=>{
        if(e.target.checked)
        {
            setCheck(true)
        }
        else
        {
            setCheck(false)
        }
    }

    const handleFormChange = (e)=>{
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleCancel = (e)=>{
        setForm(form=>({...form, media:[], description:''}))
        setCheck(false)
        setShowModal(false)
    }
    
    const handleConfirm = (e)=>{
        if(check){
            let formData = new FormData()
            Object.entries(form).forEach((element)=>{
                const [key, value] = element
                if(key === 'media'){
                    Array.from(value).forEach((file)=>{
                        formData.append(key, file)
                    })
                }
                else{
                    formData.append(key, value)
                }
            })

            let config = {
                method: 'post',
                url: 'http://localhost:4000/api/crime/addSupport?userId=63df67e5af53315760bc8e91&postId=63e3e259716152896d083b31',
                data : formData,
                headers:{
                    'Content-Type':'multipart/form-data'
                }
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
                                  Crime Report Registered Successfully. Thankyou!
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
                setDisableButton(false)
            })
        }
    }

    useEffect(()=>{
        if(Array.from(form.media).length === 0 || form?.description?.length === 0 || !check){
            setDisableButton(true)
        }
        else{
            setDisableButton(false)
        }
    }, [check, form])

  return (
    <>
    <div className='min-h-[68vh] max-h-[68vh] min-w-[48vw] w-full bg-gray-100 rounded-xl overflow-hidden'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <p className='my-3 mx-5 text-[18px] font-medium text-[#BB3330]'>{title}</p>
        {title && <h1 className='mx-5 font-[Poppins] text-[12px] text-gray-500'>Click the crime reports to add more details or click on report new crime to add a new one.</h1>}
        <div className='min-h-[60vh] max-h-[60vh] ml-5 mr-3 gap-4 scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-300 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
            {posts.map((item, index)=>{
                return <div key={index} onClick={()=>{setShowModal(true); setClickedIndex(index)}} className='cursor-pointer hover:ring-1 ring-[#bb3330] w-max rounded-lg ml-1'><PostSmall img={crimeimg} title= {item.title} locality={item.address.locality} severity={item.severity} verification={item.verification}/></div>
            })}
        </div>
    </div>
    
    {showModal ? (
                    <div id='popup' className="fixed inset-0 z-10 overflow-y-auto select-none min-w-[50vw] max-w-[50vw] mx-auto">
                        <button onClick={() => {setShowModal(false); handleCancel()}} className="fixed inset-0 w-full h-full bg-black opacity-70"></button>
                        <div className="flex items-center min-h-screen px-4 py-8 w-full">
                            <div className="relative w-full p-4 mx-auto bg-white rounded-lg shadow-lg min-h-[70vh] max-h-[70vh] overflow-y-scroll">
                                <div className='flex flex-col items-center justify-center gap-4 w-full'>
                                    <PostSmall img={crimeimg} title= {posts[clickedIndex].title} locality={posts[clickedIndex].address.locality} severity={posts[clickedIndex].severity} verification={posts[clickedIndex].verification}/>  
                                </div>

                                <div className='flex flex-col items-center justify-center w-10/12 mx-auto gap-2'>
                                    <h1 className='font-[Poppins] self-start font-medium text-sm text-black'>Description<span className='text-[#BB3330] text-lg'>*</span></h1>
                                    <textarea type="text" name='description' placeholder='A descriptive paragraph stating the what, where and how of the crime you are reporting.' value={form.description} onChange={handleFormChange} autoComplete='off' className='font-[Poppins] placeholder:text-[#c5bfbf] w-full rounded-lg shadow-md focus:outline-none py-2 px-4 focus:ring-1 ring-gray-400'></textarea>
                                </div>

                                <div onClick={onBtnClick} className='mt-4 flex flex-col items-center justify-center cursor-pointer duration-200 ease-in-out text-gray-400 hover:text-[#bb3330] hover:border-[#bb3330] w-10/12 mx-auto gap-6 border-[1px] border-dashed border-black min-h-24 max-h-max py-4'>
                                    {
                                        isFileUploaded && 
                                        <div>
                                            {
                                                
                                                Array.from(form.media)?.map((data, index)=>(
                                                    <div key={index} className='flex flex-row items-center justify-start gap-3'>
                                                        <FiFile className='text-black text-sm'/>
                                                        <h1 className='text-black'>{data.name}</h1>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    }
                    
                                    <div className='flex flex-row items-center justify-center gap-2'>
                                        <FiUpload className='text-lg'/>
                                        <h1 className='font-[Poppins] font-medium text-sm text-center'>Upload Evidence (image / audio / video)<span className='text-[#BB3330] text-lg'>*</span></h1>
                                        <input type="file" multiple ref={inputFileRef} onChange={handleMediaChange} className='hidden'></input>
                                    </div>
                                </div>

                                <div className='flex flex-col items-start justify-center w-10/12 gap-2 mx-auto mt-4'>
                                    <h1 className='font-[Poppins] font-medium text-sm text-black'>Do you want to be an eye-witness?<span className='text-[#BB3330] text-lg'>*</span></h1>
                                    <div className='flex flex-row items-center justify-center gap-4 text-sm font-[Poppins] font-medium'>
                                        <input type="radio" name='isWitness' value={true} onChange={handleFormChange} autoComplete='off' className='font-[Poppins] placeholder:text-[#c5bfbf] outline-none rounded-lg shadow-md focus:outline-none py-2 px-4 cursor-pointer'></input><h1>Yes</h1>
                                    </div>
                                    <div className='flex flex-row items-center justify-center gap-4 text-sm font-[Poppins] font-medium'>
                                        <input type="radio" name='isWitness' value={false} onChange={handleFormChange} autoComplete='off' className='font-[Poppins] placeholder:text-[#c5bfbf] outline-none rounded-lg shadow-md focus:outline-none py-2 px-4 cursor-pointer'></input><h1>No</h1>
                                    </div>
                                </div>

                                <div className='flex flex-row items-center justify-start w-10/12 mx-auto text-justify gap-4 mt-5'>
                                    <ul className='list-outside list-disc'>
                                        <li className='text-[#BB3330] font-[Poppins] text-[13px] font-medium'>
                                            As a responsible citizen, it is important to report any criminal activity in your community. 
                                            Submitting a crime report form on <span className='font-bold underline'>Chakshu</span> helps fellow citizens to be vigilant and it also assists law enforcement agencies in their investigations and 
                                            efforts to keep the community safe. By taking the time to fill out the form accurately and truthfully, you are playing 
                                            a crucial role in promoting justice and maintaining a secure community.
                                        </li>
                                    </ul>
                                </div>

                                <div className='flex flex-row items-center justify-start w-10/12 text-start gap-4 mt-4 mx-auto'>
                                    <input type="checkbox" name='check' onChange={handleCheck} className='cursor-pointer'></input> 
                                    <h1 className='text-[#BB3330] font-[Poppins] text-[13px] font-medium'>I have read the above paragraph and I acknowledge to submit accurate details of the crime.</h1>
                                </div>

                                <div className='flex flex-row items-center justify-start w-10/12  mx-auto gap-8 mt-5'>
                                    <button disabled={disableButton} onClick={handleConfirm} id='clickOK' className='disabled:bg-gray-300 disabled:text-gray-400 hover:cursor-pointer font-[Poppins] text-white disabled:hover:bg-gray-300 hover:bg-red-500 bg-red-400 shadow-lg px-3 py-1 text-sm font-medium rounded-lg'>Confirm</button>
                                    <button onClick={handleCancel} id='clickOK' className='hover:cursor-pointer font-[Poppins] text-white hover:bg-green-500 bg-green-400 shadow-lg px-3 py-1 text-sm font-medium rounded-lg'>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
            ) : null}



    </>
  )
}