# Architecture Proposal

## 1. Chosen Architecture

**Pattern:** Feature-based modular architecture with Redux Toolkit + RTK Query
```
src/
├── features/ # Products and Cart features
├── shared/ # Reusable components, styles, hooks
├── store/ # Redux configuration
└── app/ # Navigation & app entry
```

**State Management:**
- **Redux Toolkit + RTK Query** - API calls, caching, state management, offline support
- **Redux Persist** - Local storage persistence

**Why this stack?**
- RTK Query provides automatic caching + offline support out of the box
- Redux Persist saves cart data with less lines of code
- Feature modules keep code organized as app grows

## 2. Short-term and Long-term Reasoning

**Short-term (Assessment):**
- Rapid development with pre-built caching
- Meets all requirements (infinite scroll, cart persistence, offline)
- Easy debugging with Redux DevTools

**Long-term (Production):**
- Feature modules can be split into independent packages
- RTK Query cache handles 10k+ products efficiently
- Easy to add authentication, search, filters later

## 3. Trade-offs and Scalability

**Trade-offs:**
| Decision | Trade-off | Why Acceptable |
|----------|-----------|----------------|
| Redux + RTK Query | +15KB bundle | Offline caching required |
| Redux Persist | AsyncStorage overhead | User expects cart persistence |
| Feature modules | More folders | Clear boundaries for teams |

**Scalability:**
| Component | Limit | Solution |
|-----------|-------|----------|
| Products list | 10k+ items | FlatList virtualization |
| Cart size | Unlimited | Normalized state structure |
| API calls | Automatic | RTK Query caching & deduping |

**Alternatives considered:**
- **Context API** - No offline support ❌
- **Zustand + React Query** - Good for small/medium apps but requires extra setup for large scale ❌
- **MobX** - Steeper learning curve for team ❌
- **Redux Toolkit + RTK Query** - Enterprise-ready, built-in offline support ✅

**Future improvements:**
- Replace AsyncStorage with MMKV for faster persistence
- Add FlashList for better scroll performance
- Implement optimistic updates for cart actions
