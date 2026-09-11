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
import {
  onPostsSnapshot,
  onCommentsSnapshot,
  onStoriesSnapshot,
  toggleLike,
  addComment,
  createPost,
  createStory,
  incrementShareCount,
  getLikedPosts,
} from '@/lib/supabase/firebaseData';

export default function Home() {
  const { user, isLoading, logout } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [stories, setStories] = useState<Story[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUserSwitcherOpen, setIsUserSwitcherOpen] = useState(false);
  const [isStoryCreatorOpen, setIsStoryCreatorOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  // Subscribe to real-time posts
  useEffect(() => {
    if (!user) return;
    
    const unsubscribe = onPostsSnapshot((newPosts) => {
      setPosts(newPosts);
      // Get liked posts
      getLikedPosts(user.id).then((liked) => {
        setLikedPosts(new Set(liked));
      });
    });

    return () => unsubscribe();
  }, [user]);

  // Subscribe to real-time stories
  useEffect(() => {
    if (!user) return;
    
    const unsubscribe = onStoriesSnapshot((newStories) => {
      setStories(newStories);
    });

    return () => unsubscribe();
  }, [user]);

  // Subscribe to comments for each post
  useEffect(() => {
    if (!user || posts.length === 0) return;
    
    const unsubscribes: (() => void)[] = [];
    
    posts.forEach((post) => {
      const unsubscribe = onCommentsSnapshot(post.id, (postComments) => {
        setComments((prev) => ({
          ...prev,
          [post.id]: postComments,
        }));
      });
      unsubscribes.push(unsubscribe);
    });

    return () => {
      unsubscribes.forEach((unsub) => unsub());
    };
  }, [user, posts]);

  const handleToggleLike = async (postId: string) => {
    if (!user) return;
    const isLiked = await toggleLike(postId, user.id);
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      if (isLiked) {
        newSet.add(postId);
      } else {
        newSet.delete(postId);
      }
      return newSet;
    });
  };

  const handleAddComment = async (postId: string, content: string) => {
    if (!user) return;
    await addComment(postId, user.id, content, user.full_name, user.avatar_url);
  };

  const handlePostCreated = async (textContent: string, imageUrl?: string) => {
    if (!user) return;
    await createPost({
      userId: user.id,
      textContent,
      imageUrl,
      userName: user.full_name,
      userAvatar: user.avatar_url,
    });
  };

  const handleStoryCreated = async (storyData: { imageUrl?: string; textContent?: string }) => {
    if (!user) return;
    await createStory({
      userId: user.id,
      imageUrl: storyData.imageUrl,
      textContent: storyData.textContent,
      userName: user.full_name,
      userAvatar: user.avatar_url,
    });
  };

  const handleSharePost = async (postId: string) => {
    await incrementShareCount(postId);
    navigator.clipboard?.writeText(`${window.location.origin}/posts/${postId}`);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
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
      <Navbar
        activeUser={user}
        onOpenUserSwitcher={() => setIsUserSwitcherOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 flex gap-6 items-start justify-center">
        <Feed
          posts={posts.map((p) => ({ ...p, is_liked_by_me: likedPosts.has(p.id) }))}
          comments={comments}
          stories={stories}
          activeUser={user}
          onToggleLike={handleToggleLike}
          onAddComment={handleAddComment}
          onOpenCreatePost={() => setIsCreateModalOpen(true)}
          onOpenCreateStory={() => setIsStoryCreatorOpen(true)}
          onSharePost={handleSharePost}
          searchQuery={searchQuery}
          onClearSearch={handleClearSearch}
        />
        <RightSidebar onSelectTag={(tag) => setSearchQuery(`#${tag}`)} />
      </div>

      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 group font-bold text-xs"
      >
        <Feather className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
        <span>New Post</span>
      </button>

      <div className="fixed bottom-6 left-6 z-30">
        <button
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="flex items-center gap-2 p-2 bg-white border border-slate-200 rounded-full shadow-lg hover:shadow-xl transition"
        >
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
