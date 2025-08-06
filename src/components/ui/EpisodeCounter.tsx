import React, { useState, useRef, useEffect } from 'react';

interface EpisodeCounterProps {
    currentEpisode: number;
    totalEpisodes: number;
    onEpisodeChange: (newEpisode: number) => void;
    onDecrement: () => void;
    onIncrement: () => void;
    canDecrement: boolean;
    canIncrement: boolean;
}

export const EpisodeCounter: React.FC<EpisodeCounterProps> = ({
  currentEpisode,
  totalEpisodes,
  onEpisodeChange,
  onDecrement,
  onIncrement,
  canDecrement,
  canIncrement
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(currentEpisode.toString());
    const inputRef = useRef<HTMLInputElement>(null);

    // Focus input when editing starts
    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    // Reset input value when currentEpisode changes externally
    useEffect(() => {
        setInputValue(currentEpisode.toString());
    }, [currentEpisode]);

    const handleSave = () => {
        const newValue = parseInt(inputValue);

        // Validate the input
        if (isNaN(newValue) || newValue < 0 || newValue > totalEpisodes) {
            // Invalid input, reset to current value
            setInputValue(currentEpisode.toString());
            setIsEditing(false);
            return;
        }

        // Save the new value
        onEpisodeChange(newValue);
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            // Cancel editing
            setInputValue(currentEpisode.toString());
            setIsEditing(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Only allow numbers
        const value = e.target.value.replace(/\D/g, '');
        setInputValue(value);
    };

    return (
        <div className="flex items-center space-x-3">
            {/* Minus Button */}
            <button
                onClick={onDecrement}
                disabled={!canDecrement}
                className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-white w-8 h-8 rounded flex items-center justify-center"
            >
                -
            </button>

            {/* Episode Display/Input */}
            {isEditing ? (
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleSave}
                    onKeyDown={handleKeyDown}
                    className="text-white font-medium min-w-[80px] text-center bg-gray-700 border border-gray-600 rounded px-2 py-1"
                    placeholder={`0-${totalEpisodes}`}
                />
            ) : (
                <button
                    onClick={() => setIsEditing(true)}
                    className="text-white font-medium min-w-[80px] text-center hover:bg-gray-700 rounded px-2 py-1 transition-colors"
                    title="Click to edit episode count"
                >
                    {currentEpisode} / {totalEpisodes}
                </button>
            )}

            {/* Plus Button */}
            <button
                onClick={onIncrement}
                disabled={!canIncrement}
                className="bg-red-500 hover:bg-red-600 disabled:bg-gray-800 disabled:text-gray-500 text-white w-8 h-8 rounded flex items-center justify-center"
            >
                +
            </button>
        </div>
    );
};
