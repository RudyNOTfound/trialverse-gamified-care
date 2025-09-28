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
  
  // Video upload form state
  const [uploadForm, setUploadForm] = useState({
    title: '',
    file: null,
    description: '',
    day: ''
  });
  const [uploadedVideos, setUploadedVideos] = useState([]);
  
  // Quiz form state
  const [quizForm, setQuizForm] = useState({
    title: '',
    day: '',
    questions: [{ text: '', options: ['', '', '', ''], correctAnswer: 0 }]
  });
  const [savedQuizzes, setSavedQuizzes] = useState([]);

  const handleVideoUpload = () => {
    if (uploadForm.title && uploadForm.file && uploadForm.day) {
      const newVideo = {
        title: uploadForm.title,
        description: uploadForm.description,
        day: uploadForm.day,
        file: uploadForm.file
      };
      setUploadedVideos([...uploadedVideos, newVideo]);
      // Save to localStorage for patient access
      const existingVideos = JSON.parse(localStorage.getItem('doctorVideos') || '[]');
      localStorage.setItem('doctorVideos', JSON.stringify([...existingVideos, newVideo]));
      setUploadForm({ title: '', file: null, description: '', day: '' });
      alert('Video uploaded successfully!');
    } else {
      alert('Please fill all required fields');
    }
  };

  const addQuestion = () => {
    setQuizForm({
      ...quizForm,
      questions: [...quizForm.questions, { text: '', options: ['', '', '', ''], correctAnswer: 0 }]
    });
  };

  const removeQuestion = (index) => {
    if (quizForm.questions.length > 1) {
      const newQuestions = quizForm.questions.filter((_, i) => i !== index);
      setQuizForm({ ...quizForm, questions: newQuestions });
    }
  };

  const updateQuestion = (qIndex, field, value) => {
    const newQuestions = [...quizForm.questions];
    newQuestions[qIndex][field] = value;
    setQuizForm({ ...quizForm, questions: newQuestions });
  };

  const updateQuestionOption = (qIndex, oIndex, value) => {
    const newQuestions = [...quizForm.questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuizForm({ ...quizForm, questions: newQuestions });
  };

  const handleQuizSave = () => {
    if (quizForm.title && quizForm.day && quizForm.questions[0].text) {
      const newQuiz = { ...quizForm };
      setSavedQuizzes([...savedQuizzes, newQuiz]);
      // Save to localStorage for patient access
      const existingQuizzes = JSON.parse(localStorage.getItem('doctorQuizzes') || '[]');
      localStorage.setItem('doctorQuizzes', JSON.stringify([...existingQuizzes, newQuiz]));
      setQuizForm({ title: '', day: '', questions: [{ text: '', options: ['', '', '', ''], correctAnswer: 0 }] });
      alert('Quiz saved successfully!');
    } else {
      alert('Please fill required fields');
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
              <h2 className="text-2xl font-semibold mb-6">Video Lectures</h2>
              
              {/* Upload Video Section */}
              <div className="mb-8 p-6 bg-background/50 rounded-2xl border-2 border-dashed border-border">
                <h3 className="text-lg font-semibold mb-4">Upload New Video Lecture</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Video Title</label>
                    <input
                      type="text"
                      placeholder="Enter video title"
                      className="w-full p-3 rounded-xl border border-border bg-background/30 focus:border-primary transition-colors"
                      value={uploadForm.title}
                      onChange={(e) => setUploadForm({...uploadForm, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Upload Video File</label>
                    <input
                      type="file"
                      accept="video/*"
                      className="w-full p-3 rounded-xl border border-border bg-background/30 focus:border-primary transition-colors"
                      onChange={(e) => setUploadForm({...uploadForm, file: e.target.files[0]})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      placeholder="Brief description of the video content"
                      rows={3}
                      className="w-full p-3 rounded-xl border border-border bg-background/30 focus:border-primary transition-colors resize-none"
                      value={uploadForm.description}
                      onChange={(e) => setUploadForm({...uploadForm, description: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Assign to Day</label>
                    <input
                      type="number"
                      placeholder="Enter day number"
                      className="w-full p-3 rounded-xl border border-border bg-background/30 focus:border-primary transition-colors"
                      value={uploadForm.day}
                      onChange={(e) => setUploadForm({...uploadForm, day: e.target.value})}
                    />
                  </div>
                  <button
                    onClick={handleVideoUpload}
                    className="bg-gradient-glow text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform shimmer"
                  >
                    Upload Video 📹
                  </button>
                </div>
              </div>

              {/* Uploaded Videos Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {uploadedVideos.map((video, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-background/50 rounded-2xl overflow-hidden border border-border hover:border-primary transition-colors group"
                  >
                    <div className="aspect-video bg-gradient-glow flex items-center justify-center text-6xl group-hover:scale-105 transition-transform">
                      🎥
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1">{video.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{video.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">Day {video.day}</span>
                        <button className="text-red-500 hover:text-red-700 text-sm">Remove</button>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {/* Default Videos */}
                {videos.map((video, index) => (
                  <motion.div
                    key={video.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (uploadedVideos.length + index) * 0.1 }}
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Quiz Title</label>
                    <input
                      type="text"
                      placeholder="Patient Knowledge Assessment"
                      className="w-full p-4 rounded-xl border-2 border-border bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      value={quizForm.title}
                      onChange={(e) => setQuizForm({...quizForm, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Assign to Day</label>
                    <input
                      type="number"
                      placeholder="Enter day number"
                      className="w-full p-4 rounded-xl border-2 border-border bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      value={quizForm.day}
                      onChange={(e) => setQuizForm({...quizForm, day: e.target.value})}
                    />
                  </div>
                </div>
                
                {/* Questions */}
                {quizForm.questions.map((question, qIndex) => (
                  <div key={qIndex} className="p-4 bg-background/30 rounded-xl border border-border">
                    <div className="flex justify-between items-center mb-3">
                      <label className="block text-sm font-medium">Question {qIndex + 1}</label>
                      {qIndex > 0 && (
                        <button
                          onClick={() => removeQuestion(qIndex)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Enter your question..."
                      className="w-full p-4 rounded-xl border-2 border-border bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all mb-3"
                      value={question.text}
                      onChange={(e) => updateQuestion(qIndex, 'text', e.target.value)}
                    />
                    <div className="space-y-2">
                      {question.options.map((option, oIndex) => (
                        <div key={oIndex} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name={`correct_${qIndex}`}
                            checked={question.correctAnswer === oIndex}
                            onChange={() => updateQuestion(qIndex, 'correctAnswer', oIndex)}
                            className="text-primary"
                          />
                          <input
                            type="text"
                            placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
                            className="flex-1 p-3 rounded-lg border border-border bg-background/50 focus:border-primary transition-colors"
                            value={option}
                            onChange={(e) => updateQuestionOption(qIndex, oIndex, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-between items-center">
                  <button 
                    onClick={addQuestion}
                    className="text-primary font-semibold hover:underline"
                  >
                    + Add Question
                  </button>
                  <button 
                    onClick={handleQuizSave}
                    className="bg-gradient-glow text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform shimmer"
                  >
                    Save Quiz ✨
                  </button>
                </div>
              </div>
              
              {/* Saved Quizzes */}
              {savedQuizzes.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Saved Quizzes</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {savedQuizzes.map((quiz, index) => (
                      <div key={index} className="p-4 bg-background/30 rounded-xl border border-border">
                        <h4 className="font-semibold text-lg mb-2">{quiz.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{quiz.questions.length} questions</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">Day {quiz.day}</span>
                          <button className="text-red-500 hover:text-red-700 text-sm">Remove</button>
                        </div>
                      </div>
                    ))}
                  </div>
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