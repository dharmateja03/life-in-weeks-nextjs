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

import React from 'react'
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
  return (
    <div className="life-in-weeks-container">
      {/* CSS scope wrapper - required for .life-in-weeks .btn styling */}
      <div className="life-in-weeks">
        {/* Sticky navigation header with decade links */}
        <StickyHeader title="My Life in Weeks" />
        
        {/* Introduction text */}
        <div className="mt-3">
          <p>👋 Hi, I&apos;m <a href={APP_CONFIG.website}>{APP_CONFIG.name}</a>. This is a map of my life, where each week I&apos;ve been alive is a little box.</p>
          
          <p>💡 Inspired by <a href="https://waitbutwhy.com/2014/05/life-weeks.html">Wait But Why</a> and <a href="https://github.com/ginatrapani/life-in-weeks">Gina Trapani&apos;s implementation</a>. I adapted it to Next.js - feel free to <a href="https://github.com/dingran/life-in-weeks-nextjs">fork the code</a>.</p>
          
          <p>🔗 For a more user-friendly app version, check out <a href="https://lifeweeks.app/">lifeweeks.app</a> by <a href="https://www.coryzue.com/">Cory Zue</a>.</p>
        </div>
        
        {/* Main weeks visualization grid */}
        <WeeksGrid />
      </div>
    </div>
  )
}
