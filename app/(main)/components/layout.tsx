import React from 'react';
import Sidebar from '@/components/Sidebar';
import { ThemeProvider } from "@/lib/theme-context";

export default function ComponentsLayout({children}:{children: React.ReactNode}){
    return (
        <div className="relative min-h-screen">
            <ThemeProvider> 
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-4">
                <Sidebar />
                {children}
            </main>
            </ThemeProvider>
        </div>
    )
}