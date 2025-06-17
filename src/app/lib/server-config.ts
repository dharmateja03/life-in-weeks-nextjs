// Server-side configuration for sensitive data
// This file runs only on the server and is not exposed to the client

// Get date from environment variable - server-side only
function getRequiredDate(envVar: string): string {
  if (process.env[envVar]) {
    return process.env[envVar]!
  }
  throw new Error(`Environment variable ${envVar} is required for sensitive dates. Please check your .env.local file.`)
}

// Server-side sensitive dates configuration
export const SERVER_CONFIG = {
  BIRTH_DATE: getRequiredDate("REAL_BIRTH_DATE"),
  MET_WIFE_DATE: getRequiredDate("REAL_MET_WIFE_DATE"), 
  MARRIAGE_DATE: getRequiredDate("REAL_MARRIAGE_DATE"),
  CITIZENSHIP_DATE: getRequiredDate("REAL_CITIZENSHIP_DATE")
}