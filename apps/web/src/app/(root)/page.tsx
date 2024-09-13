"use client"
import AuthGuardCustomer from '@/hoc/AuthGuard'
import React from 'react'

const HomePage = () => {
  return (
    <main className='container mx-auto px-4'>Home</main>
  )
}

export default AuthGuardCustomer(HomePage)