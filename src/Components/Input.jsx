import React, { useEffect, useRef } from "react";
import { BiMicrophone } from "react-icons/bi";
import { IoSendSharp } from "react-icons/io5";
import { MdKeyboardArrowUp } from "react-icons/md";
import ModelDropdown from "./Dropdown";

const Input = ({ input, setInput, handleSend, model,models, setModel, handleKeyPress }) => {
    const textareaRef = useRef(null);

    // Auto resize textarea
    const handleChange = (e) => {
        const el = textareaRef.current;
        el.style.height = "auto";
        el.style.height = Math.min(el.scrollHeight, 10 * 25) + "px"; // max height
        setInput(e.target.value);
    };

    useEffect(() => {
        const handleGlobalKeyDown = (e) => {
            const active = document.activeElement;

            // Ignore if already typing inside the textarea
            if (active === textareaRef.current) return;

            // Ignore modifier keys, F1–F12, arrows, etc.
            if (e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) return;

            // Prevent browser defaults (like scrolling on space)
            e.preventDefault();

            // Focus textarea first
            if (textareaRef.current) {
                textareaRef.current.focus();

                // ✅ Add the pressed key AFTER focus is applied
                // Using a small timeout ensures focus completes before updating the state
                setTimeout(() => {
                    setInput((prev) => prev + e.key);
                }, 0);
            }
        };

        window.addEventListener("keydown", handleGlobalKeyDown);
        return () => window.removeEventListener("keydown", handleGlobalKeyDown);
    }, [setInput]);

    return (
        <div className="max-h-1/3  ">
            <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col gap- w-full p-5 border border-gray-700 rounded-lg bg-[#1B1B1F] text-white 
focus:shadow-[0_0_15px_rgba(139,92,246,0.6)] focus:ring-2 focus:ring-violet-500"
            >
                <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                    autoComplete='true'
                    autoCorrect='true'
                    autoFocus='true'
                    placeholder="Type your message..."
                    className="outline-none text-wrap w-full resize-none p-2 rounded-lg font-normal text-white bg-transparent "
                    rows="2"
                    maxLength={1000}
                    style={{
                        minHeight: "2rem",
                        maxHeight: "6rem",
                        scrollbarColor: "gray transparent",
                    }}
                />

                <div className="flex items-center justify-between w-full">
                    {/* Model selector */}
                  
                    <ModelDropdown models={models} setModel={setModel} model={model} />

                    {/* Send controls */}
                    <div className="flex items-center gap-4">
                        <button
                            className=" cursor-pointer hover:bg-[#36363E] p-1.5 rounded-full text-gray-400"
                        >

                            <BiMicrophone
                            // onClick={handleSend}
                            className="text-xl m-auto"
                            />
                        </button>
                        <button
                            disabled={!input}
                            onClick={handleSend}
                            className="relative disabled:cursor-not-allowed disabled:opacity-50 group rounded-lg flex items-center gap-2 px-2.5 py-0.5 bg-violet-600 overflow-hidden ring-0 border border-violet-500 text-neutral-100 "
                        >
                            <IoSendSharp className="size-5" />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Input;
