 import React, { useState, useEffect } from 'react';
import { MessageCircle, Lock, Shield, Mail, LogIn, UserPlus, Zap, Eye, Smartphone, CheckCircle } from 'lucide-react';
 
const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const cards = document.querySelectorAll('.feature-card');
      cards.forEach((card, idx) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          setVisibleCards(prev => [...new Set([...prev, idx])]);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
 

 
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      {/* Animated background shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-400/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-300/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-8 h-8 text-cyan-500" />
            <span className="text-2xl font-bold text-slate-900  playwrite-cu">Newgate</span>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-2 text-slate-600 font-semibold hover:text-cyan-600 transition-colors"> <a href="/login"> Sign In </a></button>
          <a href="/signup">  <button className="px-6 py-2 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-all hover:shadow-lg"> Sign Up  </button> </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-slate-900 space-y-6 animate-fade-in">
            <div className="h-1 w-12 bg-gradient-to-r from-cyan-500 to-cyan-300 rounded-full"></div>
            <h1 className="text-6xl md:text-7xl font-bold leading-tight ">
          <span className='pb-8 playwrite-cu'>Newgate</span>      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-cyan-400 ">Communicate Seamlessly</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">Stay connected with friends, family, and colleagues through fast, secure, and intuitive messaging. Experience communication without boundaries.</p>
            <div className="flex gap-4 pt-4">
              <button className="group px-8 py-3 bg-cyan-500 text-white font-bold rounded-lg hover:bg-cyan-600 transition-all transform hover:scale-105 hover:shadow-xl shadow-lg">
              <a href="/login">   Get Started </a>
              </button>
              <button className="group px-8 py-3 border-2 border-cyan-500 text-cyan-600 font-bold rounded-lg hover:bg-cyan-50 transition-all transform hover:scale-105">
              <a href="/login"   target="_blank"  className='' >  Sign In</a>
              </button>
            </div>
          </div>
         <div className="relative animate-float">
  <div className="bg-white/70 rounded-3xl p-10 backdrop-blur-xl border border-cyan-300 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
  <div className="w-full h-80 flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-100 to-cyan-50 border border-cyan-200">
    <img 
      src="/2.png"    
      alt="Phone preview"
      className="w-full h-full object-contain"
    />
  </div>
</div>

  {/* Glow Border */}
  <div className="absolute inset-0 rounded-3xl border-2 border-cyan-300 animate-pulse"></div>
</div>

        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 relative bg-white/50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white rounded-2xl p-8 border border-cyan-200 shadow-lg">
              <img src="/4.png" alt="" />
            </div>
          </div>
          <div className="text-slate-900 space-y-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-5xl font-bold">About the App</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              <span className="text-cyan-600 font-semibold">Connect</span> is a modern messaging platform built for people who value their time and privacy. We created this app to bring clarity to digital communication—no clutter, no distractions, just pure connection.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed">
              Whether you're coordinating with teammates, staying in touch with friends, or building communities, Connect provides the tools you need with the simplicity you deserve. Fast, secure, and designed with you in mind.
            </p>
            <p  className=' text-slate-600 text-lg leading-relaxed '> 
              you can chat with your friend by search in contents by here email or here ID  in page 
              <span classname ="text-cyan-600 font-semibold">  sent to hem   invetation request and he can accept or not accept   </span>
                  after he accept will start new massage with him 
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-slate-900 text-center mb-16">Main Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: 'Real-time Messaging', desc: 'Messages delivered instantly with zero lag' },
              { icon: Shield, title: 'End-to-End Encrypted', desc: 'Your conversations stay completely private' },
              { icon: Smartphone, title: 'Cross-Platform', desc: 'Seamless experience on web, iOS, and Android' },
              { icon: Lock, title: 'Secure Login', desc: 'Two-factor authentication keeps you safe' },
              { icon: MessageCircle, title: 'Clean UI', desc: 'Beautiful design that gets out of your way' },
            ].map((feature, idx) => (
              <div
                key={idx}
                className={`feature-card group bg-white rounded-xl p-6 border border-cyan-200 hover:border-cyan-400 hover:shadow-xl transition-all duration-500 transform ${
                  visibleCards.includes(idx) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <feature.icon className="w-12 h-12 text-cyan-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 px-6 relative bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-slate-900 space-y-6 animate-slide-up">
              <h2 className="text-5xl font-bold">Your Security Matters</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Lock className="w-6 h-6 text-cyan-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 mb-1">End-to-End Encryption</h3>
                    <p className="text-slate-600">Every message is encrypted with military-grade algorithms</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Shield className="w-6 h-6 text-cyan-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 mb-1">Privacy Protection</h3>
                    <p className="text-slate-600">We never track, sell, or share your personal data</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-cyan-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 mb-1">Secure Authentication</h3>
                    <p className="text-slate-600">Two-factor authentication and biometric login options</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white rounded-2xl p-8 border border-cyan-200 shadow-lg">
               <img src="/1.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sign Up Steps */}
      <section className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-slate-900 text-center mb-16">Getting Started is Easy</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: UserPlus, num: '1', title: 'Create Account', desc: 'Sign up with email in seconds' },
              { icon: Mail, num: '2', title: 'send requests', desc: 'Click the link we send you' },
              { icon: LogIn, num: '3', title: 'Start Connecting', desc: 'Login and begin messaging' },
            ].map((step, idx) => (
              <div key={idx} className="relative animate-slide-up" style={{ animationDelay: `${idx * 150}ms` }}>
                <div className="bg-white rounded-xl p-8 border border-cyan-200 hover:border-cyan-400 transition-all text-center group hover:shadow-lg">
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <step.icon className="w-16 h-16 text-cyan-500 group-hover:scale-110 transition-transform" />
                      <span className="absolute -top-2 -right-2 bg-cyan-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">{step.num}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-cyan-400 text-white font-bold rounded-lg hover:shadow-xl transition-all transform hover:scale-105 shadow-lg">
            <a href="/login">   Start Now → </a>
            </button>
          </div>
        </div>
      </section>

      {/* Final Message */}
      <section className="py-20 px-6 relative bg-white/50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-cyan-50 to-white rounded-2xl p-12 border border-cyan-200 text-center animate-fade-in shadow-lg">
            <p className="text-4xl font-bold text-slate-900 mb-4">Have a wonderful day! 🌿</p>
            <p className="text-xl text-slate-600">Thank you for choosing Connect. We're excited to help you stay connected with the people who matter most.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-slate-400 py-16 px-6 relative z-10 border-t border-cyan-200 text-sm/16 ">
        <div className="max-w-6xl mx-auto">
          {/* Footer Top */}
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="w-8 h-8 text-cyan-500" />
                <span className="font-bold text-2xl text-slate-200">Newgate</span>
              </div>
              <p className="text-slate-600">Stay connected with the people who matter most. Secure, fast, and simple.</p>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-bold text-lg mb-4 text-slate-300">Product</h4>
              <ul className="space-y-2 text-slate-600">
                <li><button className="hover:text-cyan-600 transition-colors">Features</button></li>
                <li><button className="hover:text-cyan-600 transition-colors">Security</button></li>
                <li><button className="hover:text-cyan-600 transition-colors">Download</button></li>
                <li><button className="hover:text-cyan-600 transition-colors">Pricing</button></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold text-lg mb-4 text-slate-300">Company</h4>
              <ul className="space-y-2 text-slate-600">
                <li> <a href="https://my-portofolio-mohamed-tarek.vercel.app/"> <button className="hover:text-cyan-600 transition-colors">About Us</button> </a></li>
                <li><button className="hover:text-cyan-600 transition-colors">Blog</button></li>
                <li><button className="hover:text-cyan-600 transition-colors">Careers</button></li>
                <li><a href="https://my-portofolio-mohamed-tarek.vercel.app/"> <button className="hover:text-cyan-600 transition-colors">Contact</button></a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold text-lg mb-4 text-slate-300">Legal</h4>
              <ul className="space-y-2 text-slate-600">
                <li><button className="hover:text-cyan-600 transition-colors">Privacy Policy</button></li>
                <li><button className="hover:text-cyan-600 transition-colors">Terms of Service</button></li>
                <li><button className="hover:text-cyan-600 transition-colors">Cookie Policy</button></li>
                <li><button className="hover:text-cyan-600 transition-colors">Security</button></li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-cyan-200 py-8"></div>

          {/* Footer Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center   gap-6">
            <div className="text-slate-400">
              <p >© 2026 Connect. All rights reserved. | Made with mokalo </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-6">
             
              <button className="w-10 h-10 rounded-full bg-cyan-100 hover:bg-cyan-200 transition-all flex items-center justify-center hover:scale-110 text-cyan-600" title="LinkedIn">
                <a href="https://www.linkedin.com/in/mohamed-tarek450/"> 
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.474-2.236-1.666-2.236-1.409 0-2.248.948-2.605 1.866-.134.331-.167.792-.167 1.254v4.685h-3.554v-9.499h3.554v1.283h.05c.503-.758 1.368-1.852 3.322-1.852 2.432 0 4.261 1.59 4.261 5.015l-.001 4.053zM5.337 8.855c-1.144 0-2.083-.929-2.083-2.075s.939-2.075 2.083-2.075c1.142 0 2.083.929 2.083 2.075s-.94 2.075-2.083 2.075zm1.782 11.597H3.555V9.963h3.564v10.489zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                </a>
              </button>
              <button className="w-10 h-10 rounded-full bg-cyan-100 hover:bg-cyan-200 transition-all flex items-center justify-center hover:scale-110 text-cyan-600" title="Instagram">
                <a href="https://www.instagram.com/mohamedtarek6839/"> 
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="2.458" y="2.458" width="19.084" height="19.084" rx="4.27" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="12" cy="12" r="3.846" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="17.877" cy="6.123" r="0.9" fill="currentColor"/>
                </svg>
</a>
              </button>
              
              <button className="w-10 h-10 rounded-full bg-cyan-100 hover:bg-cyan-200 transition-all flex items-center justify-center hover:scale-110 text-cyan-600" title="GitHub">
                 <a href="https://github.com/Mohamed450tarek">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              </button>
            </div>
          </div>

          {/* Additional Info */}
     
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 1s ease-out forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;