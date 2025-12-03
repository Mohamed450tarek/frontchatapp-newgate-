import { Navigate, Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import PageLoader from "./components/PageLoader";
import SocketInitializer from "./store/SocketInitializer";
import { Toaster } from "react-hot-toast";
import   LandingPage  from "./pages/view";
function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <PageLoader />;

  return (
     <div
  className=" min-h-screen w-full relative overflow-hidden flex items-center justify-center   "
  style={{ backgroundImage:  "url(5.png)" }}
>

  {/* === Soft Grid Background === */}
  <div className="absolute inset-0 
      bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_2px,transparent_2px),
          linear-gradient(to_bottom,rgba(255,255,255,0.04)_2px,transparent_2px)] 
      bg-[size:35px_35px] opacity-25 -z-10" />

  {/* Pink Glow */}
  <div className="absolute top-0 -left-4 w-[24rem] h-[24rem] bg-pink-500 opacity-20 blur-[100px] -z-10" />
  {/* Cyan Glow */}
  <div className="absolute bottom-0 -right-4 w-[24rem] h-[24rem] bg-cyan-500 opacity-20 blur-[100px] -z-10" />

 <SocketInitializer />

      <Routes>
        <Route path="/" element={authUser ? <ChatPage /> : <Navigate to={"/Homepage"} />} />
        <Route path="/Homepage" element={<LandingPage />} />
         
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
      </Routes>

      <Toaster />
    </div>
  );
}
export default App;
