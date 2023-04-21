import React from 'react'
import PostCard from '@/components/postCard'

interface PostsListProps {
    posts: unknown
}

export default function PostsList({posts}: PostsListProps) {
  return (
    <div className='w-4/5 grid justify-items-center pb-16 col-span-7'>
        {Array.isArray(posts) && posts.map((post) => {
            return (
                <PostCard key={post.id} post={post} />
            )
        })}
    </div>
  )
}
