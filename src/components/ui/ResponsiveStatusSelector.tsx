import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import {statusOptions, type WatchStatus} from "../../types/anime.ts";

interface ResponsiveStatusSelectorProps {
    currentStatus: WatchStatus;
    onStatusChange: (status: WatchStatus) => void;
}

export const ResponsiveStatusSelector: React.FC<ResponsiveStatusSelectorProps> = ({
      currentStatus,
      onStatusChange
  }) => {
    const [isDropdownOpen, setisDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setisDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    const currentOption = statusOptions.find(option => option.value === currentStatus);

    return (
        <div className="flex items-center">
            {/* Desktop: Show all buttons */}
            <div className="hidden md:flex items-center space-x-2">
                {statusOptions.map((option) => (
                    <button
                        key={option.value}
                        onClick={() => onStatusChange(option.value)}
                        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                            currentStatus === option.value
                                ? `${option.color} text-white`
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>

            {/* Mobile: Show dropdown */}
            <div className="md:hidden relative inline-block" ref={dropdownRef}>
                <button
                    onClick={() => setisDropdownOpen(!isDropdownOpen)}
                    className={`min-w-36 flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        currentOption ? `${currentOption.color} text-white` : 'bg-gray-700 text-gray-300'
                    }`}
                >
                    <span>{currentOption?.label || 'Select Status'}</span>
                    <ChevronDownIcon
                        className={`w-4 h-4 ml-2 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                    />
                </button>

                {isDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 min-w-36 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden">
                        <div className="py-1">
                            {statusOptions.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => {
                                        onStatusChange(option.value);
                                        setisDropdownOpen(false);
                                    }}
                                    className={`w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors text-sm ${
                                        currentStatus === option.value
                                            ? `${option.color}/20 text-white border-l-4`
                                            : 'text-gray-300'
                                    }`}
                                    style={currentStatus === option.value ? { borderLeftColor: option.color.replace('bg-', '').replace('-500', '') } : {}}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
