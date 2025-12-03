  import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";

function ChatsList() {
  const { 
    getChats, 
    chats, 
    isUsersLoading, 
    setSelectedUser,
    selectedUser,
    getMessagesByUserId 
  } = useChatStore();
  
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getChats(); // Load inbox/recent chats
  }, [getChats]);

  const handleSelectChat = async (chat) => {
    const friend = chat.friend;
    if (friend) {
      setSelectedUser(friend);
      // Load messages for this friend
      await getMessagesByUserId(friend._id);
    }
  };

  const formatLastMessage = (message) => {
    if (!message) return "No messages yet";
    
    const content = message.content || "";
    const maxLength = 40;
    return content.length > maxLength 
      ? content.substring(0, maxLength) + "..." 
      : content;
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
  };

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  
  if (!chats || chats.length === 0) return <NoChatsFound />;

  return (
    <div className="space-y-2 p-4">
      <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
        Recent Chats
        <span className="bg-cyan-500 text-white text-xs px-2 py-1 rounded-full">
          {chats.length}
        </span>
      </h3>

      {chats.map((chat) => {
        const friend = chat.friend;
        const lastMessage = chat.lastMessage;
        const isOnline = friend && onlineUsers.includes(friend._id);
        const isSelected = selectedUser?._id === friend?._id;
        
        if (!friend) return null; // Skip if friend data is missing

        return (
          <div
            key={chat.friendId || friend._id}
            className={`
              p-4 rounded-lg cursor-pointer transition-all duration-200
              ${isSelected 
                ? "bg-cyan-500/30 border-2 border-cyan-500" 
                : "bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20"
              }
            `}
            onClick={() => handleSelectChat(chat)}
          >
            <div className="flex items-center gap-3">
              {/* Avatar with online status */}
              <div className="relative flex-shrink-0">
                <div className="size-12 rounded-full overflow-hidden ring-2 ring-slate-700">
                  <img
                    src={friend.profilePic?.secure_url  || "/avatar1.jpg"}
                    alt={friend.name || "User"}
                    className="w-full h-full object-cover"
                  />
                </div>
                {isOnline && (
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-slate-900 rounded-full"></div>
                )}
              </div>

              {/* Chat Info */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-slate-200 font-medium truncate">
                    {friend.name || friend.username || "Unknown User"}
                  </h4>
                  {lastMessage && (
                    <span className="text-slate-500 text-xs flex-shrink-0 ml-2">
                      {formatTime(lastMessage.createdAt)}
                    </span>
                  )}
                </div>
                
                {/* Last Message Preview */}
                {lastMessage && (
                  <p className="text-slate-400 text-sm truncate">
                    {formatLastMessage(lastMessage)}
                  </p>
                )}

                {/* Online/Offline Status */}
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs ${isOnline ? "text-green-400" : "text-slate-500"}`}>
                    {isOnline ? "● Online" : "○ Offline"}
                  </span>
                </div>
              </div>

              {/* Unread indicator (optional - can be added if backend supports) */}
              {/* {hasUnreadMessages && (
                <div className="w-2 h-2 bg-cyan-500 rounded-full flex-shrink-0"></div>
              )} */}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChatsList;