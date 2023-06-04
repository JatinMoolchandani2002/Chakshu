import React, {useState, useEffect} from 'react'
import {FaLongArrowAltRight} from 'react-icons/fa'
import {HiGlobe, HiMail, HiPhone} from 'react-icons/hi'
import stateArray from '../Components/utils/state.json'
import crimeArray from '../Components/utils/crimes.json'

export default function ReportCrimeCard1({form, setForm, setCardNum}){

    const states = stateArray.states
    const crimes = crimeArray.crimes
    const [disableButton, setDisableButton] = useState(true)
    const [check, setCheck] = useState(false)

    const date = new Date(Date.now()).toLocaleDateString().split('/')
    const dateToday = `${date[2]}-${date[0]<10?'0'+date[0]:date[0]}-${date[1]<10?'0'+date[1]:date[1]}`

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

    const handleNext = ()=>{
        if(!disableButton){
            setCardNum(2)
        }
    }

    useEffect(()=>{
        if(form?.locality?.length === 0 || form?.city?.length === 0 || form?.state?.length === 0 || 
            form?.pincode?.length !== 6 || form?.date?.length === 0 || form?.time?.length === 0 || 
            form?.crimeType?.length === 0 || !check){
            setDisableButton(true)
        }
        else{
            setDisableButton(false)
        }

    }, [check, form])

    return(
        <div className='min-w-[48vw] mt-12'>
            <div className='flex flex-col items-center justify-center mx-5 gap-6'>

                <div className='w-10/12 flex flex-row items-center justify-between gap-4'>
                    <div className='flex flex-col items-start justify-center  w-1/2 gap-2'>
                        <h1 className='font-[Poppins] font-medium text-sm text-black'>Street / Locality<span className='text-[#BB3330] text-lg'>*</span></h1>
                        <input type="text" name='street' placeholder='Sakore Nagar' value={form.street} onChange={handleFormChange} autoComplete='off' className='font-[Poppins] placeholder:text-[#c5bfbf] w-full rounded-lg shadow-md focus:outline-none py-2 px-4 focus:ring-1 ring-gray-400'></input>
                    </div>
                    <div className='flex flex-col items-start justify-center w-1/2 gap-2'>
                        <h1 className='font-[Poppins] font-medium text-sm text-black'>City<span className='text-[#BB3330] text-lg'>*</span></h1>
                        <input type="text" name='city' placeholder='Pune' value={form.city} onChange={handleFormChange} autoComplete='off' className='font-[Poppins] placeholder:text-[#c5bfbf] w-full rounded-lg shadow-md focus:outline-none py-2 px-4 focus:ring-1 ring-gray-400'></input>
                    </div>
                </div>

                <div className='w-10/12 flex flex-row items-center justify-between gap-4'>
                    <div className='flex flex-col items-start justify-center  w-1/2 gap-2'>
                        <h1 className='font-[Poppins] font-medium text-sm text-black'>State<span className='text-[#BB3330] text-lg'>*</span></h1>
                        <select name='state' onChange={handleFormChange} value={form.state} className='mt-1 font-[Poppins] text-[11px] md:text-base placeholder:text-[#c5bfbf] w-[80%] md:w-full rounded-lg shadow-md focus:outline-none py-2 px-4 focus:ring-1 ring-gray-400'>
                            <option value='' className='font-[Poppins] text-sm text-gray-500'>Select State / Union Territory</option>
                            {
                                states.map((data, index)=>
                                    <option key={index} value={data.value} className='font-[Poppins] text-sm'>{data.label}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className='flex flex-col items-start justify-center w-1/2 gap-2'>
                        <h1 className='font-[Poppins] font-medium text-sm text-black'>Pincode<span className='text-[#BB3330] text-lg'>*</span></h1>
                        <input type="text" name='pincode' placeholder='412207' value={form.pincode} onChange={handleFormChange} autoComplete='off' className='font-[Poppins] placeholder:text-[#c5bfbf] w-full rounded-lg shadow-md focus:outline-none py-2 px-4 focus:ring-1 ring-gray-400'></input>
                    </div>
                </div>

                <div className='w-10/12 flex flex-row items-center justify-between gap-4'>
                    <div className='flex flex-col items-start justify-center  w-1/2 gap-2'>
                        <h1 className='font-[Poppins] font-medium text-sm text-black'>Date<span className='text-[#BB3330] text-lg'>*</span></h1>
                        <input type="date" name='date' max={dateToday} placeholder='Sakore Nagar' value={form.date} onChange={handleFormChange} autoComplete='off' className='font-[Poppins] placeholder:text-[#c5bfbf] w-full rounded-lg shadow-md focus:outline-none py-2 px-4 focus:ring-1 ring-gray-400'></input>
                    </div>
                    <div className='flex flex-col items-start justify-center w-1/2 gap-2'>
                        <h1 className='font-[Poppins] font-medium text-sm text-black'>Approx. Time<span className='text-[#BB3330] text-lg'>*</span></h1>
                        <input type="time" name='time' placeholder='Sakore Nagar' value={form.time} onChange={handleFormChange} autoComplete='off' className='font-[Poppins] placeholder:text-[#c5bfbf] w-full rounded-lg shadow-md focus:outline-none py-2 px-4 focus:ring-1 ring-gray-400'></input>
                    </div>
                </div>

                <div className='flex flex-col items-start justify-center w-10/12 gap-2'>
                    <h1 className='font-[Poppins] font-medium text-sm text-black'>Crime Type<span className='text-[#BB3330] text-lg'>*</span></h1>
                    <select name='crimeType' onChange={handleFormChange} value={form.crimeType} className='mt-1 font-[Poppins] text-[11px] md:text-base placeholder:text-[#c5bfbf] w-[80%] md:w-full rounded-lg shadow-md focus:outline-none py-2 px-4 focus:ring-1 ring-gray-400'>
                        <option value='' className='font-[Poppins] text-sm text-gray-500'>Select Crime Type</option>
                        {
                            crimes.map((data, index)=>
                                <option key={index} value={data.value} className='font-[Poppins] text-sm'>{data.label}</option>
                            )
                        }
                    </select>
                </div>

                <div className='flex flex-row items-center justify-start w-10/12 text-start gap-4 mt-2'>
                    <input type="checkbox" name='check' onChange={handleCheck} className='cursor-pointer'></input> 
                    <h1 className='text-[#BB3330] font-[Poppins] text-[13px] font-medium'>I have filled the details correctly and understand the consequences of submiting a forged crime report.</h1>
                </div>
 
                <div aria-disabled={disableButton} onClick={handleNext} className='w-10/12 mt-4 rounded-full text-white bg-[#bb3330] cursor-pointer aria-disabled:cursor-not-allowed aria-disabled:hover:bg-gray-300 aria-disabled:text-gray-400 hover:bg-[#bb1421] aria-disabled:bg-gray-300'>
                    <div className='flex flex-row items-center justify-center gap-4 w-full px-6  py-1.5 rounded-full'>     
                        <h1 className='font-[Poppins] text-lg text-center'>Next</h1>
                        <FaLongArrowAltRight className='text-lg'/>
                    </div>
                </div>


                <div className='flex flex-row items-center justify-between w-10/12 mt-12 gap-2'>
                    <div className='flex flex-row items-center justify-between gap-2'>
                        <HiMail className='text-[32px]'/>
                        <div className='flex flex-col items-start justify-center gap-0.5 py-1.5 rounded-full text-[#bb3330]'>     
                            <h1 className='font-[Poppins] font-medium text-[15px] text-start text-black'>Mail</h1>
                            <h1 className='font-[Poppins] font-medium text-[12px] text-center'>help@chakshu.com</h1>
                        </div>
                    </div>
                    <div className='flex flex-row items-center justify-between gap-2'>
                        <HiPhone className='text-[32px]'/>
                        <div className='flex flex-col items-start justify-center gap-0.5 py-1.5 rounded-full text-[#bb3330]'>     
                            <h1 className='font-[Poppins] font-medium text-[15px] text-start text-black'>Phone</h1>
                            <h1 className='font-[Poppins] font-medium text-[12px] text-center'>+91 8045794796</h1>
                        </div>
                    </div>
                    <div className='flex flex-row items-center justify-between gap-2'>
                        <HiGlobe className='text-[32px]'/>
                        <div className='flex flex-col items-start justify-center gap-0.5 py-1.5 rounded-full text-[#bb3330]'>     
                            <h1 className='font-[Poppins] font-medium text-[15px] text-start text-black'>Helpdesk</h1>
                            <h1 className='font-[Poppins] font-medium text-[12px] text-center'>https://chakshu.com</h1>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}