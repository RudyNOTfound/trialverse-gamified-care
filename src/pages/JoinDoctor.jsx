import { motion } from "framer-motion";
import { useState } from "react";

const JoinDoctor = () => {
  const [activeTab, setActiveTab] = useState("schedule");
  const [formData, setFormData] = useState({
    trialName: "",
    duration: "",
    participants: "",
    description: "",
    trialDays: ""
  });

  const handleCreateTrial = () => {
    if (formData.trialDays) {
      // Store trial configuration in localStorage
      const trialConfig = {
        trialDays: parseInt(formData.trialDays),
        trialName: formData.trialName,
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('trialConfig', JSON.stringify(trialConfig));
      
      // Reset patient progress
      localStorage.removeItem('patientProgress');
      
      alert(`Trial created with ${formData.trialDays} days! Patients can now access their progress page.`);
    } else {
      alert('Please enter the number of trial days');
    }
  };

  const tabs = [
    { id: "schedule", label: "Schedule Trial", icon: "📅" },
    { id: "patients", label: "Find Patients", icon: "👥" },
    { id: "tutorials", label: "Video Tutorials", icon: "🎥" },
    { id: "quizzes", label: "Create Quiz", icon: "❓" }
  ];

  const videos = [
    { title: "Clinical Trial Basics", duration: "12:30", thumbnail: "🎯" },
    { title: "Patient Safety Protocols", duration: "18:45", thumbnail: "🛡️" },
    { title: "Data Collection Methods", duration: "15:20", thumbnail: "📊" },
    { title: "Regulatory Compliance", duration: "22:10", thumbnail: "📋" }
  ];

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
            Schedule a Trial
          </h1>
          <p className="text-muted-foreground text-lg">
            Create, manage, and conduct clinical trials with ease
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-glow text-white shadow-lg scale-105'
                  : 'bg-gradient-card text-foreground hover:scale-102'
              } shimmer`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "schedule" && (
            <div className="bg-gradient-card rounded-3xl p-8">
              <h2 className="text-2xl font-semibold mb-6">Trial Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Trial Name</label>
                    <input
                      type="text"
                      placeholder="Enter trial name"
                      className="w-full p-4 rounded-xl border-2 border-border bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      value={formData.trialName}
                      onChange={(e) => setFormData({...formData, trialName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Trial Days</label>
                    <input
                      type="number"
                      placeholder="10"
                      min="1"
                      max="100"
                      className="w-full p-4 rounded-xl border-2 border-border bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      value={formData.trialDays}
                      onChange={(e) => setFormData({...formData, trialDays: e.target.value})}
                    />
                    <p className="text-sm text-muted-foreground mt-1">Number of days for patient progression</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Duration (weeks)</label>
                    <input
                      type="number"
                      placeholder="12"
                      className="w-full p-4 rounded-xl border-2 border-border bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Target Participants</label>
                    <input
                      type="number"
                      placeholder="50"
                      className="w-full p-4 rounded-xl border-2 border-border bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      value={formData.participants}
                      onChange={(e) => setFormData({...formData, participants: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    placeholder="Describe your clinical trial..."
                    rows={8}
                    className="w-full p-4 rounded-xl border-2 border-border bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-8">
                <button className="px-8 py-3 rounded-xl bg-muted text-muted-foreground font-semibold hover:scale-105 transition-transform">
                  Save Draft
                </button>
                <button 
                  onClick={handleCreateTrial}
                  className="px-8 py-3 rounded-xl bg-gradient-glow text-white font-semibold hover:scale-105 transition-transform shimmer"
                >
                  Create Trial 🚀
                </button>
              </div>
            </div>
          )}

          {activeTab === "patients" && (
            <div className="bg-gradient-card rounded-3xl p-8">
              <h2 className="text-2xl font-semibold mb-6">Find Qualified Patients</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['Age: 25-65', 'Condition: Diabetes', 'Location: NYC'].map((criteria, index) => (
                  <motion.div
                    key={criteria}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-background/50 p-4 rounded-2xl border border-border text-center"
                  >
                    <div className="text-3xl mb-2">🎯</div>
                    <p className="font-semibold">{criteria}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {Math.floor(Math.random() * 50 + 10)} matches
                    </p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <button className="bg-gradient-glow text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:scale-105 transition-transform shimmer">
                  Search Patients 🔍
                </button>
              </div>
            </div>
          )}

          {activeTab === "tutorials" && (
            <div className="bg-gradient-card rounded-3xl p-8">
              <h2 className="text-2xl font-semibold mb-6">Video Tutorials</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videos.map((video, index) => (
                  <motion.div
                    key={video.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-background/50 rounded-2xl overflow-hidden border border-border hover:border-primary transition-colors cursor-pointer group"
                  >
                    <div className="aspect-video bg-gradient-glow flex items-center justify-center text-6xl group-hover:scale-105 transition-transform">
                      {video.thumbnail}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1">{video.title}</h3>
                      <p className="text-sm text-muted-foreground">Duration: {video.duration}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "quizzes" && (
            <div className="bg-gradient-card rounded-3xl p-8">
              <h2 className="text-2xl font-semibold mb-6">Create Assessment Quiz</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Quiz Title</label>
                  <input
                    type="text"
                    placeholder="Patient Knowledge Assessment"
                    className="w-full p-4 rounded-xl border-2 border-border bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Question 1</label>
                  <input
                    type="text"
                    placeholder="Enter your question..."
                    className="w-full p-4 rounded-xl border-2 border-border bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <div className="mt-3 space-y-2">
                    {['Option A', 'Option B', 'Option C'].map((option, index) => (
                      <input
                        key={option}
                        type="text"
                        placeholder={option}
                        className="w-full p-3 rounded-lg border border-border bg-background/30 focus:border-primary transition-colors"
                      />
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <button className="text-primary font-semibold hover:underline">
                    + Add Question
                  </button>
                  <button className="bg-gradient-glow text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform shimmer">
                    Create Quiz ✨
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default JoinDoctor;