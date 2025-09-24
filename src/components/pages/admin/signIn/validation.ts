import * as yup from 'yup';

export const validation = yup.object({
  username: yup.string().required('Please enter username'),
  password: yup.string().required('Please enter password'),
});
