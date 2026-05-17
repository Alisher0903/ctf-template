import { useEffect, useState } from 'react'
import Header from './components/Header'
import ChallengeCard from './components/ChallengeCard'
import FilterBar from './components/FilterBar'
import Scoreboard from './components/Scoreboard'
import { challenges } from './data/ctfData'
import { useCTFStore } from './store/ctfStore'

export default function App() {
  const init = useCTFStore((s) => s.init)
  const solved = useCTFStore((s) => s.solved)

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [difficulty, setDifficulty] = useState('all')
  const [showSolved, setShowSolved] = useState(false)

  useEffect(() => {
    init()
  }, [init])

  const filtered = challenges.filter((c) => {
    if (showSolved && solved[c.id]) return false
    if (category !== 'all' && c.category !== category) return false
    if (difficulty !== 'all' && c.difficulty !== difficulty) return false
    if (search) {
      const q = search.toLowerCase()
      return (
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
      )
    }
    return true
  })

  return (
    <div className="min-h-screen bg-cyber-bg font-mono">
      {/* Background grid */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,255,136,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.04) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main content */}
          <div className="flex-1 min-w-0 space-y-4">
            {/* Terminal intro */}
            <div className="bg-black/60 border border-cyber-green/20 rounded-lg p-4 font-mono text-xs">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-cyber-red/70" />
                <div className="w-3 h-3 rounded-full bg-cyber-yellow/70" />
                <div className="w-3 h-3 rounded-full bg-cyber-green/70" />
                <span className="ml-2 text-cyber-muted">terminal — bash</span>
              </div>
              <p className="text-cyber-green">
                <span className="text-cyber-cyan">root@ctf</span>
                <span className="text-white">:</span>
                <span className="text-cyber-purple">~</span>
                <span className="text-white">$ </span>
                <span className="text-white">cat README.md</span>
              </p>
              <p className="text-cyber-text mt-1">
                Welcome to CTF Checker. {challenges.length} challenges await. Submit correct flags
                to earn points. Your progress is saved locally. Good luck, hacker.{' '}
                <span className="text-cyber-green animate-pulse">▊</span>
              </p>
            </div>

            <FilterBar
              search={search}
              setSearch={setSearch}
              category={category}
              setCategory={setCategory}
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              showSolved={showSolved}
              setShowSolved={setShowSolved}
            />

            {/* Challenge count */}
            <div className="flex items-center justify-between">
              <p className="text-xs font-mono text-cyber-muted">
                Showing {filtered.length} of {challenges.length} challenges
              </p>
            </div>

            {/* Challenge list */}
            <div className="space-y-3">
              {filtered.length > 0 ? (
                filtered.map((c) => <ChallengeCard key={c.id} challenge={c} />)
              ) : (
                <div className="text-center py-12 text-cyber-muted font-mono">
                  <p className="text-2xl mb-2">{'// 0x00'}</p>
                  <p className="text-sm">No challenges match your filters.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <Scoreboard />
        </div>
      </main>
    </div>
  )
}
