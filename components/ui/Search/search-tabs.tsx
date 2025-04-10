'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { IconStar, IconHistory } from '@tabler/icons-react';
import { useSearch } from './search-context';

export function SearchTabs() {
  const { activeTab, setActiveTab } = useSearch();

  return (
    <div className="flex border-b">
      <motion.button
        className={`px-4 py-2 text-sm font-medium ${activeTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
        onClick={() => setActiveTab('all')}
        whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
        whileTap={{ scale: 0.98 }}
      >
        All Components
      </motion.button>
      <motion.button
        className={`px-4 py-2 text-sm font-medium flex items-center ${activeTab === 'popular' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
        onClick={() => setActiveTab('popular')}
        whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
        whileTap={{ scale: 0.98 }}
      >
        <IconStar size={14} className="mr-1"/> Popular
      </motion.button>
      <motion.button
        className={`px-4 py-2 text-sm font-medium flex items-center ${activeTab === 'recent' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
        onClick={() => setActiveTab('recent')}
        whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
        whileTap={{ scale: 0.98 }}
      >
        <IconHistory size={14} className="mr-1"/> Recent
      </motion.button>
    </div>
  );
}