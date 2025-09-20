import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { DropdownTableField } from 'src/components/material/DropdownTable';
import { PropsDropdownTable } from 'src/components/material/DropdownTable/types';
import { DataContextProvider, useAPIDataContext } from 'src/context/dataContext/provider';
import {
  useFilterByColumnContext,
  useLimit,
  usePage,
} from 'src/context/filterContext/hooksContext';
import { FilterContextProvider } from 'src/context/filterContext/provider';
import useListGuide from 'src/services/guide/getListGuide';
import { Guide } from 'src/types/guide';
import { GenderLabel } from 'src/types/user';

type Props = Omit<PropsDropdownTable<Guide>, 'data' | 'columns'> & {
  name: string;
  error?: boolean;
  helperText?: string;
};

const AutoCompleteGuide = (props: Props) => {
  const page = usePage();
  const limit = useLimit();
  const filterByColumn = useFilterByColumnContext<any>();
  const { onSetFunctionRefreshData, onUpdateData, onUpdateLoading } = useAPIDataContext();

  const { data, refetch, total, isFetching } = useListGuide({
    limit,
    page,
    ...filterByColumn,
  });

  useEffect(() => {
    if (data) {
      onUpdateData({ rows: data, total });
    }
    onUpdateLoading(isFetching);
    onSetFunctionRefreshData(refetch);
  }, [refetch, onSetFunctionRefreshData, data, onUpdateData, total, onUpdateLoading, isFetching]);

  return (
    <DropdownTableField
      columns={[
        {
          header: 'Tên hướng dẫn viên',
          accessorKey: 'fullName',
          maxSize: 250,
          size: 250,
          Cell: ({ row }) => {
            return <Typography whiteSpace='wrap'>{row.original.fullName}</Typography>;
          },
        },
        {
          header: 'Giới tính',
          accessorKey: 'gender',
          maxSize: 100,
          size: 100,
          Cell: ({ row }) => {
            return <Typography whiteSpace='wrap'>{GenderLabel[row.original.gender]}</Typography>;
          },
          filterVariant: 'select',
          filterSelectOptions: [
            { label: 'Nam', value: '1' },
            { label: 'Nữ', value: '0' },
          ],
        },
        {
          header: 'Địa chỉ',
          accessorKey: 'address',
          size: 100,
          maxSize: 100,
          Cell: ({ row }) => {
            return (
              <Typography whiteSpace='wrap' textTransform='capitalize'>
                {row.original.address}
              </Typography>
            );
          },
        },
      ]}
      data={data}
      getItemValue={props.getItemValue}
      getItemLabel={props.getItemLabel}
      {...props}
    />
  );
};

const AutoCompleteGuideContainer = (props: Props) => {
  return (
    <FilterContextProvider
      defaultState={{
        limit: 20,
        page: 1,
        total: 0,
        loading: false,
      }}
    >
      <DataContextProvider>
        <AutoCompleteGuide {...props} />
      </DataContextProvider>
    </FilterContextProvider>
  );
};

export default AutoCompleteGuideContainer;
