import React from 'react'
import Navbar from './../Components/Navbar'
import Waterfall from "waterfall-react"

export default function NoticeBoard(){
    let images = [
        ["https://imgs.search.brave.com/JRTpkh2wIR0MZ9940ONc7aOtK0tHPTme5bF9_neIqXk/rs:fit:458:599:1/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzZiL2Vj/L2MzLzZiZWNjM2U0/YmEyNDU5YzAwOGVm/YjcwYzc4MDU5ODU2/LmpwZw", "Wanted"],
        ["https://imgs.search.brave.com/y531G9dJX81Hl3k9LrlDuw2HXM0Qn1S2CBApgypu4WQ/rs:fit:646:362:1/g:ce/aHR0cHM6Ly9ha20t/aW1nLWEtaW4udG9z/c2h1Yi5jb20vaW5k/aWF0b2RheS9pbWFn/ZXMvc3RvcnkvMjAx/ODA5L211cmRlcl9j/Y3R2LnBuZz9UZnJv/TnUySF92QUI2aVJO/cHJKUWlQTUo0dkUu/Y01abg", "Help Identify"],
        ["https://imgs.search.brave.com/uLkQ11b0PtiyiwcEVEHNZV5bz4gX30CGWug7vT7O32c/rs:fit:300:395:1/g:ce/aHR0cHM6Ly9pLmd1/aW0uY28udWsvaW1n/L3N0YXRpYy9HdWFy/ZGlhbi93b3JsZC9n/YWxsZXJ5LzIwMDgv/c2VwLzA0L2luZGlh/Lm1pc3NpbmcuY2hp/bGRyZW4vUGljdHVy/ZS00OS05NTI2Lmpw/Zz93aWR0aD0zMDAm/cXVhbGl0eT04NSZh/dXRvPWZvcm1hdCZm/aXQ9bWF4JnM9ZDk1/NjA0MThmODUzZDQy/NmJhMGJkYWE0ZWFi/Nzc3ZmY", "Missing child"],
        ["https://imgs.search.brave.com/Kc3brRoVnM2SZTg5AcnzJTiulE5M5QHVtfIOMfVv9ME/rs:fit:750:500:1/g:ce/aHR0cHM6Ly93d3cu/dGhlbmV3c21pbnV0/ZS5jb20vc2l0ZXMv/ZGVmYXVsdC9maWxl/cy9zdHlsZXMvbmV3/c19kZXRhaWwvcHVi/bGljL0FhbGFhcCUy/ME5hcmFzaXB1cmEl/MjA3NTB4NTAwLmpw/Zz9pdG9rPUNjaERZ/dEs2", "Missing"],
        ["https://imgs.search.brave.com/DZhZ8OU-8CdTLRakSQrqIq9xWVxX5sverlibf46XDMk/rs:fit:862:485:1/g:ce/aHR0cHM6Ly9saXZl/LXByb2R1Y3Rpb24u/d2Ntcy5hYmMtY2Ru/Lm5ldC5hdS82OGM5/YWNjYjdiNzk1YWYx/ZTcwMjczZjE1Mzc0/ZmRiZT9pbXBvbGlj/eT13Y21zX2Nyb3Bf/cmVzaXplJmNyb3BI/PTEwODAmY3JvcFc9/MTkxOCZ4UG9zPTAm/eVBvcz0wJndpZHRo/PTg2MiZoZWlnaHQ9/NDg1", "Help Identify"],
        ["https://imgs.search.brave.com/C05avD7jVpuV2Uk3F4loSw2PiObVmWe95zFZ8S72WG8/rs:fit:649:365:1/g:ce/aHR0cHM6Ly9jb250/ZW50LmFwaS5uZXdz/L3YzL2ltYWdlcy9i/aW4vMTY2NzI3NzE4/MWE2NDJlYjk2NzNh/OWExOTM1MjhjMjg", "Help Identify"],
        ["https://imgs.search.brave.com/_fozeVal7NoPGFbx_riGswi0BcepYVT-I80mdxOntdc/rs:fit:320:220:1/g:ce/aHR0cHM6Ly9zdGF0/aWMubWlzc2luZ3Bl/b3BsZW9maW5kaWEu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIwLzEwL0Fha2Fz/aC5qcGc", "Missing!"],
    ];

    return(
        <div className='w-full'>
            <Navbar/>
            <h1 className='font-[Poppins] text-lg p-2 font-medium w-10/12 text-center border-b-[0.4px] border-[#bb3330] mx-auto mt-6'>Police Notice Board</h1>
            <div className='flex flex-row items-start justify-center w-11/12 mx-auto mt-4'>
                <div className='flex flex-col items-center justify-start w-[25%] px-2 bg-red-100 min-h-[20vh] max-h-max py-2 mt-2 rounded-xl'>
                    <h1 className='font-[Poppins] text-md p-2 font-medium w-10/12 text-center border-b-[0.4px] border-[#bb3330]'>Bulletin Board</h1>
                    <ul className='list-outside px-4 py-2 text-justify text-xs text-[#bb3330]'>
                        <li className='list-disc py-2'>Citizens residing in Kothrud area must remain vigilant as a leopard has been spotted near the Ideal Colony.</li>
                        <li className='list-disc py-2'>Viral infection-induced cough, cold and fever cases surge in Pune, citizens are requested to follow precautions.</li>
                        <li className='list-disc py-2'>Citizens should avoid the Shivaji Nagar chowk as there's a surge in traffic due to metro bridge collapse.</li>
                    </ul>
                </div>
                <Waterfall column="3" image={images}/>
            </div>
        </div>
    )
}