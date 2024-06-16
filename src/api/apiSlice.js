import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://sigmamalegroup-networkator-09b5.twc1.net/api/';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (user) => ({
                url: 'user/register',
                method: 'POST',
                body: JSON.stringify(user),
            }),
        }),
        loginUser: builder.mutation({
            query: (user) => ({
                url: 'user/login',
                method: 'POST',
                body: JSON.stringify(user),
            }),
        }),
        createVacancy: builder.mutation({
            query: (vacancy) => ({
                url: 'vacancy/new',
                method: 'POST',
                body: JSON.stringify(vacancy),
            }),
        }),
        editVacancy: builder.mutation({
            query: ({ id, vacancy }) => ({
                url: `vacancy/edit/${id}`,
                method: 'POST',
                body: JSON.stringify(vacancy),
            }),
        }),
        filterVacancies: builder.mutation({
            query: (filters) => ({
                url: 'vacancy/filter',
                method: 'POST',
                body: JSON.stringify(filters),
            }),
        }),
        archiveVacancy: builder.mutation({
            query: (id) => ({
                url: `vacancy/archive/${id}`,
                method: 'POST',
            }),
        }),
        applyVacancy: builder.mutation({
            query: (id) => ({
                url: `vacancy/apply/${id}`,
                method: 'POST',
            }),
        }),
        getVacancyById: builder.query({
            query: (id) => ({
                url: `vacancy/${id}`,
            }),
        }),
    }),
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useCreateVacancyMutation,
    useEditVacancyMutation,
    useFilterVacanciesMutation,
    useArchiveVacancyMutation,
    useApplyVacancyMutation,
    useGetVacancyByIdQuery,
} = apiSlice;





