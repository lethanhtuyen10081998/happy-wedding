import { isArray } from 'lodash';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { Icon } from 'src/components/icons';
import Button from 'src/components/material/Button';
import { useModal } from 'src/components/ui/ModalEditor/useModal';
import { useRefreshData } from 'src/context/dataContext/hooksContext';
import useCreateRole from 'src/services/admin/settings/categories/create';

import EditorRoleForm from '../EditorForm';
import { EditorFormRequest } from '../EditorForm/types';

const ButtonCreateCategory = () => {
  const refreshData = useRefreshData();
  const { mutateAsync, status } = useCreateRole();
  const { enqueueSnackbar } = useSnackbar();
  const { Dialog, open, close } = useModal();

  const handleSubmit = useCallback(
    (values: EditorFormRequest) => {
      return mutateAsync({
        name: values.name,
      })
        .then(() => {
          enqueueSnackbar('Tạo danh mục thành công!', { variant: 'success' });
          refreshData();
          close();
        })
        .catch((error) => {
          if (isArray(error.response.data.message)) {
            error.response.data.message.forEach((item: string) => {
              enqueueSnackbar(item, {
                variant: 'error',
              });
            });
            return;
          }
          enqueueSnackbar('Tạo danh mục thất bại!', {
            variant: 'error',
          });
        });
    },
    [enqueueSnackbar, mutateAsync, refreshData, close],
  );

  return (
    <>
      <Button onClick={open} startIcon={<Icon name='plus' />}>
        Thêm Danh Mục
      </Button>

      <Dialog loading={status === 'pending'} label='Thêm Danh Mục'>
        <EditorRoleForm onSubmit={handleSubmit} loading={status === 'pending'} buttonLabel='Thêm Danh Mục' title='Thêm Danh Mục' />
      </Dialog>
    </>
  );
};

export default ButtonCreateCategory;
