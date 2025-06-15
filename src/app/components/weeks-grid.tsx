'use client'

// WeeksGrid Component - Main grid with exact row-breaking algorithm
// Matches Gina's life-in-weeks.html logic exactly

import React, { useState, useEffect } from 'react'
import { lifeEvents, WEEKS_CONFIG } from '../data/life-events'
import { worldEvents } from '../data/world-events'
import { usPresidents } from '../data/us-presidents'
import { APP_CONFIG } from '../config/app-config'
import { formatDateString, getAge } from '../utils/date-processing'
import { 
  GridBox, 
  processBoxesIntoRows, 
  createTooltip, 
  createBirthdayLabel, 
  createBirthdayTooltip
} from '../utils/grid-layout'
// Auto-generated milestone colors
import { milestoneColors } from '../utils/milestone-colors'
import { WeekBox } from './week-box'

// Extended event interface for merged events
interface MergedEvent {
  headline: string
  description?: string
  eventType: 'personal' | 'world' | 'president'
  milestone?: boolean
  color?: string
  category?: string
  party?: string
  president?: string
  termNumber?: number
  based?: string
  doing?: string
  association?: string
}

// Merge all event sources based on config
function getMergedEvents() {
  const merged: Record<string, MergedEvent[]> = {}
  
  // Add personal events
  Object.entries(lifeEvents).forEach(([date, events]) => {
    merged[date] = events.map(event => ({
      ...event,
      eventType: 'personal' as const
    }))
  })
  
  // Add world events if enabled
  if (APP_CONFIG.defaultShowWorldEvents) {
    Object.entries(worldEvents).forEach(([date, events]) => {
      if (!merged[date]) merged[date] = []
      merged[date].push(...events.map(event => ({
        ...event,
        eventType: 'world' as const
      })))
    })
  }
  
  // Add US presidents if enabled
  if (APP_CONFIG.defaultShowPresidents) {
    Object.entries(usPresidents).forEach(([date, events]) => {
      if (!merged[date]) merged[date] = []
      merged[date].push(...events.map(event => ({
        ...event,
        eventType: 'president' as const
      })))
    })
  }
  
  return merged
}

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
  
  // Get merged events from all sources
  const mergedEvents = getMergedEvents()
  
  // Initialize milestone tracking
  const milestoneWeeks = new Set<string>()  // Track weeks with milestone events
  
  // Auto-coloring will be handled in the color map section
  
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
        borderClass: 'btn',
        backgroundClass: 'custom-color', // We'll apply inline styles
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
      let eventsForWeek = mergedEvents[weekDateStr]
      
      // Also check each day within this week for events (like Gina's implementation)
      for (let day = 0; day < 7; day++) {
        const dayDate = new Date(weekDate)
        dayDate.setDate(dayDate.getDate() + day)
        
        // Don't check dates beyond next birthday
        const nextBirthday = new Date(year + 1, startDate.getMonth(), startDate.getDate())
        if (dayDate >= nextBirthday) break
        
        const dayDateStr = formatDateString(dayDate)
        const eventsForDay = mergedEvents[dayDateStr]
        
        if (eventsForDay && eventsForDay.length > 0) {
          // Add milestone weeks based on week start dates
          const milestoneEvents = eventsForDay.filter(e => e.eventType === 'personal' && e.milestone)
          if (milestoneEvents.length > 0) {
            // Add the week start date to milestone weeks since that's what the box.date will be
            milestoneWeeks.add(weekDateStr)
          }
          // Use the day's events instead of week events
          eventsForWeek = eventsForDay
          break // Use first day with events in this week
        }
      }
      
      if (eventsForWeek && eventsForWeek.length > 0) {
        // Pick the most important event (milestone first, then first event)
        const primaryEvent = eventsForWeek.find(e => e.eventType === 'personal' && e.milestone) || eventsForWeek[0]
        
        // Create tooltip that includes all events in this week
        const allEventDescriptions = eventsForWeek.map(e => {
          const prefix = e.eventType === 'world' ? '🌍 ' : 
                        e.eventType === 'president' ? '🇺🇸 ' : ''
          return prefix + e.headline + (e.description ? ` - ${e.description}` : '')
        }).join('\n')
        
        const eventBox: GridBox = {
          type: 'event',
          label: primaryEvent.headline,
          date: weekDateStr,
          tooltip: createTooltip(weekDateStr, allEventDescriptions),
          borderClass: 'btn',
          backgroundClass: 'custom-color', // We'll apply inline styles
          age: weekAge,
          year,
          eventType: primaryEvent.eventType // Use primary event type for styling
        }
        
        allBoxes.push(eventBox)
      } else {
        // Empty week box
        const weekBox: GridBox = {
          type: 'week',
          label: '',
          date: weekDateStr,
          tooltip: createTooltip(weekDateStr, undefined),
          borderClass: 'btn',
          backgroundClass: 'custom-color', // We'll apply inline styles
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
  // const decadeSections = groupBoxesByDecade(allBoxes) // Unused for now
  
  // Ensure component re-renders when window width changes
  // This is used by the responsive grid constants in processBoxesIntoRows
  React.useEffect(() => {
    // windowWidth change triggers recalculation of responsive grid layout
  }, [windowWidth])
  
  // Create a map to store the color for each box based on milestone progression
  const boxColorMap = new Map<string, string>()
  let colorIndex = 0
  let currentBoxColor = milestoneColors[0]
  
  // First pass: identify all milestone events and their weeks
  const milestoneEventDates = new Set<string>()
  Object.entries(mergedEvents).forEach(([date, events]) => {
    events.forEach(event => {
      if (event.eventType === 'personal' && event.milestone) {
        milestoneEventDates.add(date)
        milestoneWeeks.add(date)
      }
    })
  })
  
  // Also add milestone weeks based on which week boxes actually contain milestone events
  for (const box of allBoxes) {
    if (box.type === 'event') {
      const eventsForBox = mergedEvents[box.date]
      if (eventsForBox?.some(event => event.eventType === 'personal' && event.milestone)) {
        milestoneWeeks.add(box.date)
      }
    }
  }
  
  // Second pass: assign colors based on chronological progression
  // Sort all boxes by date to ensure chronological processing
  const sortedBoxes = [...allBoxes].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  
  for (const box of sortedBoxes) {
    // Check if this box's week contains a milestone event
    if (milestoneWeeks.has(box.date)) {
      colorIndex++
      if (colorIndex < milestoneColors.length) {
        currentBoxColor = milestoneColors[colorIndex]
      }
    }
    
    // Also check for custom color overrides from events
    const eventsForBox = mergedEvents[box.date]
    if (eventsForBox) {
      for (const event of eventsForBox) {
        if (event.eventType === 'personal' && event.milestone && event.color) {
          currentBoxColor = event.color
        }
      }
    }
    
    boxColorMap.set(box.date, currentBoxColor)
  }
  
  // Process all boxes together to get proper row numbering
  const allRows = processBoxesIntoRows(allBoxes)
  
  return (
    <div className="weeks-grid-container">
      {allRows.map((row, globalRowIndex) => (
        <div key={`row-${globalRowIndex}`} className="row-wrapper">
          {row.map((box, boxIndex) => {
            const boxDate = new Date(box.date)
            const isFuture = boxDate > currentDate
            const backgroundColor = isFuture ? '#f0f0f0' : (boxColorMap.get(box.date) || milestoneColors[0])
            
            const combinedStyles: React.CSSProperties = {
              backgroundColor,
              border: '1px solid #ccc'
            }
            
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