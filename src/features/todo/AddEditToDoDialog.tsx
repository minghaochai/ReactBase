import { MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '../../components';
import { useStoreSelector } from '../../redux/store';
import { AddEditToDoDialogProps } from './types';

const statusOptions = [
  {
    value: '0',
    label: 'Not Started',
  },
  {
    value: '1',
    label: 'In Progress',
  },
  {
    value: '2',
    label: 'Completed',
  },
];

export function AddEditToDoDialog(props: AddEditToDoDialogProps) {
  const { t } = useTranslation();
  const { open, close } = props;
  const { currentRow, isAdd } = useStoreSelector((state) => state.toDoList);

  const currentTime = new Date();
  const currentYear = isAdd
    ? currentTime.getFullYear()
    : currentRow!.dueAt!.getFullYear();
  const currentMonth = isAdd
    ? currentTime.getMonth() + 1
    : currentRow!.dueAt!.getMonth() + 1;
  const currentDate = isAdd
    ? currentTime.getDate()
    : currentRow!.dueAt!.getDate();

  return (
    <Dialog open={open} handleClose={close}>
      <DialogTitle>{t('toDo.edit')}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          id='name'
          label={t('toDo.name')!}
          fullWidth
          variant='standard'
          defaultValue={isAdd ? '' : currentRow!.name}
        />
        <TextField
          autoFocus
          id='description'
          label={t('toDo.description')!}
          fullWidth
          variant='standard'
          defaultValue={isAdd ? '' : currentRow!.description}
        />
        <TextField
          autoFocus
          id='dueAt'
          label={t('toDo.dueAt')!}
          type='date'
          fullWidth
          variant='standard'
          defaultValue={`${currentYear}-${
            currentMonth < 10 ? `0${currentMonth}` : currentMonth
          }-${currentDate < 10 ? `0${currentDate}` : currentDate}`}
        />
        <TextField
          autoFocus
          id='status'
          label={t('toDo.status')!}
          fullWidth
          variant='standard'
          select
          defaultValue={isAdd ? 0 : currentRow!.status}
        >
          {statusOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => close()}>{t('toDo.cancelEdit')}</Button>
        <Button onClick={() => console.log('Update')}>
          {t('toDo.updateToDo')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
