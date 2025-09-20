import { Grid } from '@mui/material';
import { Form, InputType } from 'src/types/field';

import FieldDynamic from './FieldDynamic';

type FormDynamicProps = {
  data: Form.Data;
};

const FieldsDynamic = ({ data }: FormDynamicProps): JSX.Element => {
  const renderFormFields = (): JSX.Element[] =>
    data.inputList.map((field) => (
      <Grid
        item
        xs={12}
        key={field.fieldName}
        display={field.input === InputType.HIDDEN ? 'none' : 'block'}
      >
        {field.input !== InputType.HIDDEN && (
          <Grid item xs={12}>
            <FieldDynamic {...field} />
          </Grid>
        )}
      </Grid>
    ));

  return <>{renderFormFields()}</>;
};

export default FieldsDynamic;
