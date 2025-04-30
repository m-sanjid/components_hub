'use client';

import { useState } from 'react';
import { ResponsivePreview } from './ResponsivePreview';
import { useTheme } from '@/lib/theme-context';

export function EnhancedComponentPreview({ 
  children, 
  showResponsiveControls = false,
  initialViewport = 'desktop',
  componentName = '',
}: { 
  children: React.ReactNode;
  showResponsiveControls?: boolean;
  initialViewport?: 'desktop' | 'tablet' | 'mobile';
  componentName?: string;
}) {
  const { theme } = useTheme();
  const [isFullWidth, setIsFullWidth] = useState(false);
  
  if (showResponsiveControls) {
    return (
      <div className="my-8">
        {componentName && (
          <div className="mb-2 text-lg font-medium">{componentName}</div>
        )}
        <ResponsivePreview initialViewport={initialViewport}>
          <div className={`p-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
            {children}
          </div>
        </ResponsivePreview>
      </div>
    );
  }
  
  return (
    <div className="my-8">
      {componentName && (
        <div className="mb-2 text-lg font-medium">{componentName}</div>
      )}
      <div className="flex justify-end mb-2">
        <button
          onClick={() => setIsFullWidth(!isFullWidth)}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          {isFullWidth ? "Constrain Width" : "Full Width"}
        </button>
      </div>
      <div 
        className={`
          border rounded-lg p-6 
          ${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}
          ${isFullWidth ? 'w-full' : 'max-w-2xl mx-auto'}
        `}
      >
        {children}
      </div>
    </div>
  );
}

export function EnhancedCodePreview({
  children,
  componentName,
  code,
  props = [],
  responsivePreview = false,
}: { 
  children: React.ReactNode;
  componentName?: string;
  code: string;
  props?: any[];
  responsivePreview?: boolean;
}) {
  const [activeTab, setActiveTab] = useState('preview');
  const [copied, setCopied] = useState(false);
  
  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="my-8 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'preview'
              ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-gray-600 dark:text-gray-300'
          }`}
          onClick={() => setActiveTab('preview')}
        >
          Preview
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'code'
              ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-gray-600 dark:text-gray-300'
          }`}
          onClick={() => setActiveTab('code')}
        >
          Code
        </button>
        {props.length > 0 && (
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'props'
                ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-gray-600 dark:text-gray-300'
            }`}
            onClick={() => setActiveTab('props')}
          >
            Props
          </button>
        )}
      </div>
      
      <div>
        {activeTab === 'preview' && (
          <div className="p-4 bg-white dark:bg-gray-800">
            {responsivePreview ? (
              <ResponsivePreview initialViewport="desktop">
                <div className="w-full">
                  {children}
                </div>
              </ResponsivePreview>
            ) : (
              children
            )}
          </div>
        )}
        
        {activeTab === 'code' && (
          <div className="relative">
            <pre className="language-jsx p-4 bg-gray-50 dark:bg-gray-900 overflow-x-auto">
              <code>{code}</code>
            </pre>
            <button
              onClick={copyCode}
              className="absolute top-2 right-2 p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 text-xs"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        )}
        
        {activeTab === 'props' && props.length > 0 && (
          <div className="p-4 bg-white dark:bg-gray-800 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Default</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {props.map((prop, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                      {prop.name}
                      {prop.required && <span className="text-red-500 ml-1">*</span>}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                      <code className="text-xs bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">
                        {prop.type}
                      </code>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                      {prop.defaultValue ? (
                        <code className="text-xs bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">
                          {prop.defaultValue}
                        </code>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                      {prop.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// This component replaces the original ComponentPreview in your MDX files
export function ComponentPreview({ children, showResponsiveView = false }: { children: React.ReactNode; showResponsiveView?: boolean }) {
  if (showResponsiveView) {
    return (
      <ResponsivePreview initialViewport="desktop">
        <div className="w-full">
          {children}
        </div>
      </ResponsivePreview>
    );
  }
  
  return (
    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
      {children}
    </div>
  );
}

// Used to render the Component Examples with multiple variants
export function ComponentVariants({ 
  component: Component, 
  variants = [], 
  propName = 'variant',
  containerClassName = 'flex flex-wrap gap-4'
}: { 
  component: React.ComponentType;
  variants: string[];
  propName: string;
  containerClassName?: string;
}) {
  return (
    <div className={containerClassName}>
      {variants.map((variant, index) => {
        const props = { [propName]: variant };
        return (
          <div key={index} className="flex flex-col items-center">
            <Component {...props} />
            <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">{variant}</span>
          </div>
        );
      })}
    </div>
  );
}

export function ResponsiveComponentPreview({ 
  children,
  initialViewport = 'desktop'
}: { 
  children: React.ReactNode;
  initialViewport?: 'desktop' | 'tablet' | 'mobile';
}) {
  return (
    <ResponsivePreview initialViewport={initialViewport}>
      {children}
    </ResponsivePreview>
  );
}