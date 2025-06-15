// Application Configuration
// Central configuration file for Life in Weeks app settings

export interface AppConfig {
  // Display Settings
  maxAge: number                    // Maximum age to display (years)
  
  // Default Overlay States
  defaultShowWorldEvents: boolean   // Show world events overlay by default
  defaultShowPresidents: boolean    // Show US presidents overlay by default
  
  // Personal Timeline Settings
  birthDate: string                 // User's birth date (YYYY-MM-DD)
  name: string                      // User's display name
  website?: string                  // User's personal website
  
  // Grid Display Settings
  showRowNumbers: boolean           // Display row numbers in grid
  showBirthdayMarkers: boolean      // Show birthday markers
  
  // Life Expectancy Settings
  showLifeExpectancy: boolean       // Show life expectancy marker
  lifeExpectancyAge: number         // Age for life expectancy marker
  showJapanLifeExpectancy: boolean  // Show Japan male life expectancy marker
  japanLifeExpectancyAge: number    // Japan male life expectancy age
  
  // Responsive Settings
  debounceResizeMs: number          // Debounce time for window resize events
}

// Default configuration
export const APP_CONFIG: AppConfig = {
  // Display Settings
  maxAge: 85,                       // Show until 85 years old
  
  // Default Overlay States 
  defaultShowWorldEvents: true,     // Show world events for historical context
  defaultShowPresidents: false,     // US presidents off by default (can be enabled if needed)
  
  // Personal Timeline Settings
  birthDate: "PLACEHOLDER_BIRTH_DATE",
  name: "Ran Ding",
  website: "https://dingran.me",
  
  // Grid Display Settings
  showRowNumbers: false,            // Clean look without row numbers
  showBirthdayMarkers: true,        // Keep birthday markers for navigation
  
  // Life Expectancy Settings
  showLifeExpectancy: true,         // Show life expectancy marker for perspective
  lifeExpectancyAge: 77,            // US male life expectancy
  showJapanLifeExpectancy: true,    // Show Japan comparison
  japanLifeExpectancyAge: 82,       // Japan male life expectancy
  // Source: https://www.worldometers.info/demographics/life-expectancy/
  // US Life Expectancy 2024: Total 79.25, Male 76.94, Female 81.65
  // Japan Life Expectancy 2024: Total 84.95, Male 82+ (from updated data)
  // Using rounded values: US 77, Japan 82
  
  // Responsive Settings
  debounceResizeMs: 150,            // Smooth resize handling
}

// Derived configuration values
export const DERIVED_CONFIG = {
  // Extract birth year from date (calculated once)
  birthYear: parseInt(APP_CONFIG.birthDate.split('-')[0]),
  
  // Extract birth date components
  birthMonth: APP_CONFIG.birthDate.split('-')[1],
  birthDay: APP_CONFIG.birthDate.split('-')[2],
  
  // Calculate derived years
  get endYear() { return this.birthYear + APP_CONFIG.maxAge },
  get lifeExpectancyYear() { return this.birthYear + APP_CONFIG.lifeExpectancyAge },
  get japanLifeExpectancyYear() { return this.birthYear + APP_CONFIG.japanLifeExpectancyAge },
  
  // Calculate life expectancy dates
  get lifeExpectancyDate() { 
    return `${this.lifeExpectancyYear}-${this.birthMonth}-${this.birthDay}`
  },
  get japanLifeExpectancyDate() {
    return `${this.japanLifeExpectancyYear}-${this.birthMonth}-${this.birthDay}`
  },
  
  // Generate life expectancy labels
  get lifeExpectancyLabel() {
    return `🇺🇸 US Male Life Expectancy (${APP_CONFIG.lifeExpectancyAge} years)`
  },
  get japanLifeExpectancyLabel() {
    return `🇯🇵 Japan Male Life Expectancy (${APP_CONFIG.japanLifeExpectancyAge} years)`
  },
  
  // App metadata
  title: `${APP_CONFIG.name}'s Life in Weeks`,
  description: `This is a map of ${APP_CONFIG.name}'s life, where each week I've been alive is a little box.`,
}