# Life in Weeks - Next.js

A visual representation of life where each week you've been alive is displayed as a little box. This project is a Next.js adaptation inspired by the original concept from Wait But Why and Gina Trapani's Hugo implementation.

## 🎯 About

This is a map of life, where each week represents a small box in a grid. The visualization helps put life into perspective by showing the finite nature of time and encouraging reflection on how we spend our weeks.

## 🌟 Inspiration & Attribution

This project is built upon the shoulders of giants:

- **Original Concept**: [Life in Weeks](https://waitbutwhy.com/2014/05/life-weeks.html) by Tim Urban at Wait But Why
- **Hugo Implementation**: [Gina Trapani's Life in Weeks](https://github.com/ginatrapani/life-in-weeks) - The original code this project adapts from
- **Design & Algorithm**: Adapted from [Buster Benson's implementation](https://busterbenson.com/life-in-weeks)

### What This Project Does

This is a **Hugo to Next.js adaptation** of Gina Trapani's excellent Life in Weeks implementation. We've:

- ✅ **Converted from Hugo to Next.js** - Modern React-based implementation
- ✅ **Preserved Gina's algorithms** - Row breaking, decade navigation, color coding
- ✅ **Enhanced responsive design** - Pixel-perfect layout calculations for all screen sizes
- ✅ **Maintained visual fidelity** - Matches the original design and user experience
- ✅ **Added modern optimizations** - TypeScript, responsive breakpoints, smooth scrolling

## 🚀 Features

- **Responsive Grid Layout**: Automatically adjusts for desktop, tablet, and mobile screens
- **Decade Navigation**: Sticky header with progress tracking as you scroll through decades
- **Event Timeline**: Add important life events with custom colors and descriptions
- **Smooth Interactions**: Hover effects, tooltips, and smooth scrolling navigation
- **Pixel-Perfect Responsive**: Uses real container width calculations for accurate layout
- **Color-Coded Life Phases**: Visual representation of different periods (school, work, locations)

## 🛠️ Tech Stack

- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript for type safety
- **Styling**: Custom CSS (no framework dependencies)
- **Deployment**: Ready for Vercel, Netlify, or any static hosting

## 📦 Getting Started

### Prerequisites

- Node.js 18+ 
- Yarn or npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd life-in-weeks-nextjs

# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build
```

### Configuration

1. **Update Life Events**: Edit `src/app/data/life-events.ts` with your personal timeline
2. **Customize Settings**: Modify `WEEKS_CONFIG` in the same file (start date, end year, etc.)
3. **Personalize Content**: Update the intro text in `src/app/page.tsx`

## 📁 Project Structure

```
src/
├── app/
│   ├── components/               # React components
│   │   ├── sticky-header.tsx     # Decade navigation
│   │   ├── weeks-grid.tsx        # Main grid component
│   │   └── week-box.tsx          # Individual week/event boxes
│   ├── config/                   # Central configuration
│   │   └── app-config.ts         # All app settings & toggles
│   ├── data/                     # Data sources
│   │   ├── life-events.ts        # Your personal timeline
│   │   ├── world-events.ts       # Historical events overlay
│   │   ├── us-presidents.ts      # Presidential terms overlay
│   │   └── color-mappings.ts     # Legacy color definitions
│   ├── utils/                    # Utility functions
│   │   ├── milestone-colors.ts   # Automatic color generation
│   │   ├── grid-layout.ts        # Row breaking algorithms
│   │   ├── date-processing.ts    # Date utilities
│   │   └── color-utils.ts        # Color and styling logic
│   ├── weeks.css                 # All styling (clean, organized)
│   ├── page.tsx                  # Main page component (displays at /)
│   └── layout.tsx                # Root layout
```

## 📊 Data Sources & Configuration

This project uses a sophisticated data-driven approach with automatic color generation and configurable overlays.

### Core Configuration

**File**: `src/app/config/app-config.ts`

Central configuration controlling all app behavior:

```typescript
export const APP_CONFIG: AppConfig = {
  // Personal Settings
  birthDate: "1990-01-15",              // Your birth date
  name: "John Doe",                     // Display name
  website: "https://johndoe.dev",       // Personal website
  maxAge: 85,                           // Years to display
  
  // Display Features
  showRowNumbers: false,                // Hide row numbers for clean look
  showBirthdayMarkers: true,            // Show age markers
  showLifeExpectancy: true,             // US life expectancy line
  lifeExpectancyAge: 77,               // US male average
  showJapanLifeExpectancy: true,        // Japan comparison
  japanLifeExpectancyAge: 82,          // Japan male average
  
  // Data Overlays (toggleable)
  defaultShowWorldEvents: true,         // Historical events
  defaultShowPresidents: false,         // US presidents (off by default)
}
```

### Life Events Data

**File**: `src/app/data/life-events.ts`

Your personal timeline with milestone detection:

```typescript
export const lifeEvents: EventsData = {
  "YYYY-MM-DD": [
    {
      headline: "🎓 Event title",           // Short title with emoji
      description: "Detailed description",  // Optional longer description
      based: "Location",                    // Where you were living
      doing: "Activity/Role",               // What you were doing
      association: "Organization",          // Company, school, etc.
      milestone: true                       // Major life phase marker
    }
  ]
}
```

**Example Milestone Events**: Automatically detected events that trigger color changes:
1. Elementary school → Medium blue
2. Middle school → Medium cyan  
3. High school → Medium green
4. College → Medium orange
5. Graduate school → Medium purple
6. First job → Medium yellow
7. Career change → Medium pink
8. Current role → Light lavender

### World Events Data

**File**: `src/app/data/world-events.ts`

Historical context overlay (1986-present):

```typescript
export const worldEvents: Record<string, WorldEvent[]> = {
  "1989-03-12": [{ 
    headline: "🌐 World Wide Web Invented", 
    description: "Tim Berners-Lee creates the web at CERN",
    category: "technology" 
  }],
  "2001-09-11": [{ 
    headline: "🏢 9/11 Attacks", 
    description: "Twin Towers destroyed",
    category: "war" 
  }]
}
```

Categories: `technology`, `politics`, `war`, `disaster`, `culture`

### US Presidents Data

**File**: `src/app/data/us-presidents.ts`

Presidential terms overlay (optional):

```typescript
export const usPresidents: Record<string, PresidentEvent[]> = {
  "1981-01-20": [{ 
    headline: "🇺🇸 Reagan (R)",
    president: "Ronald Reagan",
    party: "Republican",
    termNumber: 40 
  }]
}
```

## 🎨 Automatic Color System

**File**: `src/app/utils/milestone-colors.ts`

Revolutionary self-maintaining color system:

### How It Works

1. **Auto-Detection**: Scans `lifeEvents` for `milestone: true` events
2. **Chronological Sorting**: Orders milestones by date automatically  
3. **Smart Color Assignment**: 
   - Uses predefined palette for first 20 colors
   - Generates HSL colors for unlimited milestones
   - Maintains visual consistency
4. **Validation**: Built-in checks ensure colors match events

### Color Generation

```typescript
// Base palette (manually curated for visual appeal)
const COLOR_PALETTE = [
  "#ffffff",    // White - birth
  "#BBDEFB",    // Medium blue - elementary
  "#B3E5FC",    // Medium cyan - middle school
  // ... 17 more colors
]

// HSL generation for unlimited colors
function generateHSLColor(index: number): string {
  const hue = (index * 137.5) % 360     // Golden angle distribution
  const saturation = 45 + (index % 3) * 15  // 45%, 60%, 75%
  const lightness = 75 + (index % 2) * 10   // 75%, 85%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}
```

### Benefits

- **🔄 Self-Healing**: Add/remove milestones → colors auto-adjust
- **📊 Debug Info**: Console logs show exact event→color mapping
- **🎯 Accuracy**: Colors always match your actual data
- **♾️ Scalable**: Unlimited milestone support

## 🏗️ Rendering Logic

### Grid Generation Algorithm

**File**: `src/app/components/weeks-grid.tsx`

The core rendering logic creates exactly 52 weeks per year:

```typescript
// 1. Generate chronological timeline
for (let year = startYear; year <= endYear; year++) {
  // Add birthday marker (except birth year)
  if (age > 0) addBirthdayBox(year)
  
  // Generate 53 weeks (0-52), but cap at next birthday
  for (let week = 0; week <= 52; week++) {
    const weekDate = calculateWeekDate(year, week)
    if (weekDate >= nextBirthday) break  // Maintain 52-week years
    
    // Check for events in this week (day-by-day scan)
    const eventsThisWeek = findEventsInWeek(weekDate)
    
    if (eventsThisWeek.length > 0) {
      // Event box: show primary event, tooltip shows all
      addEventBox(weekDate, eventsThisWeek)
    } else {
      // Empty week box
      addWeekBox(weekDate)
    }
  }
}
```

### Event Merging Strategy

Multiple data sources merge intelligently:

```typescript
function getMergedEvents() {
  const merged = {}
  
  // 1. Personal events (always included)
  addEvents(lifeEvents, 'personal')
  
  // 2. World events (if enabled in config)
  if (APP_CONFIG.defaultShowWorldEvents) {
    addEvents(worldEvents, 'world')
  }
  
  // 3. US presidents (if enabled in config)  
  if (APP_CONFIG.defaultShowPresidents) {
    addEvents(usPresidents, 'president')
  }
  
  // Priority: Personal > World > Presidents
  return merged
}
```

### Week Box Priority System

When multiple events occur in the same week:

1. **Display**: Show milestone personal event, or first personal event, or first world event
2. **Tooltip**: List all events with category prefixes (`🌍`, `🇺🇸`)
3. **Color**: Use milestone color if present, otherwise use current life phase color

## 📱 Responsive Layout System

**File**: `src/app/utils/grid-layout.ts`

Advanced responsive system with real-time width calculations:

### Breakpoint Strategy

```typescript
// Desktop: Wide margins, optimal readability
.life-in-weeks { margin: 0 20% 2rem 20%; }

// Tablet: Reduced margins  
@media (max-width: 1024px) {
  .life-in-weeks { margin: 0 10% 2rem 10%; }
}

// Mobile: Minimal margins, full utilization
@media (max-width: 768px) {
  .life-in-weeks { margin: 0 2% 2rem 2%; }
}
```

### Flexible Box System

```typescript
// Week cells: Fill available space equally
.life-in-weeks .week {
  flex: 1 1 0;                    // Equal width distribution
  font-size: calc(var(--body-font-size) * 0.8);
}

// Event/Birthday cells: Content-based width
.life-in-weeks .birthday,
.life-in-weeks .event {
  flex: 0 0 auto;                 // Don't grow/shrink
  min-width: fit-content;         // Size to content
}
```

### Real-Time Adaptation

```typescript
// React state tracks window width changes
const [windowWidth, setWindowWidth] = useState(window.innerWidth)

useEffect(() => {
  const handleResize = debounce(() => {
    setWindowWidth(window.innerWidth)
  }, 150)
  
  window.addEventListener('resize', handleResize)
  return () => window.removeEventListener('resize', handleResize)
}, [])

// Grid recalculates on width change
React.useEffect(() => {
  // Trigger responsive grid recalculation
}, [windowWidth])
```

## 🎛️ Configuration-Driven Features

### Overlay Controls

Toggle data sources via config without code changes:

```typescript
// World events: Historical context
defaultShowWorldEvents: true     // 9/11, COVID, Berlin Wall, etc.

// US presidents: Political timeline  
defaultShowPresidents: false     // Presidential terms (off by default)
```

### Life Expectancy Markers

Comparative longevity perspective:

```typescript
// US life expectancy (Worldometers data)
showLifeExpectancy: true,        // Show US marker
lifeExpectancyAge: 77,          // US male average

// Japan comparison (highest global expectancy)
showJapanLifeExpectancy: true,   // Show Japan marker  
japanLifeExpectancyAge: 82,     // Japan male average
```

### Display Customization

Fine-tune visual elements:

```typescript
showRowNumbers: false,           // Clean grid without year labels
showBirthdayMarkers: true,       // Age progression markers
maxAge: 85,                     // Grid endpoint
debounceResizeMs: 150,          // Smooth resize performance
```

### Customization Guide

1. **Add New Life Events**:
   ```typescript
   "2024-12-25": [
     {
       headline: "🎄 Holiday celebration",
       description: "Spent time with family",
       based: "San Francisco",
       doing: "Working",
       association: "Tech Corp"
     }
   ]
   ```

2. **Update Personal Info**:
   - Modify intro text in `src/app/page.tsx`
   - Update `WEEKS_CONFIG` dates
   - Add your website URL

3. **Customize Colors**:
   - Edit color mappings in `src/app/data/color-mappings.ts`
   - Modify CSS variables in `src/app/weeks.css`

### Data Management Tips

- **Chronological Order**: Events are automatically sorted by date
- **Multiple Events**: Same date can have multiple events (array format)
- **Date Format**: Always use "YYYY-MM-DD" format
- **Emoji Usage**: Recommended for visual distinction in headlines
- **Future Events**: Add future milestones or goals

### Styling & Colors

The visual design uses CSS custom properties defined in `src/app/weeks/weeks.css`. Key customizable elements:

- **Color Scheme**: Update CSS variables for background, text, and accent colors
- **Typography**: Modify font families and sizes
- **Layout**: Adjust container margins and box sizing
- **Responsive Breakpoints**: Fine-tune mobile/tablet/desktop layouts

## 🤝 Contributing

This project maintains compatibility with Gina Trapani's original algorithms while adding modern enhancements. When contributing:

1. **Preserve Core Logic**: Keep the row-breaking and decade-grouping algorithms intact
2. **Maintain Responsive Design**: Test across all screen sizes
3. **Follow TypeScript Standards**: Use proper typing for all components
4. **Update Documentation**: Keep README and code comments current

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Tim Urban** - For the original Life in Weeks concept that inspired millions
- **Gina Trapani** - For the brilliant Hugo implementation this project is based on
- **Buster Benson** - For pioneering the digital life visualization format
- **Wait But Why** - For making complex ideas accessible and inspiring reflection

---

*"I always get to where I am going by walking away from where I have been." – Winnie the Pooh*
