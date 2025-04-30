'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IconSearch, IconX, IconBackspace } from '@tabler/icons-react';
import { useSearch } from './search-context';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';

export interface SearchInputProps {
  placeholder?: string;
}

export function SearchInput({ placeholder = 'Search components...' }: SearchInputProps) {
  const { 
    query, 
    setQuery, 
    isSearching, 
    setIsOpen, 
    searchInputRef,
    focusedIndex,
    setFocusedIndex,
    getDisplayedResults,
    navigateToComponent,
    resultsContainerRef
  } = useSearch();

  const handleKeyNavigation = (e: ReactKeyboardEvent) => {
    const items = getDisplayedResults();
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex(prev => (prev < items.length - 1 ? prev + 1 : 0));
      
      // Scroll into view if needed
      if (resultsContainerRef.current && focusedIndex >= 0) {
        const focusedElement = resultsContainerRef.current.children[focusedIndex + 1];
        if (focusedElement) {
          focusedElement.scrollIntoView({ block: 'nearest' });
        }
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex(prev => (prev > 0 ? prev - 1 : items.length - 1));
      
      // Scroll into view if needed
      if (resultsContainerRef.current && focusedIndex >= 0) {
        const focusedElement = resultsContainerRef.current.children[focusedIndex - 1];
        if (focusedElement) {
          focusedElement.scrollIntoView({ block: 'nearest' });
        }
      }
    } else if (e.key === 'Enter' && focusedIndex >= 0 && items[focusedIndex]) {
      navigateToComponent(items[focusedIndex]);
    }
  };

  return (
    <div className="flex items-center px-3 border-b">
      <IconSearch size={18} className="mr-2 text-muted-foreground"/>
      <input
        ref={searchInputRef}
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            setIsOpen(false);
            setQuery('');
          } else {
            handleKeyNavigation(e);
          }
        }}
        className="w-full px-3 py-3 focus:outline-none"
        autoFocus
      />
      
      <AnimatePresence mode="wait">
        {isSearching ? (
          <motion.div
            key="spinner"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="h-5 w-5"
          >
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-muted-foreground"></div>
          </motion.div>
        ) : query ? (
          <motion.button
            key="clear"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setQuery('')}
            className="text-muted-foreground hover:text-foreground"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <IconBackspace size={16}/>
          </motion.button>
        ) : null}
      </AnimatePresence>
      
      <motion.button 
        onClick={() => {
          setIsOpen(false);
          setQuery('');
        }}
        className="ml-2 text-muted-foreground hover:text-foreground p-1 rounded-full"
        whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.05)" }}
        whileTap={{ scale: 0.9 }}
      >
        <IconX size={16}/>
      </motion.button>
    </div>
  );
}