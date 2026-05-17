import { Search, Filter } from 'lucide-react'

const CATEGORIES = [
  'all',
  'linux-basics',
  'forensics',
  'networking',
  'privilege-escalation',
  'cryptography',
  'web',
  'reverse-engineering',
  'pwn',
  'osint',
]
const DIFFICULTIES = ['all', 'easy', 'medium', 'hard']

export default function FilterBar({
  search,
  setSearch,
  category,
  setCategory,
  difficulty,
  setDifficulty,
  showSolved,
  setShowSolved,
}) {
  return (
    <div className="bg-cyber-card border border-cyber-border rounded-lg p-4 space-y-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-muted" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search challenges..."
          className="w-full pl-10 pr-4 py-2 bg-black/40 border border-cyber-border rounded font-mono text-sm text-white placeholder:text-cyber-muted focus:outline-none focus:border-cyber-cyan/50 transition-colors"
        />
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <Filter className="w-4 h-4 text-cyber-muted flex-shrink-0" />

        {/* Category filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-black/40 border border-cyber-border rounded px-3 py-1.5 font-mono text-xs text-white focus:outline-none focus:border-cyber-cyan/50 transition-colors cursor-pointer"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c} className="bg-cyber-bg">
              {c === 'all' ? 'ALL CATEGORIES' : c.toUpperCase()}
            </option>
          ))}
        </select>

        {/* Difficulty filter */}
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="bg-black/40 border border-cyber-border rounded px-3 py-1.5 font-mono text-xs text-white focus:outline-none focus:border-cyber-cyan/50 transition-colors cursor-pointer"
        >
          {DIFFICULTIES.map((d) => (
            <option key={d} value={d} className="bg-cyber-bg">
              {d === 'all' ? 'ALL DIFFICULTIES' : d.toUpperCase()}
            </option>
          ))}
        </select>

        {/* Show solved toggle */}
        <label className="flex items-center gap-2 cursor-pointer select-none ml-auto">
          <span className="text-xs font-mono text-cyber-text">HIDE SOLVED</span>
          <button
            role="switch"
            aria-checked={showSolved}
            onClick={() => setShowSolved((v) => !v)}
            className={`relative w-9 h-5 rounded-full border transition-colors ${
              showSolved
                ? 'bg-cyber-green/20 border-cyber-green/50'
                : 'bg-black/40 border-cyber-border'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-all duration-200 ${
                showSolved ? 'translate-x-4 bg-cyber-green' : 'bg-cyber-muted'
              }`}
            />
          </button>
        </label>
      </div>
    </div>
  )
}
