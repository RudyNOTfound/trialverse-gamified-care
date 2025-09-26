import { motion } from "framer-motion";
import { useState } from "react";

const Register = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [formStep, setFormStep] = useState(0);

  const handleConnectWallet = () => {
    // Simulate wallet connection
    setTimeout(() => {
      setWalletConnected(true);
      setFormStep(1);
    }, 1000);
  };

  const formFields = [
    { label: "Full Name", type: "text", placeholder: "Enter your full name" },
    { label: "Email", type: "email", placeholder: "Enter your email" },
    { label: "Phone", type: "tel", placeholder: "Enter your phone number" },
    { label: "Medical History", type: "textarea", placeholder: "Brief medical history" },
  ];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Join TrialVerse
          </h1>
          <p className="text-muted-foreground text-lg">
            Connect your wallet and register to start your clinical trial journey
          </p>
        </motion.div>

        {!walletConnected ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-card rounded-3xl p-8 text-center shimmer"
          >
            <div className="w-20 h-20 bg-gradient-glow rounded-full flex items-center justify-center mx-auto mb-6 pulse-glow">
              <span className="text-3xl">🔗</span>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Connect Your Wallet</h2>
            <p className="text-muted-foreground mb-6">
              Secure your identity and rewards with blockchain technology
            </p>
            <button
              onClick={handleConnectWallet}
              className="bg-gradient-glow text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:scale-105 transition-transform shimmer"
            >
              Connect Wallet ⚡
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-card rounded-3xl p-8"
          >
            <h2 className="text-2xl font-semibold mb-6">Your Details</h2>
            <div className="space-y-6">
              {formFields.map((field, index) => (
                <motion.div
                  key={field.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: formStep >= index ? 1 : 0.3,
                    x: formStep >= index ? 0 : -20 
                  }}
                  transition={{ delay: index * 0.2 }}
                  className="space-y-2"
                >
                  <label className="block text-sm font-medium">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      placeholder={field.placeholder}
                      className="w-full p-4 rounded-xl border-2 border-border bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      rows={4}
                    />
                  ) : (
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full p-4 rounded-xl border-2 border-border bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  )}
                </motion.div>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="w-full bg-gradient-glow text-white py-4 rounded-xl font-semibold text-lg hover:scale-105 transition-transform shimmer"
              >
                Complete Registration 🎉
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Register;