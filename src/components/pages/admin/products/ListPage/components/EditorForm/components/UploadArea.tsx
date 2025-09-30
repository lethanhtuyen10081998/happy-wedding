import { Box } from '@mui/material';
import { Upload } from 'lucide-react';
import { useState } from 'react';
import Image from 'src/components/material/Image';
import Dropzone from 'src/components/ui/Dropzone';
import { FileUpload } from 'src/components/ui/Dropzone/index';
import { ImageType } from 'src/components/ui/Dropzone/types';

export default function UploadArea() {
  const [files, setFiles] = useState<FileUpload[]>([]);

  return (
    <Box>
      <Box display='flex' gap={1}>
        {files.map((file) => (
          <Box key={file.name} width={100} height={100}>
            <Image
              src={URL.createObjectURL(file as unknown as File)}
              alt={file.name}
              width={100}
              height={100}
              style={{ borderRadius: 10, border: '1px solid #E0E0E0', objectFit: 'cover' }}
            />
          </Box>
        ))}

        <Box width={100} height={100} borderRadius='10px' border='1px solid #E0E0E0'>
          <Dropzone accept={ImageType} maxLength={1} currentFileLength={0} onAddFile={setFiles} multiple>
            <Box display='flex' alignItems='center' justifyContent='center' height='100%' alignSelf='center' alignContent='center'>
              <Upload size={24} />
            </Box>
          </Dropzone>
        </Box>
      </Box>
    </Box>
  );
}
