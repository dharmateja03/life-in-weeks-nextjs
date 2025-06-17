'use client'

import React, { useState } from 'react'
import { StickyHeader } from './sticky-header'
import { WeeksGrid } from './weeks-grid'
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

  return (
    <div className="life-in-weeks-container">
      <div className="life-in-weeks">
        <StickyHeader 
          isCompactMode={isCompactMode}
          setIsCompactMode={setIsCompactMode}
          derivedConfig={derivedConfig}
        />
        <WeeksGrid 
          isCompactMode={isCompactMode}
          lifeEvents={lifeEvents}
          weeksConfig={weeksConfig}
        />
      </div>
    </div>
  )
}