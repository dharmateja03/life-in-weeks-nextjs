'use client'

// StickyHeader Component - Header with decade navigation
// Matches Gina's header/navbar.html and sticky behavior

import React, { useState, useEffect } from 'react'
import { getDecadeMilestones } from '../utils/date-processing'
import { WEEKS_CONFIG } from '../data/life-events'

interface StickyHeaderProps {
  title: string
}

export function StickyHeader({ title }: StickyHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDecade, setActiveDecade] = useState('decade-0')
  
  useEffect(() => {
    const handleScroll = () => {
      // Show navigation when user scrolls down more than 200px
      setIsScrolled(window.scrollY > 200)
      
      // Find which decade should be active based on visible boxes
      const weekBoxes = document.querySelectorAll('.week, .birthday, .event')
      let currentDecade = 'decade-0'
      
      // Look for boxes that are currently visible in the viewport
      for (const box of weekBoxes) {
        const rect = box.getBoundingClientRect()
        // Check if box is in the upper portion of viewport (within header area)
        if (rect.top <= 200 && rect.bottom >= 100) {
          // Try to get age from the box data or nearby elements
          const boxElement = box as HTMLElement
          const tooltip = boxElement.getAttribute('data-bs-title') || boxElement.title
          
          // Look for age pattern in tooltip or check if it's a birthday box
          if (tooltip) {
            // Birthday boxes have format like "Jan 1, 2000 – Turned 5 years old"
            const ageMatch = tooltip.match(/Turned (\d+) years? old/)
            if (ageMatch) {
              const age = parseInt(ageMatch[1])
              const decade = Math.floor(age / 10) * 10
              currentDecade = `decade-${decade}`
              break
            }
            
            // For other boxes, try to extract year and calculate age
            const yearMatch = tooltip.match(/(\w{3} \d{1,2}, (\d{4}))/)
            if (yearMatch) {
              const year = parseInt(yearMatch[2])
              const age = year - parseInt(WEEKS_CONFIG.startYear.toString())
              const decade = Math.floor(Math.max(0, age) / 10) * 10
              currentDecade = `decade-${decade}`
              break
            }
          }
        }
      }
      
      setActiveDecade(currentDecade)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const decades = getDecadeMilestones(WEEKS_CONFIG.endYear, parseInt(WEEKS_CONFIG.startYear.toString()))
  
  return (
    <div 
      className="sticky-top"
      style={{
        backgroundColor: 'var(--main-bg-color)'
      }}
    >
      <h1 className={isScrolled ? 'tiny' : ''}>
        {title}
      </h1>
      
      <nav 
        className={`navbar ${isScrolled ? 'navbar-visible' : ''}`} 
        id="lifeinweeks-navbar"
        style={{
          display: isScrolled ? 'block' : 'none',
          opacity: isScrolled ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}
      >
        <div className="p-0">
          <ul className="nav nav-pills justify-content-between">
            {decades.map((decade) => (
              <li key={decade.id} className="nav-item">
                <a 
                  className={`nav-link ${activeDecade === decade.id ? 'active' : ''}`}
                  href={`#${decade.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    const element = document.getElementById(decade.id)
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                >
                  {decade.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  )
}