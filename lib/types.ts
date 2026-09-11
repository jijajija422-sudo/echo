export interface User {
  id: string;
  email?: string;
  username: string;
  full_name: string;
  avatar_url: string;
  bio?: string;
  created_at?: string;
}

export interface Post {
  id: string;
  user_id: string;
  text_content: string;
  image_url?: string | null;
  likes_count: number;
  comments_count: number;
  shares_count?: number;
  created_at: string;
  user?: User;
  is_liked_by_me?: boolean;
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  user?: User;
}

export interface Story {
  id: string;
  user_id: string;
  user: User;
  has_unseen: boolean;
  image_url?: string;
  text_content?: string;
  created_at?: string;
  expires_at?: string;
}

export interface Community {
  id: string;
  name: string;
  members_count: string;
  icon_bg: string;
  icon_name: string;
}

export interface TrendingTopic {
  id: string;
  tag: string;
  posts_count: string;
}

export interface SuggestedPerson {
  id: string;
  user: User;
  is_following?: boolean;
}

export interface UpcomingEvent {
  id: string;
  month: string;
  day: string;
  title: string;
  time: string;
  attendees_count: number;
}

export type NavTab = 'home' | 'explore' | 'notifications' | 'messages' | 'groups' | 'events' | 'saved' | 'profile';
export type FeedFilter = 'latest' | 'popular' | 'following';
