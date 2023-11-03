import React from 'react';
import { Text, ConfirmModal } from '@secberus/components';
import { LoadingOverlay } from '@secberus/components';
import {
  FrameContainer,
  PaginationContainer,
} from './AddEditExceptions.styled';
import { useIsLoading } from '@secberus/utils';
import { useDeleteExceptions, useListPolicyExceptions } from './hooks';
import { AddEditExceptionsFrame } from './AddEditExceptions.component';
import { useGetExceptionPage } from '../../../Policies/Details/tabs/hooks/useGetPolicyExceptions';

export const AddEditExceptions = ({ policy }) => {
  const { handleDeleteException, isExceptionDeleting } = useDeleteExceptions();
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] =
    React.useState(false);

  const [selectedExceptionId, setSelectedExceptionId] = React.useState(null);
  const {
    isLoading: isPolicyExceptionsLoading,
    getExceptionsByPage,
    page,
    resetState,
    PaginationComponent,
    exceptions: policyExceptions,
  } = useGetExceptionPage();

  React.useEffect(() => {
    getExceptionsByPage({
      page,
      limit: '5',
      policyId: policy.id,
    });
  }, [page, policy.id, getExceptionsByPage]);

  // reset pagination state on unmount
  React.useEffect(() => {
    resetState();
    return resetState;
  }, [resetState]);

  const isLoading = useIsLoading([isPolicyExceptionsLoading]);
  const toggleConfirmDeleteModal = (exception_id = null) => {
    setConfirmDeleteModalOpen(!confirmDeleteModalOpen);
    setSelectedExceptionId(exception_id);
  };
  const handleExceptionDelete = async deleteFlag => {
    if (deleteFlag) {
      await handleDeleteException(selectedExceptionId);
    }
    toggleConfirmDeleteModal(null);
  };
  return (
    <FrameContainer>
      <ConfirmModal
        title="Confirm deletion"
        fixedOverScreen
        isVisible={confirmDeleteModalOpen}
        handleClose={handleExceptionDelete}
      >
        Are you sure you want to delete this exception?
        <br />
        ID {selectedExceptionId}
        <Text type="bold">This action is non reversible.</Text>
      </ConfirmModal>
      <AddEditExceptionsFrame
        exceptionData={{
          conditions: [],
          name: '',
        }}
        policy={policy}
        frameTitle={'Create a new rule group'}
      />
      {isLoading ? (
        <LoadingOverlay />
      ) : (
        policyExceptions?.results?.length > 0 &&
        policyExceptions?.results?.map(exception => {
          return (
            <AddEditExceptionsFrame
              key={exception.id}
              exceptionData={exception}
              policy={policy}
              handleDelete={handleExceptionDelete}
              toggleConfirmDeleteModal={toggleConfirmDeleteModal}
              resetPagination={resetState}
            />
          );
        })
      )}
      {PaginationComponent && policyExceptions?.results?.length > 0 && (
        <PaginationContainer>{PaginationComponent}</PaginationContainer>
      )}
    </FrameContainer>
  );
};
