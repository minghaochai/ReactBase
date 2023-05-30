import { styled } from '@mui/material';
import { GridCallbackDetails, GridPaginationModel } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, DataGrid } from '../../components';
import {
  useAppDispatch,
  useLazyGetToDosQueryListQuery,
  useStoreSelector,
} from '../../redux/store';
import { AddEditToDoDialog } from './AddEditToDoDialog';
import { setAddEditDialogOpen, setPageChange } from './ToDoListSlice';
import UseColumns from './ToDoTableColumns';

const StyledActionDiv = styled('div')({
  display: 'flex',
  columnGap: '20px',
});

export const ToDoList = () => {
  const { t } = useTranslation();
  const columns = UseColumns();
  const dispatch = useAppDispatch();
  const { rows, addEditDialogOpen, pageInfo, query } = useStoreSelector(
    (state) => state.toDoList,
  );
  const [getToDos] = useLazyGetToDosQueryListQuery();

  const openAddEditDialog = () => {
    dispatch(setAddEditDialogOpen({ isAdd: true, openAddEditDialog: true }));
  };

  const closeAddEditDialog = () => {
    dispatch(setAddEditDialogOpen({ isAdd: false, openAddEditDialog: false }));
  };

  const onPaginationModelChange = async (
    model: GridPaginationModel,
    details: GridCallbackDetails,
  ) => {
    dispatch(
      setPageChange({
        pageNumber: model.page + 1,
        itemsPerPage: model.pageSize,
      }),
    );
    await getToDos({
      params: { pageNumber: model.page + 1, itemsPerPage: model.pageSize },
    });
  };

  useEffect(() => {
    Promise.all([getToDos({ params: query })]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <StyledActionDiv>
        <Button sx={{ marginLeft: 'auto' }} onClick={openAddEditDialog}>
          {t('toDo.add')}
        </Button>
      </StyledActionDiv>
      <DataGrid
        columns={columns}
        rows={rows}
        pageSize={pageInfo.itemsPerPage}
        currentPage={pageInfo.pageNumber}
        totalItems={pageInfo.totalItems}
        onPaginationModelChange={onPaginationModelChange}
      />
      <AddEditToDoDialog open={addEditDialogOpen} close={closeAddEditDialog} />
    </>
  );
};
