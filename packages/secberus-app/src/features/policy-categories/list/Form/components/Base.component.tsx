import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, Button } from '@secberus/components';
import { createEnvAwareLogger } from '@secberus/utils';
import {
  ModalForm,
  StyledModal,
  ModalFooter,
  ButtonGroup,
  StyledTooltip,
} from '../Form.styled';
import { createPolicyCategoryFormSchema } from '../Form.validation';
import { CategoryFormProps } from '../Form.types';
import { CategoryMigrationForm } from './Migrate.component';
import {
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from './hooks';

export const CategoryForm: React.FC<CategoryFormProps> = ({
  isOpen,
  onRequestClose,
  editData,
}) => {
  const logger = createEnvAwareLogger();
  const [isMigrating, setIsMigrating] = React.useState<boolean>(false);

  const { deleteCategory, isSuccess: isDeleteSuccess } = useDeleteCategory(
    editData?.name
  );
  const { handleCreate, isSuccess: isCreateSuccess } = useCreateCategory();
  const { handleUpdate, isSuccess: isUpdateSuccess } = useUpdateCategory({
    id: editData?.id,
  });

  const onDelete = () => {
    logger.log(editData);
    if (editData?.policy_count) setIsMigrating(true);
    else deleteCategory({ categoryId: editData!.id! });
  };

  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(createPolicyCategoryFormSchema),
  });

  const title = editData ? 'Edit category ' : 'Add new category';

  React.useEffect(() => {
    if (isDeleteSuccess || isCreateSuccess || isUpdateSuccess) onRequestClose();
  }, [isCreateSuccess, isDeleteSuccess, isUpdateSuccess, onRequestClose]);

  if (isMigrating && editData) {
    return (
      <CategoryMigrationForm
        isOpen={isMigrating}
        onRequestClose={onRequestClose}
        id={editData.id!}
      />
    );
  }

  return (
    <>
      <StyledModal
        title={title}
        isVisible={isOpen}
        handleClose={onRequestClose}
        variant="light"
      >
        <ModalForm
          id="categoryForm"
          onSubmit={handleSubmit(editData ? handleUpdate : handleCreate)}
        >
          <Input
            ref={register}
            name="name"
            type="text"
            label="Name"
            placeholder="e.g. Audit Logging"
            error={errors.name}
            defaultValue={editData?.name}
          />

          <ModalFooter>
            <ButtonGroup>
              <Button type="submit" form="categoryForm" disabled={isSubmitting}>
                Save
              </Button>
              {editData && (
                <Button variant="destructive" onClick={onDelete}>
                  Delete
                </Button>
              )}
            </ButtonGroup>
          </ModalFooter>
        </ModalForm>
        <StyledTooltip id="categoryTooltip" longText />
      </StyledModal>
    </>
  );
};
