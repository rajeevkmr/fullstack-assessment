import { FC } from 'react';
import { DataGrid } from 'react-data-grid';
import { formatDate } from '../../utils/utils';

type iProps = {
  data: {
    fileName: string;
    processedRow: string;
    uploadDate: string;
  }[];
};
const MetadataView: FC<iProps> = ({ data }) => {
  const rows = data.map((item) => ({
    name: item.fileName,
    processedRow: item.processedRow,
    date: formatDate(item.uploadDate), // Parse date string
  }));
  const columns = [
    { key: 'name', name: 'Filename' },
    { key: 'processedRow', name: 'Total Rows Processed' },
    { key: 'date', name: 'Upload Date' },
  ];
  // Calculate grid height dynamically based on the number of rows
  const rowHeight = 35; // Approximate height of each row in pixels
  const headerHeight = 45; // Approximate height of the header in pixels
  const gridHeight = Math.min(400, rows.length * rowHeight + headerHeight); // Cap height at 400px

  return (
    <div className='w-75 mx-auto mt-5'>
      <h2 className='text-center'>File Metadata</h2>
      <DataGrid
        columns={columns}
        rows={rows}
        bottomSummaryRows={[]}
        style={{ height: `${gridHeight + 20}px` }}
      />
    </div>
  );
};
export default MetadataView;
// This component is responsible for displaying the metadata view.
