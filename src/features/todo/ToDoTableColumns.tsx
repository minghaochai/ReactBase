import { GridCellParams, GridColDef } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';

import { EditFilledIcon, IconButton, TrashFilledIcon } from '../../components';
import { ToDoModel } from '../../models';
import { useAppDispatch } from '../../redux/store';
import { setAddEditDialogOpen, setCurrentRow } from './ToDoListSlice';

export function UseColumns(): GridColDef[] {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  function renderEditButtonCell(params: GridCellParams<ToDoModel, any, any>) {
    const { row } = params;
    return (
      <IconButton
        onClick={() => {
          dispatch(setCurrentRow(row));
          dispatch(
            setAddEditDialogOpen({ isAdd: false, openAddEditDialog: true }),
          );
        }}
      >
        <EditFilledIcon fill='#0B41CD' height={18} width={20} />
      </IconButton>
    );
  }

  function renderDeleteButtonCell(params: GridCellParams<ToDoModel, any, any>) {
    const { row } = params;
    return (
      <IconButton onClick={() => console.log(row.id)}>
        <TrashFilledIcon fill='#0B41CD' height={18} width={20} />
      </IconButton>
    );
  }

  return [
    {
      field: 'name',
      headerName: t('toDo.name') ?? '',
      width: 150,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: 'description',
      headerName: t('toDo.description') ?? '',
      width: 250,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: 'dueAt',
      headerName: t('toDo.dueAt') ?? '',
      width: 150,
      sortable: false,
      disableColumnMenu: true,
      valueFormatter: (params) => {
        const fullDate = params.value as Date;
        const year = fullDate.getFullYear();
        const month = fullDate.getMonth() + 1;
        const date = fullDate.getDate();
        return `${year}-${month < 10 ? `0${month}` : month}-${
          date < 10 ? `0${date}` : date
        }`;
      },
    },
    {
      field: 'status',
      headerName: t('toDo.status') ?? '',
      width: 150,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: 'editButton',
      headerName: '',
      width: 80,
      renderCell: (params: GridCellParams<any, ToDoModel, any>) =>
        renderEditButtonCell(params),
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: 'deleteButton',
      headerName: '',
      width: 80,
      renderCell: (params: GridCellParams<any, ToDoModel, any>) =>
        renderDeleteButtonCell(params),
      sortable: false,
      disableColumnMenu: true,
    },
  ];
}

export default UseColumns;
