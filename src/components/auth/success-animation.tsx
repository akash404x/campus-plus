'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Sparkles } from 'lucide-react';

interface SuccessAnimationProps {
  message?: string;
  submessage?: string;
}

export function SuccessAnimation({ message = 'Success!', submessage }: SuccessAnimationProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.5, bounce: 0.5 }}
        className="relative"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', duration: 0.5 }}
          className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg"
        >
          <CheckCircle className="w-12 h-12 text-white" />
        </motion.div>
        
        {/* Sparkles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.1, duration: 0.3 }}
            className="absolute"
            style={{
              top: `${Math.cos((i * 60) * Math.PI / 180) * 40}px`,
              left: `${Math.sin((i * 60) * Math.PI / 180) * 40}px`,
            }}
          >
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="text-center space-y-2"
      >
        <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">{message}</h3>
        {submessage && (
          <p className="text-muted-foreground">{submessage}</p>
        )}
      </motion.div>
    </div>
  );
}
