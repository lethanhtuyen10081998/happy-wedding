import * as yup from 'yup';

export const validation = yup.object({
  name: yup.string().required('Vui lòng nhập tên danh mục'),
});
