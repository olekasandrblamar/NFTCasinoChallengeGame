import { HYDRATE } from 'next-redux-wrapper';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const playersApi = createApi({
    reducerPath: 'playersApi',
    keepUnusedDataFor: 60*60,
    tagTypes:['Players'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.henrikdev.xyz/valorant'
    }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
          return action.payload[reducerPath]
        }
    },
    endpoints: (builder) => ({
        getPlayers: builder.query({
            query: (region) => `v2/leaderboard/${region}`
        }),
        getPlayer: builder.query({
            query: ({region, name, tag}) => `v3/matches/${region}/${name}/${tag}`
        })
    })
})

export const {useGetPlayersQuery, useGetPlayerQuery} = playersApi