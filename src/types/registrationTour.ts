export enum RegistrationStatus {
  ALL = 'all',
  ASK_TOUR = '0',
  BOOKING_TOUR = '1',
  ORDER_TOUR = '2',
  CANCEL_TOUR = '3',
}

export const RegistrationStatusLabel = {
  [RegistrationStatus.ALL]: 'Tất cả',
  [RegistrationStatus.ASK_TOUR]: 'Quan tâm',
  [RegistrationStatus.BOOKING_TOUR]: 'Giữ chỗ',
  [RegistrationStatus.ORDER_TOUR]: 'Đặt chỗ',
  [RegistrationStatus.CANCEL_TOUR]: 'Hủy',
};
