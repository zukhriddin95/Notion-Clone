import React from 'react'
import { childrenProps } from '@/types'
import Navbar from './components/navbar'

const HomeLayout = ({children}: childrenProps) => {
  return (
    <div className='h-full '>
        <Navbar  />
        <main className='h-full pt-40'>
        {children}
        </main>
    </div>
  )
}

export default HomeLayout