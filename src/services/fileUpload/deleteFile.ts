import { internalApiInstance } from 'src/providers/authProvider';

import endpoints from '../endpoints';

export type UrlFileUploadRequest = {
  url: string;
};

export async function deleteFile(request: UrlFileUploadRequest) {
  return await internalApiInstance.post(endpoints.S3_DELETE_URL, {
    url: request.url,
  });
}
