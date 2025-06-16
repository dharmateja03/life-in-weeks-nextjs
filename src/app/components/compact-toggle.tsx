'use client'

import React from 'react'

interface CompactToggleProps {
  isCompact: boolean
  onToggle: (compact: boolean) => void
}

export function CompactToggle({ isCompact, onToggle }: CompactToggleProps) {
  return (
    <div className="compact-toggle">
      <button
        type="button"
        onClick={() => onToggle(!isCompact)}
        className={`toggle-button ${isCompact ? 'compact-active' : 'standard-active'}`}
        title={isCompact ? 'Switch to Standard View' : 'Switch to Compact View (fits entire life on screen)'}
      >
        {isCompact ? '📋 Switch to Standard View' : '🔍 Switch to Compact View'}
      </button>
    </div>
  )
}