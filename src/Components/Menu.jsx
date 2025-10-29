import { LuBookmark, LuBookMarked, LuEllipsis } from 'react-icons/lu'
import { PiShareFatLight } from 'react-icons/pi'

const Menu = () => {

    return (
        <div className=' border-b border-gray-700 flex itemcenter justify-between p-1 '>
            <h2 className="text-2xl font-bold  w-fit flex gap-2">
                {'Title'}
              

            </h2>
            <div className="flex items-center gap-4 ">
                <LuEllipsis className='size-4 cursor-pointer hover:text-gray-400' />
                <LuBookmark className='size-4 cursor-pointer hover:text-gray-400' />
                <button className="relative group rounded-lg flex items-center gap-2 px-2.5 py-0.5 mx-auto  bg-gray-900 overflow-hidden ring-0 before:absolute before:w-12 before:h-8 before:-top-4 before:content[''] before:right-0 before:bg-violet-500 before:rounded-full before:blur-lg  border border-violet-500 text-neutral-100 placeholder-violet-700 focus:ring-violet-500 focus:border-violet-500">
                    <PiShareFatLight className='size-4 ' />
                    Share
                </button>
            </div>
        </div>
    )
}

export default Menu