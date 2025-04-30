'use client';

import React from 'react';
import { motion } from 'motion/react';
import { IconSearch } from '@tabler/icons-react';
import { useSearch } from './search-context';

export interface SearchTriggerProps {
  placeholder?: string;
  shortcut?: string;
}

export function SearchTrigger({ 
  placeholder = 'Search components...', 
  shortcut = '⌘K' 
}: SearchTriggerProps) {
  const { setIsOpen, searchInputRef } = useSearch();

  return (
    <motion.button 
      onClick={() => {
        setIsOpen(true);
        searchInputRef.current?.focus();
      }}
      className="flex items-center w-full md:w-64 px-3 py-1.5 text-sm text-gray-500 border border-gray-300 rounded-md hover:border-gray-400 transition-colors"
      aria-label="Search components"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <IconSearch size={16} className="mr-2"/>
      <span className="flex-1 text-left truncate">{placeholder}</span>
      <kbd className="hidden md:flex items-center justify-center h-5 px-1.5 text-xs font-medium text-gray-500 bg-gray-100 rounded">
        {shortcut.includes('⌘') ? (
          <>
            <span className="text-xs">⌘</span>
            <span className="ml-0.5">K</span>
          </>
        ) : (
          <span>{shortcut}</span>
        )}
      </kbd>
    </motion.button>
  );
}