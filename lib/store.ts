'use client';

import { User, Post, Comment, Story, Community, TrendingTopic, SuggestedPerson, UpcomingEvent } from './types';

export const ACTIVE_USER: User = {
  id: 'user-jija-001',
  username: 'jijahmed',
  full_name: 'Jija Ahmed',
  avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  bio: 'Full-Stack Developer & UI Creator',
  created_at: new Date().toISOString(),
};

export const DEMO_USERS: User[] = [
  ACTIVE_USER,
  {
    id: 'user-sarah-002',
    username: 'sarahahmed',
    full_name: 'Sarah Ahmed',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    bio: 'Photographer & Outdoor Explorer',
    created_at: new Date().toISOString(),
  },
  {
    id: 'user-hassan-003',
    username: 'hassan',
    full_name: 'Hassan Hassan',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    bio: 'Product Designer & Coffee Aficionado',
    created_at: new Date().toISOString(),
  },
  {
    id: 'user-fatima-004',
    username: 'fatima_ali',
    full_name: 'Fatima Ali',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bio: 'Tech Founder & Community Builder',
    created_at: new Date().toISOString(),
  },
  {
    id: 'user-omar-005',
    username: 'OmarAbdullahi',
    full_name: 'Omar Abdullahi',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    bio: 'Software Engineer & Writer',
    created_at: new Date().toISOString(),
  },
  {
    id: 'user-layla-006',
    username: 'layla',
    full_name: 'Layla Abdi',
    avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    bio: 'Traveler & Wellness Advocate',
    created_at: new Date().toISOString(),
  },
];

export const DEMO_STORIES: Story[] = [
  { id: 'story-1', user_id: 'user-sarah-002', user: DEMO_USERS[1], has_unseen: true },
  { id: 'story-2', user_id: 'user-hassan-003', user: DEMO_USERS[2], has_unseen: true },
  { id: 'story-3', user_id: 'user-fatima-004', user: DEMO_USERS[3], has_unseen: false },
  { id: 'story-4', user_id: 'user-omar-005', user: DEMO_USERS[4], has_unseen: true },
  { id: 'story-5', user_id: 'user-layla-006', user: DEMO_USERS[5], has_unseen: false },
];

export const DEMO_COMMUNITIES: Community[] = [
  { id: 'comm-1', name: 'Tech & Innovation', members_count: '12.4k members', icon_bg: 'bg-blue-500', icon_name: 'Laptop' },
  { id: 'comm-2', name: 'Fitness & Health', members_count: '8.7k members', icon_bg: 'bg-emerald-500', icon_name: 'Activity' },
  { id: 'comm-3', name: 'Travel the World', members_count: '15.2k members', icon_bg: 'bg-indigo-500', icon_name: 'Globe' },
  { id: 'comm-4', name: 'Food Lovers', members_count: '10.1k members', icon_bg: 'bg-amber-500', icon_name: 'Utensils' },
  { id: 'comm-5', name: 'Study Buddies', members_count: '6.3k members', icon_bg: 'bg-slate-700', icon_name: 'BookOpen' },
];

export const DEMO_TRENDING: TrendingTopic[] = [
  { id: 'trend-1', tag: 'Travel', posts_count: '24.5k posts' },
  { id: 'trend-2', tag: 'Technology', posts_count: '18.7k posts' },
  { id: 'trend-3', tag: 'Lifestyle', posts_count: '12.3k posts' },
  { id: 'trend-4', tag: 'Fitness', posts_count: '9.8k posts' },
  { id: 'trend-5', tag: 'Food', posts_count: '8.4k posts' },
];

export const DEMO_SUGGESTED_PEOPLE: SuggestedPerson[] = [
  {
    id: 'sug-1',
    user: {
      id: 'sug-u1',
      username: 'amiraNassan',
      full_name: 'Amira Hassan',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    is_following: false,
  },
  {
    id: 'sug-2',
    user: {
      id: 'sug-u2',
      username: 'OmarAbdullahi',
      full_name: 'Omar Abdullahi',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
    is_following: false,
  },
  {
    id: 'sug-3',
    user: {
      id: 'sug-u3',
      username: 'fatima.ali',
      full_name: 'Fatima Ali',
      avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    },
    is_following: false,
  },
  {
    id: 'sug-4',
    user: {
      id: 'sug-u4',
      username: 'Ahmednoor',
      full_name: 'Ahmed Noor',
      avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    },
    is_following: false,
  },
];

export const DEMO_EVENTS: UpcomingEvent[] = [
  {
    id: 'ev-1',
    month: 'AUG',
    day: '28',
    title: 'Community Meetup',
    time: 'Online • 7:00 PM',
    attendees_count: 124,
  },
  {
    id: 'ev-2',
    month: 'AUG',
    day: '31',
    title: 'Tech Talk: The Future of AI',
    time: 'Online • 6:00 PM',
    attendees_count: 89,
  },
  {
    id: 'ev-3',
    month: 'SEP',
    day: '5',
    title: 'Wellness & Mindfulness',
    time: 'Online • 6:00 PM',
    attendees_count: 62,
  },
];

export const PRESET_IMAGES = [
  {
    label: 'Mountain Lake Scene',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80',
  },
  {
    label: 'Minimalist Workspace',
    url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1000&auto=format&fit=crop&q=80',
  },
  {
    label: 'Morning Coffee',
    url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1000&auto=format&fit=crop&q=80',
  },
  {
    label: 'Forest Canopy',
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1000&auto=format&fit=crop&q=80',
  },
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    user_id: 'user-sarah-002',
    text_content: 'The best part of life is the people you meet along the way. Grateful for this amazing community! 💙',
    image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80',
    likes_count: 248,
    comments_count: 32,
    shares_count: 12,
    created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2h ago
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
    created_at: new Date(Date.now() - 1000 * 60 * 300).toISOString(), // 5h ago
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
    created_at: new Date(Date.now() - 1000 * 60 * 600).toISOString(), // 10h ago
    user: ACTIVE_USER,
    is_liked_by_me: true,
  },
];

export const INITIAL_COMMENTS: Record<string, Comment[]> = {
  'post-1': [
    {
      id: 'comment-101',
      post_id: 'post-1',
      user_id: 'user-hassan-003',
      content: 'Such a stunning view! Where was this taken Sarah?',
      created_at: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
      user: DEMO_USERS[2],
    },
    {
      id: 'comment-102',
      post_id: 'post-1',
      user_id: 'user-sarah-002',
      content: '@Hassan Hassan Lake Tahoe during early morning sunrise! Incredible tranquility.',
      created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      user: DEMO_USERS[1],
    },
  ],
  'post-2': [
    {
      id: 'comment-201',
      post_id: 'post-2',
      user_id: 'user-jija-001',
      content: 'Early mornings are unmatched for deep work!',
      created_at: new Date(Date.now() - 1000 * 60 * 200).toISOString(),
      user: ACTIVE_USER,
    },
  ],
};
