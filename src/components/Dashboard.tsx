import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Activity, Wallet, Bot, Zap } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { time: "00:00", spend: 1.2 },
  { time: "04:00", spend: 2.1 },
  { time: "08:00", spend: 5.4 },
  { time: "12:00", spend: 8.2 },
  { time: "16:00", spend: 12.5 },
  { time: "20:00", spend: 15.8 },
  { time: "24:00", spend: 18.4 },
];

export default function Dashboard({ onNavigate }: { onNavigate: (view: any) => void }) {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
        <p className="text-zinc-400 text-sm">Monitor your agents' x402 wallet activity and MPP spend.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Total Balance</CardTitle>
            <Wallet className="h-4 w-4 text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-100">$1,240.50</div>
            <p className="text-xs text-emerald-400 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +$240.00 from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Today's Spend</CardTitle>
            <Activity className="h-4 w-4 text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-100">$18.40</div>
            <p className="text-xs text-rose-400 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +12% vs yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Active Agents</CardTitle>
            <Bot className="h-4 w-4 text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-100">4</div>
            <p className="text-xs text-zinc-500 mt-1">
              Out of 5 configured
            </p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">MPP Transactions</CardTitle>
            <Zap className="h-4 w-4 text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-100">1,429</div>
            <p className="text-xs text-emerald-400 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +340 today
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-2 bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-zinc-100">Spend Over Time (Today)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#f4f4f5' }}
                    itemStyle={{ color: '#10b981' }}
                  />
                  <Area type="monotone" dataKey="spend" stroke="#10b981" fillOpacity={1} fill="url(#colorSpend)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-zinc-100">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { agent: "ResearchBot", service: "OpenAI API", amount: "$0.04", time: "2m ago" },
                { agent: "DataScraper", service: "Serper", amount: "$0.01", time: "5m ago" },
                { agent: "ResearchBot", service: "Anthropic API", amount: "$0.12", time: "12m ago" },
                { agent: "DevAssist", service: "AWS Lambda", amount: "$0.002", time: "15m ago" },
                { agent: "CustomerSupport", service: "OpenAI API", amount: "$0.08", time: "22m ago" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between border-b border-zinc-800/50 pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-zinc-200">{activity.agent}</p>
                    <p className="text-xs text-zinc-500">{activity.service}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-zinc-300">{activity.amount}</p>
                    <p className="text-xs text-zinc-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => onNavigate('transactions')}
              className="w-full mt-4 py-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              View all transactions &rarr;
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
