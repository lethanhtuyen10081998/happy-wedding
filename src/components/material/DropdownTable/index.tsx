import { Box, colors } from '@mui/material';
import { isEqual } from 'lodash';
import { MRT_RowData } from 'material-react-table';
import { Controller } from 'react-hook-form';
import ReactMaterialTable from 'src/components/material/Table';
import { useModal } from 'src/components/ui/ModalEditor/useModal';
import { SPACING } from 'src/constants/grid';
import { useLoading } from 'src/context/dataContext/hooksContext';

import AutoComplete from '../AutoComplete';
import { PropsDropdownTable } from './types';
const getItemDefault = (item: any) => `${item}`;

const DropdownTable = <E extends MRT_RowData>({
  onChange,
  value,
  columns,
  data,
  getItemLabel = getItemDefault,
  getItemValue = getItemDefault,
  label,
  error,
  helperText,
  dialogProps,
  rightContent,
}: PropsDropdownTable<E> & { error: boolean; helperText?: string }) => {
  const isLoading = useLoading();
  const { Dialog, close, open: openDialog } = useModal();

  return (
    <>
      <AutoComplete
        options={[]}
        value={value ? getItemLabel(value) : ''}
        onOpen={() => openDialog()}
        label={label}
        error={error}
        helperText={helperText}
      />
      <Dialog onClose={close} label={label || ''} loading={isLoading} dialogProps={{ maxWidth: 'md', fullWidth: true, ...dialogProps }}>
        <Box p={1} display='flex' gap={SPACING} width={1}>
          {rightContent}
          <Box flex={1}>
            <ReactMaterialTable
              columns={columns.map((item) => ({ ...item }))}
              data={data}
              enableExpandAll={true}
              enableToolbarInternalActions={false}
              enableRowNumbers={false}
              enableTopToolbar={false}
              enableColumnActions={false}
              muiTableBodyRowProps={({ row }) => {
                return {
                  onClick: () => {
                    onChange?.(getItemValue(row.original));
                    close();
                  },
                  sx: {
                    backgroundColor: isEqual(getItemValue(row.original), value) ? colors.lightBlue[50] : '',
                    ':hover': {
                      backgroundColor: colors.lightBlue[50],
                    },
                  },
                };
              }}
              muiTableContainerProps={{ sx: { minHeight: '500px' } }}
              state={{
                showLoadingOverlay: isLoading,
                showColumnFilters: true,
              }}
            />
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export const DropdownTableField = <E extends MRT_RowData>(props: PropsDropdownTable<E> & { name: string }) => {
  return (
    <Controller
      name={props.name}
      render={({ field: { value, onChange }, fieldState: { error, invalid } }) => {
        return (
          <DropdownTable
            value={value}
            onChange={(value) => {
              onChange(value);
              props.onChange?.(value);
            }}
            getItemValue={props.getItemValue}
            getItemLabel={props.getItemLabel}
            error={invalid}
            helperText={error?.message}
            {...props}
          />
        );
      }}
    />
  );
};
export { DropdownTable };
