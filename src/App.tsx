import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Register from "./pages/Register";
import JoinPatient from "./pages/JoinPatient";
import JoinDoctor from "./pages/JoinDoctor";
import ViewCentres from "./pages/ViewCentres";
import Progress from "./pages/Progress";
import NotFound from "./pages/NotFound";
import FloatingSidebar from "./components/FloatingSidebar";
import TimePanel from "./components/TimePanel";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          {/* Top Panel */}
          <TimePanel />
          
          {/* Main Content Area */}
          <div className="flex flex-1">
            {/* Left Sidebar */}
            <FloatingSidebar />
            
            {/* Main Content */}
            <main className="flex-1 ml-4">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/register" element={<Register />} />
                <Route path="/join-patient" element={<JoinPatient />} />
                <Route path="/join-doctor" element={<JoinDoctor />} />
                <Route path="/centres" element={<ViewCentres />} />
                <Route path="/progress" element={<Progress />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
