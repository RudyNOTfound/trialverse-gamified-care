import { motion } from "framer-motion";

const ViewCentres = () => {
  const centres = [
    {
      id: 1,
      name: "Manhattan Medical Research",
      location: "New York, NY",
      rating: 4.8,
      specialties: ["Cardiology", "Oncology", "Neurology"],
      activeTrials: 12,
      image: "🏥"
    },
    {
      id: 2,
      name: "Boston Clinical Institute",
      location: "Boston, MA",
      rating: 4.9,
      specialties: ["Diabetes", "Immunology", "Pediatrics"],
      activeTrials: 8,
      image: "🔬"
    },
    {
      id: 3,
      name: "San Francisco Research Hub",
      location: "San Francisco, CA",
      rating: 4.7,
      specialties: ["Mental Health", "Genetics", "Dermatology"],
      activeTrials: 15,
      image: "🧬"
    },
    {
      id: 4,
      name: "Chicago Health Network",
      location: "Chicago, IL",
      rating: 4.6,
      specialties: ["Orthopedics", "Gastroenterology"],
      activeTrials: 6,
      image: "⚕️"
    },
    {
      id: 5,
      name: "Miami Clinical Center",
      location: "Miami, FL",
      rating: 4.8,
      specialties: ["Infectious Disease", "Pulmonology"],
      activeTrials: 10,
      image: "🩺"
    },
    {
      id: 6,
      name: "Seattle Research Facility",
      location: "Seattle, WA",
      rating: 4.9,
      specialties: ["Technology Medicine", "Bioengineering"],
      activeTrials: 9,
      image: "🏗️"
    }
  ];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Research Centres
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover leading clinical research facilities across the country
          </p>
        </motion.div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-card rounded-3xl p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-1">250+</div>
              <div className="text-sm text-muted-foreground">Active Centres</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-achievement mb-1">1,200+</div>
              <div className="text-sm text-muted-foreground">Ongoing Trials</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-success mb-1">50k+</div>
              <div className="text-sm text-muted-foreground">Participants</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gold mb-1">98%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-card rounded-2xl p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search centres by name or location..."
                className="w-full p-4 rounded-xl border-2 border-border bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <select className="p-4 rounded-xl border-2 border-border bg-background/50 focus:border-primary transition-colors">
              <option>All Specialties</option>
              <option>Cardiology</option>
              <option>Oncology</option>
              <option>Neurology</option>
              <option>Diabetes</option>
            </select>
            <button className="bg-gradient-glow text-white px-6 py-4 rounded-xl font-semibold hover:scale-105 transition-transform shimmer">
              Search 🔍
            </button>
          </div>
        </motion.div>

        {/* Centres Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {centres.map((centre, index) => (
            <motion.div
              key={centre.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-gradient-card rounded-3xl p-6 hover:scale-105 transition-transform cursor-pointer group shimmer"
            >
              {/* Centre Image/Icon */}
              <div className="text-6xl text-center mb-4 group-hover:animate-bounce-subtle">
                {centre.image}
              </div>

              {/* Centre Info */}
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold mb-2">{centre.name}</h3>
                <p className="text-muted-foreground mb-2">{centre.location}</p>
                
                {/* Rating */}
                <div className="flex items-center justify-center space-x-1 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`text-lg ${i < Math.floor(centre.rating) ? 'text-gold' : 'text-muted'}`}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                  <span className="text-sm font-semibold">{centre.rating}</span>
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Specialties:</p>
                <div className="flex flex-wrap gap-2">
                  {centre.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Active Trials */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-muted-foreground">Active Trials</span>
                <span className="font-bold text-success">{centre.activeTrials}</span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button className="w-full bg-gradient-glow text-white py-3 rounded-xl font-semibold hover:scale-105 transition-transform">
                  View Details
                </button>
                <button className="w-full bg-primary/10 text-primary py-3 rounded-xl font-semibold hover:bg-primary/20 transition-colors">
                  Contact Centre
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-12"
        >
          <button className="bg-gradient-card px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-transform shimmer">
            Load More Centres 📍
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ViewCentres;