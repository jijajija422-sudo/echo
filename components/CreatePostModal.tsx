'use client';

import React, { useState } from 'react';
import { X, Image as ImageIcon, Sparkles, Hash, AlertCircle } from 'lucide-react';
import { User } from '@/lib/types';
import { PRESET_IMAGES } from '@/lib/store';

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
  const [showImageInput, setShowImageInput] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textContent.trim()) return;

    onPostCreated(textContent.trim(), imageUrl.trim() || undefined);
    setTextContent('');
    setImageUrl('');
    setShowImageInput(false);
    setImageError(false);
    onClose();
  };

  const handleInsertTag = (tag: string) => {
    setTextContent((prev) => (prev ? `${prev} ${tag}` : tag));
  };

  const handleSelectPreset = (url: string) => {
    setImageUrl(url);
    setShowImageInput(true);
    setImageError(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-float border border-slate-200 overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-600" />
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
              required
              className="w-full text-sm text-slate-800 placeholder-slate-400 bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition resize-none"
            />
            <div className="absolute right-3 bottom-3 text-[11px] text-slate-400 font-mono">
              {textContent.length}/500
            </div>
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
                  className="text-xs px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 border border-slate-200/80 font-medium transition"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Image Input Section */}
          {showImageInput ? (
            <div className="mb-4 p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-brand-600" />
                  Image URL
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setShowImageInput(false);
                    setImageUrl('');
                  }}
                  className="text-xs text-rose-600 hover:underline font-semibold"
                >
                  Remove Image
                </button>
              </div>

              <input
                type="url"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  setImageError(false);
                }}
                placeholder="Paste an image URL (e.g. https://images.unsplash.com/...)"
                className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition text-slate-800"
              />

              {/* Image Preview */}
              {imageUrl && (
                <div className="mt-3 relative rounded-xl overflow-hidden border border-slate-200 bg-slate-200 max-h-48 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full max-h-48 object-cover"
                    onError={() => setImageError(true)}
                  />
                  {imageError && (
                    <div className="absolute inset-0 bg-slate-900/80 text-white flex flex-col items-center justify-center p-3 text-center text-xs">
                      <AlertCircle className="w-5 h-5 text-rose-400 mb-1" />
                      Image failed to load. Please check the URL.
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="mb-4">
              <button
                type="button"
                onClick={() => setShowImageInput(true)}
                className="flex items-center gap-2 text-xs font-bold text-slate-700 px-3 py-2.5 bg-slate-100/80 rounded-2xl hover:bg-slate-200/80 transition w-full justify-center"
              >
                <ImageIcon className="w-4 h-4 text-brand-600" />
                Add Image (URL or Photography Presets)
              </button>

              {/* Quick Photography Presets */}
              <div className="mt-2.5">
                <p className="text-[11px] text-slate-400 font-semibold mb-1.5">Choose high-res preset:</p>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_IMAGES.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => handleSelectPreset(preset.url)}
                      className="text-[11px] px-2.5 py-1 bg-white border border-slate-200/80 rounded-xl text-slate-600 hover:bg-brand-50 hover:text-brand-700 transition flex items-center gap-1 font-medium"
                    >
                      <span className="w-2 h-2 rounded-full bg-brand-500"></span>
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

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
              disabled={!textContent.trim() || (showImageInput && imageError)}
              className="px-5 py-2 text-xs font-bold bg-brand-600 text-white rounded-xl hover:bg-brand-700 disabled:opacity-40 disabled:hover:bg-brand-600 transition shadow-xs flex items-center gap-1.5"
            >
              <span>Publish Post</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
