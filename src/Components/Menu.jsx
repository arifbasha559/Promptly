import { BiMenu } from 'react-icons/bi'
import { LuBookmark, LuBookMarked, LuEllipsis } from 'react-icons/lu'
import { PiShareFatLight } from 'react-icons/pi'

const Menu = ({setNav}) => {

    return (
        <div className=' border-b border-gray-700 flex itemcenter justify-between p-1 px-4'>
            <div className="flex gap-2 items-center">

            <BiMenu onClick={() => setNav((prev) => !prev)} className='text-xl md:hidden text-center cursor-pointer hover:text-gray-400' />
            <h2 className="text-2xl font-semibold google   w-fit flex gap-2">
            Promptly
            </h2>
            </div>
            <div className="flex items-center gap-4 ">
                <LuEllipsis className='size-4 cursor-pointer hover:text-gray-400' />
                <LuBookmark className='size-4 cursor-pointer hover:text-gray-400' />
                
            </div>
        </div>
    )
}

export default Menu