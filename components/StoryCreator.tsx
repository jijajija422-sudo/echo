'use client';

import React, { useState, useRef } from 'react';
import { X, Image as ImageIcon, Type, Send, Loader2 } from 'lucide-react';
import { User } from '@/lib/types';

interface StoryCreatorProps {
  isOpen: boolean;
  onClose: () => void;
  activeUser: User;
  onStoryCreated: (story: { imageUrl?: string; textContent?: string }) => void;
}

export default function StoryCreator({ isOpen, onClose, activeUser, onStoryCreated }: StoryCreatorProps) {
  const [mode, setMode] = useState<'image' | 'text'>('image');
  const [textContent, setTextContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [bgColor, setBgColor] = useState('from-emerald-500 to-teal-600');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const bgOptions = [
    'from-emerald-500 to-teal-600',
    'from-pink-500 to-rose-600',
    'from-violet-500 to-purple-600',
    'from-amber-500 to-orange-600',
    'from-sky-500 to-blue-600',
    'from-slate-700 to-slate-900',
  ];

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be less than 5MB');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'echo_uploads');

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData }
      );

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      setImageUrl(data.secure_url);
    } catch (err) {
      alert('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = () => {
    if (mode === 'text' && !textContent.trim()) return;
    if (mode === 'image' && !imageUrl) return;

    onStoryCreated({
      imageUrl: mode === 'image' ? imageUrl : undefined,
      textContent: mode === 'text' ? textContent : undefined,
    });

    // Reset
    setTextContent('');
    setImageUrl('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-900">Create Story</h2>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-2 p-4">
          <button
            onClick={() => setMode('image')}
            className={`flex-1 py-2 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2 ${
              mode === 'image' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            Photo
          </button>
          <button
            onClick={() => setMode('text')}
            className={`flex-1 py-2 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2 ${
              mode === 'text' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            <Type className="w-4 h-4" />
            Text
          </button>
        </div>

        {/* Content */}
        <div className="px-4 pb-4">
          {mode === 'image' ? (
            <div className="space-y-3">
              {imageUrl ? (
                <div className="relative rounded-2xl overflow-hidden aspect-[9/16] max-h-80">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imageUrl} alt="Story" className="w-full h-full object-cover" />
                  <button
                    onClick={() => setImageUrl('')}
                    className="absolute top-2 right-2 p-1.5 bg-slate-900/70 text-white rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center cursor-pointer hover:border-emerald-500 transition aspect-[9/16] max-h-80 flex flex-col items-center justify-center"
                >
                  {isUploading ? (
                    <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                  ) : (
                    <>
                      <ImageIcon className="w-10 h-10 text-slate-400 mb-2" />
                      <span className="text-sm text-slate-600">Tap to upload photo</span>
                    </>
                  )}
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-3">
              {/* Background Color Picker */}
              <div className="flex gap-2">
                {bgOptions.map((bg) => (
                  <button
                    key={bg}
                    onClick={() => setBgColor(bg)}
                    className={`w-8 h-8 rounded-full bg-gradient-to-br ${bg} ${
                      bgColor === bg ? 'ring-2 ring-slate-900 ring-offset-2' : ''
                    }`}
                  />
                ))}
              </div>

              {/* Text Story Preview */}
              <div className={`rounded-2xl aspect-[9/16] max-h-80 bg-gradient-to-br ${bgColor} flex items-center justify-center p-6`}>
                <textarea
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  placeholder="Type your story..."
                  maxLength={200}
                  className="w-full h-full bg-transparent text-white text-xl font-bold text-center placeholder-white/60 focus:outline-none resize-none"
                />
              </div>
              <p className="text-xs text-slate-400 text-right">{textContent.length}/200</p>
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="px-4 pb-4">
          <button
            onClick={handleSubmit}
            disabled={isUploading || (mode === 'text' ? !textContent.trim() : !imageUrl)}
            className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            Share Story
          </button>
        </div>
      </div>
    </div>
  );
}
