import { TextField as MuiTextField } from '@mui/material';

import { TextFieldProps } from './types';

export function TextField(props: TextFieldProps) {
  const {
    autoFocus,
    id,
    label,
    type,
    fullWidth,
    variant,
    select,
    defaultValue,
    value,
  } = props;
  return (
    <MuiTextField
      autoFocus={autoFocus}
      id={id}
      label={label}
      type={type}
      fullWidth={fullWidth}
      variant={variant}
      defaultValue={defaultValue}
      select={select !== undefined ? select : undefined}
      value={value}
    >
      {select ? props.children : null}
    </MuiTextField>
  );
}

export default TextField;
