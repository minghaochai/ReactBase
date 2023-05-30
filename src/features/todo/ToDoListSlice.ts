import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { toDoApi } from '../../apis/ToDoApi';
import { ConvertToJSDateTime } from '../../helpers';
import { ToDoModel } from '../../models';
import type { RootState } from '../../redux/store';
import { ToDoListState } from './types';

const DefaultPageInfo = {
  itemsPerPage: 1,
  pageNumber: 1,
  totalItems: 0,
};

const initialState: ToDoListState = {
  rows: [],
  addEditDialogOpen: false,
  isAdd: true,
  pageInfo: DefaultPageInfo,
  query: {
    itemsPerPage: 1,
    pageNumber: 1,
  },
};

export const toDoListSlice = createSlice({
  name: 'toDoList',
  initialState,
  reducers: {
    setRows(state, action: PayloadAction<ToDoModel[]>) {
      state.rows = action.payload;
    },
    setCurrentRow(state, action: PayloadAction<ToDoModel>) {
      state.currentRow = action.payload;
    },
    setAddEditDialogOpen(
      state,
      action: PayloadAction<{ isAdd: boolean; openAddEditDialog: boolean }>,
    ) {
      state.isAdd = action.payload.isAdd;
      state.addEditDialogOpen = action.payload.openAddEditDialog;
    },
    setPageChange: (
      state,
      action: PayloadAction<{
        pageNumber: number | undefined;
        itemsPerPage: number | undefined;
      }>,
    ) => {
      state.query = {
        ...state.query,
        itemsPerPage: action.payload.itemsPerPage,
        pageNumber: action.payload.pageNumber,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        toDoApi.endpoints.getToDosQueryList.matchFulfilled,
        (state, { payload }) => {
          payload.data.forEach((toDo) => {
            if (toDo.dueAt) {
              toDo.dueAt = ConvertToJSDateTime(toDo.dueAt);
            }
            if (toDo.addAt) {
              toDo.addAt = ConvertToJSDateTime(toDo.addAt);
            }
            if (toDo.editAt) {
              toDo.editAt = ConvertToJSDateTime(toDo.editAt);
            }
          });
          state.rows = payload.data;
          state.pageInfo = payload.pageInfo;
        },
      )
      .addMatcher(
        toDoApi.endpoints.getToDosQueryList.matchRejected,
        (state) => {
          state.rows = [];
          state.pageInfo = DefaultPageInfo;
        },
      );
  },
});

export const { setRows, setCurrentRow, setAddEditDialogOpen, setPageChange } =
  toDoListSlice.actions;

export const toDoListSliceListSlice = (state: RootState) => state.toDoList;

export const toDoListReducer = toDoListSlice.reducer;
