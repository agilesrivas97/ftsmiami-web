"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"

interface DropdownProps {
  trigger: React.ReactNode
  items: any[]
  onSelect: (item: string) => void
}

export const ResponsiveDropdown: React.FC<DropdownProps> = ({ trigger, items, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [dropdownPosition, setDropdownPosition] = useState<"bottom" | "top">("bottom")

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleToggle = () => {
    console.log("cLICK BUtton", isOpen)
    if (!isOpen) {
      const rect = dropdownRef.current?.getBoundingClientRect()
      if (rect) {
        const spaceBelow = window.innerHeight - (rect.bottom * 2)
        const spaceAbove = rect.top
        setDropdownPosition(spaceBelow > spaceAbove ? "bottom" : "top")
      }
    }
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative inline-block text-left " ref={dropdownRef}>
      <div onClick={handleToggle}>{trigger}</div>
      {isOpen && (
        <div
          className={`fixed ${
            dropdownPosition === "bottom" ? "top-12" : "bottom-12"
          } right-4 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-100`}
        >
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {items.map((item, index) => (
              <a
                key={index}
                href="#"
                className={`flex flex-row px-4 py-2 text-sm text-gray-700 ${index === items.length ? "hover:bg-red-500 hover:rounded hover:text-white": 'hover:bg-gray-100 hover:text-gray-900 '}`}
                role="menuitem"
                onClick={(e) => {
                  console.log(e);
                  e.preventDefault()
                  onSelect(item.id)
                  setIsOpen(false)
                }}
              >
                <div className="mr-5">
                {item.icon} 
                </div>

                {item.action_name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

