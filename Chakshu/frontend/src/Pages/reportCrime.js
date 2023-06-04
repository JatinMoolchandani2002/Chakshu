import React, { useState } from 'react'
import Map from '../Components/Map'
import Navbar from '../Components/Navbar'
import ReportCrimeCard from '../Components/ReportCrimeCard'

export default function ReportCrime(){

    const initialForm = {
        street:'',
        city:'',
        state:'',
        pincode:'',
        date:'',
        time:'',
        crimeType:'',
        media:[],
        isWitness:false,
        title:'',
        description:'',
        severity:'',
        location:['19.076090', '72.877426']
    }
    const [form, setForm] = useState(initialForm)
    const [cardNum, setCardNum] = useState(1)

    return(
        <div className='bg-white min-h-[100vh]'>
            <Navbar/>
            <div className='flex flex-row items-center justify-between gap-8 mx-5 my-3'>
                <ReportCrimeCard cardNum={cardNum} setCardNum={setCardNum} form={form} setForm={setForm}/>
                <Map/>
            </div>
        </div>
    )
}