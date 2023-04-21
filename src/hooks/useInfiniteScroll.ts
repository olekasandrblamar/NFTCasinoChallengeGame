import { postsApi } from "@/redux/apis/postsApi";
import { playersApi } from "@/redux/apis/playersApi";
import { PlayersProp, PostType } from "@/types/types";
import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";

export interface UseInfiniteScroll {
  region: string;
  isLoading: boolean;
  isLastPage: boolean;
  hasDynamicData: boolean;
  dynamicData: PlayersProp[] | PostType[];
  updateLastPage: (value: boolean) => void;
  setRegion: Dispatch<SetStateAction<string>>;
  loadMoreCallback: (el: HTMLDivElement) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  updateDynamicData: (newData: PlayersProp[] | PostType[]) => void;
}

export const useInfiniteScroll = (data: PlayersProp[] | PostType[], mode = ""): UseInfiniteScroll => {
  const [limit, setLimit] = useState(5);
  const [start, setStart] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const observerRef = useRef<IntersectionObserver>();
  const [region, setRegion] = useState<string>("eu");
  const [isLastPage, setIsLastPage] = useState(false);
  const [hasDynamicData, setHasDynamicData] = useState(false);
  const [dynamicData, setdynamicData] = useState<PlayersProp[] | PostType[]>(data);
  const loadMoreTimeout: NodeJS.Timeout = setTimeout(() => null, 500);
  const loadMoreTimeoutRef = useRef<NodeJS.Timeout>(loadMoreTimeout);
  const [trigger] = playersApi.endpoints.getPlayers.useLazyQuery();
  const [triggerPosts] = postsApi.endpoints.getPostsLimit.useLazyQuery();


  const handleObserver = useCallback(
    (entries: any[]) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setIsLoading(true);
        clearTimeout(loadMoreTimeoutRef.current);

        // this timeout debounces the intersection events
        loadMoreTimeoutRef.current = setTimeout(async () => {
          console.log('aldkjflkjadfkljaf')
          const { data } = await triggerPosts(limit);
          setLimit((limit) => limit + 5);
          const newPosts: PostType[] = data;
          if (newPosts?.length) {
            const newDynamicPosts: PostType[] = [...newPosts];
            setdynamicData(newDynamicPosts);
            setIsLastPage(newDynamicPosts?.length >= 95);
            setHasDynamicData(true);
            setIsLoading(false);
          }
          ;
        }, 500);
      }
    },
    [loadMoreTimeoutRef, setIsLoading, limit, dynamicData]
  );

  //Handler for player because ?start=1500 doesnt work in api
  const handleObserverPlayers = useCallback(
    (entries: any[]) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setIsLoading(true);
        clearTimeout(loadMoreTimeoutRef.current);

        // this timeout debounces the intersection events
        loadMoreTimeoutRef.current = setTimeout(async () => {
          const { data } = await trigger(region);
          setStart((prevStart) => prevStart + 1);
          const newPlayers: PlayersProp[] = data?.players;
          if (newPlayers?.length) {
            const newDynamicPlayers = newPlayers.slice(0, start * 1000)
            setdynamicData(newDynamicPlayers as PlayersProp[]);
            setIsLastPage(newDynamicPlayers?.length < 20100 && newDynamicPlayers?.length > 20020);
            setHasDynamicData(true);
            setIsLoading(false);
          }
          ;
        }, 500);
      }
    },
    [loadMoreTimeoutRef, setIsLoading, dynamicData, start, region]
  );

  const loadMoreCallback = useCallback(
    (el: HTMLDivElement) => {
      if (isLoading) return;
      if (observerRef.current) observerRef.current.disconnect();

      const option: IntersectionObserverInit = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      };

      if (mode !== "ApiNoFilter") {
        observerRef.current = new IntersectionObserver(handleObserver, option);
      } else {
        observerRef.current = new IntersectionObserver(handleObserverPlayers, option);
      }

      if (el) observerRef.current.observe(el);
    },
    [handleObserver, isLoading, handleObserverPlayers]
  );

  const updateDynamicData = (newData: PlayersProp[] | PostType[]) => {
    setdynamicData(newData);
  }

  const updateLastPage = (value: boolean) => {
    setIsLastPage(value);
  }

  return {
    isLoading,
    loadMoreCallback,
    hasDynamicData,
    dynamicData,
    isLastPage,
    updateDynamicData,
    updateLastPage,
    setIsLoading,
    region,
    setRegion
  };
};