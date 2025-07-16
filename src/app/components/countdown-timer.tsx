'use client'

import React, { useState, useEffect } from 'react'
import { APP_CONFIG } from '../config/app-config'

interface CountdownTimerProps {
  birthDate: string
  lifeExpectancyAge: number
  className?: string
}

export function CountdownTimer({ birthDate, lifeExpectancyAge, className = '' }: CountdownTimerProps) {
  const [yearsLeft, setYearsLeft] = useState<number>(0)
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const calculateYearsLeft = () => {
      const birth = new Date(birthDate)
      const lifeExpectancyDate = new Date(birth.getFullYear() + lifeExpectancyAge, birth.getMonth(), birth.getDate())
      const now = new Date()
      const timeLeft = lifeExpectancyDate.getTime() - now.getTime()
      const yearsLeft = Math.max(0, Math.floor(timeLeft / (1000 * 60 * 60 * 24 * 365.25)))
      setYearsLeft(yearsLeft)
    }
    calculateYearsLeft()
    const interval = setInterval(calculateYearsLeft, 1000 * 60 * 60 * 24)
    const timer = setTimeout(() => setIsVisible(true), 500)
    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [birthDate, lifeExpectancyAge, mounted])

  if (!mounted) return null;

  // Get color based on years left - using milestone palette colors
  const getTimerColor = (years: number): string => {
    if (years <= 1) return '#FFCDD2' // Light red for urgency
    if (years <= 5) return '#FFE0B2' // Light orange
    if (years <= 10) return '#FFF9C4' // Light yellow
    if (years <= 20) return '#C8E6C9' // Light green
    if (years <= 30) return '#B3E5FC' // Light cyan
    return '#BBDEFB' // Light blue for many years
  }

  const timerColor = getTimerColor(yearsLeft)
  const isLowTime = yearsLeft <= 10

  return (
    <div 
      className={`countdown-timer ${className} ${isVisible ? 'visible' : ''}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
        transition: 'all 0.5s ease-out'
      }}
    >
      <div 
        className="timer-container"
        style={{
          backgroundColor: timerColor,
          border: `2px solid ${isLowTime ? '#e74c3c' : '#3498db'}`,
          borderRadius: '12px',
          padding: '12px 16px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          fontFamily: 'var(--font-family)',
          fontWeight: '600',
          fontSize: '14px',
          color: '#2c3e50'
        }}
      >
        <div 
          className={`timer-icon ${isLowTime ? 'pulse-animation' : ''}`}
          style={{
            fontSize: '16px'
          }}
        >
          {isLowTime ? '⏰' : '⏳'}
        </div>
        <div className="timer-text">
          <span className="years-number" style={{ fontSize: '18px', fontWeight: '700' }}>
            {yearsLeft}
          </span>
          <span className="years-label" style={{ fontSize: '12px', opacity: 0.8 }}>
            {yearsLeft === 1 ? ' year' : ' years'} left
          </span>
        </div>
      </div>
    </div>
  )
} 