/* eslint-disable no-shadow */
export const buildFormData = (data: { [key: string]: any } | null | undefined, parentKey = ''): FormData => {
  const floop = (result: FormData, data: { [key: string]: any } | null | undefined, parentKeyFloop = '') => {
    if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
      Object.keys(data).forEach((key) => {
        const newKey = parentKeyFloop ? `${parentKeyFloop}` : key;
        floop(result, data[key], newKey);
      });
    } else {
      const value = data === null || data === undefined ? '' : (data as string | Blob);
      result.append(parentKeyFloop, value);
    }
  };

  const formData: FormData = new FormData();
  floop(formData, data, parentKey);

  return formData;
};
