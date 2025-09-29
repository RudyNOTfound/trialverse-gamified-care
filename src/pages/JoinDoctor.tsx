import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type PatientCondition = "Asthmatic" | "Hypertensive" | "Smoker";

interface Patient {
  id: number;
  name: string;
  condition: PatientCondition;
  distance: number;
}

const JoinDoctor = () => {
  const [activeTab, setActiveTab] = useState("schedule");
  const [formData, setFormData] = useState({
    trialName: "",
    duration: "",
    participants: "",
    description: "",
    trialDays: ""
  });
  const [uploadedVideos, setUploadedVideos] = useState(() => {
    const saved = localStorage.getItem('doctorVideos');
    return saved ? JSON.parse(saved) : [];
  });
  const [quizQuestions, setQuizQuestions] = useState(() => {
    const saved = localStorage.getItem('doctorQuizzes');
    return saved ? JSON.parse(saved) : [];
  });
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: ["", "", ""],
    correctAnswer: 0
  });
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState<PatientCondition | null>(null);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);

  // Generate 100 patients
  const allPatients = useMemo(() => {
    const firstNames = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Barbara",
      "David", "Elizabeth", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen",
      "Christopher", "Nancy", "Daniel", "Lisa", "Matthew", "Betty", "Anthony", "Margaret", "Mark", "Sandra",
      "Donald", "Ashley", "Steven", "Kimberly", "Paul", "Emily", "Andrew", "Donna", "Joshua", "Michelle",
      "Kenneth", "Carol", "Kevin", "Amanda", "Brian", "Dorothy", "George", "Melissa", "Timothy", "Deborah"];
    
    const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
      "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
      "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson",
      "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores",
      "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts"];
    
    const conditions: PatientCondition[] = ["Asthmatic", "Hypertensive", "Smoker"];
    
    const patients: Patient[] = [];
    for (let i = 0; i < 100; i++) {
      patients.push({
        id: i + 1,
        name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        distance: Math.floor(Math.random() * 50) + 1 // 1-50 km
      });
    }
    return patients;
  }, []);

  const handleFilterPatients = () => {
    if (!selectedCondition) return;
    
    // Filter by condition and sort by distance
    const matched = allPatients
      .filter(p => p.condition === selectedCondition)
      .sort((a, b) => a.distance - b.distance);
    
    const notMatched = allPatients
      .filter(p => p.condition !== selectedCondition)
      .sort((a, b) => a.distance - b.distance);
    
    // Take top 50: prioritize condition match, then by distance
    const top50 = [...matched, ...notMatched].slice(0, 50);
    setFilteredPatients(top50);
    setFilterDialogOpen(false);
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
                  <div>
                    <label className="block text-sm font-medium mb-2">Trial Days</label>
                    <input
                      type="number"
                      placeholder="15"
                      className="w-full p-4 rounded-xl border-2 border-border bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      value={formData.trialDays}
                      onChange={(e) => setFormData({...formData, trialDays: e.target.value})}
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
                  className="px-8 py-3 rounded-xl bg-gradient-glow text-white font-semibold hover:scale-105 transition-transform shimmer"
                  onClick={() => {
                    // Save trial data to localStorage
                    localStorage.setItem('trialData', JSON.stringify(formData));
                    // Reset patient progress to Level 1 whenever new trial days are set
                    localStorage.setItem('patientProgress', JSON.stringify({ currentLevel: 1, completedLevels: [] }));
                    // Reset doctor videos and quizzes when trial days change
                    localStorage.setItem('doctorVideos', JSON.stringify([]));
                    localStorage.setItem('doctorQuizzes', JSON.stringify([]));
                    setUploadedVideos([]);
                    setQuizQuestions([]);
                    alert('Trial scheduled successfully! Patients can now see their progress levels.');
                  }}
                >
                  Lock Schedule 🔒
                </button>
              </div>
            </div>
          )}

          {activeTab === "patients" && (
            <div className="bg-gradient-card rounded-3xl p-8">
              <h2 className="text-2xl font-semibold mb-6">Search for Patients</h2>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {['Randomize Patients', 'Complete Trial', 'Group A', 'Group B'].map((buttonLabel, index) => (
                  <motion.button
                    key={buttonLabel}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-glow text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:scale-105 transition-transform shimmer"
                  >
                    {buttonLabel}
                  </motion.button>
                ))}
                
                <Dialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen}>
                  <DialogTrigger asChild>
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="bg-gradient-glow text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:scale-105 transition-transform shimmer"
                    >
                      Filter Eligible Patients
                    </motion.button>
                  </DialogTrigger>
                  <DialogContent className="bg-background border-border">
                    <DialogHeader>
                      <DialogTitle>Select Patient Condition</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Select value={selectedCondition || ""} onValueChange={(value) => setSelectedCondition(value as PatientCondition)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choose a condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Asthmatic">Asthmatic</SelectItem>
                          <SelectItem value="Hypertensive">Hypertensive</SelectItem>
                          <SelectItem value="Smoker">Smoker</SelectItem>
                        </SelectContent>
                      </Select>
                      <button
                        onClick={handleFilterPatients}
                        disabled={!selectedCondition}
                        className="w-full bg-gradient-glow text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform shimmer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Apply Filter
                      </button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Patient Datasets Display */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* All Patients */}
                <div className="bg-background/50 rounded-2xl p-6 border border-border">
                  <h3 className="text-xl font-semibold mb-4">All Patients ({allPatients.length})</h3>
                  <div className="overflow-y-auto max-h-[500px] space-y-2">
                    {allPatients.map((patient) => (
                      <div key={patient.id} className="flex justify-between items-center p-3 bg-gradient-card rounded-lg border border-border/50">
                        <div className="flex-1">
                          <p className="font-medium">{patient.name}</p>
                          <p className="text-sm text-muted-foreground">{patient.condition}</p>
                        </div>
                        <div className="text-sm font-semibold text-primary">{patient.distance} km</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Filtered Patients */}
                <div className="bg-background/50 rounded-2xl p-6 border border-border">
                  <h3 className="text-xl font-semibold mb-4">
                    Filtered Patients ({filteredPatients.length})
                    {selectedCondition && <span className="text-primary"> - {selectedCondition}</span>}
                  </h3>
                  {filteredPatients.length > 0 ? (
                    <div className="overflow-y-auto max-h-[500px] space-y-2">
                      {filteredPatients.map((patient) => (
                        <div key={patient.id} className="flex justify-between items-center p-3 bg-gradient-card rounded-lg border border-border/50">
                          <div className="flex-1">
                            <p className="font-medium">{patient.name}</p>
                            <p className="text-sm text-muted-foreground">{patient.condition}</p>
                          </div>
                          <div className="text-sm font-semibold text-primary">{patient.distance} km</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                      <p>Click "Filter Eligible Patients" to see filtered results</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "tutorials" && (
            <div className="bg-gradient-card rounded-3xl p-8">
              <h2 className="text-2xl font-semibold mb-6">Video Lectures</h2>
              
              {/* Video Upload Section */}
              <div className="mb-8">
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const videoURL = URL.createObjectURL(file);
                      const newVideo = {
                        id: Date.now(),
                        name: file.name,
                        url: videoURL,
                        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
                      };
                      const updatedVideos = [...uploadedVideos, newVideo];
                      setUploadedVideos(updatedVideos);
                      localStorage.setItem('doctorVideos', JSON.stringify(updatedVideos));
                    }
                  }}
                  className="mb-4 block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gradient-glow file:text-white hover:file:scale-105 file:transition-transform"
                />
              </div>

              {/* Uploaded Videos Display */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {uploadedVideos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-background/50 rounded-2xl overflow-hidden border border-border hover:border-primary transition-colors"
                  >
                    <video
                      src={video.url}
                      controls
                      className="w-full aspect-video"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1">{video.name}</h3>
                      <p className="text-sm text-muted-foreground">Size: {video.size}</p>
                    </div>
                  </motion.div>
                ))}
                
                {/* Default videos if no uploads */}
                {uploadedVideos.length === 0 && videos.map((video, index) => (
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
              
              {/* Question Creation Form */}
              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-sm font-medium mb-2">Question</label>
                  <input
                    type="text"
                    placeholder="Enter your question..."
                    value={newQuestion.question}
                    onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})}
                    className="w-full p-4 rounded-xl border-2 border-border bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Answer Options</label>
                  <div className="space-y-2">
                    {newQuestion.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="correctAnswer"
                          checked={newQuestion.correctAnswer === index}
                          onChange={() => setNewQuestion({...newQuestion, correctAnswer: index})}
                          className="text-primary"
                        />
                        <input
                          type="text"
                          placeholder={`Option ${String.fromCharCode(65 + index)}`}
                          value={option}
                          onChange={(e) => {
                            const updatedOptions = [...newQuestion.options];
                            updatedOptions[index] = e.target.value;
                            setNewQuestion({...newQuestion, options: updatedOptions});
                          }}
                          className="flex-1 p-3 rounded-lg border border-border bg-background/30 focus:border-primary transition-colors"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end">
                  <button 
                    onClick={() => {
                      if (newQuestion.question && newQuestion.options.every(opt => opt.trim())) {
                        const updatedQuestions = [...quizQuestions, {...newQuestion, id: Date.now()}];
                        setQuizQuestions(updatedQuestions);
                        localStorage.setItem('doctorQuizzes', JSON.stringify(updatedQuestions));
                        setNewQuestion({ question: "", options: ["", "", ""], correctAnswer: 0 });
                      }
                    }}
                    className="bg-gradient-glow text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform shimmer"
                  >
                    Add Question ✨
                  </button>
                </div>
              </div>

              {/* Created Questions Display */}
              {quizQuestions.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Created Questions</h3>
                  {quizQuestions.map((question, index) => (
                    <motion.div
                      key={question.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-background/50 rounded-xl p-4 border border-border"
                    >
                      <h4 className="font-semibold mb-2">Q{index + 1}: {question.question}</h4>
                      <div className="space-y-1">
                        {question.options.map((option, optIndex) => (
                          <div key={optIndex} className={`text-sm ${optIndex === question.correctAnswer ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
                            {String.fromCharCode(65 + optIndex)}. {option} {optIndex === question.correctAnswer && '✓'}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default JoinDoctor;