import { DeletionText } from './Form.styled';
import { DeleteCategoryTextProps } from './Form.types';

export const DeleteCategoryText = ({
  policy_count,
  category_name,
}: DeleteCategoryTextProps) => {
  if (policy_count === 1) {
    return (
      <DeletionText type="small-regular">
        There is 1 policy in the category, {category_name}. You must attribute
        these policies to a new category before deletion.
      </DeletionText>
    );
  }
  return (
    <DeletionText type="small-regular">
      There are {policy_count.toString()} policies in the category,{' '}
      {category_name}. You must attribute these policies to a new category
      before deletion.
    </DeletionText>
  );
};
