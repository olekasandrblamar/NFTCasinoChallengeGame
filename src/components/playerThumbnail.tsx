import React from 'react'

type PlayerThumbnailProps = {
    gameName: string ;
    leaderboardRank: number
}

export default function PlayerThumbnail({gameName, leaderboardRank }: PlayerThumbnailProps) {
  return (
    <div>
        <li className="flex flex-row justify-center bg-gray-400 mt-5 py-3 space-x-10 px-10 rounded-lg hover:bg-gray-300 w-full">
        <span className="w-48">Game :{gameName}</span>
        <span className="w-48">LeaderBoard :{leaderboardRank}</span>
      </li>
    </div>
  )
}