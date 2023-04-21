import React from "react";
import Link from "next/link";
import { LiProps } from "@/types/types";

export default function LeaderboardItem(props: LiProps) {

  return (
    <Link href={`/player/${props.region}-${props.tagLine}?name=${props.gameName}`}>
      <li className="flex flex-row justify-center bg-gray-400 mt-5 py-3 space-x-10 w-4/5 px-5 rounded-lg hover:bg-gray-300">
        <span className="w-48">Game :{props.gameName}</span>
        <span className="w-48">Wins :{props.numberOfWins}</span>
        <span className="w-48">Rank :{props.rankedRating}</span>
        <span className="w-48">LeaderBoard :{props.leaderboardRank}</span>
        <span className="w-48">TagLine :{props.tagLine}</span>
        <span className="w-48">Banned :{`${props.IsBanned}`}</span>
        <span className="w-48">Anonyme :{`${props.IsAnonymized}`}</span>
        <span className="w-48">Comptitive Tier :{props.competitiveTier}</span>
      </li>
    </Link>
  );
}
