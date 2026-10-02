import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboardIcon, ReceiptIcon, SettingsIcon, WalletIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";
interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
}
const primaryNav: NavItem[] = [{
  to: '/',
  label: 'Dashboard',
  icon: LayoutDashboardIcon,
  end: true
}, {
  to: '/expenses',
  label: 'Expenses',
  icon: ReceiptIcon
}];
const settingsNav: NavItem = {
  to: '/settings',
  label: 'Settings',
  icon: SettingsIcon
};
function SidebarLink({
  item,
  onNavigate



}: {item: NavItem;onNavigate?: () => void;}) {
  const Icon = item.icon;
  return <NavLink to={item.to} end={item.end} onClick={onNavigate} className={({
    isActive
  }) => `flex h-9 items-center gap-3 rounded-lg px-3 text-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${isActive ? 'bg-subtle font-medium text-ink' : 'text-muted hover:bg-subtle/70 hover:text-ink'}`}>
      {({
      isActive
    }) => <>
          <Icon className={`h-4 w-4 ${isActive ? 'text-accent' : ''}`} aria-hidden="true" />
          {item.label}
        </>}
    </NavLink>;
}
export function Sidebar({
  onNavigate


}: {onNavigate?: () => void;}) {
  return <div className="flex h-full w-full flex-col bg-surface">
      <div className="flex h-14 shrink-0 items-center gap-2.5 px-5">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-white">
          <WalletIcon className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className="text-[15px] font-semibold tracking-tight text-ink">ExpenseFlow</span>
      </div>
      <nav aria-label="Main navigation" className="flex flex-1 flex-col px-3 py-4">
        <ul className="space-y-0.5">
          {primaryNav.map((item) => <li key={item.to}>
              <SidebarLink item={item} onNavigate={onNavigate} />
            </li>)}
        </ul>
        <ul className="mt-auto border-t border-border pt-3">
          <li>
            <SidebarLink item={settingsNav} onNavigate={onNavigate} />
          </li>
        </ul>
      </nav>
    </div>;
}