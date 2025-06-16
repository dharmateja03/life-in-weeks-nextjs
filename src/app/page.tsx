/**
 * Life in Weeks - Main Application Page
 * 
 * A visual representation of life where each week is displayed as a box in a grid.
 * This is a Next.js adaptation of Gina Trapani's Hugo implementation, preserving
 * the original algorithms while adding modern React features.
 * 
 * Key Features:
 * - Responsive grid layout with pixel-perfect calculations
 * - Decade navigation with scroll synchronization
 * - Color-coded life phases (locations, activities, organizations)
 * - Interactive tooltips for each week/event
 * - Birthday markers and life event highlighting
 * 
 * Data Source:
 * - Life events: src/app/data/life-events.ts
 * - Configuration: WEEKS_CONFIG in life-events.ts
 * - Color mappings: src/app/data/color-mappings.ts
 * 
 * Layout Structure:
 * - life-in-weeks-container: Full-screen container with global reset
 * - life-in-weeks: CSS scope for grid styling (required for .btn, .week classes)
 * - StickyHeader: Navigation and title
 * - WeeksGrid: Main visualization component
 * 
 * @author Ran Ding
 * @version 1.0.0
 * @since 2024
 */

'use client'

import React, { useState } from 'react'
import { StickyHeader } from './components/sticky-header'
import { WeeksGrid } from './components/weeks-grid'
import { APP_CONFIG } from './config/app-config'
import './weeks.css'

/**
 * Main HomePage Component
 * 
 * Renders the complete Life in Weeks visualization with header and grid.
 * Uses a two-layer container structure:
 * 1. life-in-weeks-container: Handles full-screen layout and global styling
 * 2. life-in-weeks: Provides CSS scope for grid components
 * 
 * @returns The complete Life in Weeks application
 */
export default function HomePage() {
  // Default to compact mode on mobile, standard on desktop
  const [isCompactMode, setIsCompactMode] = useState(() => {
    if (typeof window === 'undefined') {
      return APP_CONFIG.defaultCompactMode // Server-side fallback
    }
    return window.innerWidth <= 768 // Mobile/tablet uses compact mode
  })

  return (
    <div className="life-in-weeks-container">
      {/* CSS scope wrapper - required for .life-in-weeks .btn styling */}
      <div className="life-in-weeks">
        {/* Sticky navigation header with decade links */}
        <StickyHeader title="My Life in Weeks" />
        
        {/* Introduction text */}
        <div className="mt-3">
          <p>👋 Hi, I&apos;m <a href={APP_CONFIG.website}>{APP_CONFIG.name}</a>. Each week of my life is a little box.</p>
          
          <p>💡 Inspired by <a href="https://waitbutwhy.com/2014/05/life-weeks.html">Wait But Why</a>. Adapted from <a href="https://github.com/ginatrapani/life-in-weeks">Gina&apos;s work</a>.<br/>
          💻 My code is <a href="https://github.com/dingran/life-in-weeks-nextjs">here</a>. Also <a href="https://www.coryzue.com/">Cory</a> built <a href="https://lifeweeks.app/">an app</a> for this.</p>
        </div>
        
        {/* Main weeks visualization grid */}
        <WeeksGrid isCompactMode={isCompactMode} onToggleCompactMode={setIsCompactMode} />
        
        {/* Footer with GitHub link */}
        <footer style={{ textAlign: 'center', padding: '2rem 0', marginTop: '2rem' }}>
          <a 
            href="https://github.com/dingran/life-in-weeks-nextjs" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              color: 'var(--text-color)',
              textDecoration: 'none',
              fontSize: '14px'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub Repository
          </a>
        </footer>
      </div>
    </div>
  )
}
