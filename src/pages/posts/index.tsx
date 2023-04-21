import { wrapper } from '@/redux/store';
import { PostType } from '@/types/types';
import Loader from '@/components/loader';
import PostsList from '@/components/postsList';
import Searchbar from '@/components/searchBar';
import { GetServerSideProps } from 'next/types';
import React, { useEffect, useState } from 'react';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { getPosts, getRunningQueriesThunk, postsApi } from '@/redux/apis/postsApi';
import Sidebar from '@/components/sidebar';


type PostsProps =  {
  posts: unknown[] ,
}

export default function Posts({posts}: PostsProps) {
  const [query, setQuery] = useState<string>('');
  const [queryResponse, setQueryResponse] = useState<string>('');
  const [error, setError] = useState<string>('');

  const [ trigger ] = postsApi.endpoints.getFilteredPosts.useLazyQuery();
  const [ triggerFirstPosts ] = postsApi.endpoints.getPosts.useLazyQuery();

  const {
    isLoading,
    loadMoreCallback,
    hasDynamicData,
    dynamicData,
    isLastPage,
    updateDynamicData,
    updateLastPage
  } = useInfiniteScroll(posts as PostType[]);

  useEffect(()=>{
    const timer = setTimeout(async () => {
      try {
        if(query !== ""){
          const { data } = await trigger(query);
          if(data.length < 1) setQueryResponse("There are no results for your search")
          updateDynamicData(data)
          updateLastPage(true)
        } else{
          setQueryResponse("")
          const { data } = await triggerFirstPosts({});
          updateDynamicData(data)
          updateLastPage(false)
        }
      } catch {
        setError("Somenthing went wrong")
      }
    }, 500)
    return () => clearTimeout(timer)
  },[query]);

  
  return (
    <div className='mt-10 w-full'>
      {error && <p className='text-center w-3/5 text-white mt-10'>{error}</p>}
      <Searchbar setQuery={setQuery}/>
      {queryResponse && <p className='text-center w-3/5 text-white mt-10'>{queryResponse}</p>}
      <div className='grid grid-cols-10'>
        <PostsList posts={hasDynamicData ? dynamicData : posts} />
        <Sidebar />
      </div>
      <Loader
        isLoading={isLoading}
        isLastPage={isLastPage}
        loadMoreCallback={loadMoreCallback}
      />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    store.dispatch(getPosts.initiate({}));
    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);
