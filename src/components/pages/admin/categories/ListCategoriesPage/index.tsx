import { useEffect } from 'react';
import { useAPIDataContext } from 'src/context/dataContext/provider';
import { useFilterByColumnContext, useLimit, usePage, useSort } from 'src/context/filterContext/hooksContext';
import useListUser from 'src/services/admin/settings/categories/getList';
import { SortType } from 'src/types/paging';

import TableData from './components/TableData';

const ListUserPage = () => {
  const { onUpdateData, onUpdateLoading, onSetFunctionRefreshData } = useAPIDataContext();
  const page = usePage();
  const limit = useLimit();
  const sort = useSort();
  const filterByColumn = useFilterByColumnContext<{}>();

  const { data, isFetching, total, refetch } = useListUser({
    limit: limit || 10,
    page: page || 1,
    keySort: sort?.field || 'createdTime',
    typeSort: sort?.by || SortType.DESC,
    ...filterByColumn,
  });

  useEffect(() => {
    onSetFunctionRefreshData(refetch);
  }, [onSetFunctionRefreshData, refetch]);

  useEffect(() => {
    if (data) {
      onUpdateData({ rows: data, total });
    }
    onUpdateLoading(isFetching);
  }, [data, isFetching, onUpdateData, onUpdateLoading, total]);

  return <TableData />;
};

export default ListUserPage;
