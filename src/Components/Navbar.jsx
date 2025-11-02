import { useState } from 'react'
import { BiRotateRight, BiUser } from 'react-icons/bi'
import { CgClose } from 'react-icons/cg'
import { LuBrainCircuit } from 'react-icons/lu'

const Navbar = ({ setNav, nav }) => {
  const [rotating, setRotating] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleReload = () => {
    setShowConfirm(true)
  }

  const confirmReload = () => {
    setRotating(true)
    setShowConfirm(false)
    setTimeout(() => window.location.reload(), 800)
  }

  const cancelReload = () => {
    setShowConfirm(false)
  }

  return (
    <div className="     bg-black/20 flex flex-col md:w-fit w-screen h-full">
      <div
        className={`h-full md:bg-[#161618] ${!nav ? 'bg-[#161618]' : ''} flex flex-col w-[40vw] md:w-fit justify-between`}
      >
        <h1 className="text-4xl m-4 flex justify-between">
          <LuBrainCircuit />
          <CgClose
            onClick={() => setNav((prev) => !prev)}
            className="text-xl md:hidden text-center cursor-pointer hover:text-gray-400 float-right"
          />
        </h1>

        <div className="h-full flex flex-col">
          <button
            onClick={handleReload}
            className={`bg-[#2A2A2E] m-4 p-3 rounded-lg flex items-center justify-center hover:brightness-110 transition-colors`}
            title="Reload Page"
          >
            <BiRotateRight
              className={`text-xl ${rotating ? 'animate-spin' : ''}`}
            />
          </button>

          <button className="bg-[#2A2A2E] mt-auto m-4 size-fit p-3 rounded-full flex items-center justify-center hover:brightness-110 transition-colors ">
            <BiUser />
          </button>
        </div>
      </div>

      {/* 🔸 Confirmation Popup */}
      {showConfirm && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
          <div className="bg-[#1E1E22] p-6 rounded-2xl shadow-lg text-center border border-gray-700">
            <h2 className="text-lg font-semibold text-white mb-2">
              Reload this page?
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              Unsaved changes or data will be lost.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmReload}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all"
              >
                Yes, Reload
              </button>
              <button
                onClick={cancelReload}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
