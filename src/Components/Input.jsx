import React, { useRef, useState } from 'react'
import { BiMicrophone, BiPlus, BiSend } from 'react-icons/bi'
import { IoSend, IoSendSharp } from 'react-icons/io5'

const Input = ({ input, setInput, handleSend, handleKeyPress }) => {
    const models = ["ChatGPT", "Perplexity", "Deepseek", "BlackBox", "Gemini"];
    const textareaRef = useRef(null);

    const handleChange = (e) => {
        const el = textareaRef.current;
        el.style.height = "auto"; // reset
        el.style.height = Math.min(el.scrollHeight, 10 * 25) + "px"; // max 4 rows (approx 6rem)
        setInput(e.target.value);
    };
    return (
        <div className='max-h-1/3'>
            <form action="" onSubmit={(e) => { e.preventDefault() }} className="flex flex-col gap-2 w-full p-5 border border-gray-700 rounded-lg bg-[#1B1B1F] text-white  justify-between">

                <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message..."
                    className="outline-none text-wrap w-full resize-none p-2 rounded-lg font-medium  text-white"
                    rows="2"
                    maxLength={1000}
                    style={{ minHeight: "2rem", maxHeight: "6rem", scrollbarColor: 'gray transparent' }}
                />
                <div className="flex items-center justify-between w-full">

                    <div
                        className="relative group rounded-lg w-fit   bg-gray-900 overflow-hidden before:absolute before:w-12 before:h-8 before:-top-4 before:content[''] before:right-0 before:bg-violet-500 before:rounded-full before:blur-lg "
                    >

                        <select
                            className="appearance-none hover:placeholder-shown:bg-emerald-500 text-center relative text-white bg-transparent ring-0 outline-none border border-neutral-500 text-neutraal-900 placeholder-violet-700 text-sm font-semibold rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full px-2.5 py-1 h-full"
                        >
                            {models.map((mod, index) => (
                                <option key={index} onClick={() => setModel(mod)} className=" bg-[#1B1B1F] text-white  text-sm font-normal  ">{mod}</option>
                            ))}
                        </select>

                    </div>
                    <div className="flex items-center gap-4">

                        <BiMicrophone onClick={handleSend} className='size-6 cursor-pointer hover:text-gray-500 text-gray-400' />
                        <button disabled={!input} className="relative disabled:cursor-not-allowed disabled:opacity-50 opacity-100 brightness-200 group rounded-lg flex items-center gap-2 px-2.5 py-0.5   bg-gray-900 overflow-hidden ring-0 before:absolute before:w-3 before:h-8 before:-top-4 before:content[''] before:right-0 before:bg-violet-500 before:rounded-full before:blur-lg  border border-violet-500 text-neutral-100 placeholder-violet-700 focus:ring-violet-500 focus:border-violet-500">
                            <IoSendSharp className='size-5 ' />
                        </button>

                    </div>
                </div>
            </form>
        </div>
    )
}

export default Input