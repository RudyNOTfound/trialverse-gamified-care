import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Progress = () => {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  // Simulated trial days with Candy Crush-style progression
  const trialDays = [
    { day: 1, status: "completed", stars: 3, type: "easy", color: "from-green-400 to-green-600" },
    { day: 2, status: "completed", stars: 2, type: "easy", color: "from-green-400 to-green-600" },
    { day: 3, status: "completed", stars: 3, type: "easy", color: "from-green-400 to-green-600" },
    { day: 4, status: "completed", stars: 1, type: "medium", color: "from-blue-400 to-blue-600" },
    { day: 5, status: "current", stars: 0, type: "medium", color: "from-primary to-primary-glow" },
    { day: 6, status: "locked", stars: 0, type: "medium", color: "from-gray-400 to-gray-600" },
    { day: 7, status: "locked", stars: 0, type: "hard", color: "from-red-400 to-red-600" },
    { day: 8, status: "locked", stars: 0, type: "hard", color: "from-red-400 to-red-600" },
    { day: 9, status: "locked", stars: 0, type: "hard", color: "from-red-400 to-red-600" },
    { day: 10, status: "locked", stars: 0, type: "boss", color: "from-purple-400 to-purple-600" },
    { day: 11, status: "locked", stars: 0, type: "easy", color: "from-green-400 to-green-600" },
    { day: 12, status: "locked", stars: 0, type: "easy", color: "from-green-400 to-green-600" },
    { day: 13, status: "locked", stars: 0, type: "medium", color: "from-blue-400 to-blue-600" },
    { day: 14, status: "locked", stars: 0, type: "hard", color: "from-red-400 to-red-600" },
    { day: 15, status: "locked", stars: 0, type: "boss", color: "from-purple-400 to-purple-600" },
  ];

  const getStatusIcon = (status: string, type: string) => {
    if (status === "completed") return "✅";
    if (status === "current") return "🎯";
    if (type === "boss") return "👑";
    return "🔒";
  };

  const getTypeEmoji = (type: string) => {
    switch (type) {
      case "easy": return "🟢";
      case "medium": return "🔵";
      case "hard": return "🔴";
      case "boss": return "👑";
      default: return "⚪";
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate("/join-patient")}
              className="hover:scale-110 transition-transform"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Trial Progress Map
              </h1>
              <p className="text-muted-foreground text-lg">
                Complete each day to advance through your clinical trial journey
              </p>
            </div>
          </div>
        </motion.div>

        {/* Progress Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-gradient-card rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-green-500">4</div>
            <div className="text-sm text-muted-foreground">Days Completed</div>
          </div>
          <div className="bg-gradient-card rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-gold">9</div>
            <div className="text-sm text-muted-foreground">Stars Earned</div>
          </div>
          <div className="bg-gradient-card rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-primary">1</div>
            <div className="text-sm text-muted-foreground">Current Day</div>
          </div>
          <div className="bg-gradient-card rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-500">11</div>
            <div className="text-sm text-muted-foreground">Days Remaining</div>
          </div>
        </motion.div>

        {/* Level Map - Candy Crush Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-card rounded-3xl p-8"
        >
          <div className="relative">
            {/* Decorative path line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
              <path
                d="M 50 100 Q 150 80 250 100 T 450 100 Q 550 120 650 100 T 850 100 Q 950 80 1050 100"
                stroke="url(#gradient)"
                strokeWidth="4"
                fill="none"
                strokeDasharray="10,5"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--primary-glow))" />
                </linearGradient>
              </defs>
            </svg>

            {/* Level Grid */}
            <div className="grid grid-cols-5 gap-8 relative z-10">
              {trialDays.map((day, index) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 200,
                    damping: 10
                  }}
                  className="flex flex-col items-center"
                >
                  {/* Level Circle */}
                  <motion.div
                    className={`
                      relative w-20 h-20 rounded-full cursor-pointer
                      bg-gradient-to-br ${day.color}
                      shadow-lg border-4 border-white
                      flex items-center justify-center text-white font-bold text-lg
                      ${day.status === "locked" ? "opacity-50" : ""}
                      ${day.status === "current" ? "animate-pulse-glow ring-4 ring-primary/50" : ""}
                      ${day.status === "completed" ? "glow-achievement" : ""}
                      transition-all duration-300
                    `}
                    whileHover={day.status !== "locked" ? { 
                      scale: 1.1, 
                      rotate: [0, -5, 5, 0] 
                    } : {}}
                    whileTap={day.status !== "locked" ? { scale: 0.95 } : {}}
                    onClick={() => day.status !== "locked" && setSelectedLevel(day.day)}
                  >
                    {/* Day Number */}
                    <span className="text-xl font-bold">{day.day}</span>
                    
                    {/* Status Icon */}
                    <div className="absolute -top-2 -right-2 text-2xl">
                      {getStatusIcon(day.status, day.type)}
                    </div>

                    {/* Type Indicator */}
                    <div className="absolute -bottom-2 -left-2 text-lg">
                      {getTypeEmoji(day.type)}
                    </div>

                    {/* Sparkle effect for current level */}
                    {day.status === "current" && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      >
                        <div className="absolute top-0 left-1/2 w-1 h-1 bg-white rounded-full transform -translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-white rounded-full transform -translate-x-1/2"></div>
                        <div className="absolute left-0 top-1/2 w-1 h-1 bg-white rounded-full transform -translate-y-1/2"></div>
                        <div className="absolute right-0 top-1/2 w-1 h-1 bg-white rounded-full transform -translate-y-1/2"></div>
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Stars */}
                  {day.status === "completed" && (
                    <motion.div 
                      className="flex space-x-1 mt-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      {[1, 2, 3].map((star) => (
                        <motion.div
                          key={star}
                          className={`text-lg ${
                            star <= day.stars ? "text-gold" : "text-gray-400"
                          }`}
                          animate={star <= day.stars ? { 
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0]
                          } : {}}
                          transition={{ 
                            delay: index * 0.1 + star * 0.1,
                            duration: 0.5
                          }}
                        >
                          ⭐
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {/* Day Label */}
                  <div className="mt-2 text-center">
                    <div className="text-sm font-semibold">Day {day.day}</div>
                    <div className="text-xs text-muted-foreground capitalize">
                      {day.type} {day.type === "boss" ? "Challenge" : "Task"}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Level Details Modal */}
        {selectedLevel && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedLevel(null)}
          >
            <motion.div
              className="bg-gradient-card rounded-3xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-4">
                  Day {selectedLevel} Challenge
                </h3>
                <div className="text-6xl mb-4">
                  {trialDays.find(d => d.day === selectedLevel)?.status === "completed" ? "✅" : "🎯"}
                </div>
                <p className="text-muted-foreground mb-6">
                  {trialDays.find(d => d.day === selectedLevel)?.status === "completed" 
                    ? "Great job! You've completed this day's activities."
                    : "Ready to start today's trial activities?"
                  }
                </p>
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => setSelectedLevel(null)}
                  >
                    {trialDays.find(d => d.day === selectedLevel)?.status === "completed" 
                      ? "Review Results" 
                      : "Start Day"
                    }
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setSelectedLevel(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Progress;