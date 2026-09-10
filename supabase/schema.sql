-- ==========================================
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

-- Indexing for fast feed querying and join operations
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_likes_post_id ON likes(post_id);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all feeds
CREATE POLICY "Public profiles are viewable by everyone" ON users FOR SELECT USING (true);
CREATE POLICY "Posts are viewable by everyone" ON posts FOR SELECT USING (true);
CREATE POLICY "Comments are viewable by everyone" ON comments FOR SELECT USING (true);
CREATE POLICY "Likes are viewable by everyone" ON likes FOR SELECT USING (true);

-- Allow authenticated or insert permissions for app users
CREATE POLICY "Users can create posts" ON posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can create comments" ON comments FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can toggle likes" ON likes FOR ALL USING (true);
CREATE POLICY "Users can update their profile" ON users FOR ALL USING (true);

-- Initial Seed Data
INSERT INTO users (id, username, full_name, avatar_url, bio)
VALUES 
  ('a1b2c3d4-0001-4000-8000-000000000001', 'elena_vance', 'Elena Vance', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', 'Architect & Minimalist UI designer'),
  ('a1b2c3d4-0002-4000-8000-000000000002', 'liam_chen', 'Liam Chen', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', 'Building clean web interfaces and exploring urban photography'),
  ('a1b2c3d4-0003-4000-8000-000000000003', 'maya_patel', 'Maya Patel', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', 'Coffee enthusiast, full-stack explorer & open source advocate')
ON CONFLICT (id) DO NOTHING;

INSERT INTO posts (id, user_id, text_content, image_url, likes_count, comments_count)
VALUES 
  (
    'b1c2d3e4-0001-4000-8000-000000000001', 
    'a1b2c3d4-0001-4000-8000-000000000001', 
    'Morning coffee & quiet design sessions. There is something profoundly peaceful about building stripped-back interfaces before the world wakes up. #minimalism #design #echo', 
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1000&auto=format&fit=crop&q=80',
    24,
    3
  ),
  (
    'b1c2d3e4-0002-4000-8000-000000000002', 
    'a1b2c3d4-0002-4000-8000-000000000002', 
    'Echo is live! A clean space strictly for text & photos. No infinite short videos, no algorithmic noise — just pure thoughts and inspiring snapshots.', 
    'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1000&auto=format&fit=crop&q=80',
    42,
    5
  ),
  (
    'b1c2d3e4-0003-4000-8000-000000000003', 
    'a1b2c3d4-0003-4000-8000-000000000003', 
    'Discovered this serene hidden garden spot during my weekend trail run. Sunlight through the pine canopy is the ultimate reset button.', 
    'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1000&auto=format&fit=crop&q=80',
    18,
    2
  )
ON CONFLICT (id) DO NOTHING;

INSERT INTO comments (id, post_id, user_id, content)
VALUES
  ('c1d2e3f4-0001-4000-8000-000000000001', 'b1c2d3e4-0001-4000-8000-000000000001', 'a1b2c3d4-0002-4000-8000-000000000002', 'Totally agree! Early morning is peak creative hours.'),
  ('c1d2e3f4-0002-4000-8000-000000000001', 'b1c2d3e4-0001-4000-8000-000000000001', 'a1b2c3d4-0003-4000-8000-000000000003', 'That warm aesthetic is gorgeous Elena! What palette are you using?'),
  ('c1d2e3f4-0003-4000-8000-000000000002', 'b1c2d3e4-0002-4000-8000-000000000002', 'a1b2c3d4-0001-4000-8000-000000000001', 'Love the focus on zero video clutter. Feels like classic social media again!')
ON CONFLICT (id) DO NOTHING;
