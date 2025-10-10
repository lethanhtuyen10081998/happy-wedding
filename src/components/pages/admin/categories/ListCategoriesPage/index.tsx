import { useEffect } from 'react';
import { useAPIDataContext } from 'src/context/dataContext/provider';
import { useFilterByColumnContext, useLimit, usePage, useSort } from 'src/context/filterContext/hooksContext';
import { useAPIRefsContext } from 'src/context/refsContext/provider';
import useListCategory from 'src/services/admin/settings/categories/getList';
import { SortType } from 'src/types/paging';

import TableData from './components/TableData';

const ListUserPage = () => {
  const { onUpdateData, onUpdateLoading, onSetFunctionRefreshData } = useAPIDataContext();
  const page = usePage();
  const limit = useLimit();
  const sort = useSort();
  const filterByColumn = useFilterByColumnContext<{}>();
  const { onSetRefs } = useAPIRefsContext();

  const { data, isFetching, total, refetch } = useListCategory({
    limit: limit || 10,
    page: page || 1,
    keySort: sort?.field || 'createdTime',
    typeSort: sort?.by || SortType.DESC,
    ...filterByColumn,
  });

  useEffect(() => {
    onSetFunctionRefreshData(refetch);
    onSetRefs({ getListCategories: refetch });
  }, [onSetFunctionRefreshData, refetch, onSetRefs]);

  useEffect(() => {
    if (data) {
      onUpdateData({ rows: data, total });
    }
    onUpdateLoading(isFetching);
  }, [data, isFetching, onUpdateData, onUpdateLoading, total]);

  return <TableData />;
};

export default ListUserPage;
