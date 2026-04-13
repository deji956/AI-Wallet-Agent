import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Bot, Shield, Zap, Activity, AlertTriangle, Key } from "lucide-react";

export default function AgentDetail({ agent, onBack }: { agent: any, onBack: () => void }) {
  const [dailyBudget, setDailyBudget] = useState(agent.dailyBudget);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <button 
          onClick={onBack}
          className="p-2 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold tracking-tight">{agent.name}</h1>
            <Badge variant="outline" className={`text-xs uppercase tracking-wider ${
              agent.status === 'active' ? 'border-emerald-500/30 text-emerald-400' : 'border-zinc-700 text-zinc-500'
            }`}>
              {agent.status}
            </Badge>
          </div>
          <p className="text-zinc-400 text-sm">{agent.description}</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-zinc-900 border border-zinc-800">
          <TabsTrigger value="overview" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-100">Overview</TabsTrigger>
          <TabsTrigger value="guardrails" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-100">Guardrails</TabsTrigger>
          <TabsTrigger value="services" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-100">Services & Caps</TabsTrigger>
          <TabsTrigger value="credentials" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-100">x402 Identity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-zinc-400">Daily Spend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-zinc-100">${agent.dailySpend.toFixed(2)}</div>
                <p className="text-xs text-zinc-500 mt-1">of ${dailyBudget.toFixed(2)} budget</p>
                <div className="mt-4 h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${agent.dailySpend >= dailyBudget ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                    style={{ width: `${Math.min((agent.dailySpend / dailyBudget) * 100, 100)}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-zinc-400">Active Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-zinc-100">{agent.services.length}</div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {agent.services.map((s: string) => (
                    <span key={s} className="text-[10px] px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-400">{s}</span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-zinc-400">MPP Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-lg font-medium text-zinc-100">Connected</span>
                </div>
                <p className="text-xs text-zinc-500 mt-2 font-mono">Channel: open (capacity: $50.00)</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-zinc-100">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between border-b border-zinc-800/50 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-full bg-zinc-800 text-zinc-400">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-200">Payment to {agent.services[i % agent.services.length]}</p>
                        <p className="text-xs text-zinc-500 font-mono">tx_8f92...3b1a</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-zinc-300">${(Math.random() * 0.5).toFixed(3)}</p>
                      <p className="text-xs text-zinc-500">{i * 5}m ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guardrails" className="mt-6 space-y-6">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-emerald-400" />
                <CardTitle className="text-zinc-100">Programmatic Guardrails</CardTitle>
              </div>
              <CardDescription className="text-zinc-400">
                Configure automatic constraints for this agent's wallet.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base text-zinc-200">Daily Budget Limit</Label>
                    <p className="text-sm text-zinc-500">Maximum amount this agent can spend per day.</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-zinc-400">$</span>
                    <Input 
                      type="number" 
                      value={dailyBudget} 
                      onChange={(e) => setDailyBudget(Number(e.target.value))}
                      className="w-24 bg-zinc-950 border-zinc-800 text-zinc-100"
                    />
                  </div>
                </div>
                <Slider 
                  value={[dailyBudget]} 
                  max={100} 
                  step={1} 
                  onValueChange={(v) => setDailyBudget(v[0])}
                  className="py-4"
                />
              </div>

              <div className="h-px bg-zinc-800" />

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base text-zinc-200">Block Large Transactions</Label>
                    <p className="text-sm text-zinc-500">Automatically reject any single transaction over a specific amount.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center space-x-4 pl-4 border-l-2 border-zinc-800">
                  <Label className="text-sm text-zinc-400">Max Transaction Size ($)</Label>
                  <Input type="number" defaultValue={1.00} className="w-24 bg-zinc-950 border-zinc-800 text-zinc-100 h-8" />
                </div>
              </div>

              <div className="h-px bg-zinc-800" />

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base text-zinc-200">Require Approval for New Services</Label>
                  <p className="text-sm text-zinc-500">Pause wallet if agent attempts to pay an unknown service provider.</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="h-px bg-zinc-800" />

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base text-zinc-200">Rate Limiting (Cooldowns)</Label>
                  <p className="text-sm text-zinc-500">Limit the frequency of payments to prevent runaway loops.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center space-x-4 pl-4 border-l-2 border-zinc-800">
                <Label className="text-sm text-zinc-400">Max Transactions</Label>
                <Input type="number" defaultValue={10} className="w-20 bg-zinc-950 border-zinc-800 text-zinc-100 h-8" />
                <Label className="text-sm text-zinc-400">per</Label>
                <select className="bg-zinc-950 border border-zinc-800 text-zinc-100 h-8 rounded-md px-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50">
                  <option>Minute</option>
                  <option>Hour</option>
                  <option>Day</option>
                </select>
              </div>

            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="mt-6 space-y-6">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-zinc-100">Per-Service Spend Caps</CardTitle>
              <CardDescription className="text-zinc-400">
                Allocate specific budgets to individual service providers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {agent.services.map((service: string, idx: number) => (
                  <div key={service} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="font-medium text-zinc-200">{service}</span>
                      </div>
                      <div className="text-sm text-zinc-400">
                        <span className="text-zinc-100">${(idx * 2.4 + 1.2).toFixed(2)}</span> / ${(idx * 5 + 5).toFixed(2)}
                      </div>
                    </div>
                    <Progress value={((idx * 2.4 + 1.2) / (idx * 5 + 5)) * 100} className="h-1.5 bg-zinc-800" indicatorClassName="bg-emerald-500" />
                  </div>
                ))}
                
                <button className="w-full py-3 border border-dashed border-zinc-700 rounded-md text-sm text-zinc-400 hover:text-zinc-200 hover:border-zinc-500 transition-colors flex items-center justify-center">
                  + Add Service Cap
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="credentials" className="mt-6 space-y-6">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Key className="w-5 h-5 text-emerald-400" />
                <CardTitle className="text-zinc-100">x402 Identity</CardTitle>
              </div>
              <CardDescription className="text-zinc-400">
                The agent's cryptographic identity and wallet credentials.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-zinc-400">Wallet Address (Pubkey)</Label>
                <div className="flex items-center space-x-2">
                  <code className="flex-1 bg-zinc-950 p-3 rounded-md text-xs text-zinc-300 font-mono border border-zinc-800 overflow-x-auto">
                    x402_pub_8f92a3b1c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0
                  </code>
                  <button className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-md text-sm transition-colors">
                    Copy
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-zinc-400">Delegation Token (Macaroon)</Label>
                <div className="flex items-center space-x-2">
                  <code className="flex-1 bg-zinc-950 p-3 rounded-md text-xs text-zinc-500 font-mono border border-zinc-800 overflow-hidden text-ellipsis whitespace-nowrap">
                    macaroon_v2_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
                  </code>
                  <button className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-md text-sm transition-colors">
                    Reveal
                  </button>
                </div>
                <p className="text-xs text-amber-500 flex items-center mt-2">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Provide this token to your agent. It contains the guardrails encoded cryptographically.
                </p>
              </div>

              <div className="pt-4">
                <button className="px-4 py-2 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 rounded-md text-sm font-medium transition-colors">
                  Revoke Credentials
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
