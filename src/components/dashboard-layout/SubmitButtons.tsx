'use client'

import { Button } from '@/components/ui/button'
import { useFormStatus } from '@/react-dom-shim'

import { Loader2, Trash } from 'lucide-react'

export function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <>
      {pending ? (
        <Button disabled className="w-fit">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
        </Button>
      ) : (
        <Button className="w-fit" type="submit">
          Save
        </Button>
      )}
    </>
  )
}

export function TrashDelete() {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <Button variant={'destructive'} size="tiny" disabled>
          <Loader2 className="h- w-4 animate-spin" />
        </Button>
      ) : (
        <Button variant={'destructive'} size="tiny" type="submit">
          <Trash className="h-4 w-4" />
        </Button>
      )}
    </>
  )
}
