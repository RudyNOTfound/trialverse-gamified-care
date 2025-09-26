import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const FloatingSidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { 
      label: "Home", 
      path: "/", 
      icon: "🏠",
      gradient: "from-primary to-primary-glow"
    },
    { 
      label: "Register as Doctor", 
      path: "/register?type=doctor", 
      icon: "👨‍⚕️",
      gradient: "from-blue-400 to-purple-500"
    },
    { 
      label: "Register as Patient", 
      path: "/register?type=patient", 
      icon: "🤕",
      gradient: "from-pink-400 to-rose-500"
    },
    { 
      label: "View Centres", 
      path: "/centres", 
      icon: "🏥",
      gradient: "from-green-400 to-emerald-500"
    },
    { 
      label: "Join as Doctor", 
      path: "/join-doctor", 
      icon: "🩺",
      gradient: "from-indigo-400 to-blue-500"
    },
    { 
      label: "Join as Patient", 
      path: "/join-patient", 
      icon: "💊",
      gradient: "from-orange-400 to-pink-500"
    }
  ];

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
      className="fixed left-6 top-6 z-50"
    >
      <div className="bg-gradient-card backdrop-blur-sm rounded-3xl p-4 shadow-2xl border border-primary/20 glow-primary">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.7, type: "spring" }}
          className="text-center mb-6"
        >
          <div className="text-4xl mb-2 animate-pulse-glow">✨</div>
          <h3 className="font-bold text-lg bg-gradient-primary bg-clip-text text-transparent">
            TrialVerse
          </h3>
        </motion.div>

        <div className="space-y-3">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path.split('?')[0];
            
            return (
              <motion.div
                key={item.label}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`group relative block p-3 rounded-2xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-glow text-white shadow-lg scale-105' 
                      : 'bg-background/30 hover:bg-gradient-glow hover:text-white hover:scale-105'
                  } shimmer`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl group-hover:animate-bounce-subtle">
                      {item.icon}
                    </span>
                    <div>
                      <div className="font-semibold text-sm leading-tight">
                        {item.label}
                      </div>
                    </div>
                  </div>
                  
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-glow opacity-0 group-hover:opacity-20 transition-opacity -z-10 blur-xl"></div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation Helper */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-6 text-center"
        >
          <div className="text-xs text-muted-foreground">
            Navigate your journey
          </div>
          <div className="flex justify-center mt-2">
            <div className="w-8 h-1 bg-gradient-glow rounded-full animate-pulse"></div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FloatingSidebar;