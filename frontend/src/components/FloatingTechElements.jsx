import React from 'react';
import { Code2, Database, Server, ShieldCheck, Cpu, Layers, Lock, Globe } from 'lucide-react';

// eslint-disable-next-line no-unused-vars
const FloatingElement = ({ Icon: IconComponent, className, delay, duration }) => {
  return (
    <div 
      className={`absolute opacity-20 text-space-glow animate-float ${className}`}
      style={{ animationDelay: delay, animationDuration: duration }}
    >
      <IconComponent size={64} strokeWidth={1} />
    </div>
  );
};

const FloatingTechElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Safe space / Secure icons */}
      <FloatingElement Icon={ShieldCheck} className="top-[20%] left-[10%] text-emerald-400 opacity-30" delay="0s" duration="7s" />
      <FloatingElement Icon={Lock} className="bottom-[25%] right-[15%] text-emerald-400 opacity-20" delay="2s" duration="8s" />
      
      {/* Tech stack icons */}
      <FloatingElement Icon={Code2} className="top-[30%] right-[12%]" delay="1s" duration="6s" />
      <FloatingElement Icon={Database} className="bottom-[20%] left-[15%]" delay="3s" duration="9s" />
      <FloatingElement Icon={Server} className="top-[60%] left-[8%]" delay="2s" duration="7s" />
      <FloatingElement Icon={Cpu} className="top-[15%] right-[25%]" delay="4s" duration="8s" />
      <FloatingElement Icon={Layers} className="bottom-[15%] right-[28%]" delay="1.5s" duration="6.5s" />
      <FloatingElement Icon={Globe} className="top-[70%] right-[8%]" delay="0.5s" duration="7.5s" />
    </div>
  );
};

export default FloatingTechElements;
