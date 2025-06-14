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

1. **Update Life Events**: Edit `src/app/weeks/data/life-events.ts` with your personal timeline
2. **Customize Settings**: Modify `WEEKS_CONFIG` in the same file (start date, end year, etc.)
3. **Personalize Content**: Update the intro text in `src/app/weeks/page.tsx`

## 📁 Project Structure

```
src/
├── app/
│   ├── weeks/                    # Main Life in Weeks implementation
│   │   ├── components/           # React components
│   │   │   ├── sticky-header.tsx # Decade navigation
│   │   │   ├── weeks-grid.tsx    # Main grid component
│   │   │   └── week-box.tsx      # Individual week/event boxes
│   │   ├── data/                 # Data and configuration
│   │   │   └── life-events.ts    # Your life timeline data
│   │   ├── utils/                # Utility functions
│   │   │   ├── grid-layout.ts    # Row breaking algorithms
│   │   │   ├── date-processing.ts # Date utilities
│   │   │   └── color-utils.ts    # Color and styling logic
│   │   ├── weeks.css             # All styling
│   │   └── page.tsx              # Main page component
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page (redirects to /weeks)
```

## 🎨 Customization

### Adding Life Events

Edit `src/app/weeks/data/life-events.ts`:

```typescript
export const lifeEvents: LifeEvents = {
  "1990-05-15": [{
    headline: "Started kindergarten",
    description: "First day of school!",
    doing: "student",
    based: "hometown",
    association: "elementary school"
  }],
  // Add more events...
}
```

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
