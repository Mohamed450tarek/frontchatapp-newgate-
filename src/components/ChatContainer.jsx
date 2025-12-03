 import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import MessageMenu from "./MessageMenu";

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

 useEffect(() => { if (!selectedUser?._id) return;
   getMessagesByUserId(selectedUser._id);
    unsubscribeFromMessages();
     subscribeToMessages();
      return () => unsubscribeFromMessages(); },
       [selectedUser?._id]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!selectedUser) return null;

  return (
    <>
      <ChatHeader />

      <div className="flex-1 px-6 overflow-y-auto py-8">
        {isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : messages && messages.length > 0 ? (
          <div className="max-w-3xl mx-auto space-y-6">
             {messages
  .filter(msg => msg && (msg.senderId || msg.sender))
  .map(msg => {
    const isMine =
      msg.senderId === authUser._id ||
      msg.sender === authUser._id;

              return (
              <div
  key={msg._id}
  className={`chat ${isMine ? "chat-end" : "chat-start"}`}
>
  <div className="relative group">
    {/* الرسالة نفسها */}
    <div
      className={`chat-bubble relative ${isMine ? "bg-cyan-600 text-white" : "bg-slate-800 text-slate-200"}`}
    >
      {msg.content && <p className="mt-2">{msg.content}</p>}
      {msg.isEdited && <span className="text-xs opacity-70 ml-2">(edited)</span>}
      <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
        {(() => {
          const date = new Date(msg.createdAt);
          return isNaN(date.getTime()) ? "" : date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        })()}
      </p>

     
      {isMine && (
        <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity z-50">
          <MessageMenu msg={msg} />
        </div>
      )}
    </div>
  </div>
</div>

              );
            })}

            <div ref={messageEndRef} />
          </div>
        ) : (
          <NoChatHistoryPlaceholder
            name={
              selectedUser.fullName ||
              selectedUser.name ||
              selectedUser.email
            }
          />
        )}
      </div>

      <MessageInput />
    </>
  );
}

export default ChatContainer;
