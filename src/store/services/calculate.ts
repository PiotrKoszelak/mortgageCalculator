import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DataInputs, DataRow } from '../../components/calculator/types';

export const calculateApi = createApi({
    reducerPath: 'calculateApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER_URL}`,
    }),
    endpoints: (builder) => ({
        calculate: builder.query<{ data: DataRow[] }, DataInputs>({
            query: (inputs) => ({
                url: '/calculate',
                method: 'POST',
                body: {
                    inputs,
                },
            }),
        }),
    }),
});

export const { useCalculateQuery } = calculateApi;
