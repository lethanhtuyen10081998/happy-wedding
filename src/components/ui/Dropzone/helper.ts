export const validationVideos = async ({}: { fileChanges: File[]; accept: string }) => {
  // const filterResult = await filterValidFiles(fileChanges, accept);
  // fileChanges = filterResult.validFiles;

  // if (filterResult.hasInvalidFiles) {
  //   return 'Each file to upload must be at max of 500 MiB in size and 1-5 minute in duration. One or more of your selected files have exceeded that limit';
  // }

  // const isInvalidMaxVideoSize =
  //   fileChanges.some((item) => item.size > MAX_VIDEO_SIZE) && accept === VIDEO_TYPE;
  // if (isInvalidMaxVideoSize) {
  //   return 'Please choose file size < 50MB';
  // }

  return '';
};

export const validationFileLength = ({ files, currentLength, maxLength }: { files: File[]; currentLength: number; maxLength: number }) => {
  if (!files.length) {
    return;
  }

  const isInvalidFileLength = files.length > maxLength || files.length + currentLength > maxLength;
  if (isInvalidFileLength) {
    return `Image uploaded should not exceed ${maxLength}`;
  }

  return;
};

export const isInvalidFileSelected = ({
  files,
  accept,
  currentLength,
  maxLength,
}: {
  files: File[];
  accept: string;
  currentLength: number;
  maxLength: number;
  isValidMinimumSize?: boolean;
}) => {
  const isInvalidFileLength = validationFileLength({ currentLength, files, maxLength });
  if (isInvalidFileLength) {
    return isInvalidFileLength;
  }

  if (accept === '') {
    return validationVideos({ accept, fileChanges: files });
  }

  // if (!!validationImages({ files })) {
  //   return validationImages({ files, isValidMinimumSize });
  // }

  return;
};
