import { IconButton } from '@mui/material';
import { isArray } from 'lodash';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { Icon } from 'src/components/icons';
import { useModal } from 'src/components/ui/ModalEditor/useModal';
import { useRefreshData } from 'src/context/dataContext/hooksContext';
import useUpdateProduct from 'src/services/admin/manage/product/update';
import useListCategories from 'src/services/admin/settings/categories/getList';
import { FormMode } from 'src/types/formEditor';
import { Product } from 'src/types/product';

import EditorForm from '../EditorForm';
import { EditorFormRequest } from '../EditorForm/types';

const ButtonUpdateCategory = ({ data }: { data: Product }) => {
  const refreshData = useRefreshData();
  const { mutateAsync, status } = useUpdateProduct();
  const { enqueueSnackbar } = useSnackbar();
  const { Dialog, open, close } = useModal();
  const { data: categories } = useListCategories({ limit: 100, page: 1 });

  const handleSubmit = useCallback(
    (values: EditorFormRequest) => {
      console.log(values);
      return mutateAsync({
        ...values,
        categoryId: values.categoryId?.id,
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

      <Dialog
        loading={status === 'pending'}
        label='Cập Nhật Sản Phẩm'
        dialogProps={{
          fullScreen: true,
        }}
      >
        <EditorForm
          onSubmit={handleSubmit}
          loading={status === 'pending'}
          buttonLabel='Cập Nhật Sản Phẩm'
          title='Cập Nhật Sản Phẩm'
          defaultValues={{
            name: data.name,
            id: data.id,
            categoryId: categories.find((category) => category.id === data.categoryId) || null,
            price: data.price?.toString() || '',
            quantity: data.quantity?.toString() || '',
            unit: data.unit,
            originalPrice: data.originalPrice?.toString() || '',
            imagesList: data.imagesList,
            tags: data.tags,
            description: data.description,
            videoUrl: data.videoUrl,
          }}
          mode={FormMode.EDIT}
        />
      </Dialog>
    </>
  );
};

export default ButtonUpdateCategory;
