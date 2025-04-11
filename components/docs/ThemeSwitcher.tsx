'use client';

import { useTheme } from '@/lib/theme-context';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium">Theme:</span>
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'system')}
        className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
    </div>
  );
}