'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearch } from './search-context';
import { SearchInput } from './search-input';
import { SearchTabs } from './search-tabs';
import { SearchResults } from './search-results';
import { SearchKeyboardHelp } from './search-keyboard-help';
import { Portal } from './portal';

export interface SearchDialogContentProps {
  placeholder?: string;
}

export function SearchDialogContent({
  placeholder = 'Search components...'
}: SearchDialogContentProps) {
  const { isOpen, setIsOpen, setQuery, query } = useSearch();

  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <AnimatePresence mode="wait">
        {/* Full overlay with backdrop blur */}
        <motion.div 
          key="overlay"
          className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => {
            setIsOpen(false);
            setQuery('');
          }}
        />
        
        {/* Modal container positioned in the center of the viewport */}
        <motion.div 
          key="modal-container"
          className="fixed inset-0 z-[10000] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div 
            className="w-full max-w-xl bg-white rounded-lg shadow-2xl overflow-hidden"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, type: "spring", damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <SearchInput placeholder={placeholder} />
              
              {/* Navigation tabs */}
              {!query.trim() && <SearchTabs />}
              
              {/* Search results */}
              <SearchResults />
              
              {/* Keyboard shortcuts footer */}
              <SearchKeyboardHelp />
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </Portal>
  );
}