import { PageInfoModel, PageRequestModel, ToDoModel } from '../../models';

export interface ToDoListState {
  rows: ToDoModel[];
  currentRow?: ToDoModel;
  addEditDialogOpen: boolean;
  isAdd: boolean;
  pageInfo: PageInfoModel;
  query: PageRequestModel<ToDoModel>;
}

export interface AddEditToDoDialogProps {
  open: boolean;
  close: () => void;
}
