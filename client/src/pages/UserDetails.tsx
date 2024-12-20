'use client'
import React, { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useAuth } from '@/context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function UserDetails() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    role: '',
  })

  useEffect(() => {
    if (currentUser) {
      const names = currentUser.displayName?.split(' ') || ['', '']
      setFormData({
        firstname: names[0] || '',
        lastname: names.slice(1).join(' ') || '',
        email: currentUser.email || '',
        role: '',
      })
    }
  }, [currentUser])

  const handleroleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        `https://job-portal-helper.vercel.app/api/user`,
        {
          firstName: formData.firstname,
          lastName: formData.lastname,
          email: formData.email,
          role: formData.role,
        }
      )

      if (response.data.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/jobs')
      }
    } catch (err) {
      console.error('Error updating user details:', err)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full mx-auto rounded-lg md:rounded-2xl p-4 md:p-8 shadow-input bg-neutral-950 dark:bg-black align-middle justify-center border md:border-2 border-neutral-200 dark:border-neutral-800">
        <h2 className="font-bold text-xl text-neutral-200 dark:text-neutral-200">
          Welcome to Pooling & Pairing
        </h2>
        <p className="text-neutral-300 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Please fill in the form below to create an account
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstname">First name</Label>
              <Input
                id="firstname"
                value={formData.firstname}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    firstname: e.target.value,
                  }))
                }
                placeholder="Tyler"
                type="text"
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Last name</Label>
              <Input
                id="lastname"
                value={formData.lastname}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, lastname: e.target.value }))
                }
                placeholder="Durden"
                type="text"
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="projectmayhem@fc.com"
              type="email"
              disabled
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="role">Role</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="w-full text-left px-3 py-2 border rounded-md bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-300"
                  type="button"
                >
                  {formData.role || 'Select a role'}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleroleChange('admin')}>
                  Admin
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleroleChange('helper')}>
                  Helper
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Finish &rarr;
            <BottomGradient />
          </button>
        </form>
      </div>
    </div>
  )
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  )
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={cn('flex flex-col space-y-2 w-full', className)}>
      {children}
    </div>
  )
}
