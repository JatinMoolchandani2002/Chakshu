import React, {useEffect, useState} from 'react'
import ReportCrimeCard1 from '../Molecules/reportCrimeCard1'
import ReportCrimeCard2 from '../Molecules/reportCrimeCard2'
import ReportCrimeCard3 from '../Molecules/reportCrimeCard3'

export default function ReportCrimeCard({cardNum, setCardNum, form, setForm}){

    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        setIsLoading(false)
    }, [])
    
    if(!isLoading){
        return(
            <div className='bg-gray-100 min-h-[88vh] max-h-max min-w-[48vw] rounded-xl shadow-lg'>
                <div className='flex flex-col items-start justify-center px-6 mt-8 mb-2 gap-1'>
                    <h1 className='text-[28px] font-[Poppins] text-center font-bold text-[#000000]'>Report a <span className='text-[#BB3330]'>Crime</span></h1>
                    <p className='text-gray-500 text-sm font-[Poppins]'><span className='text-[#BB3330] text-[18px]'>• </span>Crimes reported by users are completely anonymous. No one can know who reported the crime.</p>
                </div>
                {cardNum === 1 && <ReportCrimeCard1 form={form} setForm={setForm} setCardNum={setCardNum}/>}
                {cardNum === 2 && <ReportCrimeCard2 setCardNum={setCardNum}/>}
                {cardNum === 3 && <ReportCrimeCard3 form={form} setForm={setForm} setCardNum={setCardNum}/>}
            </div>
        )
    }
}