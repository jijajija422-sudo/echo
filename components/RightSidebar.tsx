'use client';

import React, { useState } from 'react';
import { Hash, Users, Calendar, Check } from 'lucide-react';
import { DEMO_TRENDING, DEMO_SUGGESTED_PEOPLE, DEMO_EVENTS } from '@/lib/store';

interface RightSidebarProps {
  onSelectTag: (tag: string) => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ onSelectTag }) => {
  const [followingMap, setFollowingMap] = useState<Record<string, boolean>>({});

  const toggleFollow = (id: string) => {
    setFollowingMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <aside className="w-80 shrink-0 hidden xl:flex flex-col gap-6 sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pl-1 no-scrollbar">
      {/* Trending Topics Widget */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-card">
        <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
          Trending Topics
        </h3>
        <div className="space-y-3">
          {DEMO_TRENDING.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectTag(item.tag)}
              className="flex items-center gap-3 cursor-pointer group p-1 rounded-lg hover:bg-slate-50 transition"
            >
              <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center text-sm font-bold shrink-0">
                <Hash className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-slate-800 group-hover:text-brand-600 transition">
                  {item.tag}
                </h4>
                <p className="text-[11px] text-slate-400">{item.posts_count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested People Widget */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-900">Suggested People</h3>
          <button className="text-[11px] font-semibold text-brand-600 hover:underline">
            See all
          </button>
        </div>
        <div className="space-y-3.5">
          {DEMO_SUGGESTED_PEOPLE.map((person) => {
            const isFollowing = followingMap[person.id];
            return (
              <div key={person.id} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={person.user.avatar_url}
                    alt={person.user.full_name}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100 shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate leading-tight">
                      {person.user.full_name}
                    </h4>
                    <p className="text-[11px] text-slate-400 truncate">@{person.user.username}</p>
                  </div>
                </div>

                <button
                  onClick={() => toggleFollow(person.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition shrink-0 flex items-center gap-1 ${
                    isFollowing
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      : 'bg-brand-600 text-white hover:bg-brand-700 shadow-2xs'
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <Check className="w-3 h-3 text-brand-600" />
                      <span>Following</span>
                    </>
                  ) : (
                    <span>Follow</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Events Widget */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-900">Upcoming Events</h3>
          <button className="text-[11px] font-semibold text-brand-600 hover:underline">
            See all
          </button>
        </div>
        <div className="space-y-3">
          {DEMO_EVENTS.map((ev) => (
            <div key={ev.id} className="flex items-start gap-3 p-1 rounded-xl hover:bg-slate-50 transition cursor-pointer">
              <div className="w-11 h-11 rounded-xl bg-brand-50 border border-brand-100 flex flex-col items-center justify-center shrink-0">
                <span className="text-[9px] font-bold uppercase text-brand-600 tracking-wider leading-none">
                  {ev.month}
                </span>
                <span className="text-xs font-black text-brand-900 leading-tight">
                  {ev.day}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-slate-900 truncate">{ev.title}</h4>
                <p className="text-[11px] text-slate-500">{ev.time}</p>
                <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                  <Users className="w-3 h-3 text-slate-400" />
                  <span>{ev.attendees_count} going</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
