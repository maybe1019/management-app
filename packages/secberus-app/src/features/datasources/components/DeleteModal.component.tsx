import { useHistory } from 'react-router-dom';
import { ConfirmModal, Text } from '@secberus/components';
import { useDeleteDataSource } from '../hooks';
import { settingsPaths } from '../../settings/routes';
import { datasourcePaths } from '../routes';

interface DataSourceProps {
  datasourceId: string;
  name: string;
  open: boolean;
  onRequestClose: (confirmed?: boolean) => void;
}

export const DeleteDataSourceModal = ({
  datasourceId,
  name,
  open,
  onRequestClose,
}: DataSourceProps) => {
  const history = useHistory();
  const { handleDelete, ...query } = useDeleteDataSource();

  return (
    <>
      {open ? (
        <ConfirmModal
          title="Confirm deletion"
          //@ts-expect-error badly typed
          fixedOverScreen
          handleClose={async confirmed => {
            if (confirmed) {
              await handleDelete(datasourceId);
              history.push(
                `${settingsPaths.base}${datasourcePaths.datasourceManagement}`
              );
            }
            onRequestClose(confirmed);
          }}
          isVisible={open}
          loading={query.isLoading}
        >
          Are you sure you want to delete {name}?
          <Text type="bold">This action cannot be reversed.</Text>
        </ConfirmModal>
      ) : null}
    </>
  );
};
