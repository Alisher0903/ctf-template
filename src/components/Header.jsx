import { Shield, Terminal, Cpu, Wifi } from 'lucide-react'
import { useCTFStore } from '../store/ctfStore'
import { challenges } from '../data/ctfData'

export default function Header() {
  const solved = useCTFStore((s) => s.solved)
  const solvedCount = Object.values(solved).filter(Boolean).length
  const totalPoints = challenges
    .filter((c) => solved[c.id])
    .reduce((sum, c) => sum + c.points, 0)
  const maxPoints = challenges.reduce((sum, c) => sum + c.points, 0)
  const progress = (solvedCount / challenges.length) * 100

  return (
    <header className="relative border-b border-cyber-border bg-cyber-card overflow-hidden">
      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent,1px,rgba(0,255,136,0.015)_2px)] bg-[size:100%_4px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded border border-cyber-green/40 flex items-center justify-center bg-cyber-green/5">
                <Shield className="w-5 h-5 text-cyber-green" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyber-green rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="font-display text-xl text-white tracking-widest animate-flicker">
                CTF<span className="text-cyber-green">_</span>CHECKER
              </h1>
              <p className="text-cyber-text text-xs font-mono tracking-wider">
                CAPTURE THE FLAG // CHALLENGE PLATFORM
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6">
            <Stat icon={<Terminal className="w-4 h-4" />} label="SOLVED" value={`${solvedCount}/${challenges.length}`} color="green" />
            <Stat icon={<Cpu className="w-4 h-4" />} label="POINTS" value={`${totalPoints}/${maxPoints}`} color="cyan" />
            <Stat icon={<Wifi className="w-4 h-4" />} label="PROGRESS" value={`${Math.round(progress)}%`} color="yellow" />
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="h-1 bg-cyber-border rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyber-green to-cyber-cyan rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  )
}

function Stat({ icon, label, value, color }) {
  const colorMap = {
    green: 'text-cyber-green',
    cyan: 'text-cyber-cyan',
    yellow: 'text-cyber-yellow',
  }
  return (
    <div className="flex items-center gap-2">
      <span className={colorMap[color]}>{icon}</span>
      <div>
        <p className="text-cyber-text text-xs font-mono tracking-widest">{label}</p>
        <p className={`font-display text-sm ${colorMap[color]}`}>{value}</p>
      </div>
    </div>
  )
}
