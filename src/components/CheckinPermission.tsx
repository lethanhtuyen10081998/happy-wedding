import { useModuleContext } from 'src/context/moduleContext/hooksContext';
import { usePermissionContext } from 'src/context/permissionContext/hooksContext';
import { ActionEnum, ScreenName, UserRole } from 'src/types/user';

const CheckinPermission = ({ children, module, actions }: { children: React.ReactNode; module?: ScreenName; actions: ActionEnum[] }) => {
  const contextModule = useModuleContext();
  const selectedModule = module || contextModule;
  const { permissions, role } = usePermissionContext();
  const permission = permissions?.find((permission) => permission.module === selectedModule);

  console.log(permission);

  if (role === UserRole.SUPER_ADMIN) {
    return children;
  }

  if (!permission || !permission.actions.length) {
    return null;
  }

  if (permission.actions.some((action) => actions.includes(action))) {
    return children;
  }

  return null;
};

export default CheckinPermission;
