'use client';

import React from 'react';
import { useSearchDialog } from './use-search-dialog';
import { SearchDialogContent } from './search-dialog-content';
import { SearchTrigger } from './search-trigger';
import { SearchProvider } from './search-context';

export interface SearchDialogProps {
  apiUrl?: string;
  componentsApiUrl?: string;
  placeholder?: string;
  shortcut?: string;
}

export function SearchDialog({
  apiUrl = '/api/search',
  componentsApiUrl = '/api/components',
  placeholder = 'Search components...',
  shortcut = '⌘K',
}: SearchDialogProps) {
  const searchState = useSearchDialog({
    apiUrl,
    componentsApiUrl,
  });

  return (
    <SearchProvider value={searchState}>
      <div className="relative">
        <SearchTrigger 
          placeholder={placeholder} 
          shortcut={shortcut} 
        />
        <SearchDialogContent placeholder={placeholder} />
      </div>
    </SearchProvider>
  );
}