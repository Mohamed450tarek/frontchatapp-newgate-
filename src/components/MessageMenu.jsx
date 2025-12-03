 import { useState, useRef, useEffect } from "react";
import { useChatStore } from "../store/useChatStore";

function MessageMenu({ msg }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const { deleteMessage, editMessage } = useChatStore();

  // دلييييل تشغيل
  console.log("MessageMenu loaded for:", msg._id);

  const handleEdit = async () => {
    const newText = prompt("Edit message:", msg.content);
    if (newText && newText.trim()) {
      await editMessage(msg._id, newText.trim());
    }
    setOpen(false);
  };

  const handleDelete = async () => {
    await deleteMessage(msg._id);
    setOpen(false);
  };

  // غلق المنيو عند الضغط خارجها
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => {
          console.log("menu clicked"); // لتأكيد الزر شغّال
          setOpen(!open);
        }}
        className="text-white text-xl"
      >
        ⋮
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-32 bg-slate-900 text-white rounded-lg shadow-lg z-[99999] border border-slate-700">
          <button
            onClick={handleEdit}
            className="w-full text-left px-3 py-2 hover:bg-slate-700"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="w-full text-left px-3 py-2 hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default MessageMenu;
