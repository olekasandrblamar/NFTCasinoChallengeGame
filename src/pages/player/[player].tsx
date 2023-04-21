import React from "react";
import { useRouter } from "next/router";
import Card from "@/components/playerCard"
import { useGetPlayerQuery } from "@/redux/apis/playersApi";

export default function Player() {
  const router = useRouter();
  const { player, name } = router.query;
  let region: string = "", tag: string = "";

  if (typeof player === "string") {
    region = player.split("-")[0];
    tag = player.split("-")[1];
  }

  const { data, error, isLoading } = useGetPlayerQuery({region, name, tag})
 
  return (
    <div className='mt-10'>
      <h1 className="mt-10 text-center text-white text-4xl">
        {name}#{tag} ({region})
      </h1>
      {isLoading && <div className="text-white text-center mt-40">...Loading</div> }
      {error && <div className="text-white text-center mt-40">We couldnt retrive the data</div> }
      <div className="grid grid-cols-5 mt-28 justify-items-end px-10 space-x-10">
        {data && data?.data?.map((match: any, index: any) => {
            let selectedPlayer = match.players.all_players.filter(
              (val: any) => val.name === name && val.tag === tag
            );
            return (
              <Card
                key={index}
                teams={match.teams}
                player={selectedPlayer[0]}
                meta={match.metadata}
              />
            );
          })}
      </div>
      <button onClick={() => router.back()} className="ml-10 block mt-36 w-48 text-center bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 px-10 py-2 rounded-md">Go back</button>
    </div>
  );
}
