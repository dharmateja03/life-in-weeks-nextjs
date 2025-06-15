// World Events Data - Major historical events from 1986 onwards
// These appear as small overlay indicators when toggled on

export interface WorldEvent {
  headline: string
  description?: string
  category: 'politics' | 'technology' | 'disaster' | 'culture' | 'economy' | 'war'
}

export const worldEvents: Record<string, WorldEvent[]> = {
  "1989-03-12": [
    {
      headline: "🌐 World Wide Web Invented",
      description: "Tim Berners-Lee creates the web at CERN - https://en.wikipedia.org/wiki/World_Wide_Web",
      category: "technology"
    }
  ],
  "1989-11-09": [
    {
      headline: "🧱 Berlin Wall Falls",
      description: "End of Cold War symbol - https://en.wikipedia.org/wiki/Fall_of_the_Berlin_Wall",
      category: "politics"
    }
  ],
  "1991-12-25": [
    {
      headline: "🇷🇺 Soviet Union Dissolves",
      description: "End of USSR - https://en.wikipedia.org/wiki/Dissolution_of_the_Soviet_Union",
      category: "politics"
    }
  ],
  "1995-08-24": [
    {
      headline: "💻 Windows 95 Released",
      description: "Microsoft's breakthrough OS - https://en.wikipedia.org/wiki/Windows_95",
      category: "technology"
    }
  ],
  "1997-08-31": [
    {
      headline: "👑 Princess Diana Dies",
      description: "Car crash in Paris - https://en.wikipedia.org/wiki/Death_of_Diana,_Princess_of_Wales",
      category: "culture"
    }
  ],
  "1998-09-04": [
    {
      headline: "🔍 Google Founded",
      description: "Larry Page and Sergey Brin start Google - https://en.wikipedia.org/wiki/History_of_Google",
      category: "technology"
    }
  ],
  "2001-09-11": [
    {
      headline: "🏢 9/11 Attacks",
      description: "Twin Towers destroyed - https://en.wikipedia.org/wiki/September_11_attacks",
      category: "war"
    }
  ],
  "2003-03-20": [
    {
      headline: "🇮🇶 Iraq War Begins",
      description: "US invasion of Iraq - https://en.wikipedia.org/wiki/Iraq_War",
      category: "war"
    }
  ],
  "2004-02-04": [
    {
      headline: "👥 Facebook Founded",
      description: "Mark Zuckerberg launches TheFacebook - https://en.wikipedia.org/wiki/History_of_Facebook",
      category: "technology"
    }
  ],
  "2005-08-29": [
    {
      headline: "🌀 Hurricane Katrina",
      description: "Devastating New Orleans - https://en.wikipedia.org/wiki/Hurricane_Katrina",
      category: "disaster"
    }
  ],
  "2007-01-09": [
    {
      headline: "📱 iPhone Announced",
      description: "Apple revolutionizes smartphones - https://en.wikipedia.org/wiki/IPhone_(1st_generation)",
      category: "technology"
    }
  ],
  "2008-09-15": [
    {
      headline: "📉 Lehman Brothers Collapses",
      description: "Global financial crisis - https://en.wikipedia.org/wiki/Bankruptcy_of_Lehman_Brothers",
      category: "economy"
    }
  ],
  "2009-01-03": [
    {
      headline: "₿ Bitcoin Genesis Block",
      description: "Satoshi Nakamoto mines first Bitcoin - https://en.wikipedia.org/wiki/Bitcoin",
      category: "technology"
    }
  ],
  "2011-03-11": [
    {
      headline: "☢️ Fukushima Nuclear Disaster",
      description: "Japan earthquake and tsunami - https://en.wikipedia.org/wiki/Fukushima_nuclear_disaster",
      category: "disaster"
    }
  ],
  "2011-05-02": [
    {
      headline: "💀 Bin Laden Killed",
      description: "US Navy SEALs operation - https://en.wikipedia.org/wiki/Killing_of_Osama_bin_Laden",
      category: "war"
    }
  ],
  "2020-01-21": [
    {
      headline: "🦠 First US COVID Case",
      description: "Pandemic begins - https://en.wikipedia.org/wiki/COVID-19_pandemic",
      category: "disaster"
    }
  ],
  "2022-11-30": [
    {
      headline: "🤖 ChatGPT Launches",
      description: "AI chatbot reaches 100M users in 2 months - https://en.wikipedia.org/wiki/ChatGPT",
      category: "technology"
    }
  ]
}