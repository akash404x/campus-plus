'use client';

import { motion } from 'framer-motion';

export function GradientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -inset-[10%] opacity-30 blur-3xl"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'loop',
        }}
        style={{
          backgroundImage: `
            radial-gradient(circle at 0% 50%, rgba(168, 85, 247, 0.5) 0%, transparent 50%),
            radial-gradient(circle at 100% 50%, rgba(236, 72, 153, 0.5) 0%, transparent 50%),
            radial-gradient(circle at 50% 100%, rgba(147, 51, 234, 0.5) 0%, transparent 50%)
          `,
          backgroundSize: '200% 200%',
        }}
      />
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'loop',
        }}
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 0%, rgba(192, 132, 252, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 0% 100%, rgba(244, 114, 182, 0.3) 0%, transparent 50%)
          `,
          backgroundSize: '200% 200%',
        }}
      />
    </div>
  );
}
