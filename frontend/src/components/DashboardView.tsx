interface DashboardViewProps {
  userName: string;
  userDepartment: string;
  onLaunchAssistant: (assistantId: string) => void;
}

const assistants = [
  { id: "marketing", title: "Marketing Assistant", description: "Create campaigns and analyze trends" },
  { id: "social", title: "Social Media Assistant", description: "Generate posts and schedule content" },
  { id: "contract", title: "Contract Analyzer", description: "Review contracts and identify risks" },
  { id: "investment", title: "Investment Analyst", description: "Analyze portfolios and research companies" },
  { id: "notetaker", title: "Note Taker AI", description: "Capture and organize meeting notes" },
  { id: "meeting", title: "Meeting Prep Assistant", description: "Prepare agendas and talking points" },
  { id: "tech", title: "Tech Support Assistant", description: "Troubleshoot issues and provide guidance" },
];

export function DashboardView({ userName, userDepartment, onLaunchAssistant }: DashboardViewProps) {
  return (
    <div className="p-8">
      <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-[#5a7a7c] to-[#6b8e8f] text-white shadow-lg">
        <h1 className="text-white text-2xl mb-2">Welcome, {userName} from {userDepartment}</h1>
        <p className="text-white/90">Choose an AI assistant to get started with your tasks today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assistants.map((assistant) => (
          <div
            key={assistant.id}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all cursor-pointer border border-gray-200"
          >
            <h3 className="text-xl font-semibold mb-2">{assistant.title}</h3>
            <p className="text-gray-600 mb-4">{assistant.description}</p>
            <button
              onClick={() => onLaunchAssistant(assistant.id)}
              className="w-full bg-[#5a7a7c] hover:bg-[#4a6a6c] text-white py-2 px-4 rounded transition-colors"
            >
              Launch
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
