import { motion } from "framer-motion";

const Index = () => {
  const features = [
    {
      title: "Better Care",
      icon: "💖",
      description: "Access cutting-edge treatments and personalized healthcare",
      gradient: "from-pink-400 to-rose-500"
    },
    {
      title: "Earn Ranks",
      icon: "⭐",
      description: "Level up through participation and unlock exclusive rewards",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      title: "Learn Daily",
      icon: "📚",
      description: "Expand your medical knowledge with interactive tutorials",
      gradient: "from-blue-400 to-purple-500"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Floating Background Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              x: [0, 100, 0],
              y: [0, -50, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl float"
          />
          <motion.div
            animate={{ 
              x: [0, -80, 0],
              y: [0, 60, 0],
              rotate: [360, 180, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 right-1/3 w-48 h-48 bg-gradient-to-r from-accent-bright/20 to-secondary/20 rounded-full blur-3xl float-delayed"
          />
          <motion.div
            animate={{ 
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 left-1/2 w-32 h-32 bg-gradient-to-r from-primary-glow/30 to-primary/30 rounded-full blur-2xl float"
          />
        </div>

        <div className="relative z-10 container mx-auto px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent"
            >
              TrialVerse
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed"
            >
              Where Clinical Trials Meet Gamification
            </motion.p>

            {/* Video Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="bg-gradient-card rounded-3xl p-8 mb-12 max-w-3xl mx-auto"
            >
              <div className="aspect-video bg-gradient-glow rounded-2xl flex items-center justify-center mb-4 group cursor-pointer hover:scale-105 transition-transform">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-8xl text-white group-hover:animate-bounce-subtle"
                >
                  ▶️
                </motion.div>
              </div>
              <h3 className="text-2xl font-semibold mb-2">Product Introduction</h3>
              <p className="text-muted-foreground">
                Discover how TrialVerse is revolutionizing clinical trials through gamification
              </p>
            </motion.div>

            {/* Importance Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="bg-gradient-card rounded-3xl p-8 mb-16 text-left"
            >
              <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-primary bg-clip-text text-transparent">
                The Importance of Clinical Trials
              </h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Clinical trials are the backbone of medical advancement, testing new treatments 
                    and therapies that could save millions of lives. They provide hope for patients 
                    with serious conditions while advancing scientific knowledge.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Through TrialVerse, we're making participation more engaging, rewarding, and 
                    accessible for everyone involved - from patients to researchers.
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-6xl mb-4 animate-float">🧬</div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-background/50 rounded-2xl p-4">
                      <div className="text-2xl font-bold text-success">89%</div>
                      <div className="text-sm text-muted-foreground">Success Rate</div>
                    </div>
                    <div className="bg-background/50 rounded-2xl p-4">
                      <div className="text-2xl font-bold text-primary">2M+</div>
                      <div className="text-sm text-muted-foreground">Lives Improved</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-8 pb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-4xl font-bold text-center mb-12 bg-gradient-primary bg-clip-text text-transparent"
        >
          Why Choose TrialVerse?
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.2, duration: 0.8 }}
              className="group bg-gradient-card rounded-3xl p-8 text-center hover:scale-105 transition-all duration-300 cursor-pointer shimmer"
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="text-6xl mb-6 group-hover:animate-bounce-subtle"
              >
                {feature.icon}
              </motion.div>
              
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                {feature.description}
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`bg-gradient-to-r ${feature.gradient} text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all shimmer`}
              >
                Learn More
              </motion.button>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-glow opacity-0 group-hover:opacity-10 transition-opacity -z-10 blur-xl"></div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-card rounded-3xl p-12 max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Ready to Start Your Journey?
            </h3>
            <p className="text-muted-foreground text-lg mb-8">
              Join thousands of participants making medical history while earning rewards
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/register-doctor'}
                className="bg-gradient-glow text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transition-all shimmer"
              >
                Register as Doctor 👨‍⚕️
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/register-patient'}
                className="bg-gradient-primary text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transition-all shimmer"
              >
                Register as Patient 🏥
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
