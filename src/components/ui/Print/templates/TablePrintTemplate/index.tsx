import { chunk } from 'lodash';

import PagePrint, { Column } from './PagePrint';

export type Props<T> = {
  columns: Column[][];
  data: T[];
  columnFieldMapping: Column[];
  children?: React.ReactNode;
  rowsPerPage?: number;
  height?: number;
  headerHeight?: number;
};

export default function TablePrintTemplate<T>(props: Props<T>) {
  const arraysPrintsPageData = chunk(props.data, props.rowsPerPage || 15);

  return (
    <>
      {arraysPrintsPageData.map((data, page, arrays) => (
        <PagePrint<T>
          arr={arrays}
          data={data}
          page={page}
          key={page}
          columns={props.columns}
          columnFieldMapping={props.columnFieldMapping}
          isLastPage={page === arraysPrintsPageData.length - 1}
          height={props.height}
          headerHeight={props.headerHeight}
        >
          {props.children}
        </PagePrint>
      ))}
    </>
  );
}
