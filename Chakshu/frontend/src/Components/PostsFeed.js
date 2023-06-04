import React from 'react'
import PostSmall from '../Molecules/PostsSmall';
import crimeimg from '../assets/crime.jpg'

function PostsFeed() {

        const posts = [
            {
                "title": "Drunken bus conductor abusing female passengers Drunken bus conductor abusing female passengers",
                "crimeType":"Harrasment",
                "severity":"Medium",
                "verification": {
                    "isVerified": true,
                    "verifiedBy":[
                        {
                            "userName":"Aaj Tak"
                        },
                    ]
                },
                "reportedFakePost":[
                    {
                        "userName":"abc",
                        "media":"xyz",
                        "description":"lorem ipsumasjfdnlkjasdnfjaskjdfn"
                    },
                    {
                        "userName":"def",
                        "media":"asjfh",
                        "description":"faksjdfhk;jasndf;kjansk;jdfnasjdnfk;jasndf"
                    },
                    {
                        "userName":"ghi",
                        "media":"",
                        "description":""
                    },
                ],
                "supportPost":[
                    {
                        "userName":"1",
                        "media":"",
                        "description":""
                    },
                    {
                        "userName":"2",
                        "media":"",
                        "description":""
                    },
                    {
                        "userName":"3",
                        "media":"",
                        "description":""
                    },
                    {
                        "userName":"4",
                        "media":"",
                        "description":""
                    },
                    {
                        "userName":"5",
                        "media":"",
                        "description":""
                    },
                    {
                        "userName":"6",
                        "media":"",
                        "description":""
                    },
                ],
                "address":{
                    "locality":"Shivtirth Nagar",
                    "city":"Pune",
                    "state":"Maharashtra",
                    "pincode":"411038",
                    "location":"",
                },
                "media":"",
                "isRemoved":false,
                "createdAt":""
            },
            {
                "title": "Loremasjdfhajsdhfklajsdhflkjahslkdjfh",
                "crimeType":"Theft",
                "severity":"Low",
                "verification": {
                    "isVerified": true,
                    "verifiedBy":[
                        {
                            "userName":"Pune Police",
                            "userType":"Police"
                        },
                        {
                            "userName":"Aaj Tak",
                            "userType":"Media Agency"
                        },
                        {
                            "userName":"News18",
                            "userType":"Media Agency"
                        },
                    ]
                },
                "reportedFakePost":[
                    {
                        "userName":"abc",
                        "media":"xyz",
                        "description":"lorem ipsumasjfdnlkjasdnfjaskjdfn"
                    },
                    {
                        "userName":"def",
                        "media":"asjfh",
                        "description":"faksjdfhk;jasndf;kjansk;jdfnasjdnfk;jasndf"
                    },
                    {
                        "userName":"ghi",
                        "media":"",
                        "description":""
                    },
                ],
                "supportPost":[
                    {
                        "userName":"1",
                        "media":"",
                        "description":""
                    },
                    {
                        "userName":"2",
                        "media":"",
                        "description":""
                    },
                    {
                        "userName":"3",
                        "media":"",
                        "description":""
                    },
                    {
                        "userName":"4",
                        "media":"",
                        "description":""
                    },
                    {
                        "userName":"5",
                        "media":"",
                        "description":""
                    },
                    {
                        "userName":"6",
                        "media":"",
                        "description":""
                    },
                    {
                        "userName":"7",
                        "media":"",
                        "description":""
                    },
                ],
                "address":{
                    "locality":"Anand Nagar",
                    "city":"Pune",
                    "state":"Maharashtra",
                    "pincode":"411038",
                    "location":"",
                },
                "media":"",
                "isRemoved":false,
                "createdAt":""
            },
            {
                "title": "DJfajsfjasjkhah iuahfhas iuiahfkjhal",
                "crimeType":"Murder",
                "severity":"High",
                "verification": {
                    "isVerified": true,
                    "verifiedBy":[
                        {
                            "userName":"Pune Police",
                            "userType":"Police"
                        },
                        {
                            "userName":"Aaj Tak",
                            "userType":"Media Agency"
                        },
                    ]
                },
                "reportedFakePost":[
                    {
                        "userName":"abc",
                        "media":"xyz",
                        "description":"lorem ipsumasjfdnlkjasdnfjaskjdfn"
                    },
                    {
                        "userName":"def",
                        "media":"asjfh",
                        "description":"faksjdfhk;jasndf;kjansk;jdfnasjdnfk;jasndf"
                    },
                    {
                        "userName":"ghi",
                        "media":"",
                        "description":""
                    },
                ],
                "supportPost":[
                    {
                        "userName":"1",
                        "media":"",
                        "description":""
                    },
                    {
                        "userName":"2",
                        "media":"",
                        "description":""
                    },
                    {
                        "userName":"3",
                        "media":"",
                        "description":""
                    },
                    {
                        "userName":"4",
                        "media":"",
                        "description":""
                    },
                    {
                        "userName":"5",
                        "media":"",
                        "description":""
                    },
                    {
                        "userName":"6",
                        "media":"",
                        "description":""
                    },
                ],
                "address":{
                    "locality":"Shivtirth Nagar",
                    "city":"Pune",
                    "state":"Maharashtra",
                    "pincode":"411038",
                    "location":"",
                },
                "media":"",
                "isRemoved":false,
                "createdAt":""
            },
        ]

    posts.map((item)=>
        console.log(item)
    )

  return (
    <div className='min-h-[71vh] max-h-[71vh] min-w-[48vw] w-full bg-gray-100 rounded-xl overflow-hidden'>
        <p className='my-3 mx-5 text-[18px] font-medium text-[#BB3330]'>Reported Crimes Near You</p>
        <div className='min-h-[60vh] max-h-[60vh] ml-5 mr-3 gap-4 scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-300 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
            {posts.map((item)=>{
                return <PostSmall img= {crimeimg} title= {item.title} locality={item.address.locality} severity={item.severity} verification={item.verification}/>
            })}
        </div>
    </div>
  )
}

export default PostsFeed