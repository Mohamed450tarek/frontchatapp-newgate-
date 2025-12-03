import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";

function ContactList() {
  const {
    getAllContacts,
    allContacts,
    searchUsers,
    searchResults,
    isUsersLoading,
    isSearchLoading,
    sendFriendRequest,
    getFriendRequests,
    friendRequests,
    acceptFriendRequest,
    declineFriendRequest,
    getMyFriends,
    friends,
  } = useChatStore();

  const { onlineUsers, authUser } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [sentRequests, setSentRequests] = useState(new Set());

  useEffect(() => {
    getAllContacts();
    getFriendRequests();
    getMyFriends();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.trim();
    setSearchQuery(query);
    searchUsers(query);
  };

  const handleSendFriendRequest = async (userId) => {
    const success = await sendFriendRequest(userId);
    if (success) setSentRequests(new Set([...sentRequests, userId]));
  };

  const handleAcceptRequest = async (friendId) => {
    const success = await acceptFriendRequest(friendId);
    if (success) {
      getAllContacts();
      getMyFriends();
    }
  };

  const handleDeclineRequest = async (friendId) => {
    await declineFriendRequest(friendId);
  };

  const usersToShow = searchQuery ? searchResults || [] : [];
  const requestsToShow = Array.isArray(friendRequests) ? friendRequests : [];
  const friendIds = new Set((friends || []).map(f => f._id));

  const filteredUsers = usersToShow.filter(user => 
    user._id !== authUser?._id && !friendIds.has(user._id)
  );

  if (isUsersLoading || isSearchLoading) return <UsersLoadingSkeleton />;

  return (
    <div className="space-y-4 p-4">
      <div className="sticky top-0 bg-slate-900/95 backdrop-blur-sm z-10 pb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by Email or ID..."
          className="w-full p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none transition-colors"
        />
        {searchQuery && (
          <p className="text-xs text-slate-400 mt-2">
            {filteredUsers.length} user(s) found
          </p>
        )}
      </div>

      {requestsToShow.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-white font-semibold text-lg flex items-center gap-2">
            Friend Requests
            <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full">
              {requestsToShow.length}
            </span>
          </h3>
          {requestsToShow.map(req => (
            <div key={req._id} className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg flex justify-between items-center hover:bg-yellow-500/20 transition-colors">
              <div className="flex items-center gap-3">
                <img src={req.profilePic?.secure_url || "/avatar.png"} alt={req.name || "User"} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="text-white font-medium">{req.name || "Unknown User"}</p>
                  <p className="text-slate-400 text-sm">{req.email}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleAcceptRequest(req._id)} className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 text-white font-medium">Accept</button>
                <button onClick={() => handleDeclineRequest(req._id)} className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 text-white font-medium">Decline</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {searchQuery && (
        <div className="space-y-3">
          <h3 className="text-white font-semibold text-lg">Search Results</h3>
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => {
              const isRequestSent = sentRequests.has(user._id);
              const isOnline = onlineUsers.includes(user._id);

              return (
                <div key={user._id} className="bg-cyan-500/10 border border-cyan-500/20 p-4 rounded-lg flex justify-between items-center hover:bg-cyan-500/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`avatar ${isOnline ? "online" : "offline"}`}>
                      <img src={user.profilePic?.secure_url || "/avatar.png"} alt={user.name || "User"} className="w-12 h-12 rounded-full" />
                    </div>
                    <div>
                      <p className="text-slate-200 font-medium">{user.name || "Unknown User"}</p>
                      <p className="text-slate-400 text-sm">{user.email}</p>
                      <p className="text-slate-500 text-xs">ID: {user._id}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSendFriendRequest(user._id)}
                    disabled={isRequestSent}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${isRequestSent ? "bg-slate-600 text-slate-400 cursor-not-allowed" : "bg-cyan-500 text-white hover:bg-cyan-600"}`}
                  >
                    {isRequestSent ? "Request Sent" : "Add Friend"}
                  </button>
                </div>
              );
            })
          ) : (
            <p className="text-slate-400 py-8 text-center">No users found matching your search.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ContactList;
