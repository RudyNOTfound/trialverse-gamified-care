import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const JoinPatient = () => {
  const navigate = useNavigate();

  const buttons = [
    { 
      title: "Profile", 
      icon: "👤", 
      description: "View and edit your profile",
      action: () => console.log("Profile clicked"),
      gradient: "bg-gradient-to-br from-blue-500/20 to-blue-600/20",
      hoverGradient: "hover:from-blue-500/30 hover:to-blue-600/30"
    },
    { 
      title: "My Ranks", 
      icon: "🏆", 
      description: "Check your achievements",
      action: () => console.log("My Ranks clicked"),
      gradient: "bg-gradient-to-br from-gold/20 to-yellow-500/20",
      hoverGradient: "hover:from-gold/30 hover:to-yellow-500/30"
    },
    { 
      title: "Progress", 
      icon: "📈", 
      description: "View your trial journey",
      action: () => navigate("/progress"),
      gradient: "bg-gradient-to-br from-primary/20 to-primary-glow/20",
      hoverGradient: "hover:from-primary/30 hover:to-primary-glow/30"
    },
    { 
      title: "Requested Trials", 
      icon: "📋", 
      description: "Manage your trial requests",
      action: () => console.log("Requested Trials clicked"),
      gradient: "bg-gradient-to-br from-secondary/20 to-secondary/30",
      hoverGradient: "hover:from-secondary/30 hover:to-secondary/40"
    },
    { 
      title: "Redeem Ranks", 
      icon: "💎", 
      description: "Exchange points for rewards",
      action: () => console.log("Redeem Ranks clicked"),
      gradient: "bg-gradient-to-br from-achievement/20 to-achievement/30",
      hoverGradient: "hover:from-achievement/30 hover:to-achievement/40"
    }
  ];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Patient Dashboard
          </h1>
          <p className="text-muted-foreground text-xl">
            Your gateway to clinical trial participation
          </p>
        </motion.div>

        {/* Main Navigation Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {buttons.map((button, index) => (
            <motion.div
              key={button.title}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="group cursor-pointer"
              onClick={button.action}
            >
              <div className={`
                ${button.gradient} ${button.hoverGradient}
                backdrop-blur-sm rounded-3xl p-8 h-64
                shadow-xl border border-primary/20 
                glow-primary transition-all duration-300
                flex flex-col items-center justify-center text-center
                hover:shadow-2xl hover:border-primary/40
              `}>
                <motion.div 
                  className="text-6xl mb-4 group-hover:animate-bounce-subtle"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {button.icon}
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {button.title}
                </h3>
                
                <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                  {button.description}
                </p>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse-glow"></div>
                </div>
                
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-1 h-1 bg-gold rounded-full animate-pulse-glow"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-card rounded-2xl p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-2">Welcome to Your Clinical Trial Journey! 🎯</h3>
            <p className="text-muted-foreground">
              Navigate through your personalized dashboard to track progress, manage trials, 
              and unlock new opportunities in medical research.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default JoinPatient;