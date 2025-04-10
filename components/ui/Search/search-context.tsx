'use client';

import React, { createContext, useContext } from 'react';
import { Components } from '@/types';

export interface SearchContextType {
  query: string;
  setQuery: (query: string) => void;
  results: Components[];
  popularComponents: Components[];
  recentSearches: Components[];
  isSearching: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activeTab: 'all' | 'recent' | 'popular';
  setActiveTab: (tab: 'all' | 'recent' | 'popular') => void;
  focusedIndex: number;
  setFocusedIndex: (index: number) => void;
  navigateToComponent: (component: Components) => void;
  searchInputRef: React.RefObject<HTMLInputElement>;
  resultsContainerRef: React.RefObject<HTMLDivElement>;
  getDisplayedResults: () => Components[];
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: SearchContextType;
}) {
  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}