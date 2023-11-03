import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Validation } from '@secberus/components';
import { PolicyCategory, categoriesApi } from '@secberus/services';
import { createEnvAwareLogger, useIsLoading } from '@secberus/utils';
import {
  StyledModal,
  ModalForm,
  DropdownContainer,
  ButtonGroup,
  CategorySelect,
} from '../Form.styled';
import { MigrationForm } from '../Form.types';
import { DeleteCategoryText } from '../Form.utils';
import { useDeleteCategory } from './hooks';

export const CategoryMigrationForm: React.FC<MigrationForm> = ({
  isOpen,
  onRequestClose,
  id,
}) => {
  const logger = createEnvAwareLogger();
  const {
    data: category,
    isLoading: isGetCategoryLoading,
    isUninitialized: isGetCategoryUninit,
  } = categoriesApi.useGetCategoryQuery({ categoryId: id });

  const {
    data: listCategoriesResponse,
    isLoading: isGetListLoading,
    isUninitialized: isGetListUninit,
  } = categoriesApi.useListCategoriesQuery({
    limit: '500',
  });
  const categories = listCategoriesResponse?.results;

  const { deleteCategory } = useDeleteCategory();

  const handleDelete = ({ newCategory }: { newCategory: PolicyCategory }) => {
    deleteCategory({ categoryId: id, replacementCategoryId: newCategory.id });
    onRequestClose();
  };

  const filteredCategories = React.useMemo(() => {
    const filterSelf = (categories: PolicyCategory) => categories.id !== id;

    return categories?.filter(filterSelf) ?? [];
  }, [categories, id]);

  const { handleSubmit, control, errors } = useForm({
    mode: 'all',
  });

  logger.log(`errors`, errors);

  const isLoading = useIsLoading([
    isGetCategoryLoading,
    isGetCategoryUninit,
    isGetListLoading,
    isGetListUninit,
  ]);

  if (isLoading) return null;
  if (!categories || !category) return null;

  logger.log(`category`, category);

  return (
    <StyledModal
      title="Delete category"
      isVisible={isOpen}
      handleClose={onRequestClose}
      variant="light"
    >
      <ModalForm onSubmit={handleSubmit(handleDelete)}>
        <DeleteCategoryText
          policy_count={category.policies?.length ?? 0}
          category_name={category.name}
        />
        <DropdownContainer>
          <Validation error={errors['newCategory']}>
            <Controller
              control={control}
              name="newCategory"
              rules={{ required: 'Please choose a category' }}
              render={({ onChange }) => (
                <CategorySelect
                  options={filteredCategories}
                  label="Choose a new category"
                  placeholder="Select category"
                  onChange={onChange}
                />
              )}
            />
          </Validation>
        </DropdownContainer>
        <ButtonGroup>
          <Button variant="destructive" type="submit">
            Confirm deletion
          </Button>
          <Button variant="secondary" onClick={onRequestClose}>
            Cancel
          </Button>
        </ButtonGroup>
      </ModalForm>
    </StyledModal>
  );
};
