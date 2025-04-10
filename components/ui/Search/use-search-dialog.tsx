'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Components } from '@/types';

interface UseSearchDialogProps {
  apiUrl: string;
  componentsApiUrl: string;
}

export function useSearchDialog({ apiUrl, componentsApiUrl }: UseSearchDialogProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Components[]>([]);
  const [popularComponents, setPopularComponents] = useState<Components[]>([]);
  const [recentSearches, setRecentSearches] = useState<Components[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'recent' | 'popular'>('all');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  // Handle CMD+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for CMD+K (Mac) or CTRL+K (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
        searchInputRef.current?.focus();
      }
      // Close on escape
      if (e.key === 'Escape') {
        setIsOpen(false);
        searchInputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Fetch search results when query changes
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setIsSearching(true);
      try {
        const response = await fetch(`${apiUrl}?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setIsSearching(false);
      }
    };

    // Debounce the search
    const timerId = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(timerId);
  }, [query, apiUrl]);

  // Fetch popular components and recent searches when modal opens
  useEffect(() => {
    if (isOpen) {
      // Get recent searches from localStorage
      try {
        const storedSearches = localStorage.getItem('recentSearches');
        if (storedSearches) {
          setRecentSearches(JSON.parse(storedSearches));
        }
      } catch (err) {
        console.error('Failed to load recent searches:', err);
      }

      // Fetch popular components
      const fetchPopularComponents = async () => {
        try {
          const response = await fetch(componentsApiUrl);
          const data = await response.json();
          setPopularComponents(data);
        } catch (error) {
          console.error('Failed to fetch popular components:', error);
          // Fallback mock data
          setPopularComponents([
            { slug: 'button', title: 'Button', description: 'Standard button component with variants' },
            { slug: 'modal', title: 'Modal', description: 'Customizable modal dialog component' },
            { slug: 'data-table', title: 'Data Table', description: 'Advanced table with sorting and filtering' },
            { slug: 'dropdown', title: 'Dropdown', description: 'Multi-purpose dropdown menu component' },
            { slug: 'form', title: 'Form', description: 'Form with validation and submission handling' }
          ]);
        }
      };
      
      fetchPopularComponents();
    }
  }, [isOpen, componentsApiUrl]);

  // Reset focused index when results change
  useEffect(() => {
    setFocusedIndex(-1);
  }, [query, activeTab]);

  // Save recent search when navigating to a component
  const navigateToComponent = (component: Components) => {
    // Save search to recent searches
    const newRecentSearches = [
      { title: component.title, slug: component.slug },
      ...recentSearches.filter(item => item.slug !== component.slug).slice(0, 4)
    ];
    
    try {
      localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
    } catch (err) {
      console.error('Failed to save recent search:', err);
    }
    
    router.push(`/components/${component.slug}`);
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  // Get currently displayed results based on active tab
  const getDisplayedResults = () => {
    if (query.trim()) {
      return results;
    }
    
    switch (activeTab) {
      case 'recent':
        return recentSearches;
      case 'popular':
        return popularComponents;
      default:
        return popularComponents;
    }
  };

  return {
    query,
    setQuery,
    results,
    popularComponents,
    recentSearches,
    isSearching,
    isOpen,
    setIsOpen,
    activeTab,
    setActiveTab,
    focusedIndex,
    setFocusedIndex,
    navigateToComponent,
    searchInputRef,
    resultsContainerRef,
    getDisplayedResults,
  };
}