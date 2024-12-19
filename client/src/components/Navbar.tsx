import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { ModeToggle } from './ModeToggle'
import { Button } from './ui/button'
import { Link, useNavigate } from 'react-router-dom'

export function Navbar() {
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const { loginWithGoogle } = useAuth()
  const navigate = useNavigate()

  const handleGoogleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    try {
      await loginWithGoogle()
      navigate('/')
    } catch (err) {
      setError('Failed to sign in with Google')
      console.error('Sign in error:', err)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  return (
    <nav className="fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="font-bold text-xl">
          Helper4U
        </Link>

        <div className="flex items-center gap-4">
          {error && (
            <div className="error text-red-500 text-center mb-4">{error}</div>
          )}
          {currentUser ? (
            <div className="flex items-center gap-4">
              <span className="font-medium">Hi {currentUser.displayName}!</span>
              <Button variant="ghost" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Button variant="ghost" onClick={handleGoogleSignIn}>
                Sign Up
              </Button>
              <Button onClick={handleGoogleSignIn}>Login</Button>
            </>
          )}
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}
