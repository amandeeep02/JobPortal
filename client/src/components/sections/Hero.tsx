'use client'

import { motion } from 'framer-motion'
import { AuroraBackground } from '../ui/aurora-background'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import {  useState } from 'react'


export function Hero() {

  const [error, setError] = useState('')
  const { loginWithGoogle } = useAuth()
  const navigate = useNavigate()


  const handleGoogleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    try {
      await loginWithGoogle()
      navigate('/user-details') 
    } catch (err) {
      setError('Failed to sign in with Google')
      console.error('Sign in error:', err)
    }
  }

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
          Helper4U
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
          Get your first job
        </div>
        {error && (
          <div className="error text-red-500 text-center mb-4">{error}</div>
        )}
        <button
          className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2"
          onClick={handleGoogleSignIn}
        >
          Click Here
        </button>
      </motion.div>
    </AuroraBackground>
  )
}
