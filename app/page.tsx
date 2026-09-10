'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { RightSidebar } from '@/components/RightSidebar';
import { Feed } from '@/components/Feed';
import { CreatePostModal } from '@/components/CreatePostModal';
import { UserSwitcher } from '@/components/UserSwitcher';
import { SqlSchemaViewer } from '@/components/SqlSchemaViewer';
import { ACTIVE_USER, DEMO_STORIES, INITIAL_POSTS, INITIAL_COMMENTS } from '@/lib/store';
import { User, Post, Comment, Story } from '@/lib/types';
import { Feather } from 'lucide-react';

export default function Home() {
  const [activeUser, setActiveUser] = useState<User>(ACTIVE_USER);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [comments, setComments] = useState<Record<string, Comment[]>>(INITIAL_COMMENTS);
  const [stories, setStories] = useState<Story[]>(DEMO_STORIES);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal visibility states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUserSwitcherOpen, setIsUserSwitcherOpen] = useState(false);
  const [isSqlModalOpen, setIsSqlModalOpen] = useState(false);

  // Toggle Like state
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

  // Add Comment state
  const handleAddComment = (postId: string, content: string) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      post_id: postId,
      user_id: activeUser.id,
      content,
      created_at: new Date().toISOString(),
      user: activeUser,
    };

    setComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment],
    }));

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments_count: post.comments_count + 1,
          };
        }
        return post;
      })
    );
  };

  // Create New Post
  const handlePostCreated = (textContent: string, imageUrl?: string) => {
    const newPost: Post = {
      id: `post-${Date.now()}`,
      user_id: activeUser.id,
      text_content: textContent,
      image_url: imageUrl || null,
      likes_count: 0,
      comments_count: 0,
      shares_count: 0,
      created_at: new Date().toISOString(),
      user: activeUser,
      is_liked_by_me: false,
    };

    setPosts((prev) => [newPost, ...prev]);
  };

  // Create New Story Demo Action
  const handleCreateStory = () => {
    const newStory: Story = {
      id: `story-${Date.now()}`,
      user_id: activeUser.id,
      user: activeUser,
      has_unseen: true,
    };
    setStories((prev) => [newStory, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#f3f4f8] text-slate-900 flex flex-col selection:bg-brand-100 selection:text-brand-900">
      {/* Top Header Navigation */}
      <Navbar
        activeUser={activeUser}
        onOpenUserSwitcher={() => setIsUserSwitcherOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Centered 2-Column Container (No Left Sidebar) */}
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 flex gap-6 items-start justify-center">
        {/* Main Feed Timeline Column */}
        <Feed
          posts={posts}
          comments={comments}
          stories={stories}
          activeUser={activeUser}
          onToggleLike={handleToggleLike}
          onAddComment={handleAddComment}
          onOpenCreatePost={() => setIsCreateModalOpen(true)}
          onOpenCreateStory={handleCreateStory}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
        />

        {/* Right Widgets Sidebar */}
        <RightSidebar onSelectTag={(tag) => setSearchQuery(`#${tag}`)} />
      </div>

      {/* Floating Action Button for Quick Post */}
      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-5 py-3 rounded-full shadow-float transition-transform hover:scale-105 active:scale-95 group font-bold text-xs"
        title="Create Echo Post"
      >
        <Feather className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
        <span>New Post</span>
      </button>

      {/* Modals */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        activeUser={activeUser}
        onPostCreated={handlePostCreated}
      />

      <UserSwitcher
        isOpen={isUserSwitcherOpen}
        onClose={() => setIsUserSwitcherOpen(false)}
        activeUser={activeUser}
        onSelectUser={setActiveUser}
      />

      <SqlSchemaViewer
        isOpen={isSqlModalOpen}
        onClose={() => setIsSqlModalOpen(false)}
      />
    </div>
  );
}
