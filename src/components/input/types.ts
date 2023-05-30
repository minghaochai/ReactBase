import { TextFieldVariants } from '@mui/material';
import { ReactNode } from 'react';

export interface TextFieldProps {
  autoFocus?: boolean;
  id?: string;
  label?: string;
  type?: string;
  fullWidth?: boolean;
  variant?: TextFieldVariants;
  select?: boolean;
  defaultValue?: unknown;
  children?: ReactNode;
  value?: unknown;
}
