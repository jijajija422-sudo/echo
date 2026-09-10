'use client';

import React from 'react';
import {
  Home,
  Compass,
  Bell,
  MessageSquare,
  Users,
  Calendar,
  Bookmark,
  PlusCircle,
  Laptop,
  Activity,
  Globe,
  Utensils,
  BookOpen,
  Settings,
  Sparkles,
} from 'lucide-react';
import { User, NavTab, Community } from '@/lib/types';
import { DEMO_COMMUNITIES } from '@/lib/store';

interface LeftSidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  activeUser: User;
  onOpenUserSwitcher: () => void;
  onOpenCreatePost: () => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  activeTab,
  onSelectTab,
  activeUser,
  onOpenUserSwitcher,
  onOpenCreatePost,
}) => {
  const navItems = [
    { id: 'home' as NavTab, label: 'Home', icon: Home },
    { id: 'explore' as NavTab, label: 'Explore', icon: Compass },
    { id: 'notifications' as NavTab, label: 'Notifications', icon: Bell, badge: 3 },
    { id: 'messages' as NavTab, label: 'Messages', icon: MessageSquare, badge: 2 },
    { id: 'groups' as NavTab, label: 'Groups', icon: Users },
    { id: 'events' as NavTab, label: 'Events', icon: Calendar },
    { id: 'saved' as NavTab, label: 'Saved', icon: Bookmark },
  ];

  const getCommunityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Laptop': return Laptop;
      case 'Activity': return Activity;
      case 'Globe': return Globe;
      case 'Utensils': return Utensils;
      case 'BookOpen': return BookOpen;
      default: return Users;
    }
  };

  return (
    <aside className="w-64 shrink-0 hidden lg:flex flex-col gap-6 sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2 no-scrollbar">
      {/* Primary Navigation Menu */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-card">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? 'bg-brand-50 text-brand-600 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="w-5 h-5 rounded-full bg-brand-600 text-white text-[11px] font-bold flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Quick Create Action Button */}
          <button
            onClick={onOpenCreatePost}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
          >
            <PlusCircle className="w-5 h-5 text-slate-400" />
            <span>Create</span>
          </button>
        </nav>
      </div>

      {/* Your Communities Section */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-card">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">
          Your Communities
        </h3>
        <div className="space-y-3">
          {DEMO_COMMUNITIES.map((comm) => {
            const Icon = getCommunityIcon(comm.icon_name);
            return (
              <div
                key={comm.id}
                className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-50 cursor-pointer transition group"
              >
                <div
                  className={`w-8 h-8 rounded-xl ${comm.icon_bg} text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs`}
                >
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-semibold text-slate-800 truncate group-hover:text-brand-600 transition">
                    {comm.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 truncate">{comm.members_count}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Promo Card Widget */}
      <div className="bg-gradient-to-br from-brand-50 via-white to-brand-100/50 rounded-2xl p-4 border border-brand-200/60 shadow-card relative overflow-hidden">
        <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-2 shadow-xs">
          <Sparkles className="w-4 h-4" />
        </div>
        <h4 className="font-bold text-slate-900 text-sm mb-1">Find your people</h4>
        <p className="text-xs text-slate-500 leading-relaxed mb-3">
          Join communities, make new friends and be part of something bigger.
        </p>
        <button
          onClick={() => onSelectTab('groups')}
          className="w-full py-2 px-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-sm transition"
        >
          Explore Communities
        </button>
      </div>

      {/* Profile Footer */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-card flex items-center justify-between gap-2 mt-auto">
        <div
          onClick={onOpenUserSwitcher}
          className="flex items-center gap-2.5 min-w-0 cursor-pointer flex-1"
          title="Click to switch persona"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activeUser.avatar_url}
            alt={activeUser.full_name}
            className="w-9 h-9 rounded-full object-cover ring-2 ring-brand-500/20 shrink-0"
          />
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-slate-900 truncate leading-tight">{activeUser.full_name}</h4>
            <p className="text-[10px] text-slate-400 truncate">@{activeUser.username}</p>
          </div>
        </div>

        <button
          onClick={onOpenUserSwitcher}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          title="Switch User Persona"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
