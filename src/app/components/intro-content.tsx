'use client'

import React from 'react'

interface IntroContentProps {
  isCompactMode: boolean
  setIsCompactMode: (compact: boolean) => void
}

export function IntroContent({ isCompactMode, setIsCompactMode }: IntroContentProps) {
  return (
    <div className="intro-content">
      <div className="mt-3">
        <p>👋 Hi, I&apos;m <a href="https://dingran.me">Ran Ding</a>. Each week of my life is a little box.</p>
        
        <p>💡 Inspired by <a href="https://waitbutwhy.com/2014/05/life-weeks.html">Wait But Why</a>. Adapted from <a href="https://github.com/ginatrapani/life-in-weeks">Gina&apos;s work</a>.<br/>
        💻 My code is <a href="https://github.com/dingran/life-in-weeks-nextjs">here</a>. Also <a href="https://www.coryzue.com/">Cory</a> built <a href="https://lifeweeks.app/">an app</a> for this.</p>
      </div>
      
      <div className="compact-toggle" style={{ textAlign: 'center', marginTop: '0.75rem', marginBottom: '0.5rem' }}>
        <button
          type="button"
          onClick={() => setIsCompactMode(!isCompactMode)}
          className={`toggle-button ${isCompactMode ? 'compact-active' : 'standard-active'}`}
          title={isCompactMode ? 'Switch to Standard View' : 'Switch to Compact View (fits entire life on screen)'}
        >
          {isCompactMode ? '📋 Switch to Standard View' : '🔍 Switch to Compact View'}
        </button>
      </div>
    </div>
  )
}