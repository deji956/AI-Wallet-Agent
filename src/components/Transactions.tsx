import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowDownRight, ArrowUpRight, Search, Filter, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

const transactions = [
  { id: "tx_1", agent: "ResearchBot", service: "OpenAI API", amount: 0.042, type: "payment", status: "settled", time: "2 mins ago" },
  { id: "tx_2", agent: "DataScraper", service: "Serper", amount: 0.015, type: "payment", status: "settled", time: "5 mins ago" },
  { id: "tx_3", agent: "ResearchBot", service: "Anthropic API", amount: 0.120, type: "payment", status: "settled", time: "12 mins ago" },
  { id: "tx_4", agent: "DevAssist", service: "AWS Lambda", amount: 0.002, type: "payment", status: "settled", time: "15 mins ago" },
  { id: "tx_5", agent: "System", service: "Wallet Funding", amount: 50.000, type: "deposit", status: "settled", time: "1 hour ago" },
  { id: "tx_6", agent: "CustomerSupport", service: "OpenAI API", amount: 0.085, type: "payment", status: "settled", time: "22 mins ago" },
  { id: "tx_7", agent: "ResearchBot", service: "OpenAI API", amount: 0.031, type: "payment", status: "settled", time: "25 mins ago" },
  { id: "tx_8", agent: "DevAssist", service: "AWS S3", amount: 0.001, type: "payment", status: "settled", time: "30 mins ago" },
  { id: "tx_9", agent: "DataScraper", service: "Serper", amount: 0.015, type: "payment", status: "settled", time: "35 mins ago" },
  { id: "tx_10", agent: "ResearchBot", service: "Anthropic API", amount: 1.500, type: "payment", status: "blocked", time: "40 mins ago", reason: "Exceeds max transaction size" },
];

export default function Transactions() {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (!sortOrder) return 0;
    const valA = a.type === 'deposit' ? a.amount : -a.amount;
    const valB = b.type === 'deposit' ? b.amount : -b.amount;
    return sortOrder === 'asc' ? valA - valB : valB - valA;
  });

  const handleSort = () => {
    if (sortOrder === null) setSortOrder('desc');
    else if (sortOrder === 'desc') setSortOrder('asc');
    else setSortOrder(null);
  };

  const handleExportCSV = () => {
    const headers = ["Transaction ID", "Agent", "Service", "Amount", "Type", "Status", "Time", "Reason"];
    const csvContent = [
      headers.join(","),
      ...sortedTransactions.map(tx => [
        tx.id,
        tx.agent,
        tx.service,
        tx.amount,
        tx.type,
        tx.status,
        tx.time,
        tx.reason || ""
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
          <p className="text-zinc-400 text-sm">Micro-payment ledger across all agents and services.</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 bg-zinc-900 border border-zinc-800 rounded-md text-zinc-400 hover:text-zinc-100 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
          <button 
            onClick={handleExportCSV}
            className="bg-zinc-100 hover:bg-white text-zinc-950 font-medium px-4 py-2 rounded-md text-sm transition-colors"
          >
            Export CSV
          </button>
        </div>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="pb-0">
          <div className="flex items-center space-x-2 pb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search by tx id, agent, or service..." 
                className="w-full bg-zinc-950 border border-zinc-800 rounded-md pl-9 pr-4 py-2 text-sm text-zinc-100 focus:outline-none focus:border-zinc-700"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="border-zinc-800">
              <TableRow className="hover:bg-transparent border-zinc-800">
                <TableHead className="text-zinc-400">Transaction ID</TableHead>
                <TableHead className="text-zinc-400">Agent</TableHead>
                <TableHead className="text-zinc-400">Service</TableHead>
                <TableHead className="text-zinc-400">Status</TableHead>
                <TableHead className="text-zinc-400">Time</TableHead>
                <TableHead 
                  className="text-right text-zinc-400 cursor-pointer hover:text-zinc-200 transition-colors"
                  onClick={handleSort}
                >
                  <div className="flex items-center justify-end space-x-1">
                    <span>Amount</span>
                    {sortOrder === 'asc' ? <ArrowUp className="w-4 h-4" /> : sortOrder === 'desc' ? <ArrowDown className="w-4 h-4" /> : <ArrowUpDown className="w-4 h-4" />}
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedTransactions.map((tx) => (
                <TableRow key={tx.id} className="border-zinc-800/50 hover:bg-zinc-800/30">
                  <TableCell className="font-mono text-xs text-zinc-500">{tx.id}</TableCell>
                  <TableCell className="font-medium text-zinc-200">{tx.agent}</TableCell>
                  <TableCell className="text-zinc-400">{tx.service}</TableCell>
                  <TableCell>
                    {tx.status === 'settled' ? (
                      <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 text-[10px] uppercase">Settled</Badge>
                    ) : (
                      <Badge variant="outline" className="border-rose-500/30 text-rose-400 text-[10px] uppercase" title={tx.reason}>Blocked</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-zinc-500 text-sm">{tx.time}</TableCell>
                  <TableCell className="text-right">
                    <div className={`flex items-center justify-end font-medium ${tx.type === 'deposit' ? 'text-emerald-400' : tx.status === 'blocked' ? 'text-zinc-500 line-through' : 'text-zinc-100'}`}>
                      {tx.type === 'deposit' ? '+' : '-'}${tx.amount.toFixed(3)}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
