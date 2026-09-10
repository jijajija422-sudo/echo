'use client';

import React from 'react';
import { Home, Compass, Users, Calendar, User as UserIcon } from 'lucide-react';
import { NavTab, User } from '@/lib/types';

interface MobileBottomNavProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  activeUser: User;
  onOpenUserSwitcher: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onSelectTab,
  activeUser,
  onOpenUserSwitcher,
}) => {
  const items = [
    { id: 'home' as NavTab, label: 'Home', icon: Home },
    { id: 'explore' as NavTab, label: 'Explore', icon: Compass },
    { id: 'groups' as NavTab, label: 'Groups', icon: Users },
    { id: 'events' as NavTab, label: 'Events', icon: Calendar },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 py-2 px-4 lg:hidden shadow-lg">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition ${
                isActive ? 'text-brand-600 font-bold' : 'text-slate-500 font-medium hover:text-slate-800'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
              <span className="text-[10px]">{item.label}</span>
            </button>
          );
        })}

        <button
          onClick={onOpenUserSwitcher}
          className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-slate-500 font-medium hover:text-slate-800 transition"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activeUser.avatar_url}
            alt={activeUser.full_name}
            className="w-5 h-5 rounded-full object-cover ring-1 ring-brand-500"
          />
          <span className="text-[10px]">Profile</span>
        </button>
      </div>
    </div>
  );
};
