import React, { useState } from 'react'
import PostReports from '../Components/postReport'

export default function ReportCrimeCard1({setCardNum}){

    const [form, setForm] = useState({
        media:[],
        isWitness:false,
        description:'',
    })

    const handleNext = ()=>{  
        setCardNum(3)
    }

    
    return(
        <div className='min-w-[48vw] max-w-[48vw]'>
            <div className='flex flex-col items-center justify-center mx-5 gap-2'>
                <PostReports form={form} setForm={setForm} title={'Your reported crime looks similar to these crimes reported in the last 24 hour.'}/>
                <div onClick={handleNext} className='flex flex-row items-center justify-center gap-4 w-10/12 px-6 hover:bg-black bg-[#212121] py-1.5 rounded-full text-white cursor-pointer'>     
                    <h1 className='font-[Poppins] text-lg text-center'>I want to report a new crime</h1>
                </div>
            </div>
        </div>
    )
}