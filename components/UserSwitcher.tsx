'use client';

import React from 'react';
import { X, Check, Users } from 'lucide-react';
import { User } from '@/lib/types';
import { DEMO_USERS } from '@/lib/store';

interface UserSwitcherProps {
  isOpen: boolean;
  onClose: () => void;
  activeUser: User;
  onSelectUser: (user: User) => void;
}

export const UserSwitcher: React.FC<UserSwitcherProps> = ({
  isOpen,
  onClose,
  activeUser,
  onSelectUser,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-float border border-slate-200 overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-600" />
            <h2 className="font-bold text-slate-900 text-base">Switch Active Persona</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Options */}
        <div className="p-4 space-y-2.5">
          <p className="text-xs text-slate-500 mb-2 px-1">
            Select an account to post comments, likes, and content under different profiles:
          </p>

          {DEMO_USERS.map((user) => {
            const isSelected = user.id === activeUser.id;
            return (
              <button
                key={user.id}
                onClick={() => {
                  onSelectUser(user);
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl border transition text-left ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50/40 ring-1 ring-emerald-500/30'
                    : 'border-slate-200/80 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={user.avatar_url}
                    alt={user.full_name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{user.full_name}</h3>
                    <p className="text-xs text-slate-500">@{user.username}</p>
                    {user.bio && <p className="text-[11px] text-slate-400 mt-0.5">{user.bio}</p>}
                  </div>
                </div>

                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
