'use client';

import React from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { User } from '@/lib/types';

interface NavbarProps {
  activeUser: User;
  onOpenUserSwitcher: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeUser,
  onOpenUserSwitcher,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center p-1.5 shadow-sm">
            <div className="grid grid-cols-2 gap-1 w-full h-full">
              <span className="bg-brand-500 rounded-sm"></span>
              <span className="bg-pink-500 rounded-sm"></span>
              <span className="bg-emerald-400 rounded-sm"></span>
              <span className="bg-sky-400 rounded-sm"></span>
            </div>
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">Echo</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl relative">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search for people, posts, groups, or topics..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-100/70 border border-slate-200/80 rounded-full text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Action Controls - Profile Avatar only */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenUserSwitcher}
            className="flex items-center gap-1.5 p-1 pl-1 pr-2 rounded-full border border-slate-200/80 bg-slate-50 hover:bg-slate-100 transition"
            title="Switch User Persona"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeUser.avatar_url}
              alt={activeUser.full_name}
              className="w-7 h-7 rounded-full object-cover ring-2 ring-brand-500/20"
            />
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden sm:block" />
          </button>
        </div>
      </div>
    </header>
  );
};
