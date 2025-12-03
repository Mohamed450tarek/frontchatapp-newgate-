import { useState, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {  useChatStore } from "../store/useChatStore";
import { LogOutIcon, Volume2Icon, VolumeOffIcon, EyeIcon } from "lucide-react";

function ProfileHeader() {
  const { authUser, logout, updateProfile,   } = useAuthStore();
  const { isSoundEnabled, toggleSound } =  useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setSelectedImg(URL.createObjectURL(file));

    try {
      const formData = new FormData();
      formData.append("image", file);
      await updateProfile(formData);
    } catch (error) {
      console.error("Image upload failed:", error);
      setSelectedImg(null);
    } finally {
      setIsUploading(false);
      setShowOptions(false);
    }
  };

  const handleViewImage = () => {
    setShowModal(true);
    setShowOptions(false);
  };

  return (
    <div className="p-6 border-b border-slate-700/50 flex justify-between items-center relative">
      <div className="flex items-center gap-3 relative">
        <div className="avatar online">
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="relative rounded-full overflow-hidden w-14 h-14"
          >
            <img
              src={selectedImg || authUser.profilePic?.secure_url || "/avatar1.jpg"}
              alt="User"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
              <span className="text-white text-xs">Options</span>
            </div>
          </button>
          {showOptions && (
            <div className="absolute top-full left-0 mt-2 w-28 bg-slate-800 border border-slate-600 rounded shadow-lg z-10">
              <button
                onClick={handleViewImage}
                className="w-full px-3 py-2 text-left text-slate-200 hover:bg-slate-700 flex items-center gap-2"
              >
                <EyeIcon className="w-4 h-4" /> View
              </button>
              <button
                onClick={() => fileInputRef.current.click()}
                className="w-full px-3 py-2 text-left text-slate-200 hover:bg-slate-700 flex items-center gap-2"
              >
                Change
              </button>
            </div>
          )}
          <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
        </div>
        <div>
          <h3 className="text-slate-200 font-medium text-base truncate max-w-[180px]">{authUser.name}</h3>
          <p className="text-slate-400 text-xs">Online</p>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <button onClick={logout} className="text-slate-400 hover:text-slate-200">
          <LogOutIcon className="w-5 h-5" />
        </button>

        <button onClick={toggleSound} className="text-slate-400 hover:text-slate-200">
          {isSoundEnabled ? <Volume2Icon className="w-5 h-5" /> : <VolumeOffIcon className="w-5 h-5" />}
        </button>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-slate-900 p-4 rounded-3xl shadow-lg   "
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImg || authUser.profilePic?.secure_url || "/avatar1.jpg"}
              alt="User"
              className="w-80 h-80 object-cover rounded-full"
            />
            <button
              onClick={() => setShowModal(false)}
              className=" w-full h-[42px] cursor-pointer text-[#fff] text-[14px] rounded-xl border-[none] relative bg-[#ff0d0d] [transition:0.1s] hover:bg-[#a00303] mt-4 flex items-center justify-center"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileHeader;
