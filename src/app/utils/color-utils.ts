// Simplified Color Utilities for Life in Weeks
// Handles background color continuity only - borders are constant

import { toClassName, getColorValue } from '../data/color-mappings'

export interface ColorState {
  doing: string
  doingClass: string
  association: string
}

/**
 * Initialize color state with default values from first event
 * Simplified to only track doing/activity for background colors
 */
export function initializeColorState(): ColorState {
  return {
    doing: "I was tiny",
    doingClass: "i-was-tiny",
    association: ""
  }
}

/**
 * Update color state when an event changes activity
 * Simplified to only update doing/activity for background colors
 * Location (based) is ignored as borders are now constant
 */
export function updateColorState(
  currentState: ColorState,
  eventDoing?: string, 
  eventAssociation?: string
): ColorState {
  const newState = { ...currentState }
  
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
 * Simplified to only include background color class
 */
export function generateBoxClasses(
  baseClasses: string,
  colorState: ColorState,
  additionalClasses: string = ""
): string {
  const classes = [
    baseClasses,
    colorState.doingClass,
    additionalClasses
  ].filter(Boolean)
  
  return classes.join(" ")
}

/**
 * Generate inline styles for boxes with dynamic background colors
 * Simplified to only handle background colors (borders are constant)
 */
export function generateBoxStyles(colorState: ColorState): React.CSSProperties {
  const backgroundColor = getColorValue(colorState.doingClass)
  
  const styles: React.CSSProperties = {}
  
  if (backgroundColor) {
    styles.backgroundColor = backgroundColor
  }
  
  return styles
}

/**
 * Get background color value with fallback for undefined mappings
 */
export function getColorWithFallback(
  className: string,
  fallback: string = 'inherit'
): string {
  return getColorValue(className) || fallback
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
 * Simplified to only check doing/activity fields
 */
export function validateColorState(state: ColorState): boolean {
  return !!(
    state.doing &&
    state.doingClass &&
    state.association !== undefined
  )
}

