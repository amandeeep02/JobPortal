'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const roles = [
  {
    value: 'admin',
    label: 'admin',
  },
  {
    value: 'helper',
    label: 'Helper',
  },
]

interface DropdownProps {
  onSelect: (value: string) => void
}

export function Dropdown({ onSelect }: DropdownProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  const handleSelect = (currentValue: string) => {
    setValue(currentValue)
    onSelect(currentValue)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? roles.find((role) => role.value === value)?.label
            : 'Select role...'}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" onClick={() => setOpen(true)}>
        <Command>
          <CommandList>
            <CommandEmpty>No role found.</CommandEmpty>
            <CommandGroup>
              {roles.map((role) => (
                <CommandItem
                  key={role.value}
                  onSelect={() => handleSelect(role.value)}
                  className="cursor-pointer px-2 py-1.5 hover:bg-red active:bg-red"
                >
                  {role.label}
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      value === role.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
