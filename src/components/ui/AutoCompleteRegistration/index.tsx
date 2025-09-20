import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { DropdownTableField } from 'src/components/material/DropdownTable';
import { PropsDropdownTable } from 'src/components/material/DropdownTable/types';
import { DataContextProvider, useAPIDataContext } from 'src/context/dataContext/provider';
import { useLimit, usePage } from 'src/context/filterContext/hooksContext';
import { FilterContextProvider } from 'src/context/filterContext/provider';
import { useListRegistrationTour } from 'src/services/managementTour/registration/getListRegistrationTour';
import { RegistrationTour } from 'src/types/managementTour/registrationTour';

type Props = Omit<PropsDropdownTable<RegistrationTour>, 'data' | 'columns'> & {
  name: string;
  error?: boolean;
  helperText?: string;
  tourId?: string;
};

const AutoCompleteRegistration = (props: Props) => {
  const page = usePage();
  const limit = useLimit();
  const { onSetFunctionRefreshData, onUpdateData, onUpdateLoading } = useAPIDataContext();

  const { data, isFetching, refetch } = useListRegistrationTour({
    limit: limit,
    page: page,
    tourId: props.tourId as string,
  });

  useEffect(() => {
    if (data) {
      onUpdateData({ rows: data.data, total: data.total });
    }
    onUpdateLoading(isFetching);
    onSetFunctionRefreshData(refetch);
  }, [refetch, onSetFunctionRefreshData, data, onUpdateData, onUpdateLoading, isFetching]);

  return (
    <DropdownTableField
      columns={[
        {
          header: 'Mã',
          accessorKey: 'registrationId',
          maxSize: 250,
          size: 250,
          Cell: ({ row }) => {
            return <Typography whiteSpace='wrap'>{row.original.registrationId}</Typography>;
          },
        },
        {
          header: 'Nhân viên xử lí',
          accessorKey: 'handlingEmployee',
          maxSize: 250,
          size: 250,
          Cell: ({ row }) => {
            return <Typography whiteSpace='wrap'>{row.original.handlingEmployee}</Typography>;
          },
        },
      ]}
      data={data?.data || []}
      getItemValue={props.getItemValue}
      getItemLabel={props.getItemLabel}
      {...props}
    />
  );
};

const AutoCompleteRegistrationField = (props: Props) => {
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
        <AutoCompleteRegistration {...props} />
      </DataContextProvider>
    </FilterContextProvider>
  );
};

export default AutoCompleteRegistrationField;
