import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { ScrollArea } from "./ui/scroll-area";
import { ArrowLeft, Send } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

interface ChatViewProps {
  assistantId: string;
  assistantName: string;
  assistantPurpose: string;
  onBack: () => void;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatView({
  assistantId,
  assistantName,
  assistantPurpose,
  onBack,
}: ChatViewProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/ai/${assistantId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.response || "No response received.",
      };
      setMessages([...newMessages, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: "assistant",
        content: error instanceof Error ? `Error: ${error.message}` : "Connection failed",
      };
      setMessages([...newMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="border-b border-gray-200 p-4 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900">{assistantName}</h2>
          <p className="text-sm text-gray-600">{assistantPurpose}</p>
        </div>
      </div>

      <ScrollArea className="flex-1 p-6">
        <div className="space-y-4 max-w-3xl mx-auto">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 py-12">
              <p className="text-lg mb-2">Start a conversation</p>
              <p className="text-sm">Ask me anything related to {assistantName.toLowerCase()}.</p>
            </div>
          )}

          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-lg px-4 py-3 ${message.role === "user" ? "bg-[#5a7a7c] text-white" : "bg-gray-100 text-gray-900"}`}>
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg px-4 py-3">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t border-gray-200 p-4">
        <div className="max-w-3xl mx-auto flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 min-h-[60px] max-h-[200px]"
            disabled={isLoading}
          />
          <Button onClick={handleSend} disabled={!input.trim() || isLoading} className="bg-[#5a7a7c] hover:bg-[#4a6a6c] self-end">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
