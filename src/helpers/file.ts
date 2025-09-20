export function downloadFileByLink(link: string, fileName: string) {
  const fileUrl = link;

  fetch(fileUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Lỗi khi tải file');
      }
      return response.blob();
    })
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error('Lỗi tải file:', error);
    });
}
