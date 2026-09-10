'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { Story, User } from '@/lib/types';

interface StoriesRowProps {
  stories: Story[];
  activeUser: User;
  onOpenCreateStory: () => void;
}

export const StoriesRow: React.FC<StoriesRowProps> = ({
  stories,
  activeUser,
  onOpenCreateStory,
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-card mb-6">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-sm font-bold text-slate-900">Stories</h3>
        <button className="text-[11px] font-semibold text-brand-600 hover:underline">
          View all
        </button>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
        {/* Create Story Button */}
        <div
          onClick={onOpenCreateStory}
          className="flex flex-col items-center shrink-0 cursor-pointer group"
        >
          <div className="w-16 h-20 bg-brand-50 rounded-2xl border border-dashed border-brand-300 flex flex-col items-center justify-center relative group-hover:bg-brand-100/70 transition shadow-2xs">
            <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <Plus className="w-5 h-5" />
            </div>
          </div>
          <span className="text-[11px] font-bold text-slate-700 mt-1.5">Create story</span>
        </div>

        {/* Stories List */}
        {stories.map((story) => (
          <div
            key={story.id}
            className="flex flex-col items-center shrink-0 cursor-pointer group"
          >
            <div
              className={`w-16 h-20 rounded-2xl p-1 bg-slate-50 border transition shadow-2xs flex flex-col items-center justify-center relative group-hover:scale-[1.03] ${
                story.has_unseen
                  ? 'border-brand-500 ring-2 ring-brand-500/20'
                  : 'border-slate-200/80'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={story.user.avatar_url}
                alt={story.user.full_name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-xs"
              />
            </div>
            <span className="text-[11px] font-semibold text-slate-700 mt-1.5 truncate max-w-[64px]">
              {story.user.full_name.split(' ')[0]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
