import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { challenges, flags } from '../data/ctfData'

// Initial solved state — all unsolved
const initSolvedState = () => {
  const state = {}
  challenges.forEach((c) => {
    state[c.id] = false
  })
  return state
}

export const useCTFStore = create(
  persist(
    (set, get) => ({
      // Solved map: { [challengeId]: boolean }
      solved: initSolvedState(),

      // Input values per challenge (not persisted — runtime only)
      inputs: {},

      // Initialize: if no persisted state, set defaults
      init: () => {
        const current = get().solved
        const fresh = initSolvedState()
        // Merge: keep existing solved states, add new ones if missing
        const merged = { ...fresh, ...current }
        set({ solved: merged })
      },

      setInput: (id, value) =>
        set((state) => ({
          inputs: { ...state.inputs, [id]: value },
        })),

      submitFlag: (challengeId) => {
        const { inputs, solved } = get()
        const userInput = (inputs[challengeId] || '').trim()
        const correctFlag = flags.find((f) => f.challengeId === challengeId)

        if (!correctFlag) return { success: false, message: 'Flag not found in database.' }
        if (solved[challengeId]) return { success: true, message: 'Already solved!' }

        if (userInput === correctFlag.flag) {
          set((state) => ({
            solved: { ...state.solved, [challengeId]: true },
          }))
          return { success: true, message: 'Correct! Flag accepted.' }
        } else {
          return { success: false, message: 'Wrong flag. Keep trying!' }
        }
      },

      resetAll: () => {
        set({ solved: initSolvedState(), inputs: {} })
      },

      getSolvedCount: () => {
        const { solved } = get()
        return Object.values(solved).filter(Boolean).length
      },

      getTotalPoints: () => {
        const { solved } = get()
        return challenges
          .filter((c) => solved[c.id])
          .reduce((sum, c) => sum + c.points, 0)
      },
    }),
    {
      name: 'ctf-checker-storage',
      // Only persist the solved map
      partialize: (state) => ({ solved: state.solved }),
    }
  )
)
