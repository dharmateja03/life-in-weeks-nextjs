'use client'

import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface CustomTooltipProps {
  content: string
  hasDetails?: boolean  // Optional for backward compatibility
  children: React.ReactNode
}

export function CustomTooltip({ content, children }: CustomTooltipProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const triggerRef = useRef<HTMLElement>(null)
  const tooltipId = useRef(`tooltip-${Math.random().toString(36).substr(2, 9)}`)

  const isVisible = isHovered || isSticky

  // Calculate tooltip position
  const updatePosition = (rect: DOMRect) => {
    const tooltipWidth = 300 // Reduced max width for closer positioning
    
    // Get actual tooltip height by measuring existing tooltip or creating temporary one
    const getActualHeight = () => {
      const existingTooltip = document.getElementById(tooltipId.current)
      if (existingTooltip) {
        return existingTooltip.offsetHeight
      }
      
      // Create temporary tooltip to measure height
      const temp = document.createElement('div')
      temp.style.position = 'absolute'
      temp.style.visibility = 'hidden'
      temp.style.pointerEvents = 'none'
      temp.style.left = '-9999px'
      temp.style.top = '-9999px'
      temp.style.backgroundColor = 'rgba(0, 0, 0, 0.9)'
      temp.style.color = 'white'
      temp.style.fontFamily = "'Red Hat Display', system-ui, -apple-system, sans-serif"
      temp.style.fontSize = '13px'
      temp.style.fontWeight = '500'
      temp.style.borderRadius = '6px'
      temp.style.padding = '12px 16px'
      temp.style.maxWidth = `${tooltipWidth}px`
      temp.style.minWidth = '150px'
      temp.style.wordWrap = 'break-word'
      temp.style.lineHeight = '1.5'
      temp.innerHTML = `<div style="white-space: pre-wrap; word-break: break-word;">${content}</div>`
      
      document.body.appendChild(temp)
      const height = temp.offsetHeight
      document.body.removeChild(temp)
      
      return height
    }
    
    const tooltipHeight = getActualHeight()
    
    // Position so bottom of tooltip is just above top of cell
    let x = rect.left + rect.width / 2 - tooltipWidth / 2 // Center horizontally on cell
    let y = rect.top - tooltipHeight - 5 // Bottom of tooltip 5px above cell top
    
    // Keep within viewport horizontally
    if (x < 10) x = 10
    if (x + tooltipWidth > window.innerWidth - 10) {
      x = window.innerWidth - tooltipWidth - 10
    }
    
    // If no space above, show below the cell
    if (y < 10) {
      y = rect.bottom + 5 // 5px below the cell
    }
    
    setPosition({ x, y })
  }

  const handleMouseEnter = () => {
    if (!content) return
    
    // Dismiss any existing sticky tooltips globally
    document.dispatchEvent(new CustomEvent('dismissAllTooltips', { 
      detail: { except: tooltipId.current } 
    }))
    
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
    if (!content) return
    
    e.preventDefault()
    e.stopPropagation()
    
    const rect = triggerRef.current?.getBoundingClientRect()
    if (rect) {
      updatePosition(rect)
      setIsSticky(true)
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
      if (isSticky && triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
        const tooltip = document.getElementById(tooltipId.current)
        if (!tooltip || !tooltip.contains(e.target as Node)) {
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

  // Dismiss tooltip when user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (isSticky) {
        setIsSticky(false)
        setIsHovered(false)
      }
    }

    if (isSticky) {
      window.addEventListener('scroll', handleScroll, { passive: true })
      document.addEventListener('scroll', handleScroll, { passive: true })
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('scroll', handleScroll)
    }
  }, [isSticky])

  // Listen for global dismiss event from other tooltips
  useEffect(() => {
    const handleGlobalDismiss = (event: CustomEvent) => {
      const { except } = event.detail
      if (except !== tooltipId.current && isSticky) {
        setIsSticky(false)
        setIsHovered(false)
      }
    }

    document.addEventListener('dismissAllTooltips', handleGlobalDismiss as EventListener)

    return () => {
      document.removeEventListener('dismissAllTooltips', handleGlobalDismiss as EventListener)
    }
  }, [isSticky])

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
    if (!isVisible || !content || typeof window === 'undefined') return null

    return createPortal(
      <div
        id={tooltipId.current}
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          zIndex: 1000,
          backgroundColor: isSticky ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.75)',
          color: 'white',
          fontFamily: "'Red Hat Display', system-ui, -apple-system, sans-serif",
          fontSize: '13px',
          fontWeight: '500',
          borderRadius: '6px',
          padding: '12px 16px',
          boxShadow: isSticky ? '0 4px 20px rgba(0,0,0,0.6)' : '0 4px 20px rgba(0,0,0,0.4)',
          maxWidth: '300px',
          minWidth: '150px',
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
          cursor: content ? 'pointer' : 'default',
          display: 'inline-block'
        }}
      >
        {children}
      </span>
      {renderTooltip()}
    </>
  )
}