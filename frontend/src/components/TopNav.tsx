import { Button } from "./ui/button";
import { useAuth } from "../AuthContext";
import { LogOut } from "lucide-react";

interface TopNavProps {
  onNavigate: (view: string) => void;
  userName: string;
}

export function TopNav({ onNavigate, userName }: TopNavProps) {
  const { logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1
            className="text-2xl font-bold text-[#5a7a7c] cursor-pointer"
            onClick={() => onNavigate("dashboard")}
          >
            AI Platform
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{userName}</span>
          <Button variant="ghost" size="sm" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
