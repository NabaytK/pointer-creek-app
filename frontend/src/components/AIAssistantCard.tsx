import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { LucideIcon } from "lucide-react";

interface AIAssistantCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onLaunch: () => void;
}

export function AIAssistantCard({ title, description, icon: Icon, onLaunch }: AIAssistantCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer border border-border">
      <CardHeader>
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#5a7a7c] to-[#6b8e8f] flex items-center justify-center mb-3">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button 
          onClick={onLaunch} 
          className="w-full bg-[#5a7a7c] hover:bg-[#4a6a6c] text-white"
        >
          Launch
        </Button>
      </CardFooter>
    </Card>
  );
}
