'use client'

// StickyHeader Component - Header with decade navigation
// Matches Gina's header/navbar.html and sticky behavior

import React, { useState, useEffect, useRef, RefObject } from 'react'
import { getDecadeMilestones } from '../utils/date-processing'
import { DerivedConfig } from '../config/app-config'

interface StickyHeaderProps {
  derivedConfig: DerivedConfig
  gridRef: RefObject<HTMLDivElement | null>
}

export function StickyHeader({ derivedConfig, gridRef }: StickyHeaderProps) {
  const [isTitleSmall, setIsTitleSmall] = useState(false)
  const [isNavbarVisible, setIsNavbarVisible] = useState(false)
  const [activeDecade, setActiveDecade] = useState('decade-0')
  const [navbarThreshold, setNavbarThreshold] = useState(150) // Fallback
  const titleRef = useRef<HTMLHeadingElement>(null)
  
  // Calculate the threshold for navbar appearance
  useEffect(() => {
    const calculateThreshold = () => {
      if (gridRef.current && titleRef.current) {
        // Get the distance from top of page to grid
        const gridRect = gridRef.current.getBoundingClientRect()
        const gridTopFromPageTop = gridRect.top + window.scrollY
        
        // Get title height (when small)
        const titleHeight = titleRef.current.offsetHeight
        
        // Threshold is when grid reaches bottom of title
        // We need to account for sticky positioning
        const threshold = gridTopFromPageTop - titleHeight - 10 // 10px buffer
        
        setNavbarThreshold(Math.max(50, threshold)) // Min 50px
      }
    }
    
    // Calculate on mount and when layout changes
    const timer = setTimeout(calculateThreshold, 100) // Small delay for layout
    window.addEventListener('resize', calculateThreshold)
    
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', calculateThreshold)
    }
  }, [gridRef, isTitleSmall])
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      
      // Title shrinks immediately on any scroll (like Gina's)
      setIsTitleSmall(scrollY > 0)
      
      // Navbar appears when grid reaches bottom of title
      setIsNavbarVisible(scrollY > navbarThreshold)
      
      // Find which decade should be active based on visible boxes
      const weekBoxes = document.querySelectorAll('.week, .birthday, .event')
      let currentDecade = 'decade-0'
      
      // Look for boxes that are currently visible in the viewport
      for (const box of weekBoxes) {
        const rect = box.getBoundingClientRect()
        // Check if box is in the upper portion of viewport (within header area)
        if (rect.top <= 150 && rect.bottom >= 50) {
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
              const age = year - derivedConfig.birthYear
              const decade = Math.floor(Math.max(0, age) / 10) * 10
              currentDecade = `decade-${decade}`
              break
            }
          }
        }
      }
      
      setActiveDecade(currentDecade)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [derivedConfig.birthYear, navbarThreshold])
  
  const decades = getDecadeMilestones(derivedConfig.endYear, derivedConfig.birthYear)
  
  return (
    <div 
      className="sticky-top"
      style={{
        backgroundColor: 'var(--main-bg-color)'
      }}
    >
      <h1 ref={titleRef} className={isTitleSmall ? 'tiny' : ''}>
        My Life in Weeks
      </h1>
      
      <nav 
        className={`navbar ${isNavbarVisible ? 'navbar-visible' : ''}`} 
        id="lifeinweeks-navbar"
        style={{
          display: isNavbarVisible ? 'block' : 'none',
          opacity: isNavbarVisible ? 1 : 0,
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