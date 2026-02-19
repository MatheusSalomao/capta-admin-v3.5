import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'solar:widget-line-duotone',
    route: '/dashboard',
  },
  {
    displayName: 'Jornadas',
    iconName: 'solar:routing-3-bold-duotone',
    route: '/jornadas',
  },
];
