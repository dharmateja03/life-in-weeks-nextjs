// Color Utilities for Life in Weeks
// Handles color continuity and CSS class generation

import { toClassName, getColorValue } from '../data/color-mappings'

export interface ColorState {
  based: string
  basedClass: string
  doing: string
  doingClass: string
  association: string
}

/**
 * Initialize color state with default values from first event
 * Matches Gina's Hugo logic for setting starting values
 */
export function initializeColorState(): ColorState {
  return {
    based: "Brooklyn",
    basedClass: "brooklyn", 
    doing: "I was tiny",
    doingClass: "i-was-tiny",
    association: ""
  }
}

/**
 * Update color state when an event changes location or activity
 * Only updates fields that are explicitly provided
 */
export function updateColorState(
  currentState: ColorState,
  eventBased?: string,
  eventDoing?: string, 
  eventAssociation?: string
): ColorState {
  const newState = { ...currentState }
  
  if (eventBased) {
    newState.based = eventBased
    newState.basedClass = toClassName(eventBased)
  }
  
  if (eventDoing) {
    newState.doing = eventDoing
    newState.doingClass = toClassName(eventDoing)
  }
  
  if (eventAssociation !== undefined) {
    newState.association = eventAssociation
  }
  
  return newState
}

/**
 * Generate CSS classes for a box based on current color state
 * Matches Gina's button class generation logic
 */
export function generateBoxClasses(
  baseClasses: string,
  colorState: ColorState,
  additionalClasses: string = ""
): string {
  const classes = [
    baseClasses,
    colorState.basedClass,
    colorState.doingClass,
    additionalClasses
  ].filter(Boolean)
  
  return classes.join(" ")
}

/**
 * Generate inline styles for boxes with dynamic colors
 * Used when CSS classes aren't sufficient
 */
export function generateBoxStyles(colorState: ColorState): React.CSSProperties {
  const borderColor = getColorValue(colorState.basedClass, 'border')
  const backgroundColor = getColorValue(colorState.doingClass, 'background-color')
  
  const styles: React.CSSProperties = {}
  
  if (borderColor) {
    styles.borderColor = borderColor
  }
  
  if (backgroundColor) {
    styles.backgroundColor = backgroundColor
  }
  
  return styles
}

/**
 * Get color value with fallback for undefined mappings
 */
export function getColorWithFallback(
  className: string, 
  element: 'border' | 'background-color',
  fallback: string = 'inherit'
): string {
  return getColorValue(className, element) || fallback
}

/**
 * Create future box styling (different colors for dates after today)
 * Matches Gina's .future-date CSS class logic
 */
export function getFutureBoxStyles(): React.CSSProperties {
  return {
    backgroundColor: '#eee',
    borderColor: '#dee2e6'
  }
}

/**
 * Validate that a color state has all required fields
 */
export function validateColorState(state: ColorState): boolean {
  return !!(
    state.based &&
    state.basedClass &&
    state.doing &&
    state.doingClass &&
    state.association !== undefined
  )
}

/**
 * Debug helper to log color state changes
 */
export function logColorStateChange(
  oldState: ColorState, 
  newState: ColorState, 
  eventDate: string
): void {
  const changes: string[] = []
  
  if (oldState.based !== newState.based) {
    changes.push(`based: ${oldState.based} → ${newState.based}`)
  }
  
  if (oldState.doing !== newState.doing) {
    changes.push(`doing: ${oldState.doing} → ${newState.doing}`)
  }
  
  if (oldState.association !== newState.association) {
    changes.push(`association: "${oldState.association}" → "${newState.association}"`)
  }
  
  if (changes.length > 0) {
    console.log(`Color state change on ${eventDate}:`, changes.join(', '))
  }
}