// Color Mappings Data - Converted from Gina's colors.yml
// Original source: /temp/life-in-weeks/data/colors.yml

export interface ColorMapping {
  className: string
  element: 'border' | 'background-color'
  colorName: string
}

export const colorMappings: ColorMapping[] = [
  // Location colors (border)
  {
    className: "brooklyn",
    element: "border",
    colorName: "#8eb2d6"
  },
  {
    className: "san-diego", 
    element: "border",
    colorName: "#FCC737"
  },
  {
    className: "north-carolina",
    element: "border", 
    colorName: "#118B50"
  },
  {
    className: "poughkeepsie",
    element: "border",
    colorName: "#469046"
  },
  
  // Activity colors (background)
  {
    className: "i-was-tiny",
    element: "background-color",
    colorName: "white"
  },
  {
    className: "kindergartner",
    element: "background-color", 
    colorName: "#FFF6DA"
  },
  {
    className: "student",
    element: "background-color",
    colorName: "#E8F9FF"
  },
  {
    className: "high-school-student",
    element: "background-color",
    colorName: "#C9E9D2"
  },
  {
    className: "college-student",
    element: "background-color",
    colorName: "#FFE3E3"
  },
  {
    className: "working",
    element: "background-color",
    colorName: "#F8E7F6"
  },
  {
    className: "freelancing",
    element: "background-color",
    colorName: "#d6d6f0"
  },
  {
    className: "funemployed",
    element: "background-color",
    colorName: "white"
  }
]

// Helper function to convert "based" and "doing" values to CSS class names
// Matches Hugo logic: lower case and replace spaces with dashes
export function toClassName(value: string): string {
  return value.toLowerCase().replace(/\s+/g, '-')
}

// Helper function to get color value for a given class name and element type
export function getColorValue(className: string, element: 'border' | 'background-color'): string | undefined {
  const mapping = colorMappings.find(m => m.className === className && m.element === element)
  return mapping?.colorName
}

// Generate CSS custom properties from color mappings
export function generateColorCSS(): string {
  const borderColors = colorMappings
    .filter(m => m.element === 'border')
    .map(m => `.${m.className} { border-color: ${m.colorName} !important; }`)
    .join('\n')
  
  const backgroundColors = colorMappings
    .filter(m => m.element === 'background-color')
    .map(m => `.${m.className} { background-color: ${m.colorName} !important; }`)
    .join('\n')
    
  return [borderColors, backgroundColors].join('\n')
}