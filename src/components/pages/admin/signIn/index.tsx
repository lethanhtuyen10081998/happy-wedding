import { Box } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Icon } from 'src/components/icons';
import Button from 'src/components/material/Button';
import FormTextField from 'src/components/material/form/FormTextField';
import PasswordField from 'src/components/material/form/PasswordField';
import { SPACING } from 'src/constants/grid';
import useYupValidationResolver from 'src/helpers/useYupValidationResolver';
import useSignIn from 'src/services/auth/signIn';

import { SignFormRequest } from './types';
import { validation } from './validation';

export default function SignIn() {
  const router = useRouter();
  const { mutation, loading } = useSignIn();
  const { t } = useTranslation('sign-in');

  const resolver = useYupValidationResolver(validation);
  const methods = useForm<SignFormRequest>({
    resolver,
  });

  const handleSubmit = useCallback(
    (values: SignFormRequest) => {
      mutation(values);
    },
    [mutation],
  );

  return (
    <Box sx={{ position: 'relative', mt: 10 }}>
      <Box component='form'>
        <FormProvider {...methods}>
          <Box display='grid' gap={SPACING}>
            <FormTextField name='username' label={t('common:username')} InputProps={{ startAdornment: <Icon name='user-interface' /> }} />

            <PasswordField name='password' label={t('common:password')} InputProps={{ startAdornment: <Icon name='password' /> }} />
          </Box>

          <Box mt={2}>
            <Button label={t('common:signIn')} fullWidth type='submit' onClick={methods.handleSubmit(handleSubmit)} loading={loading} />
          </Box>
        </FormProvider>
      </Box>
    </Box>
  );
}
