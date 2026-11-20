import type { AuthRequest } from '@/types/api/authRequest';
import allAdminRoles from '@base-monorepo-v2/contracts/utils/roles/all-admin-roles';

const isAdmin = (req: AuthRequest) => {
  return allAdminRoles.some((role) => role === req.user.role);
};

export default isAdmin;
