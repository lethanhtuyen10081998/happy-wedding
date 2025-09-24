import { Box } from '@mui/material';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Button from 'src/components/material/Button';
import FormTextField from 'src/components/material/form/FormTextField';
import { SPACING } from 'src/constants/grid';
import useYupValidationResolver from 'src/helpers/useYupValidationResolver';
import { FormEditorProps } from 'src/types/formEditor';

import { EditorFormRequest } from './types';
import { validation } from './validation';

export default function EditorRoleForm({ onSubmit, defaultValues, buttonLabel: buttonLalel, loading }: FormEditorProps<EditorFormRequest>) {
  const resolver = useYupValidationResolver(validation);
  const methods = useForm<EditorFormRequest>({
    resolver,
    defaultValues,
  });

  const handleSubmit = useCallback(
    (values: EditorFormRequest) => {
      onSubmit(values);
    },
    [onSubmit],
  );

  return (
    <Box py={5} px={10}>
      <Box mt={2} component='form'>
        <FormProvider {...methods}>
          <Box display='grid' gap={SPACING.md}>
            <FormTextField name='name' label='Tên danh mục' />
          </Box>

          <Box mt={2}>
            <Button label={buttonLalel} fullWidth type='submit' onClick={methods.handleSubmit(handleSubmit)} loading={loading} />
          </Box>
        </FormProvider>
      </Box>
    </Box>
  );
}
