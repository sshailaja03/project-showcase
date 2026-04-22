import React, { useEffect, useRef } from 'react';

const BackgroundEffects = () => {
  const blobRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (blobRef.current) {
        // Smoothly follow the mouse with a slight delay using CSS transition
        blobRef.current.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Interactive mouse follow glow */}
      <div 
        ref={blobRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] bg-space-glow/20 rounded-full blur-[100px] transition-transform duration-[1500ms] ease-out will-change-transform"
        style={{ transform: 'translate(-300px, -300px)' }}
      />
      
      {/* Subtle grid background */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      ></div>

      {/* Animated ambient blobs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-space-glow/20 rounded-full blur-[120px] mix-blend-screen animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px] mix-blend-screen animate-blob [animation-delay:2s]"></div>
      <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] mix-blend-screen animate-blob [animation-delay:4s]"></div>
    </div>
  );
};

export default BackgroundEffects;
