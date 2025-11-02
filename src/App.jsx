import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar'
import Chat from './Components/Chat'
import Menu from './Components/Menu'
import './App.css'

const App = () => {
  const [nav, setNav] = useState(true);

  return (
    <div className="relative h-screen w-screen  bg-[#1B1B1F] overflow-hidden text-white ">
      <div className='grid grid-cols-12 h-full '>
        <div className={`col-span-1 ${nav ? "hidden md:block" : ""} h-full absolute md:static z-50 `}  >

          <Navbar setNav={setNav} nav={nav} />
        </div>
        <div className="md:col-span-11 col-span-12 relative h-full w-full flex flex-col ">
          <div className="sticky top-0 left-0 w-full h-10 ">
            <Menu setNav={setNav} />
          </div>
          <div className="h-[calc(100%-40px)] overflow-y-auto w-full">

            <Chat />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App