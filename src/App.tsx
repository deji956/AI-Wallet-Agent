/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ReactNode } from 'react';
import { 
  LayoutDashboard, 
  Bot, 
  Receipt, 
  Settings, 
  Wallet,
  Bell,
  Search,
  Menu
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import AgentsList from './components/AgentsList';
import Transactions from './components/Transactions';

export default function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'agents' | 'transactions' | 'settings'>('dashboard');
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);

  const renderContent = () => {
    if (currentView === 'dashboard') return <Dashboard onNavigate={(view) => setCurrentView(view)} />;
    if (currentView === 'agents') return <AgentsList selectedAgentId={selectedAgentId} onSelectAgent={setSelectedAgentId} />;
    if (currentView === 'transactions') return <Transactions />;
    if (currentView === 'settings') return <div className="p-6">Settings (Coming Soon)</div>;
    return null;
  };

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-zinc-800">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 bg-zinc-950 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-zinc-800">
          <Wallet className="w-6 h-6 text-emerald-400 mr-3" />
          <span className="font-bold text-lg tracking-tight">x402 Wallet</span>
        </div>
        
        <nav className="flex-1 py-6 px-3 space-y-1">
          <NavItem 
            icon={<LayoutDashboard className="w-5 h-5" />} 
            label="Dashboard" 
            active={currentView === 'dashboard'} 
            onClick={() => { setCurrentView('dashboard'); setSelectedAgentId(null); }} 
          />
          <NavItem 
            icon={<Bot className="w-5 h-5" />} 
            label="AI Agents" 
            active={currentView === 'agents'} 
            onClick={() => setCurrentView('agents')} 
          />
          <NavItem 
            icon={<Receipt className="w-5 h-5" />} 
            label="Transactions" 
            active={currentView === 'transactions'} 
            onClick={() => { setCurrentView('transactions'); setSelectedAgentId(null); }} 
          />
          <NavItem 
            icon={<Settings className="w-5 h-5" />} 
            label="Settings" 
            active={currentView === 'settings'} 
            onClick={() => { setCurrentView('settings'); setSelectedAgentId(null); }} 
          />
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-medium">
              OP
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Operator</p>
              <p className="text-xs text-zinc-500">Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-6 bg-zinc-950/50 backdrop-blur-sm z-10">
          <div className="flex items-center text-zinc-400">
            <Search className="w-4 h-4 mr-2" />
            <input 
              type="text" 
              placeholder="Search agents, transactions..." 
              className="bg-transparent border-none focus:outline-none text-sm w-64 placeholder:text-zinc-600 text-zinc-100"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-zinc-400 hover:text-zinc-100 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-emerald-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto bg-zinc-950/50">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        active 
          ? 'bg-zinc-800/50 text-zinc-100' 
          : 'text-zinc-400 hover:bg-zinc-800/30 hover:text-zinc-200'
      }`}
    >
      <span className={`mr-3 ${active ? 'text-emerald-400' : ''}`}>{icon}</span>
      {label}
    </button>
  );
}

