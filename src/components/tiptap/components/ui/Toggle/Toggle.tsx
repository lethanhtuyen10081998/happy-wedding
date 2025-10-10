import { Switch } from '@mui/material';

export type ToggleProps = {
  active?: boolean;
  onChange: (active: boolean) => void;
  size?: 'small' | 'large';
};

export const Toggle = ({ active = false, onChange, size = 'large' }: ToggleProps) => {
  return (
    <Switch
      checked={active}
      onChange={(e) => onChange(e.target.checked)}
      size={size === 'small' ? 'small' : 'medium'}
    />
  );
};
