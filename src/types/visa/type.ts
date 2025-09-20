export enum BookEnum {
  ORIGINAL = '0',
  NOTARIZED = '1',
  PHOTO = '2',
  SCAN = '3',
  DO_NOT_HAVE = '4',
}

export const BookLabel = {
  [BookEnum.ORIGINAL]: 'Bản gốc',
  [BookEnum.NOTARIZED]: 'Bản công chứng',
  [BookEnum.PHOTO]: 'Bản Photo',
  [BookEnum.SCAN]: 'Bản Scan',
  [BookEnum.DO_NOT_HAVE]: 'Không có',
};

export const BookOptions = [
  { label: BookLabel[BookEnum.ORIGINAL], value: BookEnum.ORIGINAL },
  { label: BookLabel[BookEnum.NOTARIZED], value: BookEnum.NOTARIZED },
  { label: BookLabel[BookEnum.PHOTO], value: BookEnum.PHOTO },
  { label: BookLabel[BookEnum.SCAN], value: BookEnum.SCAN },
  { label: BookLabel[BookEnum.DO_NOT_HAVE], value: BookEnum.DO_NOT_HAVE },
];

export enum ImageFaceEnum {
  ORIGINAL = 0,
  IMAGE_COMPUTER = 1,
  DO_NOT_HAVE = 2,
}

export const ImageFaceLabel = {
  [ImageFaceEnum.ORIGINAL]: 'Bản gốc',
  [ImageFaceEnum.IMAGE_COMPUTER]: 'File hình ảnh',
  [ImageFaceEnum.DO_NOT_HAVE]: 'Không có',
};

export const ImageFaceOptions = [
  { label: ImageFaceLabel[ImageFaceEnum.ORIGINAL], value: ImageFaceEnum.ORIGINAL },
  { label: ImageFaceLabel[ImageFaceEnum.IMAGE_COMPUTER], value: ImageFaceEnum.IMAGE_COMPUTER },
  { label: ImageFaceLabel[ImageFaceEnum.DO_NOT_HAVE], value: ImageFaceEnum.DO_NOT_HAVE },
];

export enum VisaStatusEnum {
  ALL = 'all',
  RECEIVE_THE_APPLICATION = '0',
  SUPPLEMENT_THE_APPLICATION = '2',
  TRANSLATION_AND_LEGAL_SERVICES = '3',
  CONSULAR_LEGALIZATION = '4',
  PROCESS_THE_DOCUMENTS = '5',
  SCHEDULE_AN_APPOINTMENT = '6',
  SUBMIT_THE_APPLICATION = '7',
  TAKE_A_PHOTO_AND_FINGERPRINTING = '8',
  INTERVIEW = '9',
  WAIT_FOR_THE_RESULTS = '10',
  ADD_TO_THE_DOCUMENTS = '11',
  APPROVE_A_VISA = '12',
  REJECT_A_VISA = '13',
  RETURN_DOCUMENTS = '14',
  SEND_MESSAGE_THANKTHANK = '15',
}

export const VisaStatusLabel = {
  [VisaStatusEnum.ALL]: 'Tất cả',
  [VisaStatusEnum.RECEIVE_THE_APPLICATION]: 'Nhận hồ sơ',
  [VisaStatusEnum.SUPPLEMENT_THE_APPLICATION]: 'Bổ sung hồ sơ',
  [VisaStatusEnum.TRANSLATION_AND_LEGAL_SERVICES]: 'Dịch thuật và tư pháp',
  [VisaStatusEnum.CONSULAR_LEGALIZATION]: 'Hợp thức hóa lãnh sự',
  [VisaStatusEnum.PROCESS_THE_DOCUMENTS]: 'Xử lý hồ sơ',
  [VisaStatusEnum.SCHEDULE_AN_APPOINTMENT]: 'Lập lịch hẹn',
  [VisaStatusEnum.SUBMIT_THE_APPLICATION]: 'Nộp hồ sơ',
  [VisaStatusEnum.TAKE_A_PHOTO_AND_FINGERPRINTING]: 'Chụp ảnh và lấy dấu vân tay',
  [VisaStatusEnum.INTERVIEW]: 'Phỏng vấn',
  [VisaStatusEnum.WAIT_FOR_THE_RESULTS]: 'Chờ kết quả',
  [VisaStatusEnum.ADD_TO_THE_DOCUMENTS]: 'Thêm vào hồ sơ(Y/C từ Lãnh Sự)',
  [VisaStatusEnum.APPROVE_A_VISA]: 'Phê duyệt hồ sơ(đậu Visa)',
  [VisaStatusEnum.REJECT_A_VISA]: 'Từ chối Visa',
  [VisaStatusEnum.RETURN_DOCUMENTS]: 'Trả lại hồ sơ',
  [VisaStatusEnum.SEND_MESSAGE_THANKTHANK]: 'Gửi thư cảm ơn',
};

export const VisaStatusOptions = [
  { label: VisaStatusLabel[VisaStatusEnum.RECEIVE_THE_APPLICATION], value: VisaStatusEnum.RECEIVE_THE_APPLICATION },
  { label: VisaStatusLabel[VisaStatusEnum.SUPPLEMENT_THE_APPLICATION], value: VisaStatusEnum.SUPPLEMENT_THE_APPLICATION },
  { label: VisaStatusLabel[VisaStatusEnum.TRANSLATION_AND_LEGAL_SERVICES], value: VisaStatusEnum.TRANSLATION_AND_LEGAL_SERVICES },
  { label: VisaStatusLabel[VisaStatusEnum.CONSULAR_LEGALIZATION], value: VisaStatusEnum.CONSULAR_LEGALIZATION },
  { label: VisaStatusLabel[VisaStatusEnum.PROCESS_THE_DOCUMENTS], value: VisaStatusEnum.PROCESS_THE_DOCUMENTS },
  { label: VisaStatusLabel[VisaStatusEnum.SCHEDULE_AN_APPOINTMENT], value: VisaStatusEnum.SCHEDULE_AN_APPOINTMENT },
  { label: VisaStatusLabel[VisaStatusEnum.SUBMIT_THE_APPLICATION], value: VisaStatusEnum.SUBMIT_THE_APPLICATION },
  { label: VisaStatusLabel[VisaStatusEnum.TAKE_A_PHOTO_AND_FINGERPRINTING], value: VisaStatusEnum.TAKE_A_PHOTO_AND_FINGERPRINTING },
  { label: VisaStatusLabel[VisaStatusEnum.INTERVIEW], value: VisaStatusEnum.INTERVIEW },
  { label: VisaStatusLabel[VisaStatusEnum.WAIT_FOR_THE_RESULTS], value: VisaStatusEnum.WAIT_FOR_THE_RESULTS },
  { label: VisaStatusLabel[VisaStatusEnum.ADD_TO_THE_DOCUMENTS], value: VisaStatusEnum.ADD_TO_THE_DOCUMENTS },
  { label: VisaStatusLabel[VisaStatusEnum.APPROVE_A_VISA], value: VisaStatusEnum.APPROVE_A_VISA },
];
