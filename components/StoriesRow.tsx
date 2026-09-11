'use client';

import React, { useState } from 'react';
import { Plus, X, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [viewingStory, setViewingStory] = useState<Story | null>(null);
  const [storyIndex, setStoryIndex] = useState(0);

  const handleViewStory = (story: Story, index: number) => {
    setViewingStory(story);
    setStoryIndex(index);
  };

  const handleNext = () => {
    if (storyIndex < stories.length - 1) {
      setStoryIndex(storyIndex + 1);
      setViewingStory(stories[storyIndex + 1]);
    } else {
      setViewingStory(null);
    }
  };

  const handlePrev = () => {
    if (storyIndex > 0) {
      setStoryIndex(storyIndex - 1);
      setViewingStory(stories[storyIndex - 1]);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-card mb-6">
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-sm font-bold text-slate-900">Stories</h3>
          <button className="text-[11px] font-semibold text-emerald-600 hover:underline">
            View all
          </button>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
          {/* Create Story Button */}
          <div
            onClick={onOpenCreateStory}
            className="flex flex-col items-center shrink-0 cursor-pointer group"
          >
            <div className="w-16 h-20 bg-emerald-50 rounded-2xl border border-dashed border-emerald-300 flex flex-col items-center justify-center relative group-hover:bg-emerald-100/70 transition shadow-2xs">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Plus className="w-5 h-5" />
              </div>
            </div>
            <span className="text-[11px] font-bold text-slate-700 mt-1.5">Create story</span>
          </div>

          {/* Stories List */}
          {stories.map((story, index) => (
            <div
              key={story.id}
              onClick={() => handleViewStory(story, index)}
              className="flex flex-col items-center shrink-0 cursor-pointer group"
            >
              <div
                className={`w-16 h-20 rounded-2xl p-1 bg-slate-50 border transition shadow-2xs flex flex-col items-center justify-center relative group-hover:scale-[1.03] ${
                  story.has_unseen
                    ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                    : 'border-slate-200/80'
                }`}
              >
                {story.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={story.image_url}
                    alt={story.user.full_name}
                    className="w-full h-full rounded-xl object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center p-1">
                    <span className="text-white text-[8px] font-bold text-center leading-tight">
                      {story.text_content || story.user.full_name}
                    </span>
                  </div>
                )}
              </div>
              <span className="text-[11px] font-semibold text-slate-700 mt-1.5 truncate max-w-[64px]">
                {story.user.full_name.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Story Viewer Modal */}
      {viewingStory && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="relative w-full max-w-lg">
            {/* Close Button */}
            <button
              onClick={() => setViewingStory(null)}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white transition"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation */}
            {storyIndex > 0 && (
              <button
                onClick={handlePrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/20 text-white rounded-full hover:bg-white/30 transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            {storyIndex < stories.length - 1 && (
              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/20 text-white rounded-full hover:bg-white/30 transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}

            {/* Story Content */}
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              {/* Progress Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-10">
                <div className="h-full bg-white w-full animate-[progress_5s_linear]" style={{ animationDuration: '5s' }} />
              </div>

              {/* User Info */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={viewingStory.user.avatar_url}
                  alt={viewingStory.user.full_name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
                />
                <span className="text-white text-sm font-semibold">{viewingStory.user.full_name}</span>
              </div>

              {/* Story Image or Text */}
              {viewingStory.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={viewingStory.image_url}
                  alt="Story"
                  className="w-full max-h-[70vh] object-cover"
                />
              ) : (
                <div className="w-full aspect-[9/16] max-h-[70vh] bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center p-8">
                  <p className="text-white text-2xl font-bold text-center">
                    {viewingStory.text_content}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
