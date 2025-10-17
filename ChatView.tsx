import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Send, Paperclip, ArrowLeft } from "lucide-react";
import { cn } from "./ui/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatViewProps {
  assistantId: string;
  assistantName: string;
  assistantPurpose: string;
  onBack: () => void;
}

const mockMessages: Record<string, Message[]> = {
  marketing: [
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your Marketing Assistant. I can help you create campaigns, analyze trends, and generate marketing content. What would you like to work on today?",
      timestamp: new Date(),
    },
  ],
  social: [
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm your Social Media Assistant. I can help you generate posts, schedule content, and analyze engagement. How can I assist you?",
      timestamp: new Date(),
    },
  ],
  contract: [
    {
      id: "1",
      role: "assistant",
      content: "Welcome! I'm your Contract Analyzer. Upload a contract and I'll help you review it, identify risks, and extract key terms.",
      timestamp: new Date(),
    },
  ],
  investment: [
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your Investment Analyst. I can help analyze portfolios, research companies, and generate investment reports. What can I do for you?",
      timestamp: new Date(),
    },
  ],
  notetaker: [
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your Note Taker AI. I can help you capture, organize, and summarize meeting notes automatically. Start speaking or share your meeting details and I'll create structured notes for you.",
      timestamp: new Date(),
    },
  ],
  meeting: [
    {
      id: "1",
      role: "assistant",
      content: "Hi there! I'm your Meeting Prep Assistant. I can help prepare agendas, summarize materials, and generate talking points. What meeting are you preparing for?",
      timestamp: new Date(),
    },
  ],
  tech: [
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your Tech Support Assistant. I can help troubleshoot issues, answer IT questions, and provide technical guidance. What do you need help with?",
      timestamp: new Date(),
    },
  ],
};

export function ChatView({ assistantId, assistantName, assistantPurpose, onBack }: ChatViewProps) {
  const [messages, setMessages] = useState<Message[]>(mockMessages[assistantId] || []);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "I've received your message and I'm processing it. This is a demo response. In a production environment, I would provide a detailed, contextual response based on your request.",
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage, assistantMessage]);
    setInput("");
  };

  return (
    <div className="flex h-full">
      {/* Left Panel - Model Info */}
      <div className="w-80 bg-white border-r border-border p-6 flex flex-col">
        <Button
          variant="ghost"
          className="mb-4 justify-start hover:bg-gray-50"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <Card className="border-none shadow-none">
          <CardHeader className="px-0">
            <CardTitle>{assistantName}</CardTitle>
            <CardDescription>{assistantPurpose}</CardDescription>
          </CardHeader>
          <CardContent className="px-0 space-y-4">
            <div>
              <h4 className="mb-2">Last Session</h4>
              <p className="text-muted-foreground text-sm">
                {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
              </p>
            </div>
            <div>
              <h4 className="mb-2">Model Version</h4>
              <p className="text-muted-foreground text-sm">GPT-4 Turbo</p>
            </div>
            <div>
              <h4 className="mb-2">Capabilities</h4>
              <ul className="text-muted-foreground text-sm space-y-1">
                <li>• Natural language processing</li>
                <li>• Document analysis</li>
                <li>• Data extraction</li>
                <li>• Report generation</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Panel - Chat */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Messages */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4 max-w-4xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[70%] rounded-lg p-4 shadow-sm",
                    message.role === "user"
                      ? "bg-[#5a7a7c] text-white"
                      : "bg-white text-gray-900 border border-border"
                  )}
                >
                  <p className={message.role === "user" ? "text-white" : "text-gray-900"}>
                    {message.content}
                  </p>
                  <span
                    className={cn(
                      "text-xs mt-2 block",
                      message.role === "user" ? "text-white/70" : "text-muted-foreground"
                    )}
                  >
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-border bg-white p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 hover:bg-gray-50"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Textarea
                placeholder="Type your request…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                className="resize-none bg-white"
                rows={1}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim()}
                className="shrink-0 bg-[#5a7a7c] hover:bg-[#4a6a6c] text-white"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
