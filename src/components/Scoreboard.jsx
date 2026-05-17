import { Trophy, RotateCcw } from 'lucide-react'
import { useCTFStore } from '../store/ctfStore'
import { challenges } from '../data/ctfData'

const CATEGORY_COLORS = {
  forensics: 'text-cyber-cyan',
  networking: 'text-blue-400',
  'privilege-escalation': 'text-cyber-red',
  cryptography: 'text-cyber-purple',
  web: 'text-cyber-green',
  'reverse-engineering': 'text-cyber-yellow',
  pwn: 'text-cyber-red',
  osint: 'text-teal-400',
}

export default function Scoreboard() {
  const solved = useCTFStore((s) => s.solved)
  const resetAll = useCTFStore((s) => s.resetAll)

  const solvedChallenges = challenges.filter((c) => solved[c.id])
  const totalPoints = solvedChallenges.reduce((sum, c) => sum + c.points, 0)
  const maxPoints = challenges.reduce((sum, c) => sum + c.points, 0)

  const handleReset = () => {
    if (window.confirm('Reset all progress? This cannot be undone.')) {
      resetAll()
    }
  }

  return (
    <aside className="w-full lg:w-72 flex-shrink-0 space-y-4">
      {/* Score panel */}
      <div className="bg-cyber-card border border-cyber-border rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-cyber-border flex items-center gap-2">
          <Trophy className="w-4 h-4 text-cyber-yellow" />
          <span className="font-display text-sm text-white tracking-wider">SCOREBOARD</span>
        </div>

        <div className="p-4 space-y-4">
          {/* Score ring */}
          <div className="flex items-center justify-center">
            <div className="relative w-28 h-28">
              <svg className="w-28 h-28 -rotate-90" viewBox="0 0 112 112">
                <circle cx="56" cy="56" r="48" fill="none" stroke="#1a2540" strokeWidth="8" />
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  fill="none"
                  stroke="url(#scoreGrad)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 48}`}
                  strokeDashoffset={`${2 * Math.PI * 48 * (1 - totalPoints / maxPoints)}`}
                  className="transition-all duration-700"
                />
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#00ff88" />
                    <stop offset="100%" stopColor="#00d4ff" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-2xl text-white">{totalPoints}</span>
                <span className="text-xs font-mono text-cyber-text">{maxPoints} pts</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2">
            <StatBox label="SOLVED" value={solvedChallenges.length} total={challenges.length} color="cyber-green" />
            <StatBox label="REMAINING" value={challenges.length - solvedChallenges.length} total={challenges.length} color="cyber-red" />
          </div>
        </div>
      </div>

      {/* Solved list */}
      <div className="bg-cyber-card border border-cyber-border rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-cyber-border">
          <span className="font-display text-sm text-white tracking-wider">COMPLETED</span>
        </div>
        <div className="max-h-64 overflow-y-auto">
          {solvedChallenges.length === 0 ? (
            <p className="px-4 py-6 text-center text-xs font-mono text-cyber-muted">
              No flags captured yet.<br />Start hacking!
            </p>
          ) : (
            <ul className="divide-y divide-cyber-border/30">
              {solvedChallenges.map((c) => (
                <li key={c.id} className="px-4 py-2.5 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs font-mono text-white truncate">{c.title}</p>
                    <p className={`text-xs font-mono ${CATEGORY_COLORS[c.category] || 'text-cyber-text'}`}>
                      {c.category}
                    </p>
                  </div>
                  <span className="text-cyber-green text-xs font-mono font-semibold flex-shrink-0">
                    +{c.points}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Reset button */}
      <button
        onClick={handleReset}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded border border-cyber-red/30 text-cyber-red/60 hover:border-cyber-red/60 hover:text-cyber-red hover:bg-cyber-red/5 font-mono text-xs transition-all"
      >
        <RotateCcw className="w-3 h-3" />
        RESET PROGRESS
      </button>
    </aside>
  )
}

const STAT_COLORS = {
  'cyber-green': 'text-cyber-green',
  'cyber-red': 'text-cyber-red',
  'cyber-cyan': 'text-cyber-cyan',
  'cyber-yellow': 'text-cyber-yellow',
}

function StatBox({ label, value, color }) {
  return (
    <div className="bg-black/30 border border-cyber-border/50 rounded p-3 text-center">
      <p className={`font-display text-xl ${STAT_COLORS[color] || 'text-white'}`}>{value}</p>
      <p className="text-xs font-mono text-cyber-text">{label}</p>
    </div>
  )
}
