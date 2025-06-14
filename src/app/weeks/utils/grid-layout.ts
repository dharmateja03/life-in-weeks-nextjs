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
}

export interface RowBreakCalculation {
  currentBoxes: number
  newBoxWidth: number
  totalAfterAdd: number
  shouldBreak: boolean
}

// Responsive layout based on smallest screen in each breakpoint range
export const GRID_CONSTANTS = {
  desktop: {
    containerWidth: 614,      // 1024px viewport × 60% = 614px available
    basePadding: 8,           
    charWidth: 8,             
    weekBoxMinWidth: 20,      
  },
  tablet: {
    containerWidth: 560,      // Reduced for better layout
    basePadding: 5,           
    charWidth: 7,             
    weekBoxMinWidth: 17,      
  },
  mobile: {
    containerWidth: 462,      // 481px viewport × 96% = 462px available
    basePadding: 4,
    charWidth: 6,
    weekBoxMinWidth: 15,
  },
  extraSmall: {
    containerWidth: 307,      // 320px viewport × 96% = 307px available
    basePadding: 3,
    charWidth: 5,
    weekBoxMinWidth: 12,
  }
}

/**
 * Get appropriate constants based on current viewport width
 */
export function getResponsiveConstants() {
  if (typeof window === 'undefined') {
    // Server-side rendering fallback
    console.log('📱 BREAKPOINT: Server-side (using desktop defaults)')
    return GRID_CONSTANTS.desktop
  }
  
  const width = window.innerWidth
  
  if (width < 480) {
    console.log(`📱 BREAKPOINT: Extra Small (${width}px) - ${GRID_CONSTANTS.extraSmall.containerWidth}px container`)
    return GRID_CONSTANTS.extraSmall
  } else if (width < 768) {
    console.log(`📱 BREAKPOINT: Mobile (${width}px) - ${GRID_CONSTANTS.mobile.containerWidth}px container`)
    return GRID_CONSTANTS.mobile
  } else if (width < 1024) {
    console.log(`📱 BREAKPOINT: Tablet (${width}px) - ${GRID_CONSTANTS.tablet.containerWidth}px container`)
    return GRID_CONSTANTS.tablet
  } else {
    console.log(`📱 BREAKPOINT: Desktop (${width}px) - ${GRID_CONSTANTS.desktop.containerWidth}px container`)
    return GRID_CONSTANTS.desktop
  }
}

/**
 * Calculate the absolute pixel width a text box will take up
 */
export function calculateBoxWidth(label: string): number {
  const constants = getResponsiveConstants()
  const labelLength = label.length
  
  // Calculate width as: padding + (characters * char width) + padding
  const textWidth = labelLength * constants.charWidth
  const totalPadding = constants.basePadding * 2  // Left + right padding
  const borderWidth = 2  // 1px border on each side
  
  return textWidth + totalPadding + borderWidth
}

/**
 * Simple greedy row breaking using absolute pixel widths
 * Break when adding next box would exceed container width
 */
function shouldBreakBeforeBox(currentRowWidth: number, nextBoxLabel: string): boolean {
  const constants = getResponsiveConstants()
  const nextBoxWidth = nextBoxLabel ? calculateBoxWidth(nextBoxLabel) : constants.weekBoxMinWidth
  const totalAfterAdd = currentRowWidth + nextBoxWidth
  
  return totalAfterAdd >= constants.containerWidth
}

/**
 * Determine if adding a new box would exceed the container width
 * Uses absolute pixel calculations
 */
export function shouldBreakRow(currentWidth: number, newBoxLabel: string): RowBreakCalculation {
  const constants = getResponsiveConstants()
  const newBoxWidth = calculateBoxWidth(newBoxLabel)
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
export function processBoxesIntoRows(boxes: GridBox[]): GridBox[][] {
  const constants = getResponsiveConstants()
  const rows: GridBox[][] = []
  let currentRow: GridBox[] = []
  let currentRowWidth = 0
  
  for (let i = 0; i < boxes.length; i++) {
    const box = boxes[i]
    const boxWidth = box.type === 'week' ? constants.weekBoxMinWidth : calculateBoxWidth(box.label)
    
    // Check if we need to break before adding this box
    if (shouldBreakBeforeBox(currentRowWidth, box.label) && currentRow.length > 0) {
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
export function createBirthdayLabel(age: number, year: number): string {
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
 * Debug helper to log row breaking calculations
 */
export function debugRowBreaking(boxes: GridBox[]): void {
  console.log('Row Breaking Debug:')
  let currentRowBoxes = 0
  let rowNumber = 1
  
  for (const box of boxes) {
    const breakCheck = shouldBreakRow(currentRowBoxes, box.label)
    
    if (breakCheck.shouldBreak && currentRowBoxes > 0) {
      console.log(`Row ${rowNumber} complete with ${currentRowBoxes} boxes`)
      rowNumber++
      currentRowBoxes = 0
    }
    
    const boxWidth = box.type === 'week' ? 1 : calculateBoxWidth(box.label)
    currentRowBoxes += boxWidth
    
    console.log(`  ${box.type}: "${box.label}" (width: ${boxWidth}, total: ${currentRowBoxes})`)
  }
  
  console.log(`Final row ${rowNumber} with ${currentRowBoxes} boxes`)
}