import React from 'react';
import { PlayersProp } from "@/types/types";
import LeaderboardItem from './leaderboardItem';

type PlayerProps = {
    players: PlayersProp[],
    region: string
};

export default function PlayersList({players, region}: PlayerProps) {
  return (
    <div className='col-span-5'>
      <ul className="mt-5 ml-10">
        {players.map((player, index: number) => (
          <LeaderboardItem
            key={`${player.puuid}-${index}`}
            gameName={player.gameName}
            numberOfWins={player.numberOfWins}
            rankedRating={player.rankedRating}
            leaderboardRank={player.leaderboardRank}
            tagLine={player.tagLine}
            IsBanned={player.IsBanned}
            IsAnonymized={player.IsAnonymized}
            competitiveTier={player.competitiveTier}
            region={region}
          />
        ))}  
      </ul>
    </div>
  )
}
