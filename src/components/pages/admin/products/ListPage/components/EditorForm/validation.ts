import * as yup from 'yup';

export const validation = yup.object({
  name: yup.string().required('Vui lòng nhập tên sản phẩm'),
  categoryId: yup.object().required('Vui lòng chọn danh mục'),
  price: yup.string().required('Vui lòng nhập giá'),
  quantity: yup.string().required('Vui lòng nhập số lượng'),
  unit: yup.string().required('Vui lòng nhập đơn vị'),
});
