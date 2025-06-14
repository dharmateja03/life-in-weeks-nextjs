// Life in Weeks Page - Exact clone of Gina's implementation

import React from 'react'
import { Metadata } from 'next'
import { StickyHeader } from './components/sticky-header'
import { WeeksGrid } from './components/weeks-grid'
import './weeks.css'

export const metadata: Metadata = {
  title: 'My Life in Weeks',
  description: 'This is a map of my life, where each week I\'ve been alive is a little box.',
}

export default function WeeksPage() {
  
  return (
    <div 
      className="life-in-weeks-container"
      style={{
        backgroundColor: 'var(--main-bg-color)',
        color: 'var(--text-color)',
        fontFamily: 'var(--font-family)',
        fontSize: 'var(--body-font-size-desktop)',
        lineHeight: 1.5
      }}
    >
      <div 
        id="fullscreen" 
        className="justify-content-center"
        data-bs-spy="scroll"
        data-bs-target="#lifeinweeks-navbar"
        data-bs-offset="0"
        tabIndex={0}
      >
        <div>
          <section className="life-in-weeks">
            <StickyHeader title="My Life in Weeks" />
            
            <div className="mt-3">
              <p>👋 Hi, I&apos;m <a href="https://ginatrapani.org">Gina</a>. This is a map of my life, where each week I&apos;ve been alive is a little box. Tap a box to see what I was doing where that week.</p>
              
              <p>📍 Read more about <a href="https://waitbutwhy.com/2014/05/life-weeks.html">Life in Weeks at Wait But Why</a>. I adapted <a href="https://github.com/ginatrapani/life-in-weeks">the code that generated this page</a> from <a href="https://busterbenson.com/life-in-weeks">Buster Benson</a>.</p>
              
              <p>🌱 This life and this map are a work in progress. I&apos;ll update it as I go.</p>
              
              <p>🍯 &ldquo;I always get to where I am going by walking away from where I have been.&rdquo; – Winnie the Pooh</p>
            </div>
            
            <WeeksGrid />
          </section>
        </div>
      </div>
    </div>
  )
}