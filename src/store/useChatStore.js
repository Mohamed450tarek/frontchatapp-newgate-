import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
import { io } from "socket.io-client";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  friendRequests: [],
  friends: [],
  searchResults: [],
  chats: [],
  messages: [],
  currentChatId: null,
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isRequestsLoading: false,
  isSearchLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,
  socket: null,

  toggleSound: () => {
    const newValue = !get().isSoundEnabled;
    localStorage.setItem("isSoundEnabled", newValue);
    set({ isSoundEnabled: newValue });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (user) => set({ selectedUser: user }),

  getAllContacts: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/contacts");
      set({ allContacts: res.data.result || [] });
    } catch {
      set({ allContacts: [] });
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMyFriends: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/return-allfriends");
      set({ friends: res.data.friends || [] });
    } catch {
      set({ friends: [] });
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getFriendRequests: async () => {
    set({ isRequestsLoading: true });
    try {
      const res = await axiosInstance.get("/messages/getall-friend-requests");
      set({ friendRequests: res.data.requests || [] });
    } catch {
      set({ friendRequests: [] });
    } finally {
      set({ isRequestsLoading: false });
    }
  },

  sendFriendRequest: async (friendId) => {
    try {
      await axiosInstance.post(`/messages/friend-request/${friendId}`);
      return true;
    } catch {
      return false;
    }
  },

  acceptFriendRequest: async (friendId) => {
    try {
      await axiosInstance.post(`/messages/friend-request/${friendId}/accept`);
      await get().getFriendRequests();
      await get().getMyFriends();
      await get().getChats();
      get().setActiveTab("chats");
      return true;
    } catch {
      return false;
    }
  },

  declineFriendRequest: async (friendId) => {
    try {
      await axiosInstance.post(`/messages/friend-request/${friendId}/decline`);
      get().getFriendRequests();
      return true;
    } catch {
      return false;
    }
  },

  cancelFriendRequest: async (friendId) => {
    try {
      await axiosInstance.post(`/messages/friend-request/${friendId}/cancel`);
      return true;
    } catch {
      return false;
    }
  },

  removeFriend: async (friendId) => {
    try {
      await axiosInstance.delete(`/messages/removefriend/${friendId}`);
      get().getMyFriends();
      get().getAllContacts();
      return true;
    } catch {
      return false;
    }
  },

  getChats: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/inbox");
      set({ chats: res.data.inbox || [] });
    } catch {
      set({ chats: [] });
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessagesByUserId: async (friendId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/getchat/${friendId}`);
      const chatData = res.data.data || {};
      set({
        messages: chatData.massages || [],
        currentChatId: chatData._id || null,
      });
    } catch {
      set({ messages: [], currentChatId: null });
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    const userId = useAuthStore.getState().authUser._id;

    if (!selectedUser) return false;

    const tempId = `temp-${Date.now()}`;
    const optimistic = {
      _id: tempId,
      sender: userId,
      content: messageData.text,
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    };

    set({ messages: [...messages, optimistic] });

    try {
      const res = await axiosInstance.post(`/messages/sendchat/${selectedUser._id}`, {
        content: messageData.text,
      });
      const saved = res.data.data.massages.slice(-1)[0];
      set((state) => ({
        messages: state.messages.map((msg) => (msg._id === tempId ? saved : msg)),
      }));
      return true;
    } catch {
      set({ messages: messages.filter((m) => m._id !== tempId) });
      return false;
    }
  },

  editMessage: async (messageId, content) => {
    const { messages, currentChatId } = get();
    if (!currentChatId) return false;
    const prev = [...messages];
    set({
      messages: messages.map((msg) =>
        msg._id === messageId ? { ...msg, content, isEdited: true } : msg
      ),
    });
    try {
      const res = await axiosInstance.put(
        `/messages/edit-message/${currentChatId}/${messageId}/edit`,
        { content }
      );
      set({
        messages: messages.map((msg) =>
          msg._id === messageId ? { ...res.data.data.message } : msg
        ),
      });
      return true;
    } catch {
      set({ messages: prev });
      return false;
    }
  },

  deleteMessage: async (messageId) => {
    const { messages, currentChatId } = get();
    if (!currentChatId) return false;
    const prev = [...messages];
    set({ messages: messages.filter((msg) => msg._id !== messageId) });
    try {
      await axiosInstance.delete(`/messages/delete-message/${currentChatId}/${messageId}`);
      return true;
    } catch {
      set({ messages: prev });
      return false;
    }
  },

  markAsSeen: async (chatId) => {
    try {
      await axiosInstance.post(`/messages/mark-as-seen/${chatId}`);
      return true;
    } catch {
      return false;
    }
  },

  searchUsers: async (query) => {
    if (!query) return set({ searchResults: [] });
    try {
      const res = await axiosInstance.get(`/messages/search/${query}`);
      set({ searchResults: res.data.data });
    } catch {
      set({ searchResults: [] });
    }
  },

  initSocket: (token) => {
   /* const socket = io(
      import.meta.env.MODE === "development" ? "http://localhost:3000" : "/",
      { auth: { token } }
    );*/
    const socket = io(
  import.meta.env.MODE === "development"  ? "https://newgatebackend-chatapp-production.up.railway.app" : "https://newgatebackend-chatapp-production.up.railway.app",
  { auth: { token } }
);

    set({ socket });
    return socket;
  },
  

  subscribeToMessages: () => {
    const { socket, selectedUser } = get();
    if (!socket) return;

    socket.on("newMessage", (data) => {
      if (data.sender === selectedUser?._id) {
        set((state) => ({ messages: [...state.messages, data] }));
      }
    });

    socket.on("messageEdited", (data) => {
      set((state) => ({
        messages: state.messages.map((msg) =>
          msg._id === data.messageId ? { ...msg, content: data.content, isEdited: true } : msg
        ),
      }));
    });

    socket.on("messageDeleted", (data) => {
      set((state) => ({
        messages: state.messages.filter((msg) => msg._id !== data.messageId),
      }));
    });

    socket.on("messagesSeen", (data) => {
      set((state) => ({
        messages: state.messages.map((msg) => ({
          ...msg,
          readBy: [...new Set([...(msg.readBy || []), data.seenBy])],
        })),
      }));
    });
  },

  unsubscribeFromMessages: () => {
    const socket = get().socket;
    if (!socket) return;
    socket.off("newMessage");
    socket.off("messageEdited");
    socket.off("messageDeleted");
    socket.off("messagesSeen");
  },

  clearMessages: () => {
    set({ messages: [], currentChatId: null });
  },
}));
