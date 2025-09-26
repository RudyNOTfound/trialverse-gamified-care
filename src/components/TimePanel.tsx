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
      className="w-full p-4"
    >
      <div className="bg-gradient-card backdrop-blur-sm rounded-2xl px-6 py-3 shadow-xl border border-primary/20 glow-primary flex items-center justify-between">
        {/* Live Clock */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="flex items-center space-x-4"
        >
          <div className="flex items-center space-x-2">
            <span className="text-xl animate-pulse">🕐</span>
            <div>
              <motion.div
                key={currentTime.getSeconds()}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="text-lg font-mono font-bold text-primary"
              >
                {formatTime(currentTime)}
              </motion.div>
              <div className="text-xs text-muted-foreground">
                {formatDate(currentTime)}
              </div>
            </div>
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
            className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 group ${
              walletConnected
                ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-green-500/25'
                : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:shadow-orange-500/25'
            } shadow-lg hover:scale-105 shimmer`}
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg group-hover:animate-bounce-subtle">
                {walletConnected ? '🔗' : '⚡'}
              </span>
              <span className="text-sm">
                {walletConnected ? 'Connected' : 'Connect Wallet'}
              </span>
            </div>
          </button>
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