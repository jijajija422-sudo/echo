'use client';

import React, { useState } from 'react';
import { X, Copy, Check, Database, Sparkles } from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabase/client';

interface SqlSchemaViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SQL_CONTENT = `-- ==========================================
-- ECHO SOCIAL MEDIA PLATFORM - SUPABASE SCHEMA
-- ==========================================

-- 1. Create Users Table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Posts Table
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  text_content TEXT NOT NULL,
  image_url TEXT,
  likes_count INT DEFAULT 0 NOT NULL,
  comments_count INT DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Comments Table
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create Likes Table
CREATE TABLE IF NOT EXISTS likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(post_id, user_id)
);

-- Enable RLS & Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public reads" ON posts FOR SELECT USING (true);
CREATE POLICY "Public comments" ON comments FOR SELECT USING (true);
`;

export const SqlSchemaViewer: React.FC<SqlSchemaViewerProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(SQL_CONTENT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-float border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] animate-slide-up">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-600" />
            <div>
              <h2 className="font-bold text-slate-900 text-base leading-tight">Supabase SQL DDL Schema</h2>
              <p className="text-xs text-slate-500">
                {isSupabaseConfigured
                  ? 'Connected to live Supabase project'
                  : 'Copy and execute in your Supabase SQL Editor'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info Banner */}
        <div className="bg-emerald-50 px-5 py-2.5 border-b border-emerald-100 flex items-center justify-between">
          <span className="text-xs font-medium text-emerald-900 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Tables: users, posts, comments, likes with Foreign Keys & RLS
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied SQL!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy SQL DDL</span>
              </>
            )}
          </button>
        </div>

        {/* Code View */}
        <div className="p-5 bg-slate-900 text-slate-200 overflow-y-auto flex-1 font-mono text-xs leading-relaxed">
          <pre>{SQL_CONTENT}</pre>
        </div>
      </div>
    </div>
  );
};
