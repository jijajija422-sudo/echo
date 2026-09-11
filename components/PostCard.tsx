'use client';

import React, { useState } from 'react';
import { ThumbsUp, Heart, MessageSquare, Share2, Check, MoreHorizontal, Globe, Maximize2, X } from 'lucide-react';
import { Post, Comment, User } from '@/lib/types';
import { CommentSection } from './CommentSection';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: Post;
  comments: Comment[];
  activeUser: User;
  onToggleLike: (postId: string) => void;
  onAddComment: (postId: string, content: string) => void;
  onShare: (postId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  comments,
  activeUser,
  onToggleLike,
  onAddComment,
  onShare,
}) => {
  const [showComments, setShowComments] = useState(false);
  const [copied, setCopied] = useState(false);
  const [imageExpanded, setImageExpanded] = useState(false);

  const author = post.user || activeUser;
  const timeAgo = post.created_at
    ? formatDistanceToNow(new Date(post.created_at), { addSuffix: true })
    : '2h ago';

  const handleShare = () => {
    onShare(post.id);
    navigator.clipboard?.writeText(`${window.location.origin}/posts/${post.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderFormattedText = (text: string) => {
    const parts = text.split(/(#[a-zA-Z0-9_]+)/g);
    return parts.map((part, i) => {
      if (part.startsWith('#')) {
        return (
          <span key={i} className="text-emerald-600 font-semibold cursor-pointer hover:underline">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <>
      <article className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-card hover:shadow-card-hover transition-all duration-200 mb-4 animate-fade-in">
        {/* Author Header */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={author.avatar_url}
              alt={author.full_name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 shrink-0"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-slate-900 text-sm leading-tight hover:underline cursor-pointer">
                  {author.full_name}
                </h3>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                <span>@{author.username}</span>
                <span>•</span>
                <span>{timeAgo}</span>
                <span>•</span>
                <Globe className="w-3 h-3 text-slate-400" />
              </div>
            </div>
          </div>

          <button className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Text Content */}
        <div className="text-slate-800 text-sm leading-relaxed mb-3 whitespace-pre-wrap font-normal">
          {renderFormattedText(post.text_content)}
        </div>

        {/* Optional Image */}
        {post.image_url && (
          <div className="relative mb-3 rounded-2xl overflow-hidden bg-slate-100 group border border-slate-200/60">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image_url}
              alt="Post visual"
              className="w-full max-h-[480px] object-cover transition duration-500 group-hover:scale-[1.01]"
              loading="lazy"
            />
            <button
              onClick={() => setImageExpanded(true)}
              className="absolute top-3 right-3 p-2 bg-slate-900/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs hover:bg-slate-900"
              title="Expand image"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Reactions Counter Bar matching mockup */}
        <div className="flex items-center justify-between py-2.5 px-1 border-b border-slate-100 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <div className="flex -space-x-1">
              <div className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px] ring-2 ring-white">
                ❤️
              </div>
              <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] ring-2 ring-white">
                👍
              </div>
            </div>
            <span className="font-semibold text-slate-700">{post.likes_count}</span>
          </div>

          <div className="flex items-center gap-3 text-slate-400 font-medium">
            <span>{comments.length || post.comments_count} comments</span>
            <span>•</span>
            <span>{post.shares_count || 0} shares</span>
          </div>
        </div>

        {/* Actions Bar (Like, Comment, Share) */}
        <div className="flex items-center justify-around pt-2 text-slate-600 text-xs sm:text-sm font-semibold">
          {/* Like Button */}
          <button
            onClick={() => onToggleLike(post.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl transition ${
              post.is_liked_by_me
                ? 'bg-rose-50 text-rose-600'
                : 'hover:bg-slate-50 text-slate-600'
            }`}
          >
            <ThumbsUp
              className={`w-4 h-4 transition-transform active:scale-125 ${
                post.is_liked_by_me ? 'fill-rose-500 text-rose-500' : ''
              }`}
            />
            <span>Like</span>
          </button>

          {/* Comment Button */}
          <button
            onClick={() => setShowComments(!showComments)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl transition ${
              showComments ? 'bg-slate-100 text-slate-900' : 'hover:bg-slate-50 text-slate-600'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Comment</span>
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl hover:bg-slate-50 text-slate-600 transition"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-600">Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>

        {/* Comment Drawer Section */}
        {showComments && (
          <CommentSection
            postId={post.id}
            comments={comments}
            activeUser={activeUser}
            onAddComment={onAddComment}
          />
        )}
      </article>

      {/* Image Lightbox Modal */}
      {imageExpanded && post.image_url && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setImageExpanded(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl">
            <button
              onClick={() => setImageExpanded(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-slate-900/80 text-white rounded-full hover:bg-slate-900 transition"
            >
              <X className="w-5 h-5" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image_url}
              alt="Expanded post visual"
              className="w-full max-h-[85vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </>
  );
};
