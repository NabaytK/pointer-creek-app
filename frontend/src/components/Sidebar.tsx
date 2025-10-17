import {
  LayoutDashboard,
  Megaphone,
  Share2,
  FileText,
  TrendingUp,
  Calendar,
  Wrench,
  History,
  NotebookPen,
} from "lucide-react";
import { cn } from "./ui/utils";

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "marketing", label: "Marketing Assistant", icon: Megaphone },
  { id: "social", label: "Social Media Assistant", icon: Share2 },
  { id: "contract", label: "Contract Analyzer", icon: FileText },
  { id: "investment", label: "Investment Analyst", icon: TrendingUp },
  { id: "notetaker", label: "Note Taker AI", icon: NotebookPen },
  { id: "meeting", label: "Meeting Prep Assistant", icon: Calendar },
  { id: "tech", label: "Tech Support Assistant", icon: Wrench },
  { id: "logs", label: "Logs / History", icon: History },
];

export function Sidebar({ activeView, onNavigate }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-border h-full flex flex-col">
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-[#5a7a7c] text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-50 hover:shadow-sm"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
