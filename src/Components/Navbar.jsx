import { useEffect, useState } from 'react'
import { BiRotateRight, BiUser } from 'react-icons/bi'
import { CgClose, CgSpinner } from 'react-icons/cg'
import { LuBrainCircuit } from 'react-icons/lu'
import { MdDownloadDone, MdOutlineFileDownload } from "react-icons/md";


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


  const DownloadMsg = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setLoading(true);

    // Simulate 2-second "Preparing download" delay
    setTimeout(() => {
      // Trigger the file download (replace with your actual .apk path)
      const link = document.createElement("a");
      link.href = "https://github.com/arifbasha559/Promptly/releases/download/v0/promptly-v0.apk"; // e.g. "/downloads/myApp.apk"
      link.download = "Promptly-v0.apk";
      link.click();

      // After download, stop loading and show the done icon
      setLoading(false);
      setDownloaded(true);

      // Hide the done icon after 5 seconds
      setTimeout(() => setDownloaded(false), 3000);
    }, 2000);
  };

  return (
    <button
      onClick={handleDownload}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      className="cursor-pointer bg-[#2A2A2E] hover:bg-[#1E1E22] relative mt-auto m-4 size-fit p-3 rounded-full flex items-center justify-center transition-colors"
    >
      {/* Show icon based on state */}
      {loading ? (
        <CgSpinner className="animate-spin text-xl" />
      ) : downloaded ? (
        <MdDownloadDone className="text-green-500 text-xl" />
      ) : (
        <MdOutlineFileDownload className="text-xl" />
      )}

      {/* Hover message */}
      {show && !loading && !downloaded && (
        <div className="absolute left-0 bottom-full mb-4 bg-[#2e2e32] p-2 gap-2 w-fit whitespace-nowrap rounded-lg flex justify-center items-center animate-bounce">
          <div className="size-4 bg-inherit absolute left-3 -bottom-2 z-10 rotate-45"></div>
          <h2 className="z-20 text-xs">Click here to Download the APK</h2>
        </div>
      )}
    </button>
  );
};




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
            className={`bg-[#2A2A2E] cursor-pointer m-4 p-3 rounded-lg flex items-center justify-center hover:brightness-110 transition-colors`}
            title="Reload Page"
          >
            <BiRotateRight
              className={`text-xl ${rotating ? 'animate-spin' : ''}`}
            />
          </button>

          <DownloadMsg />

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
