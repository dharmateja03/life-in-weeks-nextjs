'use client'

// WeekBox Component - Individual box rendering with three modes
// Matches Gina's helpers/box.html exactly

import React from 'react'
import { GridBox } from '../utils/grid-layout'

interface WeekBoxProps {
  box: GridBox
  className?: string
  style?: React.CSSProperties
}

export function WeekBox({ box, className = '', style = {} }: WeekBoxProps) {
  const baseClasses = `btn ${box.type} ${box.borderClass} ${box.backgroundClass}`
  const fullClassName = `${baseClasses} ${className}`.trim()
  
  // Additional classes based on box type
  const typeSpecificClasses = {
    birthday: 'text-nowrap',
    event: 'text-nowrap text-left', 
    week: 'w-100'
  }
  
  const finalClassName = `${fullClassName} ${typeSpecificClasses[box.type]}`.trim()
  
  return (
    <button
      type="button"
      className={finalClassName}
      data-date={box.date}
      data-bs-toggle="tooltip"
      data-bs-placement="bottom"
      data-bs-custom-class="custom-tooltip"
      data-bs-title={box.tooltip}
      style={style}
    >
      {box.label}
    </button>
  )
}