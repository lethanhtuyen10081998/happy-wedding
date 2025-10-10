import { Box, IconButton } from '@mui/material';
import { Trash, Upload } from 'lucide-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Image from 'src/components/material/Image';
import Dropzone from 'src/components/ui/Dropzone';
import { ImageType } from 'src/components/ui/Dropzone/types';

import { EditorFormAction, EditorFormImage } from '../types';

export default function UploadArea() {
  const { setValue, getValues } = useFormContext();
  const images = getValues('images');
  const [files, setFiles] = useState<EditorFormImage[]>(images || []);

  const handleDeleteImage = (image: string) => {
    setFiles(files.filter((f) => f.file.name !== image));
    setValue(
      'images',
      files.filter((f) => f.file.name !== image),
    );
  };

  const handleDeleteImageDefault = (image: string) => {
    const newFiles = files.map((f) => {
      if (f.file.src === image) {
        return { ...f, action: EditorFormAction.DELETE };
      }
      return f;
    });
    setFiles(newFiles);
    setValue('images', newFiles);
  };

  return (
    <Box>
      <Box display='flex' gap={1} flexWrap='wrap'>
        {files
          .filter((f) => f.action !== EditorFormAction.DELETE)
          .map((file) => {
            if (file.action === EditorFormAction.DEFAULT) {
              return (
                <Box key={file.file.src} width={100} height={100} position='relative'>
                  <Box position='absolute' top={0} right={0} borderRadius='10px' p={1}>
                    <IconButton
                      sx={{ color: 'white', width: 32, height: 32, bgcolor: 'rgba(0, 0, 0, 0.5)', ':hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' } }}
                      onClick={() => handleDeleteImageDefault(file.file.src as string)}
                    >
                      <Trash size={16} />
                    </IconButton>
                  </Box>
                  <Image
                    src={file.file.src as string}
                    alt={file.file.name as string}
                    width={100}
                    height={100}
                    style={{ borderRadius: 10, border: '1px solid #E0E0E0', objectFit: 'cover' }}
                  />
                </Box>
              );
            }
            return (
              <Box key={file.file.name} width={100} height={100} position='relative'>
                <Box position='absolute' top={0} right={0} borderRadius='10px' p={1}>
                  <IconButton
                    sx={{ color: 'white', width: 32, height: 32, bgcolor: 'rgba(0, 0, 0, 0.5)', ':hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' } }}
                    onClick={() => handleDeleteImage(file.file.name as string)}
                  >
                    <Trash size={16} />
                  </IconButton>
                </Box>
                <Box key={file.file.name} width={100} height={100}>
                  <Image
                    src={URL.createObjectURL(file.file as unknown as File)}
                    alt={file.file.name as string}
                    width={100}
                    height={100}
                    style={{ borderRadius: 10, border: '1px solid #E0E0E0', objectFit: 'cover' }}
                  />
                </Box>
              </Box>
            );
          })}

        <Box width={100} height={100} borderRadius='10px' border='1px solid #E0E0E0'>
          <Dropzone
            accept={ImageType}
            maxLength={1}
            currentFileLength={0}
            onAddFile={(values) => {
              const newFiles = [...files, ...values.map((value) => ({ action: EditorFormAction.UPLOAD, file: value }))];
              setValue('images', newFiles);
              setFiles(newFiles);
            }}
            multiple
          >
            <Box display='flex' alignItems='center' justifyContent='center' height='100%' alignSelf='center' alignContent='center'>
              <Upload size={24} />
            </Box>
          </Dropzone>
        </Box>
      </Box>
    </Box>
  );
}
