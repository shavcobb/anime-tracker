import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import type {WatchStatus} from "../../types/anime.ts";


interface StatusFilterDropdownProps {
    selectedStatus: WatchStatus | 'all';
    onStatusChange: (status: WatchStatus | 'all') => void;
    statusOptions: Array<{ value: WatchStatus; label: string; color: string }>;
    getStatusCount: (status: WatchStatus) => number;
    animeCount: number;
}

export const StatusFilterDropdown: React.FC<StatusFilterDropdownProps> = ({
  selectedStatus,
  onStatusChange,
  statusOptions,
  getStatusCount,
  animeCount
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            console.log('Click detected!');
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    const handleStatusSelect = (status: WatchStatus | 'all') => {
        onStatusChange(status);
        setIsDropdownOpen(false);
    };

    const getCurrentLabel = () => {
        if (selectedStatus === 'all') return 'All';
        return statusOptions.find(opt => opt.value === selectedStatus)?.label ?? 'All';
    };

    const getCurrentCount = () => {
        return selectedStatus === 'all' ? animeCount : getStatusCount(selectedStatus);
    };

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            {/* Dropdown Trigger Button */}
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="min-w-48 flex items-center justify-between px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white hover:bg-gray-700 transition-colors"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
            >
                <div className="flex items-center space-x-2">
                    <span className="font-medium">{getCurrentLabel()}</span>
                    <span className="text-red-400 bg-red-900/30 px-2 py-0.5 rounded-full text-sm">
            {getCurrentCount()}
          </span>
                </div>
                <ChevronDownIcon
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                        isDropdownOpen ? 'rotate-180' : ''
                    }`}
                />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <div className="absolute top-full left-0 min-w-48 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden">
                    <div className="py-1">
                        {/* All Anime Option */}
                        <button
                            onClick={() => handleStatusSelect('all')}
                            className={`w-full px-4 py-3 text-left hover:bg-gray-700 transition-colors flex items-center justify-between ${
                                selectedStatus === 'all' ? 'bg-red-500/20 text-red-300 border-l-4 border-red-500' : 'text-white'
                            }`}
                        >
                            <span>All</span>
                            <span className="text-red-400 bg-red-900/30 px-2 py-0.5 rounded-full text-sm">
                {animeCount}
              </span>
                        </button>

                        {/* Individual Status Options */}
                        {statusOptions.map((option) => {
                            const count = getStatusCount(option.value);
                            const isSelected = selectedStatus === option.value;

                            return (
                                <button
                                    key={option.value}
                                    onClick={() => handleStatusSelect(option.value)}
                                    className={`w-full px-4 py-3 text-left hover:bg-gray-700 transition-colors flex items-center justify-between ${
                                        isSelected
                                            ? 'bg-red-500/20 text-red-300 border-l-4 border-red-500'
                                            : 'text-white'
                                    }`}
                                    style={isSelected ? { borderLeftColor: option.color.replace('bg-', '').replace('-500', '') } : {}}
                                >
                                    <span>{option.label}</span>
                                    <span className="text-red-400 bg-red-900/30 px-2 py-0.5 rounded-full text-sm">
                    {count}
                  </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
