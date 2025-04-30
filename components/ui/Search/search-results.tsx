'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IconArrowRight, IconHistory } from '@tabler/icons-react';
import { useSearch } from './search-context';

export function SearchResults() {
  const { 
    query, 
    results, 
    recentSearches, 
    popularComponents, 
    activeTab, 
    focusedIndex, 
    navigateToComponent,
    resultsContainerRef,
  } = useSearch();


  return (
    <div 
      ref={resultsContainerRef}
      className="max-h-64 overflow-y-auto"
    >
      <AnimatePresence mode="wait">
        {query.trim() ? (
          // Search results list
          results.length > 0 ? (
            <motion.div 
              key="results-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="py-2"
            >
              {results.map((component, index) => (
                <motion.button
                  key={`result-${component?.slug || index}`}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    backgroundColor: focusedIndex === index ? 'rgba(59, 130, 246, 0.1)' : 'transparent' 
                  }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15, delay: index * 0.03 }}
                  onClick={() => navigateToComponent(component)}
                  className={`flex items-center w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors ${focusedIndex === index ? 'bg-blue-50 border-l-2 border-blue-500' : ''}`}
                  whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex-1">
                    <div className="font-medium">{component?.title}</div>
                    {component?.description && (
                      <div className="text-sm text-gray-600 truncate">{component?.description}</div>
                    )}
                  </div>
                  <IconArrowRight size={16} className="text-gray-400" />
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-8 text-center text-gray-500"
            >
              <div className="mb-2">No results found for &quot;{query}&quot;</div>
              <div className="text-sm text-gray-400">Try different keywords or browse components below</div>
            </motion.div>
          )
        ) : (
          // Default content when no query
          <motion.div
            key="default-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {activeTab === 'recent' && recentSearches.length > 0 ? (
              <div className="py-2">
                <div className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase">Recent Searches</div>
                {recentSearches.map((component, index) => (
                  <motion.button
                    key={`recent-${component?.slug || index}`}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      backgroundColor: focusedIndex === index ? 'rgba(59, 130, 246, 0.1)' : 'transparent'
                    }}
                    transition={{ duration: 0.15, delay: index * 0.03 }}
                    onClick={() => navigateToComponent(component)}
                    className={`flex items-center w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors ${focusedIndex === index ? 'bg-blue-50 border-l-2 border-blue-500' : ''}`}
                    whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                  >
                    <IconHistory size={14} className="mr-2 text-gray-400" />
                    <div className="font-medium">{component?.title}</div>
                    <IconArrowRight size={16} className="ml-auto text-gray-400" />
                  </motion.button>
                ))}
              </div>
            ) : activeTab === 'recent' ? (
              <div className="p-8 text-center text-gray-500">
                <div className="mb-2">No recent searches</div>
                <div className="text-sm text-gray-400">Your recently viewed components will appear here</div>
              </div>
            ) : null}
            
            {(activeTab === 'all' || activeTab === 'popular') && (
              <div className="py-2">
                <div className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase">Popular Components</div>
                {popularComponents.map((component, index) => (
                  <motion.button
                    key={`popular-${component?.slug || index}`}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      backgroundColor: focusedIndex === index ? 'rgba(59, 130, 246, 0.1)' : 'transparent'
                    }}
                    transition={{ duration: 0.15, delay: index * 0.03 }}
                    onClick={() => navigateToComponent(component)}
                    className={`flex items-center w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors ${focusedIndex === index ? 'bg-blue-50 border-l-2 border-blue-500' : ''}`}
                    whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                  >
                    <div className="flex-1">
                      <div className="font-medium">{component?.title}</div>
                      {component?.description && (
                        <div className="text-sm text-gray-600 truncate">{component?.description}</div>
                      )}
                    </div>
                    <IconArrowRight size={16} className="text-gray-400" />
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}