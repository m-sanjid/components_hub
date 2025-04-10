'use client';

import React from 'react';

export function SearchKeyboardHelp() {
  return (
    <div className="border-t px-4 py-2 text-xs text-gray-500 flex justify-between items-center">
      <div className="flex space-x-4">
        <div className="flex items-center">
          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-800 mr-1">↑</kbd>
          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-800 mr-1">↓</kbd>
          <span>Navigate</span>
        </div>
        <div className="flex items-center">
          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-800 mr-1">Enter</kbd>
          <span>Select</span>
        </div>
        <div className="flex items-center">
          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-800 mr-1">Esc</kbd>
          <span>Close</span>
        </div>
      </div>
      <div className="text-gray-400">
        Press <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-800">⌘</kbd>+<kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-800">K</kbd> to search
      </div>
    </div>
  );
}