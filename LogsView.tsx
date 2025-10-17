import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { ScrollArea } from "./ui/scroll-area";
import { Search, FileText, Download } from "lucide-react";

interface LogsViewProps {
  onOpenChat: (assistantId: string) => void;
}

const mockLogs = [
  {
    id: "1",
    assistant: "Marketing Assistant",
    assistantId: "marketing",
    date: "2025-10-17",
    time: "14:30",
    messages: 12,
    status: "completed",
    topic: "Q4 Campaign Strategy",
  },
  {
    id: "2",
    assistant: "Contract Analyzer",
    assistantId: "contract",
    date: "2025-10-17",
    time: "11:15",
    messages: 8,
    status: "completed",
    topic: "Vendor Agreement Review",
  },
  {
    id: "3",
    assistant: "Investment Analyst",
    assistantId: "investment",
    date: "2025-10-16",
    time: "16:45",
    messages: 24,
    status: "completed",
    topic: "Tech Sector Analysis",
  },
  {
    id: "4",
    assistant: "Social Media Assistant",
    assistantId: "social",
    date: "2025-10-16",
    time: "09:20",
    messages: 15,
    status: "completed",
    topic: "Monthly Content Calendar",
  },
  {
    id: "5",
    assistant: "Note Taker AI",
    assistantId: "notetaker",
    date: "2025-10-16",
    time: "08:00",
    messages: 18,
    status: "completed",
    topic: "Client Strategy Session Notes",
  },
  {
    id: "6",
    assistant: "Meeting Prep Assistant",
    assistantId: "meeting",
    date: "2025-10-15",
    time: "13:00",
    messages: 6,
    status: "completed",
    topic: "Board Meeting Preparation",
  },
  {
    id: "7",
    assistant: "Tech Support Assistant",
    assistantId: "tech",
    date: "2025-10-15",
    time: "10:30",
    messages: 10,
    status: "completed",
    topic: "Network Troubleshooting",
  },
  {
    id: "8",
    assistant: "Marketing Assistant",
    assistantId: "marketing",
    date: "2025-10-14",
    time: "15:15",
    messages: 18,
    status: "completed",
    topic: "Email Campaign Draft",
  },
  {
    id: "9",
    assistant: "Contract Analyzer",
    assistantId: "contract",
    date: "2025-10-14",
    time: "08:45",
    messages: 20,
    status: "completed",
    topic: "Partnership Agreement Analysis",
  },
];

export function LogsView({ onOpenChat }: LogsViewProps) {
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
              <CardDescription>All conversations are automatically saved and encrypted</CardDescription>
            </div>
            <Button variant="outline" className="gap-2 hover:bg-gray-50">
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
              />
            </div>
          </div>

          <ScrollArea className="h-[600px]">
            <Table>
              <TableHeader>
                <TableRow>
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
                {mockLogs.map((log) => (
                  <TableRow key={log.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-[#5a7a7c]" />
                        {log.assistant}
                      </div>
                    </TableCell>
                    <TableCell>{log.topic}</TableCell>
                    <TableCell>{log.date}</TableCell>
                    <TableCell>{log.time}</TableCell>
                    <TableCell>{log.messages}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="bg-green-50 text-green-700 hover:bg-green-50"
                      >
                        {log.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onOpenChat(log.assistantId)}
                          className="hover:bg-gray-100"
                        >
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover:bg-gray-100"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
