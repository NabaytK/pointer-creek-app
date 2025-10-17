import { AIAssistantCard } from "./AIAssistantCard";
import {
  Megaphone,
  Share2,
  FileText,
  TrendingUp,
  Calendar,
  Wrench,
  NotebookPen,
} from "lucide-react";

interface DashboardViewProps {
  userName: string;
  userDepartment: string;
  onLaunchAssistant: (assistantId: string) => void;
}

const assistants = [
  {
    id: "marketing",
    title: "Marketing Assistant",
    description: "Create campaigns, analyze trends, and generate marketing content.",
    icon: Megaphone,
  },
  {
    id: "social",
    title: "Social Media Assistant",
    description: "Generate posts, schedule content, and analyze engagement metrics.",
    icon: Share2,
  },
  {
    id: "contract",
    title: "Contract Analyzer",
    description: "Review contracts, identify risks, and extract key terms automatically.",
    icon: FileText,
  },
  {
    id: "investment",
    title: "Investment Analyst",
    description: "Analyze portfolios, research companies, and generate investment reports.",
    icon: TrendingUp,
  },
  {
    id: "notetaker",
    title: "Note Taker AI",
    description: "Automatically capture, organize, and summarize meeting notes and conversations.",
    icon: NotebookPen,
  },
  {
    id: "meeting",
    title: "Meeting Prep Assistant",
    description: "Prepare agendas, summarize materials, and generate talking points.",
    icon: Calendar,
  },
  {
    id: "tech",
    title: "Tech Support Assistant",
    description: "Troubleshoot issues, answer IT questions, and provide technical guidance.",
    icon: Wrench,
  },
];

export function DashboardView({ userName, userDepartment, onLaunchAssistant }: DashboardViewProps) {
  return (
    <div className="p-8">
      {/* Welcome Banner */}
      <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-[#5a7a7c] to-[#6b8e8f] text-white shadow-lg">
        <h1 className="text-white mb-2">Welcome, {userName} from {userDepartment}</h1>
        <p className="text-white/90">Choose an AI assistant to get started with your tasks today.</p>
      </div>

      {/* AI Assistants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assistants.map((assistant) => (
          <AIAssistantCard
            key={assistant.id}
            title={assistant.title}
            description={assistant.description}
            icon={assistant.icon}
            onLaunch={() => onLaunchAssistant(assistant.id)}
          />
        ))}
      </div>
    </div>
  );
}
