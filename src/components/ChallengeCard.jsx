import { useState } from 'react'
import {
  Flag,
  Lock,
  Unlock,
  ChevronDown,
  ChevronUp,
  Terminal,
  AlertTriangle,
  CheckCircle2,
  Eye,
  EyeOff,
  Tag,
  User,
  Zap,
} from 'lucide-react'
import { useCTFStore } from '../store/ctfStore'

const DIFFICULTY_CONFIG = {
  easy: { label: 'EASY', color: 'text-cyber-green border-cyber-green/40 bg-cyber-green/5' },
  medium: { label: 'MEDIUM', color: 'text-cyber-yellow border-cyber-yellow/40 bg-cyber-yellow/5' },
  hard: { label: 'HARD', color: 'text-cyber-red border-cyber-red/40 bg-cyber-red/5' },
  expert: { label: 'EXPERT', color: 'text-cyber-purple border-cyber-purple/40 bg-cyber-purple/5' },
}

const CATEGORY_CONFIG = {
  forensics: { color: 'text-cyber-cyan', bg: 'bg-cyber-cyan/10 border-cyber-cyan/30' },
  networking: { color: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/30' },
  'privilege-escalation': { color: 'text-cyber-red', bg: 'bg-cyber-red/10 border-cyber-red/30' },
  cryptography: { color: 'text-cyber-purple', bg: 'bg-cyber-purple/10 border-cyber-purple/30' },
  web: { color: 'text-cyber-green', bg: 'bg-cyber-green/10 border-cyber-green/30' },
  'reverse-engineering': { color: 'text-cyber-yellow', bg: 'bg-cyber-yellow/10 border-cyber-yellow/30' },
  pwn: { color: 'text-cyber-red', bg: 'bg-cyber-red/10 border-cyber-red/30' },
  osint: { color: 'text-teal-400', bg: 'bg-teal-400/10 border-teal-400/30' },
}

export default function ChallengeCard({ challenge }) {
  const [expanded, setExpanded] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [shaking, setShaking] = useState(false)

  const solved = useCTFStore((s) => s.solved[challenge.id])
  const input = useCTFStore((s) => s.inputs[challenge.id] || '')
  const setInput = useCTFStore((s) => s.setInput)
  const submitFlag = useCTFStore((s) => s.submitFlag)

  const diff = DIFFICULTY_CONFIG[challenge.difficulty]
  const cat = CATEGORY_CONFIG[challenge.category] || CATEGORY_CONFIG.forensics

  const handleSubmit = () => {
    if (solved) return
    const result = submitFlag(challenge.id)
    if (result.success) {
      setSuccess(result.message)
      setError('')
    } else {
      setError(result.message)
      setSuccess('')
      setShaking(true)
      setTimeout(() => setShaking(false), 400)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div
      className={`relative rounded-lg border transition-all duration-300 overflow-hidden ${
        solved
          ? 'border-cyber-green/50 bg-gradient-to-br from-cyber-card to-cyber-green/5'
          : 'border-cyber-border bg-cyber-card hover:border-cyber-muted'
      }`}
    >
      {/* Solved glow */}
      {solved && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-cyber-green/3 rounded-lg" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-green/60 to-transparent" />
        </div>
      )}

      {/* Card Header */}
      <button
        className="w-full text-left px-5 py-4 flex items-center gap-4"
        onClick={() => setExpanded((v) => !v)}
      >
        {/* Challenge number + status icon */}
        <div
          className={`w-9 h-9 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
            solved
              ? 'border-cyber-green/50 bg-cyber-green/10 text-cyber-green'
              : 'border-cyber-border text-cyber-muted'
          }`}
        >
          {solved ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
        </div>

        {/* Title & meta */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-display text-white text-sm tracking-wider truncate">
              {String(challenge.id).padStart(2, '0')}. {challenge.title.toUpperCase()}
            </span>
            {solved && (
              <span className="flex items-center gap-1 text-cyber-green text-xs font-mono">
                <CheckCircle2 className="w-3 h-3" />
                SOLVED
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-xs font-mono px-2 py-0.5 rounded border ${diff.color}`}>
              {diff.label}
            </span>
            <span className={`text-xs font-mono px-2 py-0.5 rounded border ${cat.bg} ${cat.color}`}>
              {challenge.category.toUpperCase()}
            </span>
            <span className="text-cyber-text text-xs font-mono flex items-center gap-1">
              <Zap className="w-3 h-3 text-cyber-yellow" />
              {challenge.points} pts
            </span>
          </div>
        </div>

        {/* Expand icon */}
        <div className="text-cyber-muted flex-shrink-0">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expanded body */}
      {expanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-cyber-border/50">
          {/* Description */}
          <div className="mt-4">
            <p className="text-xs font-mono text-cyber-text uppercase tracking-widest mb-2">
              // DESCRIPTION
            </p>
            <p className="text-sm text-gray-300 font-mono leading-relaxed border-l-2 border-cyber-cyan/40 pl-3">
              {challenge.description}
            </p>
          </div>

          {/* Credentials */}
          {challenge.credentials && (
            <div>
              <p className="text-xs font-mono text-cyber-text uppercase tracking-widest mb-1">
                // CREDENTIALS
              </p>
              <code className="inline-flex items-center gap-2 text-xs bg-black/40 border border-cyber-border px-3 py-1.5 rounded text-cyber-cyan font-mono">
                <User className="w-3 h-3" />
                {challenge.credentials}
              </code>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {challenge.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 text-xs font-mono text-cyber-muted border border-cyber-border/50 px-2 py-0.5 rounded"
              >
                <Tag className="w-2.5 h-2.5" />
                {tag}
              </span>
            ))}
          </div>

          {/* Hint */}
          <div>
            <button
              className="flex items-center gap-2 text-xs font-mono text-cyber-yellow hover:text-yellow-300 transition-colors"
              onClick={() => setShowHint((v) => !v)}
            >
              {showHint ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              {showHint ? 'HIDE HINT' : 'SHOW HINT'}
            </button>
            {showHint && (
              <p className="mt-2 text-xs font-mono text-cyber-yellow/70 border border-cyber-yellow/20 bg-cyber-yellow/5 px-3 py-2 rounded">
                💡 {challenge.hint}
              </p>
            )}
          </div>

          {/* Flag input */}
          <div>
            <p className="text-xs font-mono text-cyber-text uppercase tracking-widest mb-2">
              // SUBMIT FLAG
            </p>
            <div className={`flex gap-2 ${shaking ? 'animate-[glitch_0.3s_ease-in-out]' : ''}`}>
              <div className="flex-1 relative">
                <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-muted" />
                <input
                  type="text"
                  value={input}
                  onChange={(e) => {
                    setInput(challenge.id, e.target.value)
                    setError('')
                    setSuccess('')
                  }}
                  onKeyDown={handleKeyDown}
                  disabled={solved}
                  placeholder="flag{...}"
                  className={`w-full pl-10 pr-4 py-2.5 rounded border font-mono text-sm bg-black/40 outline-none transition-colors ${
                    solved
                      ? 'border-cyber-green/40 text-cyber-green/60 cursor-not-allowed'
                      : error
                      ? 'border-cyber-red/60 text-white focus:border-cyber-red'
                      : 'border-cyber-border text-white focus:border-cyber-cyan/60'
                  }`}
                />
              </div>
              <button
                onClick={handleSubmit}
                disabled={solved || !input.trim()}
                className={`px-4 py-2.5 rounded border font-mono text-sm font-medium transition-all flex items-center gap-2 ${
                  solved
                    ? 'border-cyber-green/30 text-cyber-green/50 cursor-not-allowed bg-cyber-green/5'
                    : 'border-cyber-cyan/40 text-cyber-cyan hover:bg-cyber-cyan/10 hover:border-cyber-cyan active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed'
                }`}
              >
                <Flag className="w-4 h-4" />
                {solved ? 'PWNED' : 'SUBMIT'}
              </button>
            </div>

            {/* Feedback */}
            {error && (
              <div className="mt-2 flex items-center gap-2 text-xs font-mono text-cyber-red">
                <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                {error}
              </div>
            )}
            {success && !solved && (
              <div className="mt-2 flex items-center gap-2 text-xs font-mono text-cyber-green">
                <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                {success}
              </div>
            )}
            {solved && (
              <div className="mt-2 flex items-center gap-2 text-xs font-mono text-cyber-green">
                <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                Challenge completed! +{challenge.points} points earned.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
