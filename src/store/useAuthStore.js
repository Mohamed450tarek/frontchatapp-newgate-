import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

//const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

const BASE_URL = import.meta.env.MODE === "development" 
? "https://newgatebackend-chatapp-production.up.railway.app"
  : "https://newgatebackend-chatapp-production.up.railway.app";

const persistAuth = (authUser) => {
  if (authUser?.token) {
    localStorage.setItem("authToken", authUser.token);
    localStorage.setItem("authUser", JSON.stringify(authUser));
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${authUser.token}`;// axios set tocken in header auto
  }
};

const recoverAuth = () => {
  const token = localStorage.getItem("authToken");
  const user = localStorage.getItem("authUser");
  if (token && user) {
    try {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return JSON.parse(user);
    } catch (e) {
      return null;
    }
  }
  return null;
};

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  socket: null,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const recovered = recoverAuth();
      if (recovered) {
        set({ authUser: recovered });
        get().connectSocket();
      } else {
        const res = await axiosInstance.get("/auth/check");
        set({ authUser: res.data });
        persistAuth(res.data);
        get().connectSocket();
      }
    } catch (error) {
      set({ authUser: null });
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      const userData = { ...res.data.data, token: res.data.token };
      set({ authUser: userData });
      persistAuth(userData);
      toast.success("Account created successfully!");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      const userData = { ...res.data.data, token: res.data.token };
      set({ authUser: userData });
      persistAuth(userData);
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      set({ authUser: null });
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      get().disconnectSocket();
      toast.success("Logged out successfully");
    }
  },

  updateProfile: async (formData) => {
    try {
      const res = await axiosInstance.put("/auth/update-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const updatedData = { ...res.data.result, token: get().authUser.token };
      set({ authUser: updatedData });
      persistAuth(updatedData);
      toast.success("Profile updated successfully");
      get().disconnectSocket();
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  },

  connectSocket: () => {
    const { authUser, socket } = get();
    if (!authUser || socket?.connected) return;

    const newSocket = io(BASE_URL, {
      auth: { token: authUser?.token },
      withCredentials: true,
    });

    set({ socket: newSocket });
    newSocket.on("getOnlineUsers", (userIds) => set({ onlineUsers: userIds }));
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket?.connected) socket.disconnect();
    set({ socket: null });
  },
}));
