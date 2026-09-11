'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { RightSidebar } from '@/components/RightSidebar';
import { Feed } from '@/components/Feed';
import { CreatePostModal } from '@/components/CreatePostModal';
import { UserSwitcher } from '@/components/UserSwitcher';
import StoryCreator from '@/components/StoryCreator';
import { useAuth } from '@/lib/supabase/AuthContext';
import { User, Post, Comment, Story } from '@/lib/types';
import { Feather, LogOut, User as UserIcon } from 'lucide-react';

// Demo data
const DEMO_USERS: User[] = [
  { id: 'user-jija-001', email: 'jija@example.com', username: 'jijahmed', full_name: 'Jija Ahmed', avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80', bio: 'Full-Stack Developer & UI Creator' },
  { id: 'user-sarah-002', email: 'sarah@example.com', username: 'sarahahmed', full_name: 'Sarah Ahmed', avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', bio: 'Photographer & Outdoor Explorer' },
  { id: 'user-hassan-003', email: 'hassan@example.com', username: 'hassan', full_name: 'Hassan Hassan', avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', bio: 'Product Designer & Coffee Aficionado' },
];

const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    user_id: 'user-sarah-002',
    text_content: 'The best part of life is the people you meet along the way. Grateful for this amazing community! 💙',
    image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80',
    likes_count: 248,
    comments_count: 32,
    shares_count: 12,
    created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    user: DEMO_USERS[1],
    is_liked_by_me: true,
  },
  {
    id: 'post-2',
    user_id: 'user-hassan-003',
    text_content: 'Morning coffee & quiet design sessions. There is something profoundly peaceful about building stripped-back interfaces before the world wakes up. #minimalism #design #echo',
    image_url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1000&auto=format&fit=crop&q=80',
    likes_count: 142,
    comments_count: 18,
    shares_count: 6,
    created_at: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
    user: DEMO_USERS[2],
    is_liked_by_me: false,
  },
  {
    id: 'post-3',
    user_id: 'user-jija-001',
    text_content: 'Echo is live! A clean space strictly for text & photos. No infinite short videos, no algorithmic noise — just pure thoughts and inspiring snapshots. What are you building today?',
    image_url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1000&auto=format&fit=crop&q=80',
    likes_count: 312,
    comments_count: 45,
    shares_count: 24,
    created_at: new Date(Date.now() - 1000 * 60 * 600).toISOString(),
    user: DEMO_USERS[0],
    is_liked_by_me: true,
  },
];

const INITIAL_COMMENTS: Record<string, Comment[]> = {
  'post-1': [
    { id: 'comment-101', post_id: 'post-1', user_id: 'user-hassan-003', content: 'Such a stunning view! Where was this taken Sarah?', created_at: new Date(Date.now() - 1000 * 60 * 90).toISOString(), user: DEMO_USERS[2] },
    { id: 'comment-102', post_id: 'post-1', user_id: 'user-sarah-002', content: '@Hassan Lake Tahoe during early morning sunrise! Incredible tranquility.', created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(), user: DEMO_USERS[1] },
  ],
  'post-2': [
    { id: 'comment-201', post_id: 'post-2', user_id: 'user-jija-001', content: 'Early mornings are unmatched for deep work!', created_at: new Date(Date.now() - 1000 * 60 * 200).toISOString(), user: DEMO_USERS[0] },
  ],
};

export default function Home() {
  const { user, isLoading, logout } = useAuth();
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [comments, setComments] = useState<Record<string, Comment[]>>(INITIAL_COMMENTS);
  const [stories, setStories] = useState<Story[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUserSwitcherOpen, setIsUserSwitcherOpen] = useState(false);
  const [isStoryCreatorOpen, setIsStoryCreatorOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleToggleLike = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const isLiked = post.is_liked_by_me;
          return {
            ...post,
            is_liked_by_me: !isLiked,
            likes_count: isLiked ? post.likes_count - 1 : post.likes_count + 1,
          };
        }
        return post;
      })
    );
  };

  const handleAddComment = (postId: string, content: string) => {
    if (!user) return;
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      post_id: postId,
      user_id: user.id,
      content,
      created_at: new Date().toISOString(),
      user,
    };

    setComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment],
    }));

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return { ...post, comments_count: post.comments_count + 1 };
        }
        return post;
      })
    );
  };

  const handlePostCreated = (textContent: string, imageUrl?: string) => {
    if (!user) return;
    const newPost: Post = {
      id: `post-${Date.now()}`,
      user_id: user.id,
      text_content: textContent,
      image_url: imageUrl || null,
      likes_count: 0,
      comments_count: 0,
      shares_count: 0,
      created_at: new Date().toISOString(),
      user,
      is_liked_by_me: false,
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  const handleStoryCreated = (storyData: { imageUrl?: string; textContent?: string }) => {
    if (!user) return;
    const newStory: Story = {
      id: `story-${Date.now()}`,
      user_id: user.id,
      user,
      has_unseen: true,
      image_url: storyData.imageUrl,
      text_content: storyData.textContent,
    };
    setStories((prev) => [newStory, ...prev]);
  };

  const handleSharePost = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      navigator.clipboard?.writeText(`${window.location.origin}/posts/${postId}`);
      setPosts((prev) =>
        prev.map((p) => p.id === postId ? { ...p, shares_count: (p.shares_count || 0) + 1 } : p)
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center p-2">
              <div className="grid grid-cols-2 gap-1 w-full h-full">
                <span className="bg-emerald-500 rounded-sm"></span>
                <span className="bg-pink-500 rounded-sm"></span>
                <span className="bg-sky-400 rounded-sm"></span>
                <span className="bg-amber-400 rounded-sm"></span>
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Welcome to Echo</h1>
          <p className="text-slate-500 mb-8">A clean space for text & photos. Share your thoughts, discover new perspectives, and build real connections.</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => window.location.href = '/login'}
              className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition"
            >
              Sign In
            </button>
            <button
              onClick={() => window.location.href = '/signup'}
              className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition"
            >
              Sign Up Free
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f4f8] text-slate-900 flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Header Navigation */}
      <Navbar
        activeUser={user}
        onOpenUserSwitcher={() => setIsUserSwitcherOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Centered 2-Column Container */}
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 flex gap-6 items-start justify-center">
        {/* Main Feed Timeline Column */}
        <Feed
          posts={posts}
          comments={comments}
          stories={stories}
          activeUser={user}
          onToggleLike={handleToggleLike}
          onAddComment={handleAddComment}
          onOpenCreatePost={() => setIsCreateModalOpen(true)}
          onOpenCreateStory={() => setIsStoryCreatorOpen(true)}
          onSharePost={handleSharePost}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
        />

        {/* Right Widgets Sidebar */}
        <RightSidebar onSelectTag={(tag) => setSearchQuery(`#${tag}`)} />
      </div>

      {/* Floating Action Button for Quick Post */}
      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 group font-bold text-xs"
        title="Create Echo Post"
      >
        <Feather className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
        <span>New Post</span>
      </button>

      {/* Profile Menu (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-30">
        <button
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="flex items-center gap-2 p-2 bg-white border border-slate-200 rounded-full shadow-lg hover:shadow-xl transition"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={user.avatar_url} alt={user.full_name} className="w-8 h-8 rounded-full object-cover" />
        </button>
        
        {showProfileMenu && (
          <div className="absolute bottom-full left-0 mb-2 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 min-w-[180px]">
            <div className="px-3 py-2 border-b border-slate-100 mb-2">
              <p className="font-bold text-sm text-slate-900">{user.full_name}</p>
              <p className="text-xs text-slate-500">@{user.username}</p>
            </div>
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-xl transition">
              <UserIcon className="w-4 h-4" />
              Profile
            </button>
            <button
              onClick={logout}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-xl transition"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        activeUser={user}
        onPostCreated={handlePostCreated}
      />

      <UserSwitcher
        isOpen={isUserSwitcherOpen}
        onClose={() => setIsUserSwitcherOpen(false)}
        activeUser={user}
        onSelectUser={(u) => {
          // In a real app, this would switch the session
          setIsUserSwitcherOpen(false);
        }}
      />

      <StoryCreator
        isOpen={isStoryCreatorOpen}
        onClose={() => setIsStoryCreatorOpen(false)}
        activeUser={user}
        onStoryCreated={handleStoryCreated}
      />
    </div>
  );
}
