'use client';

import React from 'react';
import { Image as ImageIcon, BarChart2, Smile, Send, Sparkles } from 'lucide-react';
import { User } from '@/lib/types';

interface PostComposerProps {
  activeUser: User;
  onOpenCreatePost: () => void;
}

export const PostComposer: React.FC<PostComposerProps> = ({
  activeUser,
  onOpenCreatePost,
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-card mb-6">
      {/* Top Input Bar */}
      <div className="flex items-center gap-3 mb-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={activeUser.avatar_url}
          alt={activeUser.full_name}
          className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 shrink-0"
        />
        <button
          onClick={onOpenCreatePost}
          className="flex-1 text-left px-4 py-2.5 bg-slate-100/70 hover:bg-slate-100 rounded-full text-slate-500 text-xs sm:text-sm font-normal transition"
        >
          What's on your mind, {activeUser.full_name.split(' ')[0]}?
        </button>
      </div>

      {/* Action Chips & Submit Button */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 flex-wrap gap-2">
        <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
          {/* Photo option */}
          <button
            onClick={onOpenCreatePost}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition"
          >
            <ImageIcon className="w-4 h-4 text-emerald-600" />
            <span>Photo</span>
          </button>

          {/* Poll option */}
          <button
            onClick={onOpenCreatePost}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 transition"
          >
            <BarChart2 className="w-4 h-4 text-purple-600" />
            <span>Poll</span>
          </button>

          {/* Feeling option */}
          <button
            onClick={onOpenCreatePost}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 transition"
          >
            <Smile className="w-4 h-4 text-amber-600" />
            <span>Feeling</span>
          </button>
        </div>

        {/* Primary Post Trigger Button */}
        <button
          onClick={onOpenCreatePost}
          className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-sm transition flex items-center gap-1.5 ml-auto"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Post</span>
        </button>
      </div>
    </div>
  );
};
