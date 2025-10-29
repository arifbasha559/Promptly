import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import Chat from './Components/Chat'
import Menu from './Components/Menu'

const App = () => {
  const [nav, setNav] = useState(true);
  return (
    <div className="relative h-screen w-screen bg-[#1B1B1F] overflow-hidden text-white ">
      <div className='grid grid-cols-12 h-full '>
        <div className="col-span-1 ">

          <Navbar setNav={setNav} />
        </div>
        <div className="col-span-11 relative h-full w-full flex flex-col ">
          <div className="sticky top-0 left-0 w-full h-10 ">
            <Menu />
          </div>
          <div className="h-[calc(100%-40px)] w-full">

          <Chat />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App