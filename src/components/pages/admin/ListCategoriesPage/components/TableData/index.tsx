import ReactMaterialTable from 'src/components/material/Table';
import { useData } from 'src/context/dataContext/hooksContext';

import ButtonCreateCategory from '../ButtonCreate';
import useColumns from './columns';

const TableData = () => {
  const { columns } = useColumns();
  const { rows: data } = useData();

  return (
    <ReactMaterialTable
      columns={columns}
      data={data}
      columnFilterDisplayMode='subheader'
      state={{
        showColumnFilters: true,
      }}
      renderTopToolbarCustomActions={() => <ButtonCreateCategory />}
    />
  );
};

export default TableData;
