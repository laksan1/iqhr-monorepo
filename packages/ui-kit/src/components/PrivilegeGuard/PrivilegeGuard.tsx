import type { ReactNode } from 'react';

export type PrivilegeGuardProps = {
  privilege?: string | string[];
  privileges?: string[];
  hasPrivilege?: (privilege: string) => boolean;
  fallback?: ReactNode;
  children: ReactNode;
};

export function PrivilegeGuard({
  privilege,
  privileges = [],
  hasPrivilege,
  fallback = null,
  children,
}: PrivilegeGuardProps) {
  const check =
    hasPrivilege ?? ((value: string) => privileges.includes(value) || privileges.includes('*'));
  const required = Array.isArray(privilege) ? privilege : privilege ? [privilege] : [];
  const allowed = required.length === 0 || required.every(check);

  if (!allowed) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
