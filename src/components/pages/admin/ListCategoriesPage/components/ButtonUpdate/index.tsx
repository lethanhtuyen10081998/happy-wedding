import { IconButton } from '@mui/material';
import { isArray } from 'lodash';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { Icon } from 'src/components/icons';
import { useModal } from 'src/components/ui/ModalEditor/useModal';
import { useRefreshData } from 'src/context/dataContext/hooksContext';
import useUpdateRole from 'src/services/admin/settings/categories/update';
import { Category } from 'src/types/admin/categories';
import { FormMode } from 'src/types/formEditor';

import EditorRoleForm from '../EditorForm';
import { EditorFormRequest } from '../EditorForm/types';

const ButtonUpdateCategory = ({ data }: { data: Category }) => {
  const refreshData = useRefreshData();
  const { mutateAsync, status } = useUpdateRole();
  const { enqueueSnackbar } = useSnackbar();
  const { Dialog, open, close } = useModal();

  const handleSubmit = useCallback(
    (values: EditorFormRequest) => {
      return mutateAsync({
        id: values.id,
        name: values.name,
      })
        .then(() => {
          enqueueSnackbar('Cập nhật danh mục thành công!', { variant: 'success' });
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
          enqueueSnackbar('Cập nhật danh mục thất bại!', {
            variant: 'error',
          });
        });
    },
    [enqueueSnackbar, mutateAsync, refreshData, close],
  );

  return (
    <>
      <IconButton onClick={open}>
        <Icon name='edit' />
      </IconButton>

      <Dialog loading={status === 'pending'} label='Cập Nhật Vai Trò'>
        <EditorRoleForm
          onSubmit={handleSubmit}
          loading={status === 'pending'}
          buttonLabel='Cập Nhật Danh Mục'
          title='Cập Nhật Danh Mục'
          defaultValues={{
            name: data.name,
            id: data.id,
          }}
          mode={FormMode.EDIT}
        />
      </Dialog>
    </>
  );
};

export default ButtonUpdateCategory;
