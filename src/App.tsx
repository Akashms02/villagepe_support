import { useState, useTransition } from 'react'

interface Ticket {
  id: string
  title: string
  merchant: string
  priority: 'High' | 'Medium' | 'Low'
  status: 'Open' | 'In Progress' | 'Resolved'
  time: string
}

const INITIAL_TICKETS: Ticket[] = [
  {
    id: "VP-9021",
    title: "Merchant payout pending for ID #VP-9021",
    merchant: "Ramesh Kirana Store",
    priority: "High",
    status: "Open",
    time: "2 mins ago"
  },
  {
    id: "VP-8842",
    title: "KYC verification failure - Rajesh Kumar",
    merchant: "Kumar Agro Agency",
    priority: "Medium",
    status: "In Progress",
    time: "15 mins ago"
  },
  {
    id: "VP-8719",
    title: "Device registration error on POS-550",
    merchant: "Sri Balaji Medicals",
    priority: "Low",
    status: "Resolved",
    time: "1 hour ago"
  }
]

const TICKET_TEMPLATES = [
  { title: "UPI settlement delay on merchant bank account", priority: "High", merchant: "Durga Sweets" },
  { title: "QR code scanner not loading on merchant app", priority: "Medium", merchant: "Fresh Fruits Mart" },
  { title: "Agent login authorization code expired", priority: "High", merchant: "Village Agent #412" },
  { title: "Micro-ATM transaction reversal failure", priority: "High", merchant: "Lakshmi Provision Store" },
  { title: "Request for replacement Soundbox device", priority: "Low", merchant: "Star Electricals" }
]

export default function App() {
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS)
  const [search, setSearch] = useState('')
  const [filterPriority, setFilterPriority] = useState<string>('All')
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(INITIAL_TICKETS[0])
  const [isPending, startTransition] = useTransition()

  // Simulate adding a ticket
  const simulateNewTicket = () => {
    const template = TICKET_TEMPLATES[Math.floor(Math.random() * TICKET_TEMPLATES.length)]
    const randomId = `VP-${Math.floor(1000 + Math.random() * 9000)}`
    const newTicket: Ticket = {
      id: randomId,
      title: template.title,
      merchant: template.merchant,
      priority: template.priority as 'High' | 'Medium' | 'Low',
      status: 'Open',
      time: 'Just now'
    }
    setTickets(prev => [newTicket, ...prev])
    setActiveTicket(newTicket)
  }

  // Handle priority filter with React 19 startTransition
  const handlePriorityFilter = (priority: string) => {
    startTransition(() => {
      setFilterPriority(priority)
    })
  }

  // Filtered tickets
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(search.toLowerCase()) ||
                          ticket.merchant.toLowerCase().includes(search.toLowerCase()) ||
                          ticket.id.toLowerCase().includes(search.toLowerCase())
    const matchesPriority = filterPriority === 'All' || ticket.priority === filterPriority
    return matchesSearch && matchesPriority
  })

  // Count open tickets
  const openCount = tickets.filter(t => t.status !== 'Resolved').length

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-900 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                VillagePe
              </span>
              <span className="ml-1.5 px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-slate-900 text-indigo-400 rounded-full border border-indigo-900/50">
                Support Hub
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-slate-900/50 border border-slate-800/80 px-3 py-1.5 rounded-full text-xs text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>All Systems Operational</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col space-y-8">
        
        {/* Hero Banner with modern gradient and glassmorphism */}
        <section className="relative overflow-hidden rounded-3xl border border-slate-800/50 bg-gradient-to-br from-slate-900/60 to-slate-950/20 p-8 sm:p-10 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-none bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Empowering VillagePe Agents, Locally & Globally.
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-400 font-medium leading-relaxed">
              Vite 8, React 19, React Compiler, and Tailwind CSS v4 are working together in this template. 
              Use the tools below to manage and simulate merchant tickets.
            </p>
            
            {/* Search Input */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search by Ticket ID, Merchant name, or issue description..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-950/80 text-slate-100 placeholder-slate-500 pl-11 pr-4 py-3 rounded-2xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
                />
              </div>
              <button
                onClick={simulateNewTicket}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg shadow-indigo-500/20 active:scale-95 transition-all text-sm cursor-pointer whitespace-nowrap"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Simulate New Ticket</span>
              </button>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl hover:border-slate-700/80 transition-all">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Queue</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl font-bold tracking-tight text-white">{openCount}</span>
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400">Tickets awaiting resolution</p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl hover:border-slate-700/80 transition-all">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg. SLA Time</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl font-bold tracking-tight text-white">8.4m</span>
              <span className="text-emerald-400 text-xs font-bold flex items-center bg-emerald-500/10 px-2 py-0.5 rounded-full">
                ↓ 12%
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400">Response time vs yesterday</p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl hover:border-slate-700/80 transition-all">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer Sat.</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl font-bold tracking-tight text-white">98.2%</span>
              <span className="text-yellow-500 text-xs">★ ★ ★ ★ ★</span>
            </div>
            <p className="mt-1 text-xs text-slate-400">Satisfaction score from surveys</p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl hover:border-slate-700/80 transition-all">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Tickets</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl font-bold tracking-tight text-white">{tickets.length}</span>
              <span className="text-slate-400 text-xs font-bold">Total run</span>
            </div>
            <p className="mt-1 text-xs text-slate-400">Overall database count</p>
          </div>
        </section>

        {/* Support Hub Work Space */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Tickets Queue List (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold tracking-tight text-slate-200">Support Ticket Queue</h2>
              
              {/* Priority Filter */}
              <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
                {['All', 'High', 'Medium', 'Low'].map(p => (
                  <button
                    key={p}
                    onClick={() => handlePriorityFilter(p)}
                    className={`px-2.5 py-1 rounded-md font-medium cursor-pointer transition-all ${
                      filterPriority === p 
                        ? 'bg-indigo-500 text-white shadow-sm' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Tickets Loop */}
            <div className="bg-slate-900/20 border border-slate-800/80 rounded-2xl divide-y divide-slate-900 overflow-hidden max-h-[460px] overflow-y-auto">
              {isPending && (
                <div className="p-4 text-center text-xs text-indigo-400 bg-indigo-950/20 animate-pulse">
                  Applying filters...
                </div>
              )}
              {filteredTickets.length === 0 ? (
                <div className="p-8 text-center text-slate-500">
                  <svg className="w-12 h-12 mx-auto text-slate-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium">No tickets match search or filters</span>
                </div>
              ) : (
                filteredTickets.map(ticket => (
                  <div
                    key={ticket.id}
                    onClick={() => setActiveTicket(ticket)}
                    className={`p-4 flex flex-col space-y-2 cursor-pointer transition-all ${
                      activeTicket?.id === ticket.id 
                        ? 'bg-indigo-500/10 border-l-2 border-indigo-500' 
                        : 'hover:bg-slate-900/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-indigo-400">{ticket.id}</span>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                        ticket.priority === 'High' 
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' 
                          : ticket.priority === 'Medium'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                      }`}>
                        {ticket.priority}
                      </span>
                    </div>
                    <h3 className="font-semibold text-sm text-slate-200 line-clamp-1 group-hover:text-indigo-400 transition-colors">
                      {ticket.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>{ticket.merchant}</span>
                      <span>{ticket.time}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Column: Ticket Details Workspace (7 Cols) */}
          <div className="lg:col-span-7">
            {activeTicket ? (
              <div className="h-full bg-gradient-to-b from-slate-900/40 to-slate-950 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-900 pb-4">
                    <div>
                      <span className="text-xs font-mono text-indigo-400 font-bold">{activeTicket.id}</span>
                      <h2 className="text-xl font-bold tracking-tight text-white mt-1">{activeTicket.title}</h2>
                      <p className="text-sm text-slate-400 mt-1">Merchant: <span className="font-semibold text-slate-200">{activeTicket.merchant}</span></p>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                        activeTicket.status === 'Open'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : activeTicket.status === 'In Progress'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-slate-700/20 text-slate-400 border border-slate-800'
                      }`}>
                        {activeTicket.status}
                      </span>
                      <span className="text-[11px] text-slate-500">{activeTicket.time}</span>
                    </div>
                  </div>

                  {/* Simulated Details body */}
                  <div className="mt-6 space-y-4">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 space-y-2">
                      <span className="text-xs font-bold text-slate-400 block">System Diagnostics</span>
                      <div className="text-xs font-mono text-slate-300 space-y-1">
                        <p>👉 Account Type: Merchant Pro</p>
                        <p>👉 Soundbox Hardware ID: SB-990-21</p>
                        <p>👉 POS Host Handshake: Success (142ms)</p>
                        <p>👉 Core Payment Gateway Log: <span className="text-rose-400">409 PENDING_SETTLEMENT_GATEWAY</span></p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-bold text-slate-400 block">Agent Comments / Action Log</span>
                      <div className="flex items-start space-x-3 text-sm">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-xs font-bold text-purple-400 flex-shrink-0">
                          AH
                        </div>
                        <div className="bg-slate-900/60 p-3 rounded-2xl rounded-tl-none border border-slate-800/80">
                          <p className="font-semibold text-xs text-slate-300">Ananya H. (Lead Auditor)</p>
                          <p className="text-slate-400 text-xs mt-1">Initiating network handshake diagnostic. Escalated to tier-2 bank gateway integration support.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulated action triggers */}
                <div className="pt-4 border-t border-slate-900 flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      setTickets(prev => prev.map(t => t.id === activeTicket.id ? { ...t, status: 'In Progress' } : t))
                      setActiveTicket(prev => prev ? { ...prev, status: 'In Progress' } : null)
                    }}
                    className="flex-grow sm:flex-grow-0 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold text-xs rounded-xl active:scale-95 transition-all cursor-pointer text-center"
                  >
                    Set In-Progress
                  </button>
                  <button
                    onClick={() => {
                      setTickets(prev => prev.map(t => t.id === activeTicket.id ? { ...t, status: 'Resolved' } : t))
                      setActiveTicket(prev => prev ? { ...prev, status: 'Resolved' } : null)
                    }}
                    className="flex-grow sm:flex-grow-0 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl active:scale-95 transition-all cursor-pointer text-center"
                  >
                    Mark Resolved
                  </button>
                  <button
                    onClick={() => {
                      setTickets(prev => prev.filter(t => t.id !== activeTicket.id))
                      setActiveTicket(null)
                    }}
                    className="flex-grow sm:flex-grow-0 px-4 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 font-semibold text-xs rounded-xl active:scale-95 transition-all cursor-pointer text-center"
                  >
                    Delete Ticket
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[350px] bg-slate-900/10 border border-slate-800/50 rounded-2xl flex flex-col items-center justify-center p-6 text-slate-500">
                <svg className="w-16 h-16 text-slate-700 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
                <h3 className="font-semibold text-base text-slate-400">No Active Ticket Selected</h3>
                <p className="text-xs text-slate-500 mt-1">Select a ticket from the left panel queue or simulate a new ticket.</p>
              </div>
            )}
          </div>

        </section>

      </main>

      {/* Tech Stack / Footer badges */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <span>© {new Date().getFullYear()} VillagePe Support. All rights reserved.</span>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="px-3 py-1 bg-slate-900 text-slate-300 rounded-md border border-slate-800 font-mono">React v19.2</span>
            <span className="px-3 py-1 bg-slate-900 text-slate-300 rounded-md border border-slate-800 font-mono">React Compiler</span>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-md border border-emerald-500/20 font-mono">Tailwind CSS v4.0</span>
            <span className="px-3 py-1 bg-slate-900 text-slate-300 rounded-md border border-slate-800 font-mono">Vite v8.0</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
