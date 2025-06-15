'use client'

import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface CustomTooltipProps {
  content: string
  hasDetails: boolean
  children: React.ReactNode
}

export function CustomTooltip({ content, hasDetails, children }: CustomTooltipProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const triggerRef = useRef<HTMLElement>(null)
  const tooltipId = useRef(`tooltip-${Math.random().toString(36).substr(2, 9)}`)

  const isVisible = isHovered || isSticky

  // Calculate tooltip position
  const updatePosition = (rect: DOMRect) => {
    const tooltipWidth = 400 // max width
    const tooltipHeight = 100 // estimated height
    
    let x = rect.left + rect.width / 2 - tooltipWidth / 2
    let y = rect.top - tooltipHeight - 10
    
    // Keep within viewport horizontally
    if (x < 10) x = 10
    if (x + tooltipWidth > window.innerWidth - 10) {
      x = window.innerWidth - tooltipWidth - 10
    }
    
    // Keep within viewport vertically
    if (y < 10) {
      y = rect.bottom + 10 // Show below if no space above
    }
    
    setPosition({ x, y })
  }

  const handleMouseEnter = () => {
    if (!hasDetails) return
    
    const rect = triggerRef.current?.getBoundingClientRect()
    if (rect) {
      updatePosition(rect)
      setIsHovered(true)
    }
  }

  const handleMouseLeave = () => {
    if (!isSticky) {
      setIsHovered(false)
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    if (!hasDetails) return
    
    e.preventDefault()
    e.stopPropagation()
    
    const rect = triggerRef.current?.getBoundingClientRect()
    if (rect) {
      updatePosition(rect)
      setIsSticky(!isSticky)
      setIsHovered(true)
    }
  }

  // Global event listeners for closing sticky tooltips
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSticky) {
        setIsSticky(false)
        setIsHovered(false)
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (isSticky && !triggerRef.current?.contains(e.target as Node)) {
        const tooltip = document.getElementById(tooltipId.current)
        if (tooltip && !tooltip.contains(e.target as Node)) {
          setIsSticky(false)
          setIsHovered(false)
        }
      }
    }

    if (isVisible) {
      document.addEventListener('keydown', handleEscape)
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isSticky, isVisible])

  // Format content with clickable links
  const formatContent = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const parts = text.split(urlRegex)
    
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a 
            key={index} 
            href={part} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              color: '#60a5fa', 
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {part}
          </a>
        )
      }
      return <span key={index}>{part}</span>
    })
  }

  const renderTooltip = () => {
    if (!isVisible || !hasDetails || typeof window === 'undefined') return null

    return createPortal(
      <div
        id={tooltipId.current}
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          zIndex: 1000,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          color: 'white',
          fontFamily: "'Red Hat Display', system-ui, -apple-system, sans-serif",
          fontSize: '13px',
          fontWeight: '500',
          borderRadius: '6px',
          padding: '12px 16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          maxWidth: '400px',
          minWidth: '200px',
          pointerEvents: isSticky ? 'auto' : 'none',
          userSelect: isSticky ? 'text' : 'none',
          wordWrap: 'break-word',
          lineHeight: '1.5',
          border: isSticky ? '2px solid #60a5fa' : 'none',
        }}
      >
        <div style={{ 
          whiteSpace: 'pre-wrap', 
          wordBreak: 'break-word'
        }}>
          {formatContent(content)}
        </div>
        <div style={{ 
          fontSize: '10px', 
          color: '#ccc', 
          marginTop: '8px',
          borderTop: '1px solid #444',
          paddingTop: '6px'
        }}>
          {isSticky 
            ? 'Click outside or press ESC to close'
            : 'Click to make tooltip sticky for copying links'
          }
        </div>
      </div>,
      document.body
    )
  }

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{
          cursor: hasDetails ? 'pointer' : 'default',
          display: 'inline-block'
        }}
      >
        {children}
      </span>
      {renderTooltip()}
    </>
  )
}