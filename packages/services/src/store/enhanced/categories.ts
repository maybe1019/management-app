import { secberusApiGW } from '../injections';

// Enhanced endpoints for categories
export const categoriesApi = secberusApiGW.enhanceEndpoints({
  endpoints: {
    listCategories: {
      providesTags: ['Category', { type: 'Category', id: 'LIST' }],
    },
    getCategory: {
      providesTags: ['Category'],
    },
    createCategory: {
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    },
    updateCategory: {
      invalidatesTags: ['Category'],
    },
    deleteCategory: {
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    },
  },
});
