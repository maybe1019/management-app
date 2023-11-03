import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type UploadToPresignedS3Url = {
  url: string;
  file: Blob;
};

export const uploadApi = createApi({
  reducerPath: 'imageUploads',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
    headers: {
      'Access-Control-Allow-Methods': 'PUT',
      'Access-Control-Allow-Origin': '*',
    },
  }),
  endpoints: (build) => ({
    uploadToPresignedS3Url: build.mutation<any, UploadToPresignedS3Url>({
      query: (queryArg) => ({
        url: queryArg.url,
        method: 'PUT',
        body: queryArg.file,
      }),
    }),
  }),
});

export const { useUploadToPresignedS3UrlMutation } = uploadApi;
