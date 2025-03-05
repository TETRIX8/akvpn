import { createClient } from '@supabase/supabase-js';

// Актуальные данные для подключения к Supabase
const supabaseUrl = 'https://iwscnuhiwhsoorcwbgwz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3c2NudWhpd2hzb29yY3diZ3d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ4OTk4MzcsImV4cCI6MjA1MDQ3NTgzN30.gM1XKGkgWS65GnL9T8mg2_yarvgqqLpQucbYbfAk1GI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types based on our schema
export type UserVisit = {
  id?: number;
  created_at?: string;
  user_id: string;
  ip_address?: string;
  user_agent?: string;
};

export type KeySelection = {
  id?: number;
  created_at?: string;
  user_id: string;
  key_id: string;
  key_name: string;
};

export type ConnectionClick = {
  id?: number;
  created_at?: string;
  user_id: string;
  platform: string;
  key_id: string;
};

// Новый тип для отзывов
export type Review = {
  id?: number;
  created_at?: string;
  user_id: string;
  name: string;
  rating: number;
  content: string;
  avatar_color?: string;
};

// Analytics functions
export const trackVisit = async (): Promise<string> => {
  // Generate a unique ID for new users or get existing from localStorage
  let userId = localStorage.getItem('user_id');
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem('user_id', userId);
  }

  // Track the visit
  const { error } = await supabase.from('user_visits').insert({
    user_id: userId,
    user_agent: navigator.userAgent,
  });

  if (error) console.error('Error tracking visit:', error);
  return userId;
};

export const trackKeySelection = async (keyId: string, keyName: string): Promise<void> => {
  const userId = localStorage.getItem('user_id');
  if (!userId) return;

  const { error } = await supabase.from('key_selections').insert({
    user_id: userId,
    key_id: keyId,
    key_name: keyName,
  });

  if (error) console.error('Error tracking key selection:', error);
};

export const trackConnectionClick = async (platform: string, keyId: string): Promise<void> => {
  const userId = localStorage.getItem('user_id');
  if (!userId) return;

  const { error } = await supabase.from('connection_clicks').insert({
    user_id: userId,
    platform,
    key_id: keyId,
  });

  if (error) console.error('Error tracking connection click:', error);
};

export const getStats = async () => {
  // Get visitor count
  const { data: visitorData, error: visitorError } = await supabase
    .from('user_visits')
    .select('user_id')
    .order('created_at', { ascending: false });

  // Get key selections
  const { data: keyData, error: keyError } = await supabase
    .from('key_selections')
    .select('key_id, key_name')
    .order('created_at', { ascending: false });

  // Get connection clicks
  const { data: clickData, error: clickError } = await supabase
    .from('connection_clicks')
    .select('platform, key_id')
    .order('created_at', { ascending: false });

  if (visitorError || keyError || clickError) {
    console.error('Error fetching stats:', visitorError || keyError || clickError);
  }

  // Calculate unique visitors
  const uniqueVisitors = new Set(visitorData?.map(visit => visit.user_id)).size;

  // Calculate key selections
  const keyStats: Record<string, number> = {};
  keyData?.forEach(selection => {
    keyStats[selection.key_id] = (keyStats[selection.key_id] || 0) + 1;
  });

  // Calculate connection clicks by platform
  const platformStats: Record<string, number> = {};
  clickData?.forEach(click => {
    platformStats[click.platform] = (platformStats[click.platform] || 0) + 1;
  });

  return {
    visitors: uniqueVisitors,
    keyStats,
    platformStats,
  };
};

// Функции для работы с отзывами
export const submitReview = async (review: Omit<Review, 'id' | 'created_at'>): Promise<Review | null> => {
  const { data, error } = await supabase
    .from('reviews')
    .insert(review)
    .select()
    .single();
    
  if (error) {
    console.error('Error submitting review:', error);
    return null;
  }
  
  return data;
};

export const getReviews = async (): Promise<Review[]> => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
  
  return data || [];
};
