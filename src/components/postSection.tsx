import React from 'react'
import moment from 'moment'
import Link from 'next/link'
import Image from 'next/image'
import { PostType }  from '@/types/types'
import InstanceOfPost from '@/utils/interfaceTypeChecking'

interface PostProps {
    post?: PostType 
}

export default function PostSection({post}: PostProps) {
    return (
        <>
        { InstanceOfPost(post) && (   
            <div className='grid grid-cols-5 mt-16 w-full justify-items-center h-[500px]'>
                <div className='col-span-2 flex flex-col justify-center'>
                    <div className='relative w-36 h-36'>
                            <Image 
                                src={post.authorAvatar}
                                alt=""
                                fill
                                className='rounded-full'
                            />
                    </div>
                    <p className='mt-5 text-zinc-100 text-center text-lg'>{post.authorName}</p>
                </div>
                <div className='col-span-3 mt-2 grid w-full'>
                    <div className='grid justify-items-center'>
                        <Link href={`/posts/${post.id}`} legacyBehavior>
                            <a>
                                <div className='relative w-[500px] h-96'>
                                    <Image 
                                        src={post.postImage}
                                        alt=""
                                        fill
                                        className='rounded-lg'
                                    />
                                </div>
                            </a>
                        </Link>
                    </div>
                    <div className='grid justify-items-center'>
                        <p className='mt-2 text-xs text-zinc-400 '>{moment(post.createdAt).fromNow()}</p>
                        <Link href=''>
                            <p className='mt-4 text-sm text-zinc-100 '>{post.postText}</p>
                        </Link>
                       
                    </div>
                    <div className='flex flex-col items-center mt-5 self-center'>
                        <input type="text" name="comment" id="comment" className='h-10 w-96 rounded-lg px-2' placeholder='Add a comment' />
                        <input type="submit" className='bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 px-10 py-2 mt-5 rounded-md' />
                    </div>
                </div>
            </div>
            )}   
        </>
    )
}
