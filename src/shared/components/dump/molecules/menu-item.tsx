import { Link, usePathname } from '@/i18n/routing';
import { ReactNode } from 'react';
import clsx from 'clsx';

interface SidebarItemProps {
  path: string;
  icon?: ReactNode;
  label: string;
}

export default function SidebarItem({ path, icon, label }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <Link
      href={path}
      className={clsx(
        'group relative flex items-center gap-4 px-5 py-3.5 rounded-xl font-medium transition-all duration-300 overflow-hidden',
        isActive
          ? 'bg-white/15 shadow-xl scale-[1.02] text-white border border-white/20'
          : 'text-white/70 hover:text-white hover:bg-white/10 hover:scale-[1.02] border border-transparent hover:border-white/10',
      )}
    >
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-sm" />
      )}
      
      <span
        className={clsx(
          'absolute left-0 top-0 w-1 h-full rounded-r-full bg-gradient-to-b from-blue-400 to-purple-500 transition-all duration-300',
          isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-60',
        )}
      />

      <div className={clsx(
        'relative z-10 flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300',
        isActive 
          ? 'bg-white/20 shadow-lg scale-110' 
          : 'bg-white/5 group-hover:bg-white/15 group-hover:scale-105'
      )}>
        <span className={clsx(
          'transition-all duration-300',
          isActive ? 'text-white' : 'text-white/70 group-hover:text-white'
        )}>
          {icon}
        </span>
      </div>

      <span className="relative z-10 text-base font-semibold transition-all duration-300 group-hover:translate-x-1 text-white">
        {label}
      </span>

      {isActive && (
        <div className="absolute inset-0 opacity-50 blur-xl bg-gradient-to-r from-blue-400/30 to-purple-500/30" />
      )}
    </Link>
  );
}
