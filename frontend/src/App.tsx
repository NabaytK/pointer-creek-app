import { useState } from "react";
import { TopNav } from "./components/TopNav";
import { Sidebar } from "./components/Sidebar";
import { DashboardView } from "./components/DashboardView";
import { ChatView } from "./components/ChatView";
import { SettingsView } from "./components/SettingsView";
import { LogsView } from "./components/LogsView";

const assistantDetails = {
  marketing: {
    name: "Marketing Assistant",
    purpose: "Create campaigns, analyze trends, and generate marketing content with AI-powered insights.",
  },
  social: {
    name: "Social Media Assistant",
    purpose: "Generate posts, schedule content, and analyze engagement metrics across all platforms.",
  },
  contract: {
    name: "Contract Analyzer",
    purpose: "Review contracts, identify risks, and extract key terms automatically with AI precision.",
  },
  investment: {
    name: "Investment Analyst",
    purpose: "Analyze portfolios, research companies, and generate comprehensive investment reports.",
  },
  notetaker: {
    name: "Note Taker AI",
    purpose: "Automatically capture, organize, and summarize meeting notes and conversations with intelligent formatting.",
  },
  meeting: {
    name: "Meeting Prep Assistant",
    purpose: "Prepare agendas, summarize materials, and generate talking points for productive meetings.",
  },
  tech: {
    name: "Tech Support Assistant",
    purpose: "Troubleshoot issues, answer IT questions, and provide technical guidance instantly.",
  },
};

export default function App() {
  const [activeView, setActiveView] = useState("dashboard");
  const [activeAssistant, setActiveAssistant] = useState<string | null>(null);

  const userData = {
    name: "Alex Morgan",
    email: "alex.morgan@pointercreek.com",
    department: "Marketing",
  };

  const handleNavigate = (view: string) => {
    if (["marketing", "social", "contract", "investment", "notetaker", "meeting", "tech"].includes(view)) {
      setActiveAssistant(view);
      setActiveView("chat");
    } else {
      setActiveView(view);
      if (view === "dashboard") {
        setActiveAssistant(null);
      }
    }
  };

  const handleLaunchAssistant = (assistantId: string) => {
    setActiveAssistant(assistantId);
    setActiveView("chat");
  };

  const handleBackToDashboard = () => {
    setActiveView("dashboard");
    setActiveAssistant(null);
  };

  return (
    <div className="h-screen flex flex-col bg-[#f5f5f0]">
      <TopNav onNavigate={handleNavigate} userName={userData.name} />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar activeView={activeView} onNavigate={handleNavigate} />
        
        <main className="flex-1 overflow-auto">
          {activeView === "dashboard" && (
            <DashboardView
              userName={userData.name}
              userDepartment={userData.department}
              onLaunchAssistant={handleLaunchAssistant}
            />
          )}
          
          {activeView === "chat" && activeAssistant && (
            <ChatView
              assistantId={activeAssistant}
              assistantName={assistantDetails[activeAssistant as keyof typeof assistantDetails].name}
              assistantPurpose={assistantDetails[activeAssistant as keyof typeof assistantDetails].purpose}
              onBack={handleBackToDashboard}
            />
          )}
          
          {activeView === "settings" && (
            <SettingsView
              userName={userData.name}
              userEmail={userData.email}
              userDepartment={userData.department}
            />
          )}
          
          {activeView === "logs" && (
            <LogsView onOpenChat={handleLaunchAssistant} />
          )}
        </main>
      </div>
    </div>
  );
}
