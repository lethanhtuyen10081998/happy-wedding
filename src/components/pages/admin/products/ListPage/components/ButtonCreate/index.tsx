import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { Icon } from 'src/components/icons';
import Button from 'src/components/material/Button';
import { useModal } from 'src/components/ui/ModalEditor/useModal';
import { useRefreshData } from 'src/context/dataContext/hooksContext';
import useSpinner from 'src/hooks/useSpinner';
import { formatMoneyToNumber } from 'src/libs/utils';
import useCreate from 'src/services/admin/manage/product/create';
import { uploadFile } from 'src/services/fileUpload/uploadFile';

import EditorForm from '../EditorForm';
import { EditorFormRequest } from '../EditorForm/types';

const ButtonCreateCategory = () => {
  const refreshData = useRefreshData();
  const { mutateAsync, status } = useCreate();
  const { enqueueSnackbar } = useSnackbar();
  const { Dialog, open, close } = useModal();
  const { hideLoading, startLoading } = useSpinner();

  const handleUploadImage = useCallback(async (file: File) => {
    return await uploadFile({
      fileName: file.name,
      folder: 'products',
      contentType: file.type,
      file,
    });
  }, []);

  const handleUploadImages = useCallback(
    async (files: File[]) => {
      startLoading();
      return await Promise.all(
        files.map(async (file) => {
          return await handleUploadImage(file);
        }),
      ).finally(() => {
        hideLoading();
      });
    },
    [handleUploadImage, hideLoading, startLoading],
  );

  const handleSubmit = useCallback(
    async (values: EditorFormRequest) => {
      const imagesList = await handleUploadImages(values.images?.map((image) => image.file) || []);
      const { images: _, ...rest } = values;
      startLoading();

      return mutateAsync({
        ...rest,
        name: values.name,
        categoryId: values.categoryId?.id,
        price: formatMoneyToNumber(values.price),
        quantity: formatMoneyToNumber(values.quantity),
        unit: values.unit,
        originalPrice: formatMoneyToNumber(values.originalPrice),
        imagesList: imagesList,
        tags: values.tags || [],
        description: values.description || '',
        videoUrl: values.videoUrl || '',
        isShowHomePage: values.isShowHomePage || false,
        slug: values.slug || '',
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
        })
        .finally(() => {
          hideLoading();
        });
    },
    [handleUploadImages, startLoading, mutateAsync, enqueueSnackbar, refreshData, close, hideLoading],
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
