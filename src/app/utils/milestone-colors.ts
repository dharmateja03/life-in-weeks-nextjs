// Automatic Milestone Color Generation
// Generates colors based on actual milestone events in the data

import { lifeEvents } from '../data/life-events'

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
export function detectMilestoneEvents() {
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
export function generateMilestoneColors(): string[] {
  const milestoneEvents = detectMilestoneEvents()
  
  // Generate colors for each milestone
  const colors = milestoneEvents.map((_, index) => getColorAtIndex(index))
  
  // Validation
  console.log(`✅ Generated ${colors.length} colors for ${milestoneEvents.length} milestones`)
  if (colors.length !== milestoneEvents.length) {
    console.warn(`⚠️ Color count mismatch: ${colors.length} colors vs ${milestoneEvents.length} milestones`)
  }
  
  return colors
}

// Validate color mapping and provide debug info
export function validateColorMapping() {
  const milestoneEvents = detectMilestoneEvents()
  const generatedColors = generateMilestoneColors()
  
  console.group('🎨 Milestone Color Mapping')
  console.log(`Total milestone events: ${milestoneEvents.length}`)
  console.log(`Generated colors: ${generatedColors.length}`)
  
  milestoneEvents.forEach((milestone, index) => {
    const color = generatedColors[index]
    console.log(`${index}: ${milestone.date} - ${milestone.event.headline} → ${color}`)
  })
  console.groupEnd()
  
  return {
    isValid: generatedColors.length === milestoneEvents.length,
    milestoneCount: milestoneEvents.length,
    colorCount: generatedColors.length,
    events: milestoneEvents,
    colors: generatedColors
  }
}

// Export the automatically generated colors
export const milestoneColors = generateMilestoneColors()

// Development helper - call in dev mode to see mapping
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  validateColorMapping()
}