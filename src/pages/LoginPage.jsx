 import { useState } from "react";
import { Mail, Lock, Loader, LogIn } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
 function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };


  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
       
      {/* ANIMATED BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <BorderAnimatedContainer/>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-teal-500/30 to-transparent rounded-full mix-blend-screen blur-3xl animate-pulse" style={{animation: 'float 8s ease-in-out infinite'}}></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full mix-blend-screen blur-3xl animate-pulse" style={{animation: 'float 10s ease-in-out infinite 2s'}}></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full mix-blend-screen blur-3xl animate-pulse" style={{animation: 'float 12s ease-in-out infinite 4s'}}></div>
         
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent)',
            backgroundSize: '50px 50px'
          }}
        ></div>

        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-teal-400 rounded-full opacity-60 animate-pulse" style={{animation: 'float 6s ease-in-out infinite'}}></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-40 animate-pulse" style={{animation: 'float 7s ease-in-out infinite 1s'}}></div>
        <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full opacity-50 animate-pulse" style={{animation: 'float 8s ease-in-out infinite 2s'}}></div>
      </div>
 
      {/* ANIMATED SIDEBAR */}
      <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-teal-500 via-cyan-500 to-blue-500 animate-pulse" style={{animation: 'slideInLeft 1s ease-out'}}></div>
       
      {/* Content Container */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-0 relative z-10"
        style={{animation: 'slideUp 0.8s ease-out'}}>
        
        {/* LEFT SIDE - FORM */}
        <div className="p-8 md:p-12 flex flex-col justify-center backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl lg:rounded-r-none shadow-2xl   italic"
          style={{animation: 'slideInLeft 0.8s ease-out'}}>
          
          <div className="mb-12" style={{animation: 'fadeIn 1s ease-out 0.2s backwards'}}>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
                style={{animation: 'glow 2s ease-in-out infinite'}}>
                 M.T
              </div>
              <span className="text-xl font-semibold text-white">tarooko</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              Sign in to <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400   playwrite-cu ">Newgate</span>
            </h1>
            <p className="text-gray-300 text-lg   font-mono">Connect anytime, anywhere</p>
          </div>

          {/* Social Login */}
         

          {/* Form */}
          <div className="space-y-5" style={{animation: 'fadeIn 1s ease-out 0.6s backwards'}}>
           

            <div style={{animation: 'slideUp 0.8s ease-out 0.7s backwards'}}>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border-2 border-white/10 rounded-lg focus:outline-none focus:border-teal-400 bg-white/5 backdrop-blur text-white placeholder-gray-500 transition-all duration-300 hover:border-white/20"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div style={{animation: 'slideUp 0.8s ease-out 0.8s backwards'}}>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border-2 border-white/10 rounded-lg focus:outline-none focus:border-cyan-400 bg-white/5 backdrop-blur text-white placeholder-gray-500 transition-all duration-300 hover:border-white/20"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm" style={{animation: 'slideUp 0.8s ease-out 0.9s backwards'}}>
           
              <a href="#" className="text-teal-400 hover:text-teal-300 font-medium transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoggingIn}
              className="w-full h-12 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-6 hover:shadow-lg hover:shadow-cyan-500/50"
              style={{animation: 'slideUp 0.8s ease-out 1s backwards'}}
            >
              {isLoggingIn ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </div>

          <p className="mt-6 text-center text-gray-400" style={{animation: 'fadeIn 1s ease-out 1.1s backwards'}}>
            Don't have an account?{" "}
            <a href="/signup" className="text-teal-400 hover:text-teal-300 font-bold transition-colors">
              Sign up for free
            </a>
          </p>
        </div>

        {/* RIGHT SIDE - ILLUSTRATION */}
        <div className="hidden lg:flex items-center justify-center p-12 bg-gradient-to-br from-teal-600/20 via-cyan-600/20 to-blue-600/20 backdrop-blur-xl border border-white/10 rounded-2xl lg:rounded-l-none relative overflow-hidden"
          style={{animation: 'slideInRight 0.8s ease-out'}}>
          
          {/* Decorative animated shapes */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-teal-500/20 rounded-full -mr-32 -mt-32 blur-3xl"
            style={{animation: 'float 8s ease-in-out infinite'}}></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/20 rounded-full -ml-32 -mb-32 blur-3xl"
            style={{animation: 'float 10s ease-in-out infinite 2s'}}></div>
          <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"
            style={{animation: 'float 12s ease-in-out infinite 4s'}}></div>

          <div className="relative z-10 text-center" style={{animation: 'slideUp 0.8s ease-out 0.4s backwards'}}>
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-teal-500/30 to-cyan-500/30 backdrop-blur-md rounded-2xl mb-6 border border-white/20 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
                style={{animation: 'float 4s ease-in-out infinite'}}>
                <svg className="w-12 h-12 text-cyan-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                </svg>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">Hello, Friend!</h2>
              <p className="text-gray-300 text-lg leading-relaxed max-w-xs mx-auto font-mono">
                Enter your personal details and start your journey with us
              </p>
            </div>

            <div className="mt-12 space-y-3 flex flex-col items-center">
              <div className="px-6 py-3 bg-gradient-to-r from-teal-500/30 to-cyan-500/30 backdrop-blur-md rounded-full text-white font-semibold border border-white/30 hover:border-teal-400 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/50"
                style={{animation: 'slideUp 0.8s ease-out 0.6s backwards'}}>
                ✓ Free to use
              </div>
              <div className="px-6 py-3 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 backdrop-blur-md rounded-full text-white font-semibold border border-white/30 hover:border-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50"
                style={{animation: 'slideUp 0.8s ease-out 0.7s backwards'}}>
                ✓ Easy Setup
              </div>
              <div className="px-6 py-3 bg-gradient-to-r from-blue-500/30 to-teal-500/30 backdrop-blur-md rounded-full text-white font-semibold border border-white/30 hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50"
                style={{animation: 'slideUp 0.8s ease-out 0.8s backwards'}}>
                ✓ Private & Secure
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 10px rgba(20, 184, 166, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(34, 211, 238, 0.8);
          }
        }
      `}</style>
    </div>
  );
}
export default LoginPage;