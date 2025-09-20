import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { DropdownTableField } from 'src/components/material/DropdownTable';
import { PropsDropdownTable } from 'src/components/material/DropdownTable/types';
import { DataContextProvider, useAPIDataContext } from 'src/context/dataContext/provider';
import { useLimit, usePage } from 'src/context/filterContext/hooksContext';
import { FilterContextProvider } from 'src/context/filterContext/provider';
import useListPartner from 'src/services/partner/getListPartner';
import { PartnerRecord } from 'src/types/partner';

type Props = Omit<PropsDropdownTable<PartnerRecord>, 'data' | 'columns'> & {
  serviceId?: string;
  name: string;
};

const AutoCompletePartner = (props: Props) => {
  const page = usePage();
  const limit = useLimit();

  const { onSetFunctionRefreshData, onUpdateData, onUpdateLoading } = useAPIDataContext();

  const { data, isFetching, refetch, total } = useListPartner({
    limit,
    page,
    serviceId: props.serviceId,
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
          header: 'Tên đối tác',
          accessorKey: 'partnerName',
          maxSize: 200,
          size: 200,
          Cell: ({ row }) => {
            return <Typography whiteSpace='wrap'>{row.original.partnerName}</Typography>;
          },
        },
        {
          header: 'Mã đối tác',
          accessorKey: 'partnerId',
          maxSize: 100,
          size: 100,
          Cell: ({ row }) => {
            return <Typography whiteSpace='wrap'>{row.original.partnerId}</Typography>;
          },
        },
        {
          header: 'Địa chỉ',
          accessorKey: 'address',
          size: 200,
          maxSize: 200,
          Cell: ({ row }) => {
            return <Typography whiteSpace='wrap'>{row.original.address}</Typography>;
          },
        },
        {
          header: 'Số điện thoại',
          accessorKey: 'phone',
          size: 100,
          maxSize: 100,
        },
        {
          header: 'Người liên hệ',
          accessorKey: 'contactPerson',
          size: 100,
          maxSize: 100,
        },
      ]}
      data={data}
      getItemValue={props.getItemValue}
      getItemLabel={props.getItemLabel}
      label={props.label}
      {...props}
    />
  );
};

const AutoCompletePartnerContainer = (props: Props) => {
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
        <AutoCompletePartner {...props} />
      </DataContextProvider>
    </FilterContextProvider>
  );
};

export default AutoCompletePartnerContainer;
