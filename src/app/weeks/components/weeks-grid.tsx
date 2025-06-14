'use client'

// WeeksGrid Component - Main grid with exact row-breaking algorithm
// Matches Gina's life-in-weeks.html logic exactly

import React, { useState, useEffect } from 'react'
import { lifeEvents, WEEKS_CONFIG } from '../data/life-events'
import { formatDateString, getAge } from '../utils/date-processing'
import { 
  GridBox, 
  processBoxesIntoRows, 
  createTooltip, 
  createBirthdayLabel, 
  createBirthdayTooltip,
  groupBoxesByDecade
} from '../utils/grid-layout'
import { 
  initializeColorState, 
  updateColorState, 
  generateBoxStyles,
  getFutureBoxStyles
} from '../utils/color-utils'
import { WeekBox } from './week-box'

export function WeeksGrid() {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  
  // Handle window resize for responsive row breaking with debouncing
  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    
    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setWindowWidth(window.innerWidth)
      }, 150) // Debounce resize events
    }
    
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeoutId)
    }
  }, [])
  
  const startDate = new Date(WEEKS_CONFIG.startDate)
  const currentDate = new Date()
  
  // Initialize color state with first event values
  let colorState = initializeColorState()
  
  // Events are now being found correctly
  
  // Generate all boxes chronologically
  const allBoxes: GridBox[] = []
  
  // Process each year from start to end
  for (let year = parseInt(WEEKS_CONFIG.startYear.toString()); year <= WEEKS_CONFIG.endYear; year++) {
    const age = year - parseInt(WEEKS_CONFIG.startYear.toString())
    
    // Add birthday box if not the birth year
    if (age > 0) {
      const birthdayDate = new Date(year, startDate.getMonth(), startDate.getDate())
      const birthdayDateStr = formatDateString(birthdayDate)
      
      const birthdayBox: GridBox = {
        type: 'birthday',
        label: createBirthdayLabel(age, year),
        date: birthdayDateStr,
        tooltip: createBirthdayTooltip(birthdayDateStr, age),
        borderClass: colorState.basedClass,
        backgroundClass: colorState.doingClass,
        age,
        year
      }
      
      allBoxes.push(birthdayBox)
    }
    
    // Process all 53 weeks in the year (0-52)
    for (let week = 0; week <= 52; week++) {
      // Don't skip week 0 for birth year - we need to check birth date events
      // if (week === 0 && age === 0) continue
      
      const weekDate = new Date(year, startDate.getMonth(), startDate.getDate())
      weekDate.setDate(weekDate.getDate() + (week * 7))
      
      // Skip if this week is beyond the next birthday
      const nextBirthday = new Date(year + 1, startDate.getMonth(), startDate.getDate())
      if (weekDate >= nextBirthday) continue
      
      const weekDateStr = formatDateString(weekDate)
      const weekAge = getAge(weekDate, startDate)
      
      // Date formatting now working correctly
      
      // Check if this week has any events on the week start date
      let eventsForWeek = lifeEvents[weekDateStr]
      
      // Also check each day within this week for events (like Gina's implementation)
      for (let day = 0; day < 7; day++) {
        const dayDate = new Date(weekDate)
        dayDate.setDate(dayDate.getDate() + day)
        
        // Don't check dates beyond next birthday
        const nextBirthday = new Date(year + 1, startDate.getMonth(), startDate.getDate())
        if (dayDate >= nextBirthday) break
        
        const dayDateStr = formatDateString(dayDate)
        const eventsForDay = lifeEvents[dayDateStr]
        
        if (eventsForDay && eventsForDay.length > 0) {
          // Use the day's events instead of week events
          eventsForWeek = eventsForDay
          break // Use first day with events in this week
        }
      }
      
      if (eventsForWeek && eventsForWeek.length > 0) {
        // Process each event in this week
        for (const event of eventsForWeek) {
          // Update color state if event provides new values
          colorState = updateColorState(
            colorState,
            event.based,
            event.doing,
            event.association
          )
          
          const eventBox: GridBox = {
            type: 'event',
            label: event.headline,
            date: weekDateStr,
            tooltip: createTooltip(weekDateStr, event.description, colorState.doing, colorState.association, colorState.based),
            borderClass: colorState.basedClass,
            backgroundClass: colorState.doingClass,
            age: weekAge,
            year
          }
          
          allBoxes.push(eventBox)
        }
      } else {
        // Empty week box
        const weekBox: GridBox = {
          type: 'week',
          label: '',
          date: weekDateStr,
          tooltip: createTooltip(weekDateStr, undefined, colorState.doing, colorState.association, colorState.based),
          borderClass: colorState.basedClass,
          backgroundClass: colorState.doingClass,
          age: weekAge,
          year
        }
        
        allBoxes.push(weekBox)
      }
    }
  }
  
  // All events are now properly processed
  
  // Group boxes by decade for proper section organization
  // windowWidth state triggers re-render when screen size changes for responsive layout
  const decadeSections = groupBoxesByDecade(allBoxes)
  
  // Ensure component re-renders when window width changes
  // This is used by the responsive grid constants in processBoxesIntoRows
  React.useEffect(() => {
    // windowWidth change triggers recalculation of responsive grid layout
  }, [windowWidth])
  
  // Process all boxes together to get proper row numbering
  const allRows = processBoxesIntoRows(allBoxes)
  
  return (
    <div className="weeks-grid-container">
      {allRows.map((row, globalRowIndex) => (
        <div key={`row-${globalRowIndex}`} className="row-wrapper" style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute',
            left: '-30px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '10px',
            color: '#666',
            fontWeight: 'bold',
            zIndex: 10
          }}>
            {globalRowIndex + 1}
          </div>
          {row.map((box, boxIndex) => {
            const boxDate = new Date(box.date)
            const isFuture = boxDate > currentDate
            const futureStyles = isFuture ? getFutureBoxStyles() : {}
            
            const boxColorState = {
              basedClass: box.borderClass,
              doingClass: box.backgroundClass,
              based: '',
              doing: '',
              association: ''
            }
            const dynamicStyles = generateBoxStyles(boxColorState)
            const combinedStyles = { ...dynamicStyles, ...futureStyles }
            
            return (
              <WeekBox
                key={`${box.date}-${boxIndex}`}
                box={box}
                className={isFuture ? 'future-date' : ''}
                style={combinedStyles}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}