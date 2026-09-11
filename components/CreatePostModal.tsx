'use client';

import React, { useState } from 'react';
import { X, Sparkles, Hash } from 'lucide-react';
import { User } from '@/lib/types';
import CloudinaryUpload from '@/components/CloudinaryUpload';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeUser: User;
  onPostCreated: (textContent: string, imageUrl?: string) => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  activeUser,
  onPostCreated,
}) => {
  const [textContent, setTextContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textContent.trim() && !imageUrl) return;

    onPostCreated(textContent.trim(), imageUrl || undefined);
    setTextContent('');
    setImageUrl('');
    onClose();
  };

  const handleUploadComplete = (url: string) => {
    setImageUrl(url);
  };

  const handleInsertTag = (tag: string) => {
    setTextContent((prev) => (prev ? `${prev} ${tag}` : tag));
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-float border border-slate-200 overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <h2 className="font-bold text-slate-900 text-base">Create Post</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-5">
          {/* Author Info */}
          <div className="flex items-center gap-3 mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeUser.avatar_url}
              alt={activeUser.full_name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
            />
            <div>
              <p className="font-bold text-slate-900 text-sm leading-tight">{activeUser.full_name}</p>
              <p className="text-xs text-slate-500">Posting to Public Feed</p>
            </div>
          </div>

          {/* Textarea */}
          <div className="relative mb-4">
            <textarea
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              placeholder="What's on your mind? Share thoughts, insights, or photos..."
              rows={4}
              maxLength={500}
              className="w-full text-sm text-slate-800 placeholder-slate-400 bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition resize-none"
            />
            <div className="absolute right-3 bottom-3 text-[11px] text-slate-400 font-mono">
              {textContent.length}/500
            </div>
          </div>

          {/* Cloudinary Image Upload */}
          <div className="mb-4">
            <CloudinaryUpload
              onUploadComplete={handleUploadComplete}
              currentImageUrl={imageUrl}
            />
          </div>

          {/* Tag Quick Chips */}
          <div className="mb-4">
            <div className="flex items-center gap-1 text-xs text-slate-400 font-semibold mb-1.5">
              <Hash className="w-3.5 h-3.5" />
              <span>Quick Hashtags:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['#Travel', '#Technology', '#Lifestyle', '#Fitness', '#Food'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleInsertTag(tag)}
                  className="text-xs px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 border border-slate-200/80 font-medium transition"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Footer */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!textContent.trim() && !imageUrl}
              className="px-5 py-2 text-xs font-bold bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-40 disabled:hover:bg-emerald-600 transition shadow-xs flex items-center gap-1.5"
            >
              <span>Publish Post</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
