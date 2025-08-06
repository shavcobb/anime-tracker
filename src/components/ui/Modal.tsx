import React, { useEffect, useRef } from 'react';
import { XIcon } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    // Close when clicking backdrop
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === modalRef.current) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            ref={modalRef}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto"
            onClick={handleBackdropClick}
        >
            <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl my-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
                {/* Modal Header */}
                <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-4 flex items-center justify-between">
                    {title && (
                        <h2 className="text-xl font-semibold text-white truncate mr-4">{title}</h2>
                    )}
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-800 rounded-lg transition-colors flex-shrink-0"
                        aria-label="Close modal"
                    >
                        <XIcon className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};
