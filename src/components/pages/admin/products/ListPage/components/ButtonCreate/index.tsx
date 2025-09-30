import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { Icon } from 'src/components/icons';
import Button from 'src/components/material/Button';
import { useModal } from 'src/components/ui/ModalEditor/useModal';
import { useRefreshData } from 'src/context/dataContext/hooksContext';
import useCreate from 'src/services/admin/manage/product/create';

import EditorForm from '../EditorForm';
import { EditorFormRequest } from '../EditorForm/types';

const ButtonCreateCategory = () => {
  const refreshData = useRefreshData();
  const { mutateAsync, status } = useCreate();
  const { enqueueSnackbar } = useSnackbar();
  const { Dialog, open, close } = useModal();

  const handleSubmit = useCallback(
    (values: EditorFormRequest) => {
      console.log(values);
      return mutateAsync({
        name: values.name,
        categoryId: values.categoryId?.id,
        price: values.price,
        quantity: values.quantity,
        unit: values.unit,
        originalPrice: values.originalPrice,
        imagesList: values.imagesList || [],
        tags: values.tags || [],
        description: values.description || '',
        videoUrl: values.videoUrl || '',
      })
        .then(() => {
          enqueueSnackbar('Tạo sản phẩm thành công!', { variant: 'success' });
          refreshData();
          close();
        })
        .catch(() => {
          enqueueSnackbar('Tạo sản phẩm thất bại!', {
            variant: 'error',
          });
        });
    },
    [enqueueSnackbar, mutateAsync, refreshData, close],
  );

  return (
    <>
      <Button onClick={open} startIcon={<Icon name='plus' />}>
        Thêm Sản Phẩm
      </Button>

      <Dialog
        loading={status === 'pending'}
        label='Thêm Sản Phẩm'
        dialogProps={{
          fullScreen: true,
        }}
      >
        <EditorForm onSubmit={handleSubmit} loading={status === 'pending'} buttonLabel='Thêm Sản Phẩm' title='Thêm Sản Phẩm' />
      </Dialog>
    </>
  );
};

export default ButtonCreateCategory;
