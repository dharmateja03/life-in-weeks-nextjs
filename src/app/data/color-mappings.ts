// Simplified Color Mappings - Background colors only for major life phases
// Border colors are constant (default CSS) to keep focus on life phases

export interface ColorMapping {
  className: string
  element: 'background-color'
  colorName: string
}

export const colorMappings: ColorMapping[] = [
  // Major Life Phase Background Colors - Each milestone gets unique color
  {
    className: "i-was-tiny",
    element: "background-color",
    colorName: "white"
  },
  {
    className: "student",
    element: "background-color",
    colorName: "#E3F2FD"  // Light blue for elementary school
  },
  {
    className: "middle-school-student",
    element: "background-color",
    colorName: "#E1F5FE"  // Light cyan for middle school
  },
  {
    className: "high-school-student",
    element: "background-color",
    colorName: "#E8F5E8"  // Light green for high school
  },
  {
    className: "college-student",
    element: "background-color",
    colorName: "#FFF3E0"  // Light orange for college
  },
  {
    className: "graduate-student",
    element: "background-color",
    colorName: "#F3E5F5"  // Light purple for graduate school
  },
  {
    className: "entrepreneur",
    element: "background-color",
    colorName: "#FFF8E1"  // Light yellow for startup/entrepreneur phase
  },
  {
    className: "funemployed",
    element: "background-color",
    colorName: "#F5F5F5"  // Light gray for transition/break period
  },
  {
    className: "working",
    element: "background-color",
    colorName: "#FFEBEE"  // Light pink for corporate work phase
  }
]

// Helper function to convert "doing" values to CSS class names
// Matches Hugo logic: lower case and replace spaces with dashes
export function toClassName(value: string): string {
  return value.toLowerCase().replace(/\s+/g, '-')
}

// Helper function to get background color for a given class name
export function getColorValue(className: string): string | undefined {
  const mapping = colorMappings.find(m => m.className === className)
  return mapping?.colorName
}

// NOTE: Milestone colors are now auto-generated in utils/milestone-colors.ts
// This ensures colors automatically match the actual milestone events in your data

// Generate CSS for background colors only
export function generateColorCSS(): string {
  return colorMappings
    .map(m => `.${m.className} { background-color: ${m.colorName} !important; }`)
    .join('\n')
}