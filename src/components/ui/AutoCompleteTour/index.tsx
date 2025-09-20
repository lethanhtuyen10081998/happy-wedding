import { Box, Typography } from '@mui/material';
import endOfMonth from 'date-fns/endOfMonth';
import startOfMonth from 'date-fns/startOfMonth';
import { useEffect } from 'react';
import AutoComplete from 'src/components/material/AutoComplete';
import DatePicker from 'src/components/material/DatePicker';
import { DropdownTableField } from 'src/components/material/DropdownTable';
import { PropsDropdownTable } from 'src/components/material/DropdownTable/types';
import DestinationFilter from 'src/components/pages/managementTour/components/ListTour/components/Destination';
import { DATE_FORMAT_API } from 'src/constants/constants';
import { SPACING } from 'src/constants/grid';
import { DataContextProvider, useAPIDataContext } from 'src/context/dataContext/provider';
import { useFilterByColumnContext, useFilterObjectContext, useLimit, usePage } from 'src/context/filterContext/hooksContext';
import { FilterContextProvider, useAPIFilterContext } from 'src/context/filterContext/provider';
import { formatDateToUTC } from 'src/libs/date';
import { useListTourPage } from 'src/services/managementTour/tour/getListTour';
import { DestinationEnum, DestinationOptions } from 'src/types/managementTour/destination';
import { FilterTourRequest, TourDetail } from 'src/types/managementTour/tour';

type Props = Omit<PropsDropdownTable<TourDetail>, 'data' | 'columns'> & {
  name: string;
  error?: boolean;
  helperText?: string;
};

const AutoCompleteTour = (props: Props) => {
  const page = usePage();
  const limit = useLimit();
  const { onUpdateFilterObject } = useAPIFilterContext();
  const filter = useFilterObjectContext<FilterTourRequest>();
  const filterColumns = useFilterByColumnContext<FilterTourRequest>();

  const { onSetFunctionRefreshData, onUpdateData, onUpdateLoading } = useAPIDataContext();

  const { data, refetch, total, isFetching } = useListTourPage({
    limit,
    page,
    deptNo: filter.deptNo,
    routeId: filter.routeId,
    destinationId: filter.destinationId as DestinationEnum,
    endDate: filter.endDate ? formatDateToUTC(filter.endDate, DATE_FORMAT_API) : '',
    startDate: filter.startDate ? formatDateToUTC(filter.startDate, DATE_FORMAT_API) : '',
    tourCode: filterColumns?.tourCode,
    tourId: filterColumns?.tourId,
    routeName: filterColumns?.routeName,
    status: filter?.status === 'all' ? '' : filter?.status,
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
          header: 'ID',
          accessorKey: 'tourId',
          maxSize: 250,
          size: 250,
          Cell: ({ row }) => {
            return <Typography whiteSpace='wrap'>{row.original.tourId}</Typography>;
          },
        },
        {
          header: 'Mã',
          accessorKey: 'tourCode',
          maxSize: 250,
          size: 250,
          Cell: ({ row }) => {
            return <Typography whiteSpace='wrap'>{row.original.tourCode}</Typography>;
          },
        },
        {
          header: 'Tuyến',
          accessorKey: 'routeName',
          maxSize: 250,
          size: 250,
          Cell: ({ row }) => {
            return <Typography whiteSpace='wrap'>{row.original.routeName}</Typography>;
          },
        },
      ]}
      data={data}
      getItemValue={props.getItemValue}
      getItemLabel={props.getItemLabel}
      rightContent={
        <Box>
          <Box width='300px' display='grid' gap={SPACING}>
            <Box display='grid' gap={SPACING}>
              <AutoComplete
                options={DestinationOptions}
                getItemLabel={(item) => item.label}
                getItemValue={(item) => item}
                value={DestinationOptions.find((item) => item.value === filter.deptNo)}
                label='Chọn phòng ban'
                onChange={(_e, value: any) => {
                  onUpdateFilterObject({ deptNo: value?.value as DestinationEnum });
                }}
              />

              <Box display='flex' gap={SPACING}>
                <DatePicker value={new Date(filter.startDate)} onChange={(value) => onUpdateFilterObject({ startDate: value })} />
                <DatePicker value={new Date(filter.endDate)} onChange={(value) => onUpdateFilterObject({ endDate: value })} />
              </Box>
            </Box>

            <DataContextProvider key='destination-context-data'>
              <DestinationFilter destinationType={filter.deptNo as DestinationEnum} />
            </DataContextProvider>
          </Box>
        </Box>
      }
      {...props}
    />
  );
};

const AutoCompleteTourField = (props: Props) => {
  const today = new Date();
  const startOfCurrentMonth = startOfMonth(today);
  const endOfCurrentMonth = endOfMonth(today);

  return (
    <FilterContextProvider
      defaultState={{
        limit: 20,
        page: 1,
        total: 0,
        loading: false,
      }}
      filter={{
        startDate: startOfCurrentMonth,
        endDate: endOfCurrentMonth,
        deptNo: DestinationEnum.TOUR_LE_TRONG_NUOC,
      }}
    >
      <DataContextProvider>
        <AutoCompleteTour {...props} />
      </DataContextProvider>
    </FilterContextProvider>
  );
};

export default AutoCompleteTourField;
