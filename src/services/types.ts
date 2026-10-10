export interface NewsCategory {
  id: string;
  name: string;
  description?: string;
  badge_color?: string;
}

export interface NewsPost {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  content: string;
  cover_image?: string;
  additional_images?: string[];
  category_id: string;
  author_name: string;
  status: 'draft' | 'scheduled' | 'published' | 'archived' | 'withdrawn';
  created_at: string;
  published_at: string;
  updated_at: string;
  scheduled_at?: string;
  app_version?: string;
  update_type?: 'major' | 'minor' | 'patch' | 'maintenance';
  is_featured: boolean;
  is_important: boolean;
  is_pinned: boolean;
  estimated_read_time: number;
  views_count: number;
  complementary_links?: Array<{ title: string; url: string }>;
  platform_compatibility: string[];
}

export type ChangeType = 'Added' | 'Changed' | 'Fixed' | 'Security' | 'Deprecated' | 'Removed';

export interface ChangelogItem {
  type: ChangeType;
  text: string;
}

export interface AppChangelog {
  id: string;
  version: string;
  release_date: string;
  release_type: 'major' | 'minor' | 'patch' | 'hotfix';
  status: 'released' | 'in_progress' | 'planned';
  platforms: string[];
  summary: string;
  changes: ChangelogItem[];
  known_issues?: string[];
  user_actions_required?: string;
}

export interface ContactMessagePayload {
  full_name: string;
  email: string;
  category: 'assistance' | 'partenariat' | 'auteur' | 'signalement' | 'confidentialite' | 'general';
  subject: string;
  message: string;
  consent_rgpd: boolean;
}
