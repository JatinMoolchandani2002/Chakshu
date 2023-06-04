import React, {useState,useEffect } from 'react'
import { HiLocationMarker } from "react-icons/hi";
import policeimg from '../assets/mh.jpg'
import { MdVerified } from "react-icons/md";

function PostsSmall(props) {
    const [check, setCheck] = useState(0)
    useEffect(() => {
        let flag1 = false
        let flag2 = false
        if(props.verification.isVerified){
            props.verification.verifiedBy.forEach((entry) => {
                if(entry.userType==="Police"){
                    flag1 = true
                }
                else{
                    flag2 = true
                }
            });
            if(flag1){
                setCheck(1)
            }
            else{
                setCheck(2)
            }
        }
    }, [])
  return (
    <div className='my-5 min-h-[18vh] max-h-[18vh] max-w-[45vw] flex flex-row bg-gray-50 w-full rounded-lg shadow-lg'>
        <div className='p-3 w-1/3'>
            <div className='max-h-[15vh] max-w-1/3 overflow-hidden rounded-lg'>
                <img src={props.img} alt="" className=''/>
            </div>
        </div>
        <div className='p-4 w-2/3 flex flex-col justify-between items-start'>
            <div >
            <p className='text-md line-clamp-2'>{props.title}</p>
            <div className='mt-2 flex flex-row gap-2'>
                <p className='text-sm font-medium'>1.6 km</p>
                <HiLocationMarker/>
                <p className='text-sm'>{props.locality}</p>
            </div>

            <div className='my-2 flex flex-row gap-2'>
                <p className='text-[75%]'>Severity :</p>
                {props.severity === 'High' && <div className='bg-red-500 px-3 rounded-md'>
                    <p className='text-[80%] text-white tracking-wider'>HIGH</p>
                </div>}
                {props.severity === 'Medium' && <div className='bg-[#FF8900] px-3 rounded-md'>
                    <p className='text-[80%] text-white tracking-wider'>MEDIUM</p>  
                    
                </div>}
                {props.severity === 'Low' && <div className='bg-[#FFC700] px-3 rounded-md'>
                    <p className='text-[80%] text-white tracking-wider'>LOW</p>
                </div>}
            </div>
            </div>
            
            <div className='flex flex-row justify-between items-center w-full'>
            {props.verification.isVerified && 
             
            <div className='flex flex-row items-center'>
                <p className='text-xs'>Verified By: </p>
                <div className='flex flex-row '>
                    {props.verification.verifiedBy.map((item)=>{
                        return <img className='h-[3vh] rounded-full first-of-type:ml-2 ml-[-10px] relative shadow-md' src={policeimg}></img>
                    })}
                </div>
            </div>
            }
            {props.verification.isVerified &&
                <MdVerified className={`text-[175%] ${check===1 ?'text-green-700':''} ${check===2 ?'text-yellow-500':''}`}></MdVerified>
            }
            </div>

        </div>
    </div>
  )
}

export default PostsSmall