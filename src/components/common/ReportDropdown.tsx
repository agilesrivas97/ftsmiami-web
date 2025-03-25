"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface DropdownProps {
  trigger: React.ReactNode;
  items: any[];
  onSelect: (action:number) => void;
}

export const ResponsiveDropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState<"bottom" | "top">(
    "bottom"
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleMouseOut = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.relatedTarget as Node)) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleToggle = () => {
    if (!isOpen) {
      const rect = dropdownRef.current?.getBoundingClientRect();
      if (rect) {
        const spaceBelow = window.innerHeight - rect.bottom * 2;
        const spaceAbove = rect.top;
        setDropdownPosition(spaceBelow > spaceAbove ? "bottom" : "top");
      }
    }
    setIsOpen(!isOpen);
  };

  const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max));

  return (
    <div className="relative inline-block text-left " ref={dropdownRef}  >
      <div onClick={handleToggle}>{trigger}</div>

      {isOpen &&
          <div
            className={`fixed ${
              dropdownPosition === "bottom" ? "top-full" : "bottom-full"
            } left-0 mt-2 w-56 rounded-md shadow-lg bg-white z-50`}
            style={{
              position: "fixed",
              backgroundColor: "white",
              top: dropdownRef.current ? dropdownRef.current.getBoundingClientRect().bottom + window.scrollY : 0,
              left: clamp(
                dropdownRef.current?.getBoundingClientRect().left ?? 0,
                16,
                window.innerWidth - 240 // Evita que se salga de la pantalla
              )
            }}
          >
            <div
              className="py-1 bg-white rounded-2xl ring-gray-400 border-gray-400 ring-1  ring-opacity-5"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {items.map((item, index) => (
                <a
                  key={index}
                  className={`flex flex-row px-4 py-2 text-sm text-gray-700 ${
                    index === items.length
                      ? "hover:bg-red-500 hover:rounded hover:text-white"
                      : "hover:bg-gray-100 hover:text-gray-900 "
                  }`}
                  role="menuitem"
                  onClick={(e) => {
                    e.stopPropagation();  // Detiene la propagación del click
                    console.log(item.id)
                    onSelect(item.id);
                    setIsOpen(false);
                  }}
                >
                  <div className="mr-5">{item.icon}</div>

                  {item.action_name}
                </a>
              ))}
            </div>
          </div>
}
    </div>
  );
};
