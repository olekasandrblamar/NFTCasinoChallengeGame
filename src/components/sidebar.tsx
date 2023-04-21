import React from 'react';
import Link from 'next/link';
import PostCard from './postCard';
import { useRouter } from 'next/router';
import { AppState } from '@/redux/store';
import { useSelector } from 'react-redux';
import PlayerThumbnail from './playerThumbnail';
import { PostType, PlayersProp }  from '@/types/types';
import { useGetPostsLimitQuery } from '@/redux/apis/postsApi';

export default function Sidebar() {
    const router = useRouter()
    const { data, error, isLoading } = useGetPostsLimitQuery(5);
    const players = useSelector((state: AppState) => state.players.players);
    
    return (
        <div className='text-white col-span-2'>
            { router.pathname === "/" ? 
            <div>
                <div className='flex '>
                    <h2 className='text-white text-xl'>Featured Posts</h2>
                    <Link href="/posts" className="ml-10 w-48 text-center bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 px-10 py-2 rounded-md">See all posts</Link>
                </div>
                {isLoading && <div className="text-white text-center mt-40">...Loading</div> }
                {error && <p className='text-center w-3/5 text-white mt-10'>Something went wrong, please refresh</p>}
                {data && data.map((post:PostType) => {
                    return(
                        <div key={post.id} className='w-48'>
                            <PostCard post={post} />
                        </div>
                    )
                })}
            </div> : 
            <div className='mt-10'>
                <div className='flex'>
                    <h2 className='text-white text-xl'>Featured Players</h2>
                    <Link href="/" className="ml-10 w-48 text-center bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 px-10 py-2 rounded-md">See all players</Link>
                </div>
                {players && players.slice(0,6).map((player:PlayersProp) => {
                    return(
                        <div key={player.puuid} className='w-full mt-10'>
                            <PlayerThumbnail gameName={player.gameName} leaderboardRank={player.leaderboardRank} />
                        </div>
                    )
                })}
            </div> 
            }
        </div>
    )
}
