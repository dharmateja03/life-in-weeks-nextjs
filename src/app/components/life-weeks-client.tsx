'use client'

import React, { useState, useRef } from 'react'
import { StickyHeader } from './sticky-header'
import { IntroContent } from './intro-content'
import { WeeksGrid } from './weeks-grid'
import { Footer } from './footer'
import { APP_CONFIG, DerivedConfig } from '../config/app-config'
import { EventsData, WeeksConfig } from '../data/life-events'

interface LifeWeeksClientProps {
  lifeEvents: EventsData
  weeksConfig: WeeksConfig
  derivedConfig: DerivedConfig
}

/**
 * Client Component for Life in Weeks visualization
 * Handles interactive state like compact mode toggle
 */
export function LifeWeeksClient({ lifeEvents, weeksConfig, derivedConfig }: LifeWeeksClientProps) {
  // Default to compact mode on mobile, standard on desktop
  const [isCompactMode, setIsCompactMode] = useState(() => {
    if (typeof window === 'undefined') {
      return APP_CONFIG.defaultCompactMode // Server-side fallback
    }
    return window.innerWidth <= 768 // Mobile/tablet uses compact mode
  })
  
  const gridRef = useRef<HTMLDivElement>(null)

  return (
    <div className="life-in-weeks-container">
      <div className="life-in-weeks">
        <StickyHeader 
          derivedConfig={derivedConfig}
          gridRef={gridRef}
        />
        <IntroContent 
          isCompactMode={isCompactMode}
          setIsCompactMode={setIsCompactMode}
        />
        <WeeksGrid 
          ref={gridRef}
          isCompactMode={isCompactMode}
          lifeEvents={lifeEvents}
          weeksConfig={weeksConfig}
        />
        <Footer />
      </div>
    </div>
  )
}