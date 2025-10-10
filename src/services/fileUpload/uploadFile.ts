import axios from 'axios';
import { buildFormData } from 'src/libs/formData';
import { internalApiInstance } from 'src/providers/authProvider';

import endpoints from '../endpoints';

export type UrlFileUploadRequest = {
  fileName: string;
  folder: string;
  contentType: string;
  file: File;
};

export async function uploadFile(request: UrlFileUploadRequest, onProgress?: (progress: number) => void) {
  const response: {
    data: {
      fields: any;
      fileUrl: string;
      key: string;
      url: string;
    };
  } = await internalApiInstance.post(endpoints.S3_GENERATE_URL, {
    fileName: request.fileName,
    folder: request.folder,
    contentType: request.contentType,
  });
  const { fields, url } = response.data;

  const formData = buildFormData({ ...fields, file: request.file });

  await axios.post(url, formData, {
    onUploadProgress: function (progressEvent) {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 0));
      onProgress?.(percentCompleted);
    },
  });

  return response.data.fileUrl;
}
