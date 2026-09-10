'use client';

import React, { useState, useMemo } from 'react';
import { Post, Comment, User, FeedFilter, Story } from '@/lib/types';
import { PostCard } from './PostCard';
import { HeroBanner } from './HeroBanner';
import { PostComposer } from './PostComposer';
import { StoriesRow } from './StoriesRow';
import { TrendingUp, Clock, Users, SearchX } from 'lucide-react';

interface FeedProps {
  posts: Post[];
  comments: Record<string, Comment[]>;
  stories: Story[];
  activeUser: User;
  onToggleLike: (postId: string) => void;
  onAddComment: (postId: string, content: string) => void;
  onOpenCreatePost: () => void;
  onOpenCreateStory: () => void;
  searchQuery: string;
  onClearSearch: () => void;
}

export const Feed: React.FC<FeedProps> = ({
  posts,
  comments,
  stories,
  activeUser,
  onToggleLike,
  onAddComment,
  onOpenCreatePost,
  onOpenCreateStory,
  searchQuery,
  onClearSearch,
}) => {
  const [filter, setFilter] = useState<FeedFilter>('latest');

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let list = [...posts];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.text_content.toLowerCase().includes(q) ||
          p.user?.full_name.toLowerCase().includes(q) ||
          p.user?.username.toLowerCase().includes(q)
      );
    }

    // Tab filter
    if (filter === 'popular') {
      list.sort((a, b) => b.likes_count - a.likes_count);
    } else if (filter === 'latest') {
      list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (filter === 'following') {
      list = list.filter((p) => p.user_id !== activeUser.id);
    }

    return list;
  }, [posts, searchQuery, filter, activeUser.id]);

  return (
    <main className="w-full flex-1 max-w-2xl mx-auto">
      {/* Cover Hero Banner */}
      <HeroBanner />

      {/* Quick Post Composer */}
      <PostComposer activeUser={activeUser} onOpenCreatePost={onOpenCreatePost} />

      {/* Stories Carousel */}
      <StoriesRow stories={stories} activeUser={activeUser} onOpenCreateStory={onOpenCreateStory} />

      {/* Feed Filters */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200/80 shadow-2xs">
          <button
            onClick={() => setFilter('latest')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              filter === 'latest'
                ? 'bg-brand-50 text-brand-600 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            Latest
          </button>

          <button
            onClick={() => setFilter('popular')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              filter === 'popular'
                ? 'bg-brand-50 text-brand-600 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Popular
          </button>

          <button
            onClick={() => setFilter('following')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              filter === 'following'
                ? 'bg-brand-50 text-brand-600 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Discover
          </button>
        </div>

        <span className="text-xs font-semibold text-slate-400">
          {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
        </span>
      </div>

      {/* Search Filter Status */}
      {searchQuery && (
        <div className="mb-4 px-4 py-2.5 bg-brand-50 border border-brand-200 text-brand-900 rounded-2xl text-xs flex items-center justify-between shadow-2xs">
          <span>
            Filter results for: <strong className="font-semibold">{searchQuery}</strong>
          </span>
          <button
            onClick={onClearSearch}
            className="text-brand-700 hover:text-brand-900 font-bold underline"
          >
            Reset filter
          </button>
        </div>
      )}

      {/* Posts Timeline Stream */}
      {filteredPosts.length > 0 ? (
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              comments={comments[post.id] || []}
              activeUser={activeUser}
              onToggleLike={onToggleLike}
              onAddComment={onAddComment}
            />
          ))}
        </div>
      ) : (
        /* Empty Feed State */
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center animate-fade-in my-6 shadow-2xs">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
            <SearchX className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-1">No Echoes Found</h3>
          <p className="text-slate-500 text-xs max-w-xs mx-auto mb-4">
            {searchQuery
              ? `No posts matching "${searchQuery}". Try searching another keyword.`
              : 'Be the first to share a thought or photo on Echo!'}
          </p>
          {searchQuery ? (
            <button
              onClick={onClearSearch}
              className="px-4 py-2 text-xs font-bold bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition"
            >
              Clear Search
            </button>
          ) : (
            <button
              onClick={onOpenCreatePost}
              className="px-4 py-2 text-xs font-bold bg-brand-600 text-white rounded-xl hover:bg-brand-700 transition shadow-xs"
            >
              Create First Post
            </button>
          )}
        </div>
      )}
    </main>
  );
};
