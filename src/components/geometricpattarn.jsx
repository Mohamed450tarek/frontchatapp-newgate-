const GeometricPattern = () => {
  return (
    <>
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-midnight to-teal animate-pulse" 
             style={{ animationDuration: '4s' }} />
        <div className="absolute inset-0 bg-gradient-to-tr from-gold/5 via-transparent to-emerald/5 animate-pulse" 
             style={{ animationDuration: '6s', animationDelay: '1s' }} />
        
        {/* Radial Pulsing Circles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold/10 blur-3xl animate-pulse" 
             style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-emerald/10 blur-3xl animate-pulse" 
             style={{ animationDuration: '4s', animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-3xl animate-pulse" 
             style={{ animationDuration: '5s', animationDelay: '0.5s' }} />
      </div>

      {/* Geometric Patterns */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute w-full h-full animate-rotate-slow opacity-[0.08]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="islamic-pattern"
              x="0"
              y="0"
              width="200"
              height="200"
              patternUnits="userSpaceOnUse"
            >
              {/* Central Star */}
              <polygon
                points="100,20 120,80 180,80 130,120 150,180 100,140 50,180 70,120 20,80 80,80"
                fill="none"
                stroke="hsl(var(--gold))"
                strokeWidth="1.5"
              />
              
              {/* Interlocking Hexagons */}
              <polygon
                points="100,50 125,65 125,95 100,110 75,95 75,65"
                fill="none"
                stroke="hsl(var(--gold))"
                strokeWidth="1"
              />
              
              {/* Corner Decorations */}
              <circle cx="50" cy="50" r="3" fill="hsl(var(--gold))" opacity="0.6" />
              <circle cx="150" cy="50" r="3" fill="hsl(var(--gold))" opacity="0.6" />
              <circle cx="50" cy="150" r="3" fill="hsl(var(--gold))" opacity="0.6" />
              <circle cx="150" cy="150" r="3" fill="hsl(var(--gold))" opacity="0.6" />
              
              {/* Geometric Lines */}
              <line x1="50" y1="50" x2="150" y2="150" stroke="hsl(var(--gold))" strokeWidth="0.5" opacity="0.4" />
              <line x1="150" y1="50" x2="50" y2="150" stroke="hsl(var(--gold))" strokeWidth="0.5" opacity="0.4" />
            </pattern>
          </defs>
          
          <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
        </svg>

        {/* Enhanced Floating Gold Particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-gold opacity-60 animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-gold opacity-50 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 rounded-full bg-gold opacity-40 animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute top-2/3 right-1/3 w-1 h-1 rounded-full bg-emerald opacity-70 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 rounded-full bg-gold opacity-55 animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/5 w-1.5 h-1.5 rounded-full bg-emerald opacity-60 animate-float" style={{ animationDelay: '5s' }} />
        <div className="absolute bottom-1/2 right-1/5 w-2 h-2 rounded-full bg-gold opacity-45 animate-float" style={{ animationDelay: '2.5s' }} />
      </div>
    </>
  );
};

export default GeometricPattern;
