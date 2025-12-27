# AION V IX - Sovereign Wealth Forge

## Overview
Elite-grade Sovereign Arbitrage Flash Loan Forge - A React/TypeScript frontend application built with Vite.

## Project Architecture
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS (via CDN)
- **AI Integration**: Google Gemini API (@google/genai)
- **UI**: Framer Motion for animations, Lucide React for icons

## Project Structure
- `/components/` - React UI components (modals, dashboards, visualizers)
- `/services/` - Business logic services for various features
- `/contracts/` - Solidity smart contracts
- `App.tsx` - Main application component
- `index.tsx` - Application entry point
- `types.ts` - TypeScript type definitions
- `constants.tsx` - Application constants

## Configuration
- **Development Server**: Port 5000 (configured in vite.config.ts)
- **Environment Variables**: 
  - `GEMINI_API_KEY` - Required for AI features

## Scripts
- `npm run start` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Deployment
Configured as a static deployment with:
- Build command: `npm run build`
- Public directory: `dist`
