import { styled } from '@mui/material';
import { DataGrid as MuiDataGrid } from '@mui/x-data-grid';

import { DataGridProps } from './types';

export function DataGrid(props: DataGridProps) {
  const {
    columns,
    rows,
    pageSize,
    currentPage,
    totalItems,
    onPaginationModelChange,
  } = props;

  const StyledMuiDataGrid = styled(MuiDataGrid)({
    margin: 'auto',
  });

  return (
    <StyledMuiDataGrid
      rows={rows}
      columns={columns}
      rowCount={totalItems}
      pageSizeOptions={[1]}
      paginationModel={{
        page: currentPage! - 1,
        pageSize: pageSize!,
      }}
      paginationMode='server'
      onPaginationModelChange={onPaginationModelChange}
      disableRowSelectionOnClick
    />
  );
}

export default DataGrid;
