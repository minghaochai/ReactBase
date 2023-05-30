import {
  GridCallbackDetails,
  GridColDef,
  GridPaginationModel,
} from '@mui/x-data-grid';

export type DataGridProps = {
  columns: GridColDef[];
  rows: any;
} & PaginationProps;

interface PaginationProps {
  currentPage?: number;
  pageSize?: number;
  totalItems?: number;
  onPaginationModelChange?: (
    model: GridPaginationModel,
    details: GridCallbackDetails,
  ) => void;
}
