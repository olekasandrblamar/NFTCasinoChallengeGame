import Head from "next/head";
import Loader from "@/components/loader";
import Sidebar from "@/components/sidebar";
import PlayersList from "@/components/playersList";
import React, { useEffect, useState } from "react";
import { playersApi } from "@/redux/apis/playersApi";
import SelectRegion from "@/components/selectRegion";
import { useDispatch, useSelector } from "react-redux";
import { HeaderProps, PlayersProp } from "@/types/types";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import LeaderboardHeader from "@/components/leaderboardHeader";
import { getPlayers, setPlayersArray } from "@/redux/slices/playersSlice";

export default function Home() {

  const dispatch = useDispatch();
  const getPlayerArray = useSelector(getPlayers);
  const [error, setError] = useState<string>('');
  const [data, setData] = useState<HeaderProps>({
    immortal_1_threshold: 0,
    immortal_2_threshold: 0,
    immortal_3_threshold: 0,
    last_update: 0,
    next_update: 0,
    radiant_threshold: 0,
    total_players: 0,
  });

  const {
    isLoading,
    loadMoreCallback,
    hasDynamicData,
    dynamicData,
    isLastPage,
    updateDynamicData,
    setIsLoading,
    region,
    setRegion
  } = useInfiniteScroll(getPlayerArray, 'ApiNoFilter');

  const [ trigger ] = playersApi.endpoints.getPlayers.useLazyQuery();
  
  useEffect(() => {
    setIsLoading(true);

    (async () => {
      try{
        const { data } = await trigger(region);
        dispatch(setPlayersArray(data.players));
        updateDynamicData(data.players);
        setData({
          immortal_1_threshold: data.immortal_1_threshold,
          immortal_2_threshold: data.immortal_2_threshold,
          immortal_3_threshold: data.immortal_3_threshold,
          last_update: data.last_update,
          next_update: data.next_update,
          radiant_threshold: data.radiant_threshold,
          total_players: data.total_players,
        });
      } catch{
        setError("Somenthing went wrong")
      }
      
    })();
  },[region]);
  
  return (
    <>
      <Head>
        <title>custom app</title>
        <meta name="description" content="description !" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=''>
        {error && <p className='text-center w-3/5 text-white mt-10'>{error}</p>}
        <LeaderboardHeader
          key={"header-index"}
          immortal_1_threshold={data.immortal_1_threshold}
          immortal_2_threshold={data.immortal_2_threshold}
          immortal_3_threshold={data.immortal_3_threshold}
          last_update={data.last_update}
          next_update={data.next_update}
          radiant_threshold={data.radiant_threshold}
          total_players={data.total_players}
        />
        <SelectRegion region={region} setRegion={setRegion}/>
        <div className='grid grid-cols-7'>
          <PlayersList players={hasDynamicData ? dynamicData as PlayersProp[] : getPlayerArray.slice(0,1000) } region={region} />
          <Sidebar />
        </div>
        <Loader
          isLoading={isLoading}
          isLastPage={isLastPage}
          loadMoreCallback={loadMoreCallback}
          />
      </main>
    </>
  );
}
