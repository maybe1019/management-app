import React from 'react';
import { PolicyCategory, categoriesApi } from '@secberus/services';
import { createEnvAwareLogger } from '@secberus/utils';
import { CategoryFormFields } from '../Form.types';
import { useNotify } from '../../../../../store';

const logger = createEnvAwareLogger();

export const useDeleteCategory = (name?: string) => {
  const [deleteCategory, { isError, error, isSuccess }] =
    categoriesApi.useDeleteCategoryMutation();

  const { notifySuccess } = useNotify();

  React.useEffect(() => {
    if (isSuccess)
      notifySuccess(`Category ${name} has been successfully deleted!`);

    if (isError) {
      logger.error(error);
    }
  }, [name, error, isError, isSuccess, notifySuccess]);

  return { deleteCategory, isSuccess };
};

export const useCreateCategory = () => {
  const [createCategory, { isError, error, isSuccess, data: response }] =
    categoriesApi.useCreateCategoryMutation();

  const { notifySuccess } = useNotify();

  const handleCreate = React.useCallback(
    (data: CategoryFormFields) =>
      createCategory({
        policyCategory: {
          ...data,
          category_type: 'SECURITY',
        },
      }),
    [createCategory]
  );

  React.useEffect(() => {
    if (isSuccess)
      notifySuccess(
        `Category ${response?.name} has been successfully created!`
      );
    if (isError) logger.error(error);
  }, [response, error, isError, isSuccess, notifySuccess]);

  return { handleCreate, isSuccess };
};

export const useUpdateCategory = ({ id }: { id?: PolicyCategory['id'] }) => {
  const [updateCategory, { isError, error, isSuccess, data: response }] =
    categoriesApi.useUpdateCategoryMutation();

  const { notifySuccess } = useNotify();

  const handleUpdate = React.useCallback(
    (data: CategoryFormFields) =>
      updateCategory({ policyCategory: data, categoryId: id! }),
    [id, updateCategory]
  );

  React.useEffect(() => {
    if (isSuccess)
      notifySuccess(
        `Category ${response?.name} has been successfully updated!`
      );

    if (isError) {
      logger.error(error);
    }
  }, [response, error, isError, isSuccess, notifySuccess]);

  return { handleUpdate, isSuccess };
};
