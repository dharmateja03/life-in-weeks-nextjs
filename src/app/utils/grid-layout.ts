// Grid Layout Utilities for Life in Weeks
// Implements Gina's complex row-breaking algorithm

export interface GridBox {
  type: 'birthday' | 'event' | 'week'
  label: string
  date: string
  tooltip: string
  borderClass: string
  backgroundClass: string
  age?: number
  year?: number
  eventType?: 'personal' | 'world' | 'president'  // Type of event for styling
}

export interface RowBreakCalculation {
  currentBoxes: number
  newBoxWidth: number
  totalAfterAdd: number
  shouldBreak: boolean
}

// Responsive layout based on actual measured container widths
export const GRID_CONSTANTS = {
  desktop: {
    containerWidth: 668,      // Actual measured width at desktop
    basePadding: 8,           
    charWidth: 8,             
    weekBoxMinWidth: 20,      
  },
  tablet: {
    containerWidth: 573,      // Actual measured width at 769px viewport
    basePadding: 5,           
    charWidth: 7,             
    weekBoxMinWidth: 17,      
  },
  mobile: {
    containerWidth: 737,      // 768px viewport × 96% = 737px available
    basePadding: 4,
    charWidth: 6,
    weekBoxMinWidth: 15,
  },
  extraSmall: {
    containerWidth: 307,      // TODO: Measure actual width
    basePadding: 3,
    charWidth: 5,
    weekBoxMinWidth: 12,
  },
  compact: {
    // Compact mode uses same container widths but smaller cell dimensions
    desktop: {
      containerWidth: 668,    // Same as normal desktop
      basePadding: 1,
      charWidth: 8,
      weekBoxMinWidth: 8,
    },
    tablet: {
      containerWidth: 573,    // Same as normal tablet
      basePadding: 1,
      charWidth: 7,
      weekBoxMinWidth: 6,
    },
    mobile: {
      containerWidth: 461,    // Same as normal mobile
      basePadding: 0,
      charWidth: 6,
      weekBoxMinWidth: 5,
    },
    extraSmall: {
      containerWidth: 307,    // Same as normal extraSmall
      basePadding: 0,
      charWidth: 5,
      weekBoxMinWidth: 4,
    }
  }
}

/**
 * Get appropriate constants based on current viewport width and compact mode
 */
export function getResponsiveConstants(compactMode: boolean = false) {
  if (typeof window === 'undefined') {
    // Server-side rendering fallback
    return compactMode ? GRID_CONSTANTS.compact.desktop : GRID_CONSTANTS.desktop
  }
  
  const width = window.innerWidth
  
  // Determine which breakpoint we're in (matching CSS media queries)
  let breakpoint: 'desktop' | 'tablet' | 'mobile' | 'extraSmall'
  if (width < 480) {
    breakpoint = 'extraSmall'
  } else if (width <= 768) {  // Changed from < to <= to match CSS
    breakpoint = 'mobile'
  } else if (width < 1024) {
    breakpoint = 'tablet'
  } else {
    breakpoint = 'desktop'
  }
  
  // Return compact or normal constants for the same breakpoint
  if (compactMode) {
    return GRID_CONSTANTS.compact[breakpoint]
  } else {
    return GRID_CONSTANTS[breakpoint]
  }
}

/**
 * Calculate the absolute pixel width a text box will take up
 */
export function calculateBoxWidth(label: string, compactMode: boolean = false): number {
  const constants = getResponsiveConstants(compactMode)
  const labelLength = label.length
  
  // Calculate width as: padding + (characters * char width) + padding + border + gap
  const textWidth = labelLength * constants.charWidth
  const totalPadding = constants.basePadding * 2  // Left + right padding
  const borderWidth = 2  // 1px border on each side
  const gapWidth = 1     // 1px gap between cells
  
  return textWidth + totalPadding + borderWidth + gapWidth
}

/**
 * Simple greedy row breaking using absolute pixel widths
 * Break when adding next box would exceed container width
 */
function shouldBreakBeforeBox(currentRowWidth: number, nextBoxLabel: string, compactMode: boolean = false): boolean {
  const constants = getResponsiveConstants(compactMode)
  const nextBoxWidth = nextBoxLabel ? 
    calculateBoxWidth(nextBoxLabel, compactMode) : 
    constants.weekBoxMinWidth + 2 + 1  // Add border + gap for week cells
  const totalAfterAdd = currentRowWidth + nextBoxWidth
  
  return totalAfterAdd >= constants.containerWidth
}

/**
 * Determine if adding a new box would exceed the container width
 * Uses absolute pixel calculations
 */
export function shouldBreakRow(currentWidth: number, newBoxLabel: string, compactMode: boolean = false): RowBreakCalculation {
  const constants = getResponsiveConstants(compactMode)
  const newBoxWidth = calculateBoxWidth(newBoxLabel, compactMode)
  const totalAfterAdd = currentWidth + newBoxWidth
  
  return {
    currentBoxes: currentWidth,  // Now represents pixels, not box count
    newBoxWidth,
    totalAfterAdd,
    shouldBreak: totalAfterAdd >= constants.containerWidth
  }
}

/**
 * Process boxes into rows using absolute pixel width calculations
 * Break when adding next box would exceed container width
 */
export function processBoxesIntoRows(boxes: GridBox[], compactMode: boolean = false): GridBox[][] {
  const constants = getResponsiveConstants(compactMode)
  const rows: GridBox[][] = []
  let currentRow: GridBox[] = []
  let currentRowWidth = 0
  
  for (let i = 0; i < boxes.length; i++) {
    const box = boxes[i]
    const boxWidth = box.type === 'week' ? 
      constants.weekBoxMinWidth + 2 + 1 :  // Add border + gap for week cells
      calculateBoxWidth(box.label, compactMode)
    
    // Check if we need to break before adding this box
    if (shouldBreakBeforeBox(currentRowWidth, box.label, compactMode) && currentRow.length > 0) {
      // Finish current row and start new one
      rows.push([...currentRow])
      currentRow = []
      currentRowWidth = 0
    }
    
    // Add box to current row
    currentRow.push(box)
    currentRowWidth += boxWidth
  }
  
  // Add final row if it has content
  if (currentRow.length > 0) {
    rows.push(currentRow)
  }
  
  return rows
}

/**
 * Group boxes by decade for navigation anchors
 * Matches Gina's decade section logic
 */
export interface DecadeSection {
  decadeId: string
  age: number
  boxes: GridBox[]
}

export function groupBoxesByDecade(boxes: GridBox[]): DecadeSection[] {
  const decades: Map<number, GridBox[]> = new Map()
  
  for (const box of boxes) {
    if (box.age !== undefined) {
      const decade = Math.floor(box.age / 10) * 10
      
      if (!decades.has(decade)) {
        decades.set(decade, [])
      }
      
      decades.get(decade)!.push(box)
    }
  }
  
  // Convert to sorted array
  return Array.from(decades.entries())
    .sort(([a], [b]) => a - b)
    .map(([decade, boxes]) => ({
      decadeId: `decade-${decade}`,
      age: decade,
      boxes
    }))
}

/**
 * Create tooltip text matching Gina's format
 */
export function createTooltip(
  date: string, 
  description?: string, 
  doing?: string, 
  association?: string, 
  based?: string
): string {
  const formattedDate = formatTooltipDate(date)
  
  if (description) {
    return `${formattedDate} – ${description}`
  }
  
  // Build context string for empty weeks
  const contexts: string[] = []
  
  if (doing) {
    contexts.push(doing)
  }
  
  if (association) {
    contexts.push(`at ${association}`)
  }
  
  if (based) {
    contexts.push(`based in ${based}`)
  }
  
  const contextString = contexts.join(', ')
  return `${formattedDate} – ${contextString}`
}

/**
 * Format date for tooltip display (Jan 2, 2006 format)
 */
export function formatTooltipDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric', 
    year: 'numeric'
  })
}

/**
 * Create birthday box label matching Gina's format
 */
export function createBirthdayLabel(age: number, year: number, compactMode: boolean = false): string {
  if (compactMode) {
    return `🎂${age}`
  }
  return `🎂 ${age} in ${year}`
}

/**
 * Create birthday tooltip matching Gina's format
 */
export function createBirthdayTooltip(date: string, age: number): string {
  const formattedDate = formatTooltipDate(date)
  const yearText = age === 1 ? "year" : "years"
  return `${formattedDate} – Turned ${age} ${yearText} old`
}

/**
 * Extract first emoji from a string
 */
export function extractFirstEmoji(text: string): string | null {
  // More comprehensive emoji regex covering all major Unicode emoji blocks
  const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]{2}|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1F018}-\u{1F270}]|[\u{1F000}-\u{1F02F}]|[\u{1F0A0}-\u{1F0FF}]/u
  
  const match = text.match(emojiRegex)
  if (match) {
    // Handle flag emojis (which are 2 characters)
    if (match[0].length === 1 && match.index !== undefined) {
      const nextChar = text.charAt(match.index + 1)
      if (nextChar && /[\u{1F1E0}-\u{1F1FF}]/u.test(nextChar)) {
        return match[0] + nextChar // Return the full flag emoji
      }
    }
    return match[0]
  }
  return null
}

/**
 * Create compact event label (emoji only, or empty if no emoji)
 */
export function createCompactEventLabel(headline: string): string {
  const emoji = extractFirstEmoji(headline)
  return emoji || '' // Return emoji or empty string
}

/**
 * Determine if event should be shown in compact mode
 */
export function shouldShowInCompact(headline: string): boolean {
  return extractFirstEmoji(headline) !== null
}

