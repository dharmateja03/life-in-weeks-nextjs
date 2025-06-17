// Automatic Milestone Color Generation
// Generates colors based on actual milestone events in the data

import { EventsData } from '../data/life-events'

// Base color palette - can be extended as needed
const COLOR_PALETTE = [
  "#ffffff",    // White - for birth
  "#BBDEFB",    // Medium blue
  "#B3E5FC",    // Medium cyan  
  "#C8E6C9",    // Medium green
  "#FFE0B2",    // Medium orange
  "#E1BEE7",    // Medium purple
  "#FFF9C4",    // Medium yellow
  "#FFCDD2",    // Medium pink
  "#E8D5FF",    // Light lavender
  "#B2DFDB",    // Medium teal
  "#FFCCCB",    // Light coral
  "#FFE4B5",    // Light peach
  "#D1C4E9",    // Light purple
  "#F8BBD9",    // Light pink
  "#C5E1A5",    // Light lime
  "#FFAB91",    // Light orange
  "#80DEEA",    // Light cyan
  "#F48FB1",    // Medium pink
  "#CE93D8",    // Medium purple
  "#A5D6A7",    // Medium light green
]

// HSL-based color generation for unlimited colors
function generateHSLColor(index: number): string {
  const hue = (index * 137.5) % 360 // Golden angle for good distribution
  const saturation = 45 + (index % 3) * 15 // 45%, 60%, 75%
  const lightness = 75 + (index % 2) * 10  // 75%, 85%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

// Get color for a given index with automatic fallback
function getColorAtIndex(index: number): string {
  if (index < COLOR_PALETTE.length) {
    return COLOR_PALETTE[index]
  }
  // Generate HSL colors for indices beyond the palette
  return generateHSLColor(index - COLOR_PALETTE.length)
}

// Auto-detect milestone events from life events data
export function detectMilestoneEvents(lifeEvents: EventsData) {
  const milestoneEvents = Object.entries(lifeEvents)
    .filter(([, events]) => events.some(event => event.milestone))
    .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
    .map(([date, events]) => ({
      date,
      event: events.find(e => e.milestone)!
    }))

  return milestoneEvents
}

// Generate milestone colors automatically based on detected events
export function generateMilestoneColors(lifeEvents: EventsData): string[] {
  const milestoneEvents = detectMilestoneEvents(lifeEvents)
  
  // Generate colors for each milestone
  const colors = milestoneEvents.map((_, index) => getColorAtIndex(index))
  
  // Validation
  if (colors.length !== milestoneEvents.length) {
    throw new Error(`Color count mismatch: ${colors.length} colors vs ${milestoneEvents.length} milestones`)
  }
  
  return colors
}