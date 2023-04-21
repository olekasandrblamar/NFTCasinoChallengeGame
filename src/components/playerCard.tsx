import React from "react";
import Image from "next/image";

export default function PlayerCard({ teams, meta, player }: any) {

  const { blue, red } = teams;
  const stats = player.stats;
  const includeTeam = ["Blue", "Red"].includes(player.team);

  const title =
    (player.team === "Blue" && blue.has_won) ||
    (player.team === "Red" && red.has_won)
      ? "WIN"
      : (player.team === "Red" && blue.has_won) ||
        (player.team === "Blue" && red.has_won)
      ? "LOSS"
      : "DRAW";
    
  return (
    <div className="bg-gray-400 p-10 rounded-lg space-y-5">
      {includeTeam ? <h3 className={`${title === 'WIN' ? 'text-red-700' : 'text-blue-700'}`}>#{title || "DRAW" }</h3> : <></>}
      <div>
        <p>map : {meta.map}</p>
        <p>match start : {meta.game_start_patched}</p>
        <p>duration: {(meta.game_length / 3600).toFixed(0)} min</p>
      </div>
      <div>
        <p>
          kda: {stats.kills}/{stats.deaths}/{stats.assists}
        </p>
        <p>{player.character}</p>
        <Image alt="agent" src={player.assets.agent.small} height={60} width={60} className="rounded-full" />
      </div>
      <Image alt="agent" src={player.assets.card.small} height={60} width={60} className="rounded-full"/>
    </div>
  );
}
