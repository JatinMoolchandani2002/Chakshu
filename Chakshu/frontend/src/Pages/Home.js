import React from "react"
import Navbar from '../Components/Navbar'
import Map from "../Components/Map"
import PostsFeed from "../Components/PostsFeed"
import Search from "../Components/Search"

function Home() {
  return (
    <div className="bg-white">
        <Navbar/>
        <div className="mx-5 my-3 flex flex-row justify-between gap-3">
            <div className="flex flex-col gap-4">
                <Search/>
                <PostsFeed/>
            </div>
            <Map/>
        </div>
    </div>
  )
}

export default Home