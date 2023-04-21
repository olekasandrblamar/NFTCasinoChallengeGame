import React from 'react';
import { wrapper } from '@/redux/store';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next/types';
import PostSection from '@/components/postSection';
import { getPost, getRunningQueriesThunk, useGetPostQuery } from '@/redux/apis/postsApi';

export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, isLoading } = useGetPostQuery(id);

  return (
    <>
      <div>
        { isLoading && <div className="text-white text-center mt-40">...Loading</div> }
        { error && <div className="text-white text-center mt-40">We couldnt retrive the data</div> }
        { data && <PostSection post={ data } /> }
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {

    const id = context.query.id;

    store.dispatch(getPost.initiate(id));
    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);




