import ExcelJS from 'exceljs';
import fs from 'file-saver';

interface ExportExcelProps {
  data: any[];
  columns: any[];
  fileName: string;
  fileLabel: string;
  sheetConfig?: {
    headerStyle?: {
      font?: any;
      alignment?: any;
      border?: any;
      fill?: any;
    };
    rowConfig?: (row: any, index: number, data: any[]) => void;
  };
}

export const exportExcel = async ({
  columns,
  data,
  fileLabel,
  fileName,
  sheetConfig,
}: ExportExcelProps) => {
  if (!data || data.length === 0) {
    alert('Không có dữ liệu để xuất!');
    return;
  }

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(fileLabel || fileName);

  // Chuyển đổi columns từ useColumns thành định dạng ExcelJS
  sheet.columns = columns.map((col) => ({
    header: col.header as string, // Tiêu đề cột
    key: col.accessorKey as string, // Key để lấy dữ liệu
    width: col.size ? col.size / 4 : 20, // Điều chỉnh độ rộng
  }));

  const headerRow = sheet.getRow(1);
  headerRow.height = 30;
  headerRow.alignment = {
    horizontal: 'center',
    vertical: 'middle',
  };

  data.forEach((row) => {
    sheet.addRow(row);
  });

  const file = await workbook.xlsx.writeBuffer();
  const blob = new Blob([file], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  fs.saveAs(blob, `${fileName}.xlsx`);
};
