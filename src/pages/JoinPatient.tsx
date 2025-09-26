import { motion } from "framer-motion";
import { useState } from "react";

const JoinPatient = () => {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  const levels = [
    { id: 1, title: "Trial Newbie", icon: "🌱", progress: 100, unlocked: true },
    { id: 2, title: "Data Explorer", icon: "🔍", progress: 75, unlocked: true },
    { id: 3, title: "Protocol Pro", icon: "📋", progress: 50, unlocked: true },
    { id: 4, title: "Safety Scout", icon: "🛡️", progress: 25, unlocked: false },
    { id: 5, title: "Research Ranger", icon: "🎯", progress: 0, unlocked: false },
  ];

  const stats = {
    currentRank: "Data Explorer",
    totalPoints: 2850,
    completedTrials: 3,
    nextReward: "Protocol Pro Badge"
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Patient Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">
            Track your progress and unlock new opportunities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-card rounded-3xl p-6 space-y-4"
          >
            <h2 className="text-2xl font-semibold mb-4">My Stats 📊</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Current Rank</span>
                <span className="font-semibold text-primary">{stats.currentRank}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Points</span>
                <span className="font-bold text-gold">{stats.totalPoints.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Completed Trials</span>
                <span className="font-semibold text-success">{stats.completedTrials}</span>
              </div>
              
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">Next Reward</p>
                <div className="bg-gradient-glow text-white p-3 rounded-xl text-center font-semibold">
                  {stats.nextReward} 🏆
                </div>
              </div>
            </div>

            <button className="w-full bg-achievement text-white py-3 rounded-xl font-semibold hover:scale-105 transition-transform shimmer">
              Redeem Ranks 💎
            </button>
          </motion.div>

          {/* Progress Levels */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-gradient-card rounded-3xl p-6"
          >
            <h2 className="text-2xl font-semibold mb-6">Your Journey 🗺️</h2>
            
            <div className="space-y-4">
              {levels.map((level, index) => (
                <motion.div
                  key={level.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center space-x-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    level.unlocked 
                      ? 'border-primary/30 hover:border-primary hover:scale-102 bg-background/30' 
                      : 'border-muted/30 opacity-50'
                  } ${selectedLevel === level.id ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => level.unlocked && setSelectedLevel(level.id)}
                >
                  <div className={`text-4xl ${level.unlocked ? 'animate-bounce-subtle' : ''}`}>
                    {level.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{level.title}</h3>
                    <div className="w-full bg-muted rounded-full h-2 mt-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${level.progress}%` }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                        className="bg-gradient-glow h-2 rounded-full relative overflow-hidden"
                      >
                        {level.progress > 0 && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                        )}
                      </motion.div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{level.progress}% Complete</p>
                  </div>
                  
                  {level.unlocked && (
                    <div className="text-primary animate-pulse-glow">
                      ✨
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Requested Trials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-gradient-card rounded-3xl p-6"
        >
          <h2 className="text-2xl font-semibold mb-6">Requested Trials 📋</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {['Diabetes Research Study', 'Heart Health Trial', 'Sleep Pattern Analysis'].map((trial, index) => (
              <motion.div
                key={trial}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-background/50 p-4 rounded-2xl border border-border hover:border-primary transition-colors"
              >
                <h3 className="font-semibold mb-2">{trial}</h3>
                <p className="text-sm text-muted-foreground mb-3">Status: Pending Review</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-primary">+500 points</span>
                  <button className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-lg hover:bg-primary/20 transition-colors">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quiz Pop-up */}
        {showQuiz && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowQuiz(false)}
          >
            <motion.div
              className="bg-gradient-card rounded-3xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-semibold mb-4 text-center">
                Daily Quiz! 🧠
              </h3>
              <p className="text-muted-foreground mb-6 text-center">
                You've been idle for a while. Answer this quick quiz to earn bonus points!
              </p>
              <div className="space-y-4">
                <p className="font-semibold">What is the primary purpose of clinical trials?</p>
                <div className="space-y-2">
                  {['To test new treatments', 'To make money', 'To collect data'].map((option) => (
                    <button
                      key={option}
                      className="w-full text-left p-3 rounded-xl bg-background/50 hover:bg-primary/10 transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default JoinPatient;