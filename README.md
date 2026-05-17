# CTF Challenge Checker

Cybersecurity CTF platform — React + Zustand + Tailwind.

## Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Structure

```
src/
  data/
    ctfData.js       # challenges[] and flags[] lists
  store/
    ctfStore.js      # Zustand store (persisted to localStorage)
  components/
    Header.jsx       # Stats bar
    FilterBar.jsx    # Search + category/difficulty filters
    ChallengeCard.jsx # Individual challenge with flag input
    Scoreboard.jsx   # Sidebar with score ring + solved list
  App.jsx
  main.jsx
  index.css
```

## Adding Challenges

Edit `src/data/ctfData.js`:

1. Add to `challenges` array with a unique `id`
2. Add matching entry to `flags` array with same `challengeId`

Zustand store auto-initializes new challenges as unsolved on next load.
