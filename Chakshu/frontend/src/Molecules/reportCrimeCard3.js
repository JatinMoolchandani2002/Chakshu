import React, { useRef, useState, useEffect } from 'react'
import { FiFile, FiUpload } from 'react-icons/fi';
import { TiTick } from 'react-icons/ti'
import { toast, Toaster } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function ReportCrimeCard3({form, setForm, setCardNum}){
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

    const handleSubmit = ()=>{
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
                url: 'http://localhost:4000/api/crime/register?userId=63df67e5af53315760bc8e91',
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
        let flag = 0
        Object.entries(form)?.forEach((element)=>{
            // eslint-disable-next-line
            const [key, value] = element
            if(value.length === 0){
                setDisableButton(true)
                flag = 1
            }
        })
        if(flag === 0 && check){
            setDisableButton(false)
        }
        else{
            setDisableButton(true)
        }

    }, [check, form])

    return(
        <div className='min-w-[48vw]  pb-4 mt-12 max-h-[70vh] overflow-y-scroll'>
            <Toaster reverseOrder={false} position={'top-center'}/>
            <div className='flex flex-col items-center justify-center mx-5 gap-6'>

                <div className='flex flex-col items-start justify-center w-10/12 gap-2'>
                    <h1 className='font-[Poppins] font-medium text-sm text-black'>Title<span className='text-[#BB3330] text-lg'>*</span></h1>
                    <input type="text" name='title' placeholder='A one sentence title for the crime' value={form.title} onChange={handleFormChange} autoComplete='off' className='font-[Poppins] placeholder:text-[#c5bfbf] w-full rounded-lg shadow-md focus:outline-none py-2 px-4 focus:ring-1 ring-gray-400'></input>
                </div>

                <div className='flex flex-col items-start justify-center w-10/12 gap-2'>
                    <h1 className='font-[Poppins] font-medium text-sm text-black'>Description<span className='text-[#BB3330] text-lg'>*</span></h1>
                    <textarea type="text" name='description' placeholder='A descriptive paragraph stating the what, where and how of the crime you are reporting.' value={form.description} onChange={handleFormChange} autoComplete='off' className='font-[Poppins] placeholder:text-[#c5bfbf] w-full rounded-lg shadow-md focus:outline-none py-2 px-4 focus:ring-1 ring-gray-400'></textarea>
                </div>

                <div className='flex flex-col items-start justify-center w-10/12 gap-2'>
                    <h1 className='font-[Poppins] font-medium text-sm text-black'>Crime Severity<span className='text-[#BB3330] text-lg'>*</span></h1>
                    <select name='severity' onChange={handleFormChange} value={form.severity} className='font-[Poppins] text-[11px] md:text-base placeholder:text-[#c5bfbf] w-[80%] md:w-full rounded-lg shadow-md focus:outline-none py-2 px-4 focus:ring-1 ring-gray-400'>
                        <option value='' className='font-[Poppins] text-sm text-gray-500'>Select Crime Severity</option>
                        <option value='Low' className='font-[Poppins] text-sm'>Low</option>
                        <option value='Medium' className='font-[Poppins] text-sm'>Medium</option>  
                        <option value='High' className='font-[Poppins] text-sm'>High</option> 
                    </select>
                </div>

                <div onClick={onBtnClick} className='flex flex-col items-center justify-center cursor-pointer duration-200 ease-in-out text-gray-400 hover:text-[#bb3330] hover:border-[#bb3330] w-10/12 gap-6 border-[1px] border-dashed border-black min-h-24 max-h-max py-4'>
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

                <div className='flex flex-col items-start justify-center w-10/12 gap-2'>
                    <h1 className='font-[Poppins] font-medium text-sm text-black'>Do you want to be an eye-witness?<span className='text-[#BB3330] text-lg'>*</span></h1>
                    <div className='flex flex-row items-center justify-center gap-4 text-sm font-[Poppins] font-medium'>
                        <input type="radio" name='isWitness' value={true} onChange={handleFormChange} autoComplete='off' className='font-[Poppins] placeholder:text-[#c5bfbf] outline-none rounded-lg shadow-md focus:outline-none py-2 px-4 cursor-pointer'></input><h1>Yes</h1>
                    </div>
                    <div className='flex flex-row items-center justify-center gap-4 text-sm font-[Poppins] font-medium'>
                        <input type="radio" name='isWitness' value={false} onChange={handleFormChange} autoComplete='off' className='font-[Poppins] placeholder:text-[#c5bfbf] outline-none rounded-lg shadow-md focus:outline-none py-2 px-4 cursor-pointer'></input><h1>No</h1>
                    </div>
                </div>

                <div className='flex flex-row items-center justify-start w-10/12 text-justify gap-4 mt-2'>
                    <ul className='list-outside list-disc'>
                        <li className='text-[#BB3330] font-[Poppins] text-[13px] font-medium'>
                            As a responsible citizen, it is important to report any criminal activity in your community. 
                            Submitting a crime report form on <span className='font-bold underline'>Chakshu</span> helps fellow citizens to be vigilant and it also assists law enforcement agencies in their investigations and 
                            efforts to keep the community safe. By taking the time to fill out the form accurately and truthfully, you are playing 
                            a crucial role in promoting justice and maintaining a secure community.
                        </li>
                    </ul>
                </div>

                <div className='flex flex-row items-center justify-start w-10/12 text-start gap-4 mt-2'>
                    <input type="checkbox" name='check' onChange={handleCheck} className='cursor-pointer'></input> 
                    <h1 className='text-[#BB3330] font-[Poppins] text-[13px] font-medium'>I have read the above paragraph and I acknowledge to submit accurate details of the crime.</h1>
                </div>

                
                <div aria-disabled={disableButton} onClick={handleSubmit} className='flex flex-row items-center justify-center gap-4 w-10/12 mt-4 px-6 hover:bg-[#bb1421] bg-[#bb3330] aria-disabled:bg-gray-300 aria-disabled:hover:bg-gray-300 aria-disabled:text-gray-400 py-1.5 rounded-full text-white cursor-pointer'>     
                    <h1 className='font-[Poppins] text-lg text-center'>Submit</h1>
                </div>

            </div>
        </div>
    )
}