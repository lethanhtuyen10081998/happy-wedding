import { colors } from '@mui/material';

import { RegistrationStatus } from './registrationTour';
import { VisaStatusEnum } from './visa/type';

export enum GenderEnum {
  MALE = '1',
  FEMALE = '0',
}

export const GenderLabel = {
  [GenderEnum.MALE]: 'Nam',
  [GenderEnum.FEMALE]: 'Nữ',
};

export type UserProfile = {
  customerId: string;
  factNo: string;
  branchNo: string;
  customerType: string;
  fullName: string;
  title: string;
  birthDate: string;
  cardNumber: string;
  passport: string;
  passportIssueDate: string;
  passportExpiryDate: string;
  visaNumber: string;
  countryCode: string;
  phoneNumber: string;
  faxNumber: string;
  email: string;
  address: string;
  note: string;
  departmentCode: string;
  password: string;
  createdBy: string;
  createdTime: string;
  updatedBy: string;
  updatedTime: string;
};

export enum UserRole {
  SELLER = 'seller',
  AGENCY = 'agency',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

export type TourOfUser = {
  statusVisa: VisaStatusEnum;
  tourId: string;
  routeName: string;
  adultPrice: number;
  departureDate: string;
  returnDate: string;
  foreignFee: number;
  singleRoomFee: number;
  tipFee: number;
  destinationName: string;
  status: RegistrationStatus;
};

export type VisaOfUser = {
  tourId: string;
  adultPrice: number;
  foreignFee: number;
  singleRoomFee: number;
  registrationId: string;
  deptNo: string;
  departureDate: string;
  returnDate: string;
  routeName: string;
  deptNo_1: string;
  destinationId: string;
  destinationName: string;
  routeId: string;
  factNo: string;
  tipFee: number;
  status: RegistrationStatus;
  visaStatus: VisaStatusEnum;
  createdTime: string;
  fileVisa: string;
};

export const getColorRegistration = (status: RegistrationStatus) => {
  if (status === RegistrationStatus.CANCEL_TOUR) {
    return 'error.main';
  }

  if (status === RegistrationStatus.BOOKING_TOUR) {
    return colors.orange[500];
  }

  if (status === RegistrationStatus.ASK_TOUR) {
    return colors.blue[500];
  }

  return 'success.main';
};
