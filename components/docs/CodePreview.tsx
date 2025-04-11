'use client';

import { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { useTheme } from '@/lib/theme-context';
import { PropTable } from './PropsTable';
import { AccessibilityChecker } from './AccessibilityChecker';
import { ResponsivePreview } from './ResponsivePreview';

interface EnhancedCodePreviewProps {
  code: string;
  language?: string;
  children: React.ReactNode;
  componentName: string;
  props?: any[];
  responsivePreview?: boolean;
  withA11yCheck?: boolean;
}

export function EnhancedCodePreview({
  code,
  language = 'tsx',
  children,
  componentName,
  props,
  responsivePreview = false,
  withA11yCheck = false
}: EnhancedCodePreviewProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'props' | 'a11y'>('preview');
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const previewId = `preview-${componentName.toLowerCase()}`;
  
  return (
    <div className="my-8 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'preview'
                ? 'bg-white dark:bg-gray-800 border-b-2 border-blue-500 dark:border-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'code'
                ? 'bg-white dark:bg-gray-800 border-b-2 border-blue-500 dark:border-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            Code
          </button>
          {props && props.length > 0 && (
            <button
              onClick={() => setActiveTab('props')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'props'
                  ? 'bg-white dark:bg-gray-800 border-b-2 border-blue-500 dark:border-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              Props
            </button>
          )}
          {withA11yCheck && (
            <button
              onClick={() => setActiveTab('a11y')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'a11y'
                  ? 'bg-white dark:bg-gray-800 border-b-2 border-blue-500 dark:border-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              Accessibility
            </button>
          )}
        </div>
      </div>
      
      <div>
        {activeTab === 'preview' && (
          responsivePreview ? (
            <ResponsivePreview>
              <div id={previewId} className="p-4">
                {children}
              </div>
            </ResponsivePreview>
          ) : (
            <div id={previewId} className={`p-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
              {children}
            </div>
          )
        )}
        
        {activeTab === 'code' && (
          <div>
            <div className="relative">
              <Highlight
                theme={theme === 'dark' ? themes.vsDark : themes.github}
                code={code.trim()}
                language={language as any}
              >
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                  <pre 
                    className={`${className} p-4 overflow-auto`} 
                    style={{...style, backgroundColor: theme === 'dark' ? '#1e1e1e' : '#f6f8fa'}}
                  >
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line })}>
                        <span className="text-gray-400 dark:text-gray-600 mr-4 text-xs select-none">
                          {i + 1}
                        </span>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
              
              <button
                onClick={copyToClipboard}
                className="absolute top-2 right-2 px-2 py-1 text-xs bg-gray-700 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'props' && props && (
          <div className="p-4">
            <PropTable props={props} />
          </div>
        )}
        
        {activeTab === 'a11y' && withA11yCheck && (
          <div className="p-4">
            <AccessibilityChecker componentId={previewId} />
          </div>
        )}
      </div>
    </div>
  );
}