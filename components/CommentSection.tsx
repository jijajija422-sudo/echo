'use client';

import React, { useState } from 'react';
import { Send, CornerDownRight } from 'lucide-react';
import { Comment, User } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
  activeUser: User;
  onAddComment: (postId: string, content: string) => void;
}

export const CommentSection: React.FC<CommentSectionProps> = ({
  postId,
  comments,
  activeUser,
  onAddComment,
}) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(postId, commentText.trim());
    setCommentText('');
  };

  return (
    <div className="mt-4 pt-4 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl -mx-5 -mb-5 p-5 animate-fade-in">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
        <CornerDownRight className="w-3.5 h-3.5 text-slate-400" />
        Discussion ({comments.length})
      </h4>

      {/* Existing Comments List */}
      {comments.length > 0 ? (
        <div className="space-y-3 mb-4 max-h-80 overflow-y-auto pr-1">
          {comments.map((comment) => {
            const author = comment.user || activeUser;
            const timeAgo = comment.created_at
              ? formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })
              : 'just now';

            return (
              <div key={comment.id} className="flex gap-2.5 items-start text-xs bg-white p-3 rounded-xl border border-slate-200/70 shadow-2xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={author.avatar_url}
                  alt={author.full_name}
                  className="w-7 h-7 rounded-full object-cover shrink-0 ring-1 ring-slate-200"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span className="font-semibold text-slate-900 truncate">{author.full_name}</span>
                    <span className="text-[10px] text-slate-400 shrink-0">{timeAgo}</span>
                  </div>
                  <p className="text-slate-700 text-xs leading-relaxed break-words">{comment.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-4 text-xs text-slate-400 italic bg-white/50 rounded-xl border border-dashed border-slate-200 mb-4">
          No comments yet. Start the conversation!
        </div>
      )}

      {/* Comment Input */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={activeUser.avatar_url}
          alt={activeUser.full_name}
          className="w-7 h-7 rounded-full object-cover ring-2 ring-slate-200 shrink-0"
        />
        <div className="relative flex-1">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder={`Comment as ${activeUser.full_name.split(' ')[0]}...`}
            className="w-full pl-3 pr-10 py-2 text-xs bg-white border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-800 transition text-slate-800 placeholder-slate-400"
          />
          <button
            type="submit"
            disabled={!commentText.trim()}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center disabled:opacity-40 disabled:hover:bg-slate-900 hover:bg-slate-800 transition"
            title="Post comment"
          >
            <Send className="w-3 h-3" />
          </button>
        </div>
      </form>
    </div>
  );
};
