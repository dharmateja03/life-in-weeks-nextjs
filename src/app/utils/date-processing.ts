// Date Processing Utilities for Life in Weeks
// Handles date calculations, week generation, and timeline processing

import { WEEKS_CONFIG } from '../data/life-events'

export interface WeekData {
  date: Date
  dateString: string
  week: number
  year: number
  age: number
  isCurrentWeek: boolean
  isFutureWeek: boolean
  isBirthday: boolean
}

/**
 * Generate all weeks from start date to end year
 * Matches Gina's Hugo logic for week generation
 */
export function generateWeeklyData(startDateStr: string, endYear: number): WeekData[] {
  const startDate = new Date(startDateStr)
  const currentDate = new Date()
  const weeks: WeekData[] = []
  
  // Start from the birth date
  const currentWeek = new Date(startDate)
  
  while (currentWeek.getFullYear() <= endYear) {
    const weekData: WeekData = {
      date: new Date(currentWeek),
      dateString: formatDateString(currentWeek),
      week: getWeekOfYear(currentWeek),
      year: currentWeek.getFullYear(),
      age: getAge(currentWeek, startDate),
      isCurrentWeek: isSameWeek(currentWeek, currentDate),
      isFutureWeek: currentWeek > currentDate,
      isBirthday: isBirthdayWeek(currentWeek, startDate)
    }
    
    weeks.push(weekData)
    
    // Advance by one week (7 days)
    currentWeek.setDate(currentWeek.getDate() + 7)
  }
  
  return weeks
}

/**
 * Format date as YYYY-MM-DD string to match Gina's event keys
 */
export function formatDateString(date: Date): string {
  return date.toISOString().split('T')[0]
}

/**
 * Get week number within the year (0-52)
 * Matches Hugo's week calculation logic
 */
export function getWeekOfYear(date: Date): number {
  const yearStart = new Date(date.getFullYear(), parseInt(WEEKS_CONFIG.startMonth) - 1, parseInt(WEEKS_CONFIG.startDay))
  const diffTime = date.getTime() - yearStart.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  return Math.floor(diffDays / 7)
}

/**
 * Calculate age in years at given date
 */
export function getAge(date: Date, birthDate: Date): number {
  const yearDiff = date.getFullYear() - birthDate.getFullYear()
  const monthDiff = date.getMonth() - birthDate.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && date.getDate() < birthDate.getDate())) {
    return yearDiff - 1
  }
  
  return yearDiff
}

/**
 * Check if two dates are in the same week
 */
export function isSameWeek(date1: Date, date2: Date): boolean {
  const diffTime = Math.abs(date2.getTime() - date1.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays <= 7
}

/**
 * Check if a date is a birthday week (matches birth month/day)
 */
export function isBirthdayWeek(date: Date, birthDate: Date): boolean {
  return date.getMonth() === birthDate.getMonth() && 
         Math.abs(date.getDate() - birthDate.getDate()) <= 7
}

/**
 * Get the next birthday date for a given year
 */
export function getNextBirthday(year: number, birthDate: Date): Date {
  return new Date(year + 1, birthDate.getMonth(), birthDate.getDate())
}

/**
 * Calculate which decade a given age falls into (0, 10, 20, 30, etc.)
 */
export function getDecade(age: number): number {
  return Math.floor(age / 10) * 10
}

/**
 * Generate decade anchor IDs matching Gina's navigation system
 */
export function getDecadeId(age: number): string {
  const decade = getDecade(age)
  return `decade-${decade}`
}

/**
 * Get all decade milestones for navigation (Birth, Teens, 20s, etc.)
 */
export function getDecadeMilestones(endYear: number, startYear: number): Array<{id: string, label: string, age: number}> {
  const milestones = [
    { id: 'decade-0', label: 'Birth', age: 0 }
  ]
  
  const maxAge = endYear - startYear
  
  for (let decade = 10; decade <= maxAge; decade += 10) {
    if (decade === 10) {
      milestones.push({ id: `decade-${decade}`, label: 'Teens', age: decade })
    } else if (decade === 100) {
      milestones.push({ id: `decade-${decade}`, label: '100', age: decade })
    } else {
      milestones.push({ id: `decade-${decade}`, label: `${decade}s`, age: decade })
    }
  }
  
  return milestones
}

/**
 * Process a date range to get all days within a week
 * Used for checking daily events within weekly periods
 */
export function getDaysInWeek(weekStartDate: Date): Date[] {
  const days: Date[] = []
  
  for (let i = 0; i < 7; i++) {
    const day = new Date(weekStartDate)
    day.setDate(day.getDate() + i)
    days.push(day)
  }
  
  return days
}

/**
 * Check if a date falls within a given year's timeline
 * Used to match Hugo's year boundary logic
 */
export function isWithinYear(date: Date, year: number, startMonth: number, startDay: number): boolean {
  const yearStart = new Date(year, startMonth - 1, startDay)
  const yearEnd = new Date(year + 1, startMonth - 1, startDay)
  
  return date >= yearStart && date < yearEnd
}

/**
 * Get the Sunday of the week containing the given date
 * Ensures all weeks start on Sunday (day 0)
 */
export function getWeekStartSunday(date: Date): Date {
  const weekStart = new Date(date)
  const dayOfWeek = weekStart.getDay() // 0 = Sunday, 1 = Monday, etc.
  weekStart.setDate(weekStart.getDate() - dayOfWeek)
  return weekStart
}

/**
 * Parse date string (YYYY-MM-DD) without timezone issues
 * Avoids UTC conversion that causes 1-day offset in some timezones
 */
function parseLocalDate(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(year, month - 1, day) // month is 0-indexed
}

/**
 * Format date for tooltip display based on privacy settings
 * If showFullDate is false, returns only month/year (e.g., "Oct 1986")
 */
export function formatTooltipDate(dateString: string, showFullDate: boolean = true): string {
  const date = parseLocalDate(dateString)
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  
  if (showFullDate) {
    const day = date.getDate()
    return `${month} ${day}, ${year}`
  } else {
    return `${month} ${year}`
  }
}