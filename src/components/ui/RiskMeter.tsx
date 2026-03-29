import React from "react";
import { motion } from "framer-motion";

interface RiskMeterProps {
  score: number; // 0 to 100
  level: string;
}

export function RiskMeter({ score, level }: RiskMeterProps) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let color = "hsl(var(--primary))"; // default teal
  let shadowColor = "rgba(0,240,255,0.5)";
  
  if (score > 75) {
    color = "hsl(var(--destructive))";
    shadowColor = "rgba(255,50,100,0.5)";
  } else if (score > 40) {
    color = "hsl(40 100% 50%)"; // warning orange
    shadowColor = "rgba(255,165,0,0.5)";
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-[240px] mx-auto aspect-square">
      <svg className="w-full h-full transform -rotate-90 drop-shadow-2xl" viewBox="0 0 140 140">
        {/* Background track */}
        <circle
          cx="70"
          cy="70"
          r={radius}
          stroke="hsl(var(--secondary))"
          strokeWidth="8"
          fill="transparent"
          className="opacity-40"
        />
        {/* Tech decorative outer ring */}
        <circle
          cx="70"
          cy="70"
          r={radius + 8}
          stroke="hsl(var(--muted))"
          strokeWidth="1"
          strokeDasharray="4 8"
          fill="transparent"
          className="opacity-50"
        />
        {/* Progress indicator */}
        <motion.circle
          cx="70"
          cy="70"
          r={radius}
          stroke={color}
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 8px ${shadowColor})` }}
        />
      </svg>
      
      {/* Center text */}
      <div className="absolute flex flex-col items-center justify-center text-center">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-5xl font-display font-bold text-foreground tracking-tighter"
          style={{ textShadow: `0 0 15px ${shadowColor}` }}
        >
          {score}
        </motion.span>
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className={`text-sm font-semibold uppercase tracking-widest mt-1`}
          style={{ color }}
        >
          {level}
        </motion.span>
      </div>
    </div>
  );
}
