export interface ProfileMenuProps {
  expandedMenuProfiles: boolean;
  handleClose: VoidFunction;
  anchorRef: any;
  handleListKeyDown: (event: React.KeyboardEvent) => void;
}
