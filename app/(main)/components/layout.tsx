import React from 'react';
import Sidebar from '@/components/Sidebar';

export default function ComponentsLayout({children}:{children: React.ReactNode}){
    return (
        <div className="relative min-h-screen">
            <div className="flex">
                <Sidebar />
                <main className="flex-1 max-w-5xl mx-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}