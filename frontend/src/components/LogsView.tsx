import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { ScrollArea } from "./ui/scroll-area";
import { Search, FileText, Download, Eye } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

interface Chat {
  id: string;
  assistant_id: string;
  assistant_name: string;
  timestamp: string;
  preview: string;
  messages: Array<{ role: string; content: string }>;
  user_name: string;
  user_email: string;
}

interface LogsViewProps {
  onOpenChat: (assistantId: string) => void;
}

export function LogsView({ onOpenChat }: LogsViewProps) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [filteredChats, setFilteredChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredChats(chats);
    } else {
      const filtered = chats.filter(
        (chat) =>
          chat.assistant_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          chat.preview.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredChats(filtered);
    }
  }, [searchQuery, chats]);

  const fetchChats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/chats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setChats(data.chats.reverse());
      setFilteredChats(data.chats.reverse());
    } catch (error) {
      console.error("Error fetching chats:", error);
    } finally {
      setLoading(false);
    }
  };

  const viewFullChat = async (chatId: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/chats/${chatId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setSelectedChat(data.chat);
    } catch (error) {
      console.error("Error fetching chat details:", error);
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const exportChat = (chat: Chat) => {
    const content = JSON.stringify(chat, null, 2);
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chat_${chat.id}.json`;
    a.click();
  };

  const exportAll = () => {
    const content = JSON.stringify(chats, null, 2);
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `all_chats_${new Date().toISOString()}.json`;
    a.click();
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="mb-2">Conversation History</h1>
        <p className="text-muted-foreground">
          View and manage your past AI assistant conversations
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Sessions</CardTitle>
              <CardDescription>
                All conversations are automatically saved and encrypted
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              className="gap-2 hover:bg-gray-50"
              onClick={exportAll}
              disabled={chats.length === 0}
            >
              <Download className="h-4 w-4" />
              Export All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-10 bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <ScrollArea className="h-[600px]">
            {loading ? (
              <div className="text-center py-12 text-gray-500">
                Loading chat history...
              </div>
            ) : filteredChats.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>
                  {searchQuery ? "No chats found matching your search" : "No chat history yet"}
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Assistant</TableHead>
                    <TableHead>Topic</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Messages</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredChats.map((chat) => (
                    <TableRow key={chat.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div>
                          <p className="font-medium">{chat.user_name}</p>
                          <p className="text-xs text-gray-500">{chat.user_email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-[#5a7a7c]" />
                          {chat.assistant_name}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {chat.preview || "No preview available"}
                      </TableCell>
                      <TableCell>{formatDate(chat.timestamp)}</TableCell>
                      <TableCell>{formatTime(chat.timestamp)}</TableCell>
                      <TableCell>{chat.messages.length}</TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className="bg-green-50 text-green-700 hover:bg-green-50"
                        >
                          completed
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => viewFullChat(chat.id)}
                            className="hover:bg-gray-100"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onOpenChat(chat.assistant_id)}
                            className="hover:bg-gray-100"
                          >
                            Open
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="hover:bg-gray-100"
                            onClick={() => exportChat(chat)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Full Chat Dialog */}
      <Dialog open={!!selectedChat} onOpenChange={() => setSelectedChat(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>
              {selectedChat?.assistant_name} - {selectedChat?.user_name}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[600px] p-4">
            <div className="space-y-4">
              {selectedChat?.messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-3 ${
                      message.role === "user"
                        ? "bg-[#5a7a7c] text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="text-xs opacity-70 mb-1">
                      {message.role === "user" ? selectedChat.user_name : selectedChat.assistant_name}
                    </p>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
