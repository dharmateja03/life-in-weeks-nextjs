// US Presidents Data - Presidential terms from 1986 onwards
// These appear as small overlay indicators when toggled on

export interface PresidentialTerm {
  headline: string
  president: string
  party: 'Republican' | 'Democrat'
  termNumber: number
}

export const usPresidents: Record<string, PresidentialTerm[]> = {
  // Ronald Reagan (already in office when user was born)
  "PLACEHOLDER_BIRTH_DATE": [
    {
      headline: "🇺🇸 Reagan (R)",
      president: "Ronald Reagan",
      party: "Republican",
      termNumber: 40
    }
  ],
  
  // George H.W. Bush
  "1989-01-20": [
    {
      headline: "🇺🇸 Bush Sr. (R)",
      president: "George H.W. Bush", 
      party: "Republican",
      termNumber: 41
    }
  ],
  
  // Bill Clinton
  "1993-01-20": [
    {
      headline: "🇺🇸 Clinton (D)",
      president: "Bill Clinton",
      party: "Democrat",
      termNumber: 42
    }
  ],
  
  // Clinton 2nd term
  "1997-01-20": [
    {
      headline: "🇺🇸 Clinton 2nd (D)",
      president: "Bill Clinton",
      party: "Democrat", 
      termNumber: 42
    }
  ],
  
  // George W. Bush
  "2001-01-20": [
    {
      headline: "🇺🇸 Bush Jr. (R)",
      president: "George W. Bush",
      party: "Republican",
      termNumber: 43
    }
  ],
  
  // Bush 2nd term  
  "2005-01-20": [
    {
      headline: "🇺🇸 Bush Jr. 2nd (R)",
      president: "George W. Bush",
      party: "Republican",
      termNumber: 43
    }
  ],
  
  // Barack Obama
  "2009-01-20": [
    {
      headline: "🇺🇸 Obama (D)",
      president: "Barack Obama",
      party: "Democrat",
      termNumber: 44
    }
  ],
  
  // Obama 2nd term
  "2013-01-20": [
    {
      headline: "🇺🇸 Obama 2nd (D)", 
      president: "Barack Obama",
      party: "Democrat",
      termNumber: 44
    }
  ],
  
  // Donald Trump
  "2017-01-20": [
    {
      headline: "🇺🇸 Trump (R)",
      president: "Donald Trump",
      party: "Republican",
      termNumber: 45
    }
  ],
  
  // Joe Biden
  "2021-01-20": [
    {
      headline: "🇺🇸 Biden (D)",
      president: "Joe Biden", 
      party: "Democrat",
      termNumber: 46
    }
  ],
  
  // Trump 2nd term (future)
  "2025-01-20": [
    {
      headline: "🇺🇸 Trump 2nd (R)",
      president: "Donald Trump",
      party: "Republican", 
      termNumber: 47
    }
  ]
}