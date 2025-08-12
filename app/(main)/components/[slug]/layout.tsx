import React from 'react'

export const metadata = {
    title: 'Component Detail',
    description: 'Component Detail',
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='max-w-5xl mx-auto'>{children}</div>
  )
}

export default Layout