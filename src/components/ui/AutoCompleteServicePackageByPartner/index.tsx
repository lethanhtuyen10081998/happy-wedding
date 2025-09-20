import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { DropdownTableField } from 'src/components/material/DropdownTable';
import { PropsDropdownTable } from 'src/components/material/DropdownTable/types';
import { DataContextProvider, useAPIDataContext } from 'src/context/dataContext/provider';
import { useLimit, usePage } from 'src/context/filterContext/hooksContext';
import { FilterContextProvider } from 'src/context/filterContext/provider';
import { formatMoney } from 'src/libs/utils';
import useListServicePackageByPartner from 'src/services/basicData/servicePackage/getListServicePackageByPartner';
import { ServicePackageRecord } from 'src/types/basicData/servicePackage';
import { CurrencyTypeLabel } from 'src/types/managementTour/costingTour';

type Props = Omit<PropsDropdownTable<ServicePackageRecord>, 'data' | 'columns'> & {
  partnerId: string;
  name: string;
  useDate: string;
  error?: boolean;
  helperText?: string;
};

const AutoCompleteServicePackageByPartner = (props: Props) => {
  const page = usePage();
  const limit = useLimit();

  const { onSetFunctionRefreshData, onUpdateData, onUpdateLoading } = useAPIDataContext();

  const { data, refetch, total, isFetching } = useListServicePackageByPartner(
    {
      limit,
      page,
      partnerId: props.partnerId,
      useDate: props.useDate,
    },
    Boolean(props.partnerId),
  );

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
          header: 'Tên gói dịch vụ',
          accessorKey: 'servicePackageName',
          maxSize: 250,
          size: 250,
          Cell: ({ row }) => {
            return <Typography whiteSpace='wrap'>{row.original.servicePackageName}</Typography>;
          },
        },
        {
          header: 'Loại gói dịch vụ',
          accessorKey: 'serviceId',
          maxSize: 100,
          size: 100,
        },
        {
          header: 'Giá',
          accessorKey: 'price',
          maxSize: 100,
          size: 100,
          Cell: ({ row }) => {
            return <Typography whiteSpace='wrap'>{formatMoney(row.original.price)}</Typography>;
          },
        },
        {
          header: 'Loại tiền',
          accessorKey: 'currency',
          maxSize: 100,
          size: 100,
          Cell: ({ row }) => {
            return (
              <Typography whiteSpace='wrap'>{CurrencyTypeLabel[row.original.currency]}</Typography>
            );
          },
        },
        {
          header: 'Đơn vị tính',
          accessorKey: 'quantityUnit',
          size: 100,
          maxSize: 100,
          Cell: ({ row }) => {
            return (
              <Typography whiteSpace='wrap' textTransform='capitalize'>
                {row.original.priceType}
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

const AutoCompleteServicePackageByPartnerContainer = (props: Props) => {
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
        <AutoCompleteServicePackageByPartner {...props} />
      </DataContextProvider>
    </FilterContextProvider>
  );
};

export default AutoCompleteServicePackageByPartnerContainer;
