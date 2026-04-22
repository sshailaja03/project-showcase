import React, { useRef, useState, useEffect } from 'react';

const TiltCard = ({ children, className = '' }) => {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [drift, setDrift] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isHovered) return;

    let animationFrameId;
    let time = Math.random() * 1000;

    const animateDrift = () => {
      time += 0.01;
      setDrift({
        x: Math.sin(time) * 3, // Gentle sway up to 3 degrees
        y: Math.cos(time * 0.8) * 3,
      });
      animationFrameId = requestAnimationFrame(animateDrift);
    };

    animateDrift();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate mouse position relative to center of card
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Max tilt angle
    const maxTilt = 15;
    
    const rotateX = -(y / (rect.height / 2)) * maxTilt;
    const rotateY = (x / (rect.width / 2)) * maxTilt;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  const currentRotateX = isHovered ? rotate.x : drift.x;
  const currentRotateY = isHovered ? rotate.y : drift.y;

  return (
    <div className="perspective-1000 w-full h-full">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`preserve-3d card-glow-border rounded-xl bg-space-card border border-space-border transition-all duration-200 ease-out shadow-lg w-full h-full ${className}`}
        style={{
          transform: `rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg) ${isHovered ? 'scale3d(1.02, 1.02, 1.02)' : ''}`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 1.5s ease-in-out',
        }}
      >
        <div className="preserve-3d w-full h-full p-6 relative">
          {children}
        </div>
      </div>
    </div>
  );
};

export default TiltCard;
