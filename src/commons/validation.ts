import * as yup from 'yup';

export const passwordSchema = yup
  .string()
  .label('Password')
  .matches(
    /(?=.*[a-z])(?=.*[A-Z])/,
    ({ label }) => `${label} phải chứa cả chữ hoa và chữ thường (ví dụ: a-z và A-Z)`,
  )
  .matches(/.*\d/, ({ label }) => `${label} phải chứa ít nhất một số (ví dụ: 0-9)`)
  .matches(
    /.*[-_!@#$%^&*.,?]/,
    ({ label }) => `${label} phải chứa ít nhất một ký tự đặc biệt (ví dụ: !@#$, etc.)`,
  )
  .min(8, ({ label }) => `${label} phải có ít nhất 8 ký tự (Càng dài càng tốt)`)
  .max(20, ({ label }) => `${label} không được vượt quá 20 ký tự`)
  .required(({ label }) => `${label} là bắt buộc`);

export const confirmPasswordSchema = yup
  .string()
  .oneOf([yup.ref('password')], 'Mật khẩu không khớp')
  .required('Vui lòng xác nhận mật khẩu');

export const emailSchema = yup
  .string()
  .email('Email không hợp lệ')
  .trim()
  .required('Email là bắt buộc');

export const phoneNumberSchema = yup
  .string()
  .required('Vui lòng nhập số điện thoại')
  .matches(/^\d{4}\ \d{3} \d{3}$/, 'Số điện thoại không hợp lệ');
