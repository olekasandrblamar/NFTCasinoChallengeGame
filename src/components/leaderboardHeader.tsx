import React from "react";
import { HeaderProps } from "@/types/types";

export default function LeaderboardHeader(props: HeaderProps) {
  return (
    <div className="grid grid-cols-4 text-gray-400 justify-items-center mt-10 w-3/5">
      <p>
        immortal_1_threshold: <span>{props.immortal_1_threshold}</span>
      </p>
      <p>
        immortal_2_threshold: <span>{props.immortal_2_threshold}</span>
      </p>
      <p>
        immortal_3_threshold: <span>{props.immortal_3_threshold}</span>
      </p>
      <p>
        last_update: <span>{props.last_update}</span>
      </p>
      <p>
        next_update: <span>{props.next_update}</span>
      </p>
      <p>
        radiant_threshold: <span>{props.radiant_threshold}</span>
      </p>
      <p>
        total_players: <span>{props.total_players}</span>
      </p>
    </div>
  );
}
