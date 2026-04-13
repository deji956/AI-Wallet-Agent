import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Bot, Settings2, ShieldAlert } from "lucide-react";
import AgentDetail from "./AgentDetail";

const agents = [
  {
    id: "agent-1",
    name: "ResearchBot",
    description: "Autonomous research and summarization agent",
    status: "active",
    dailySpend: 12.40,
    dailyBudget: 20.00,
    services: ["OpenAI", "Anthropic", "Serper"],
    alerts: 0
  },
  {
    id: "agent-2",
    name: "DataScraper",
    description: "Web scraping and data extraction",
    status: "active",
    dailySpend: 4.10,
    dailyBudget: 5.00,
    services: ["Serper", "AWS"],
    alerts: 1
  },
  {
    id: "agent-3",
    name: "DevAssist",
    description: "Code generation and review",
    status: "paused",
    dailySpend: 15.00,
    dailyBudget: 15.00,
    services: ["OpenAI", "AWS"],
    alerts: 2
  },
  {
    id: "agent-4",
    name: "CustomerSupport",
    description: "Automated ticket resolution",
    status: "active",
    dailySpend: 1.90,
    dailyBudget: 10.00,
    services: ["OpenAI", "Zendesk"],
    alerts: 0
  }
];

export default function AgentsList({ 
  selectedAgentId, 
  onSelectAgent 
}: { 
  selectedAgentId: string | null, 
  onSelectAgent: (id: string | null) => void 
}) {
  if (selectedAgentId) {
    const agent = agents.find(a => a.id === selectedAgentId);
    if (agent) {
      return <AgentDetail agent={agent} onBack={() => onSelectAgent(null)} />;
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Agents</h1>
          <p className="text-zinc-400 text-sm">Manage wallets and guardrails for your autonomous agents.</p>
        </div>
        <button className="bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-medium px-4 py-2 rounded-md text-sm transition-colors">
          + Provision New Wallet
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {agents.map(agent => {
          const spendPercentage = (agent.dailySpend / agent.dailyBudget) * 100;
          const isNearLimit = spendPercentage > 80;
          const isAtLimit = spendPercentage >= 100;

          return (
            <Card 
              key={agent.id} 
              className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer group"
              onClick={() => onSelectAgent(agent.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-md ${agent.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-800 text-zinc-400'}`}>
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-zinc-100 text-base">{agent.name}</CardTitle>
                      <div className="flex items-center mt-1 space-x-2">
                        <Badge variant="outline" className={`text-[10px] uppercase tracking-wider ${
                          agent.status === 'active' ? 'border-emerald-500/30 text-emerald-400' : 'border-zinc-700 text-zinc-500'
                        }`}>
                          {agent.status}
                        </Badge>
                        {agent.alerts > 0 && (
                          <Badge variant="outline" className="border-rose-500/30 text-rose-400 text-[10px] flex items-center">
                            <ShieldAlert className="w-3 h-3 mr-1" />
                            {agent.alerts} Alert{agent.alerts > 1 ? 's' : ''}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <button className="text-zinc-500 hover:text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Settings2 className="w-4 h-4" />
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-400 mb-4 line-clamp-1">{agent.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Daily Spend</span>
                    <span className="font-medium text-zinc-200">
                      ${agent.dailySpend.toFixed(2)} <span className="text-zinc-500">/ ${agent.dailyBudget.toFixed(2)}</span>
                    </span>
                  </div>
                  <Progress 
                    value={spendPercentage} 
                    className="h-1.5 bg-zinc-800" 
                    indicatorClassName={
                      isAtLimit ? "bg-rose-500" : isNearLimit ? "bg-amber-500" : "bg-emerald-500"
                    }
                  />
                </div>

                <div className="mt-4 pt-4 border-t border-zinc-800/50 flex flex-wrap gap-1.5">
                  {agent.services.map(service => (
                    <span key={service} className="text-xs px-2 py-1 bg-zinc-800 rounded-md text-zinc-400">
                      {service}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
