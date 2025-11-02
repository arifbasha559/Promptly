import React, { useState, useRef, useEffect } from "react";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

const ModelDropdown = ({ models, model, setModel }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div
            ref={dropdownRef}
            className="relative group rounded-md w-fit hover:bg-[#36363E] bg-[#1B1B1F] px-3 py-1 cursor-pointer flex items-center gap-1 "
            onClick={() => setOpen(!open)}
        >
            <span className="text-white text-sm font-medium">{model}</span>
            {!open ? (
                <MdKeyboardArrowUp className="text-lg text-gray-400" />
            ) : (
                <MdKeyboardArrowDown className="text-lg text-gray-400" />
            )}

            {/* Dropdown menu */}
            {open && (
                <div className="absolute z-20 bottom-full left-0 mt-2 w-full flex flex-col bg-[#1B1B1F] border border-gray-700 rounded-lg shadow-lg overflow-hidden animate-fadeIn">
                    {models.map((mod, index) => (
                        <div
                            key={index}
                            onClick={() => {

                                    setModel(mod);
                                    setOpen(false);
                            }}
                            className={`px-3 py-2 text-center text-sm text-white cursor-pointer hover:bg-violet-600 transition-all ${model === mod ? "bg-violet-500/60" : ""
                                }`}
                        >
                            {mod}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ModelDropdown;
