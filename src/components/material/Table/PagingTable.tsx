import { TablePagination } from '@mui/material';
import Box from '@mui/material/Box';
import { MRT_RowData, MRT_TableOptions } from 'material-react-table';
import { useData } from 'src/context/dataContext/hooksContext';
import { useLimit, usePage } from 'src/context/filterContext/hooksContext';
import { useAPIFilterContext } from 'src/context/filterContext/provider';

export type PropsTable<T extends MRT_RowData> = MRT_TableOptions<T> & {};

export default function PagingTable() {
  const { onUpdateLimit, onUpdatePage } = useAPIFilterContext();
  const page = usePage();
  const limit = useLimit();
  const { total } = useData();

  return (
    <Box
      display='flex'
      justifyContent='center'
      sx={{
        '& .MuiToolbar-root': {
          p: 0,
        },
      }}
    >
      <TablePagination
        component='div'
        count={total}
        page={page - 1}
        onPageChange={(_e, page) => onUpdatePage(page + 1)}
        rowsPerPage={limit}
        rowsPerPageOptions={[10, 20, 50, 100]}
        onRowsPerPageChange={(e) => {
          onUpdateLimit(parseInt(e.target.value, 10));
          onUpdatePage(1);
        }}
        size='small'
      />
    </Box>
  );
}
