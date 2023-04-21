import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';
import { PostType }  from '@/types/types';
import InstanceOfPost from '@/utils/interfaceTypeChecking';

interface PostProps {
    post?: PostType 
};

export default function PostCard({post}: PostProps) {
    return (
        <div>
        { InstanceOfPost(post) && (   
            <div className='grid mt-20 max-w-sm hover:scale-125 hover:mt-28 hover:pb-20'>
                <div className='grid grid-cols-2'>
                    <div className='relative w-10 h-10'>
                            <Image 
                                src={post.authorAvatar}
                                alt=""
                                fill
                                className='rounded-full'
                            />
                    </div>
                    <p className='mt-2 text-zinc-100 flex justify-end'>{post.authorName}</p>
                </div>
                <div className='mt-2'>
                    <Link href={`/posts/${post.id}`} legacyBehavior>
                        <a>
                            <div className='relative w-96 h-96'>
                                <Image 
                                    src={post.postImage}
                                    alt=""
                                    fill
                                    className='rounded-lg'
                                />
                            </div>
                        </a>
                    </Link>
                    <div>
                        <p className='mt-2 text-xs text-zinc-400 flex justify-end'>{moment(post.createdAt).fromNow()}</p>
                        <Link href=''>
                            <p className='mt-4 text-sm text-zinc-100 text-center'>{post.postText}</p>
                        </Link>
                    </div>
                </div>
            </div>
            )}   
        </div>
    )
}
