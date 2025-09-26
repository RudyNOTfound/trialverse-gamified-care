import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const TimePanel = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleConnectWallet = () => {
    setWalletConnected(!walletConnected);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: true, 
      hour: 'numeric', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
      className="fixed top-6 right-6 z-50"
    >
      <div className="bg-gradient-card backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-primary/20 glow-primary">
        {/* Live Clock */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="text-center mb-6"
        >
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className="text-2xl animate-pulse">🕐</span>
            <h3 className="font-bold text-lg">Live Time</h3>
          </div>
          
          <motion.div
            key={currentTime.getSeconds()} // Re-animate every second
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="bg-gradient-glow text-white rounded-2xl p-4 mb-2"
          >
            <div className="text-2xl font-mono font-bold">
              {formatTime(currentTime)}
            </div>
          </motion.div>
          
          <div className="text-sm text-muted-foreground">
            {formatDate(currentTime)}
          </div>
        </motion.div>

        {/* Connect Wallet Button */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.7, type: "spring", stiffness: 150 }}
        >
          <button
            onClick={handleConnectWallet}
            className={`w-full p-4 rounded-2xl font-semibold text-lg transition-all duration-300 group ${
              walletConnected
                ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-green-500/25'
                : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:shadow-orange-500/25'
            } shadow-lg hover:scale-105 shimmer`}
          >
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl group-hover:animate-bounce-subtle">
                {walletConnected ? '🔗' : '⚡'}
              </span>
              <span>
                {walletConnected ? 'Wallet Connected' : 'Connect Wallet'}
              </span>
            </div>
            
            {walletConnected && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-2 text-sm opacity-80"
              >
                <div className="flex items-center justify-center space-x-1">
                  <span>●</span>
                  <span>0x1234...5678</span>
                </div>
              </motion.div>
            )}
          </button>
        </motion.div>

        {/* Power-up Effects */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-4 text-center"
        >
          <div className="text-xs text-muted-foreground mb-2">
            {walletConnected ? 'Ready for trials!' : 'Power up your experience'}
          </div>
          
          {/* Animated dots */}
          <div className="flex justify-center space-x-1">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
                className="w-2 h-2 bg-primary rounded-full"
              />
            ))}
          </div>
        </motion.div>

        {/* Connection Status Indicator */}
        {walletConnected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-pulse-glow"
          >
            <span className="text-white text-xs">✓</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default TimePanel;