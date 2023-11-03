import { categoriesApi, Policy } from '@secberus/services';

export const useGetCategory = (
  policy_category_id: Policy['policy_category_id']
) => {
  const {
    data: category,
    isLoading: isGetCategoryLoading,
    isUninitialized: isGetCategoryUninit,
  } = categoriesApi.useGetCategoryQuery(
    { categoryId: policy_category_id! },
    { skip: !policy_category_id }
  );

  return {
    category,
    isGetCategoryLoading,
    isGetCategoryUninit,
  };
};
