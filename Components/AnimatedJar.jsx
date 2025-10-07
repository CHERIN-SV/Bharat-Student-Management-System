import React from "react";
import { motion } from "framer-motion";

export default function AnimatedJar({ count, label, color = "#FF9ECD", delay = 0 }) {
  const percentage = Math.min((count / 100) * 100, 100);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-32 h-40">
        {/* Jar container */}
        <svg viewBox="0 0 100 120" className="w-full h-full">
          {/* Jar body */}
          <path
            d="M 25 30 L 25 100 Q 25 110 35 110 L 65 110 Q 75 110 75 100 L 75 30 Z"
            fill="rgba(255, 255, 255, 0.3)"
            stroke="rgba(0, 0, 0, 0.2)"
            strokeWidth="2"
          />
          
          {/* Jar neck */}
          <rect x="35" y="15" width="30" height="15" rx="3" fill="rgba(255, 255, 255, 0.3)" stroke="rgba(0, 0, 0, 0.2)" strokeWidth="2" />
          
          {/* Jar lid */}
          <rect x="30" y="10" width="40" height="8" rx="4" fill="rgba(255, 255, 255, 0.4)" stroke="rgba(0, 0, 0, 0.2)" strokeWidth="2" />
          
          {/* Liquid fill */}
          <motion.path
            d="M 26 30 L 26 100 Q 26 109 35 109 L 65 109 Q 74 109 74 100 L 74 30 Z"
            fill={color}
            opacity="0.6"
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: `inset(${100 - percentage}% 0 0 0)` }}
            transition={{ duration: 2, delay, ease: "easeOut" }}
          />

          {/* Bubbles */}
          {[...Array(3)].map((_, i) => (
            <motion.circle
              key={i}
              cx={45 + i * 5}
              cy={80}
              r="2"
              fill="rgba(255, 255, 255, 0.8)"
              initial={{ cy: 100, opacity: 0 }}
              animate={{ cy: 30, opacity: [0, 1, 0] }}
              transition={{
                duration: 2,
                delay: delay + i * 0.3,
                repeat: Infinity,
                repeatDelay: 1
              }}
            />
          ))}
        </svg>

        {/* Count display */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.5 }}
        >
          <div className="text-3xl font-bold text-black">{count}</div>
        </motion.div>
      </div>

      <motion.p
        className="text-black font-semibold text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay + 1 }}
      >
        {label}
      </motion.p>
    </div>
  );
}