# Anime Tracker - Project Context & Documentation

## 🎯 Project Overview

**What:** A clean, mobile-first anime tracking application  
**Goal:** Portfolio project showcasing React + TypeScript + Tailwind CSS skills  
**Target Users:** Anime fans who want simple, beautiful tracking without social features  
**Differentiator:** Customizable interface, beginner-friendly, distraction-free  

## ❓ Problem Statement

Existing anime trackers are either:
- **Too complex** (AniList - overwhelming for new users despite being well-designed)
- **Too simple** (basic apps - not visually engaging)
- **Feature-heavy** (social features, forums, reviews when users just want tracking)

**Our Solution:** "What if someone just wants a beautiful, simple way to track anime without all the extra features?"

## 🏗️ Technical Architecture

### Tech Stack
- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS (learning this for job market)
- **Routing:** React Router DOM
- **API:** Jikan API (unofficial MyAnimeList API - free, no auth required)
- **State:** Local Storage (Phase 1) → Backend (Phase 2)
- **Deployment:** Vercel/Netlify

### Project Structure
```
src/
├── components/
│   ├── ui/              # Basic UI building blocks
│   ├── anime/           # Anime-specific components
│   └── layout/          # Layout components
├── pages/               # Page components
├── services/            # API calls and external services
├── types/               # TypeScript type definitions
├── utils/               # Helper functions
├── hooks/               # Custom React hooks
└── assets/              # Images, icons, etc.
```

## 📱 Core Features & User Experience

### Phase 1 (MVP - Local Storage)
- **Search & Add:** Find anime via Jikan API, add to personal list
- **List Management:** View/organize by status (Watching, Completed, Plan to Watch, etc.)
- **Progress Tracking:** Episode counters, personal ratings, notes
- **Mobile-First:** Touch-friendly, responsive design
- **Customizable Views:** Users control what info they see

### Phase 2 (Enhancement)
- **Visual Improvements:** Color extraction from covers, animations
- **Advanced Features:** Filtering, sorting, statistics dashboard
- **Dark/Light Themes:** Theme switching

### Phase 3 (Backend Integration)
- **Cloud Sync:** Simple Node.js/Express backend
- **User Accounts:** Registration, login, data persistence
- **Cross-Device:** Access lists anywhere

## 🎨 Design Philosophy

### Visual Direction
- **Clean but not boring:** Vibrant colors without overwhelming users
- **Dark-first:** Default dark theme with purple accents (#8B5CF6)
- **Card-based:** Anime cover art as primary visual element
- **Mobile-optimized:** Bottom navigation, thumb-friendly interactions

### Color Scheme
- **Primary Background:** `bg-gray-900` (#111827)
- **Card Background:** `bg-gray-800` (#1F2937)
- **Accent Color:** `text-purple-400` (#A78BFA)
- **Text Primary:** `text-white`
- **Text Secondary:** `text-gray-400`

### Layout Patterns
- **Fixed header** with app branding and page title
- **Bottom navigation** for mobile (Search, My List, Stats)
- **Responsive grids** for anime cards (2-6 columns based on screen size)
- **Card hover effects** for premium feel

## 🔧 API & Data Management

### Jikan API Integration
- **Base URL:** `https://api.jikan.moe/v4`
- **Rate Limits:** 30 requests/minute, 2 requests/second
- **No Auth Required:** Free to use
- **Key Endpoints:**
  - Search: `/anime?q={query}`
  - Details: `/anime/{id}`

### Data Flow
1. **Search:** User searches → Jikan API → Display results
2. **Add to List:** User clicks add → Store in localStorage
3. **View List:** Load from localStorage → Display user's anime
4. **Update Progress:** Modify localStorage entry

### TypeScript Types
- **JikanAnime:** Raw API response structure
- **Anime:** Simplified app data structure  
- **UserAnimeEntry:** User's tracking data + anime info
- **WatchStatus:** 'watching' | 'completed' | 'plan-to-watch' | 'dropped' | 'on-hold'

## 🚀 Development Progress

### ✅ Completed
- [x] Project setup (Vite + React + TypeScript + Tailwind)
- [x] GitHub repository setup (`shavonne-senpai/anime-tracker`)
- [x] Comprehensive TypeScript types
- [x] Basic app structure with React Router
- [x] Layout components (Header, Navigation, Layout)
- [x] AnimeCard component with responsive design
- [x] Mock data for testing
- [x] Search page with card grid display

### 🔄 Current Status
**Working on:** Basic functionality implementation
**Next up:** SearchBar component with actual API integration

### 📋 TODO (GitHub Issues Created)
1. **API Integration:** Implement Jikan API service functions
2. **Search Functionality:** Working search with real API calls
3. **Local Storage:** CRUD operations for user's anime list
4. **My List Page:** Display and manage user's tracked anime
5. **Anime Detail Page:** Individual anime information view
6. **Statistics Dashboard:** User stats and progress tracking

## 💡 Key Learning Goals

### Technical Skills
- **Modern React:** Hooks, TypeScript patterns, component architecture
- **Tailwind CSS:** Utility-first styling, responsive design
- **API Integration:** REST APIs, error handling, loading states
- **Mobile-First:** Touch interactions, responsive layouts

### Portfolio Value
- **Real-world complexity:** API integration, state management, responsive design
- **User-centered thinking:** Psychology background applied to UX decisions
- **Modern tech stack:** Technologies mentioned in job descriptions
- **Deployable product:** Something that could actually be used

## 🎯 Success Metrics

### Portfolio Goals
- **Demonstrates technical skills:** React, TypeScript, Tailwind, API integration
- **Shows product thinking:** Problem identification, user experience design
- **Proves execution ability:** Completed, deployed, usable application
- **Displays personality:** Anime passion project with clean execution

### User Experience Goals
- **Fast loading:** Optimized images, efficient API calls
- **Intuitive navigation:** Clear information hierarchy
- **Mobile-friendly:** Thumb navigation, readable text
- **Customizable:** Users control their interface

## 📚 Development Philosophy & Approach

### Code Quality
- **TypeScript-first:** Strong typing for better developer experience
- **Component-driven:** Reusable, single-responsibility components
- **Mobile-first responsive:** Design for smallest screen, scale up
- **Performance-conscious:** Lazy loading, optimized images

### Learning Approach
- **Build to understand:** Write code line-by-line rather than copy-paste
- **Iterate and improve:** Start simple, add complexity gradually
- **Real-world focus:** Build something actually usable, not just a demo

### Portfolio Strategy
This project serves as a centerpiece demonstrating:
- Technical competency in modern React ecosystem
- Product thinking and user experience consideration
- Ability to ship complete, polished applications
- Passion for the subject matter (authenticity in interviews)

## 🔗 Resources & References

### Design Inspiration
- **AniList:** Modern, feature-rich (reference for what works)
- **Kitsu:** Social-first approach (reference for community features)
- **Mobbin:** Mobile app design patterns and inspiration

### Technical Resources
- **Jikan API Docs:** API structure and endpoints
- **Tailwind CSS Docs:** Utility classes and responsive design
- **React Router Docs:** Navigation and routing patterns

### Development Tools
- **GitHub:** `github.com/shavonne-senpai/anime-tracker`
- **VS Code:** Primary development environment
- **Chrome DevTools:** Mobile simulation and debugging

---

## 📝 Notes for Future Development Sessions

### When continuing work on this project:
1. **Check GitHub Issues** for current development priorities
2. **Review this document** to understand project context and goals
3. **Let the developer drive** - guide and assist rather than provide complete solutions
4. **Focus on learning** - ensure understanding of every piece of code written
5. **Test frequently** - verify functionality works before moving to next feature

### Current Development Mode
- **Developer prefers to write code** with guidance rather than copy-paste
- **Focus on understanding** over speed of implementation
- **Build genuine pride** in work through hands-on creation