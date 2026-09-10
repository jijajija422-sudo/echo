'use client';

import React from 'react';
import { Users } from 'lucide-react';
import { DEMO_USERS } from '@/lib/store';

export const HeroBanner: React.FC = () => {
  return (
    <div className="relative w-full h-44 sm:h-52 rounded-3xl overflow-hidden mb-6 shadow-card group border border-slate-200/60">
      {/* Background Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80"
        alt="Better Together Cover"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Gradient Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/40 to-transparent flex flex-col justify-center p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none mb-2 drop-shadow-sm">
          Better<br />Together
        </h2>
        <p className="text-xs sm:text-sm text-slate-200 font-medium max-w-xs sm:max-w-sm drop-shadow-xs">
          Share your thoughts, discover new perspectives, and build real connections.
        </p>

        {/* Members Badge Overlay */}
        <div className="absolute right-4 bottom-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-white/40 flex items-center gap-2">
          <div className="flex -space-x-2 overflow-hidden">
            {DEMO_USERS.slice(1, 4).map((user) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={user.id}
                src={user.avatar_url}
                alt={user.full_name}
                className="inline-block h-5 w-5 rounded-full ring-2 ring-white object-cover"
              />
            ))}
          </div>
          <div className="text-[11px] font-bold text-slate-800 flex items-center gap-1">
            <Users className="w-3 h-3 text-brand-600" />
            <span>Join 1k members</span>
          </div>
        </div>
      </div>
    </div>
  );
};
