'use client'

import { CommentWithExtras } from '@/lib/definitions'
import { User } from 'next-auth'
import React from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CreateCommentSchema } from '@/schemas/posts'

export default function Comments({
  postId,
  comments,
  user,
}: {
  postId: string
  comments: CommentWithExtras[]
  user?: User | null
}) {
  const form = useForm<z.infer<typeof CreateCommentSchema>>({
    resolver: zodResolver(CreateCommentSchema),
    defaultValues: {
      body: '',
      postId,
    },
  })

  const body = form.watch('body')
  return (
    <div className="space-y-0.5 px-3 sm:px-0">
      <Form {...form}>
        <form
          onSubmit={() => {}}
          className="flex items-center space-x-2 border-b border-gray-300 py-1 pb-3 dark:border-neutral-800"
        >
          <FormField
            control={form.control}
            name="body"
            render={({ field, fieldState }) => (
              <FormItem className="flex w-full">
                <FormControl>
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 border-none  bg-transparent text-sm font-medium placeholder-neutral-500 focus:outline-none dark:text-white dark:placeholder-neutral-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {body.trim().length > 0 && (
            <button
              type="submit"
              className="text-sm font-semibold text-sky-500 hover:text-white disabled:cursor-not-allowed disabled:hover:text-sky-500"
            >
              Post
            </button>
          )}
        </form>
      </Form>
    </div>
  )
}
