import React from 'react'
import { BiPlus, BiSearch, BiUser } from 'react-icons/bi'
import { LuBrainCircuit, LuSpace } from 'react-icons/lu'
import { SiDiscover } from 'react-icons/si'

const Navbar = () => {
    return (
        <div className='  h-full bg-[#161618]  flex flex-col  w-fit'>
            <h1 className="text-5xl m-4"><LuBrainCircuit /> </h1>

            <button className='bg-[#2A2A2E] m-4 size-fit p-4 rounded-lg flex items-center justify-center hover:brightness-110 transition-colors '>
                <BiPlus />
            </button>
           
            <button className='bg-[#2A2A2E] mt-auto m-4 size-fit p-4 rounded-full flex items-center justify-center hover:brightness-110 transition-colors '>
                <BiUser />
            </button>
        </div>
    )
}

export default Navbar