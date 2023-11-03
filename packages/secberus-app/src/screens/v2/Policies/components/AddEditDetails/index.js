import React from 'react';
import { useParams } from 'react-router-dom';
import { PlusDark } from '@secberus/icons';
import {
  TextArea,
  Button,
  Text,
  Validation,
  Select,
} from '@secberus/components';
import {
  ComplianceContainer,
  StyledFormContainer,
  CategoryContainer,
  CategoryText,
  CategoryButton,
} from './AddEditDetails.styled';
import { Box, Flex, Spinner } from '@chakra-ui/react';
import { CategoryForm } from '../../../../../features/policy-categories/list/Form';
import { categoriesApi } from '@secberus/services';
import { useIsLoading } from '@secberus/utils';
import { FrameworkList } from './components/FrameworkList';

export const AddEditDetails = ({
  register,
  errors,
  policyFrameworks,
  onRemoveFramework,
  onOpenFrameworkForm,
  isFrameworksLoading,
}) => {
  const { view } = useParams();
  const [formOpen, setFormOpen] = React.useState(false);

  const {
    data: allCategories = [],
    isLoading: categoriesAreLoading,
    isFetching: categoriesAreFetching,
    isUninitialized: categoriesAreUninitialized,
  } = categoriesApi.useListCategoriesQuery({
    limit: 500,
  });

  const isLoading = useIsLoading([
    categoriesAreLoading,
    categoriesAreFetching,
    categoriesAreUninitialized,
  ]);

  const partitionedCategoriesByType = React.useMemo(() => {
    return [
      allCategories?.length ?? {
        categories: allCategories?.results.filter(
          o => o.category_type === 'SECURITY'
        ),
      },
    ];
  }, [allCategories]);

  if (isLoading) {
    return <Spinner color="white" />;
  }
  return (
    <>
      <StyledFormContainer
        className={view === 'details' ? 'activeTab' : 'hide'}
      >
        <Box gridColumn="1/-1">
          <Box pb="16px">
            <Text color="white" type="small-bold">
              Category
            </Text>
          </Box>
          <Flex sx={{ rowGap: '48px', columnGap: '128px' }} flexWrap="wrap">
            {partitionedCategoriesByType?.map(({ categories }) => (
              <Box>
                <Flex direction="column" sx={{ rowGap: '8px' }}>
                  <Select
                    ref={register}
                    options={categories.map(({ id, name }) => ({ id, name }))}
                  />
                </Flex>
                <CategoryContainer>
                  <CategoryButton
                    variant="text"
                    onClick={() => setFormOpen(true)}
                  >
                    <PlusDark />
                    &nbsp;
                    <CategoryText color="white" type="small-bold">
                      New Category
                    </CategoryText>
                  </CategoryButton>
                  {isLoading && <Spinner color="white" />}
                </CategoryContainer>
              </Box>
            ))}
          </Flex>
          <Validation error={errors.policy} label="Category" />
        </Box>
        <ComplianceContainer className="AddEditPolicy__Compliance">
          <Text
            className="AddEditPolicy__FrameworkLabel"
            type="small-bold"
            color="medium-gray"
          >
            Compliance framework(s)
          </Text>
          <FrameworkList
            frameworks={policyFrameworks}
            onRemove={onRemoveFramework}
          />
          <Button
            variant="secondary"
            onClick={onOpenFrameworkForm}
            disabled={isFrameworksLoading}
          >
            Add framework
          </Button>
        </ComplianceContainer>
        <TextArea
          ref={register}
          className="AddEditPolicy__Remediation"
          label="Remediation plan"
          name="remediation_steps"
          placeholder="Describe necessary steps to remediate the violation..."
          rows={10}
        />
        {formOpen && (
          <CategoryForm
            onRequestClose={() => {
              setFormOpen(false);
            }}
            isOpen={formOpen}
          />
        )}
      </StyledFormContainer>
    </>
  );
};
