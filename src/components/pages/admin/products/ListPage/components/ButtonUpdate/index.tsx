import { IconButton } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { Icon } from 'src/components/icons';
import { FileUpload } from 'src/components/ui/Dropzone';
import { useModal } from 'src/components/ui/ModalEditor/useModal';
import { useRefreshData } from 'src/context/dataContext/hooksContext';
import { formatMoneyToNumber } from 'src/libs/utils';
import useUpdateProduct from 'src/services/admin/manage/product/update';
import useListCategories from 'src/services/admin/settings/categories/getList';
import { deleteFile } from 'src/services/fileUpload/deleteFile';
import { uploadFile } from 'src/services/fileUpload/uploadFile';
import { FormMode } from 'src/types/formEditor';
import { Product } from 'src/types/product';

import EditorForm from '../EditorForm';
import { EditorFormAction, EditorFormRequest } from '../EditorForm/types';

const ButtonUpdateCategory = ({ data }: { data: Product }) => {
  const refreshData = useRefreshData();
  const { mutateAsync, status } = useUpdateProduct();
  const { enqueueSnackbar } = useSnackbar();
  const { Dialog, open, close } = useModal();
  const { data: categories } = useListCategories({ limit: 100, page: 1 });

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
      return await Promise.all(
        files.map(async (file) => {
          return await handleUploadImage(file);
        }),
      );
    },
    [handleUploadImage],
  );

  const handleDeleteImage = useCallback(async (url: string) => {
    return await deleteFile({ url });
  }, []);

  const handleDeleteImages = useCallback(
    async (urls: string[]) => {
      return await Promise.all(
        urls.map(async (url) => {
          return await handleDeleteImage(url);
        }),
      );
    },
    [handleDeleteImage],
  );

  const handleSubmit = useCallback(
    async (values: EditorFormRequest) => {
      const imageUploads = values.images?.filter((image) => image.action === EditorFormAction.UPLOAD) || [];
      const imageDeletes = values.images?.filter((image) => image.action === EditorFormAction.DELETE) || [];
      const imagesListUpload = await handleUploadImages(imageUploads.map((image) => image.file));
      await handleDeleteImages(imageDeletes.map((image) => image.file.src as string));
      const images = values.images?.filter((image) => image.action === EditorFormAction.DEFAULT) || [];
      const imagesList = [...images.map((image) => image.file.src as string), ...imagesListUpload];

      return mutateAsync({
        categoryId: values.categoryId?.id,
        imagesList: imagesList,
        videoUrl: values.videoUrl || '',
        description: values.description || '',
        tags: values.tags || [],
        originalPrice: formatMoneyToNumber(values.originalPrice),
        quantity: formatMoneyToNumber(values.quantity),
        unit: values.unit || '',
        price: formatMoneyToNumber(values.price),
        name: values.name || '',
        id: values.id || '',
        isShowHomePage: values.isShowHomePage || false,
      })
        .then(() => {
          enqueueSnackbar('Cập nhật sản phẩm thành công!', { variant: 'success' });
          refreshData();
          close();
        })
        .catch((error) => {
          console.log(error);
          enqueueSnackbar('Cập nhật sản phẩm thất bại!', {
            variant: 'error',
          });
        });
    },
    [handleUploadImages, handleDeleteImages, mutateAsync, enqueueSnackbar, refreshData, close],
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
            tags: data.tags,
            description: data.description,
            videoUrl: data.videoUrl,
            images: data?.imagesList?.map((image) => ({
              action: EditorFormAction.DEFAULT,
              file: {
                src: image,
                name: image.split('/').pop(),
                type: image.split('/').pop()?.split('.').pop(),
                size: image.split('/').pop()?.length,
                lastModified: image.split('/').pop()?.length,
                webkitRelativePath: image.split('/').pop()?.length,
              } as unknown as FileUpload,
            })),
            isShowHomePage: data.isShowHomePage || false,
          }}
          mode={FormMode.EDIT}
        />
      </Dialog>
    </>
  );
};

export default ButtonUpdateCategory;
