'use client'
import React, { useState, useEffect, useRef } from 'react';

interface DropdownProps {
    options: { id: number, name: string }[];
    action: string;
    selected: number;
    onClickOption: (option: any) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, action, selected, onClickOption }) => {


    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };


    const selectedOption = options.find(option => option.id === selected);

    return (
        <div className="relative inline-block text-left w-full" ref={dropdownRef}>
            <div>
                <button
                    type="button"
                    className="inline-flex justify-between bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500 text-sm rounded-sm-lg w-full rounded-sm-md  shadow-sm-xs px-4 py-2 font-medium   focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    id="options-menu"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={(e) => { e.preventDefault(); toggleDropdown(); }}
                >
                    {selectedOption ? selectedOption.name : action}
                    <svg
                        className="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>

            {isOpen && options && options.length > 0 && (
                <div
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-sm-md shadow-sm-lg bg-gray-600 border-gray-500 placeholder-gray-400 text-white ring-1 ring-black ring-opacity-5 focus:outline-hidden"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="py-1" role="none">
                        {options.map((option: any) => (
                            <button
                            type="button"
                                className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-500"
                                role="menuitem"
                                onClick={() => {onClickOption(option); toggleDropdown();}}
                                key={option.id}
                            >
                                {option.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;