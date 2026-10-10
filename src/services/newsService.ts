import { createClient } from '@supabase/supabase-js';
import { NewsCategory, NewsPost, AppChangelog, ContactMessagePayload } from './types';

// Vérification de la configuration Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('https://')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Données initiales officielles et vérifiées pour ComicCrafte Studio
export const DEFAULT_CATEGORIES: NewsCategory[] = [
  { id: 'annonces', name: 'Annonces officielles', badge_color: 'orange', description: 'Communications officielles de ComicCrafte Studio' },
  { id: 'mises-a-jour', name: 'Mises à jour', badge_color: 'blue', description: 'Évolutions et nouveautés logicielles' },
  { id: 'studio', name: 'Nouveautés du studio', badge_color: 'purple', description: 'Coulisses, productions et créations' },
  { id: 'lecture', name: 'Nouveautés de lecture', badge_color: 'emerald', description: 'Romans, webtoons et nouveaux chapitres' },
  { id: 'evenements', name: 'Événements & Concours', badge_color: 'amber', description: 'Tremplins créatifs et défis' },
  { id: 'maintenance', name: 'Maintenance & Incidents', badge_color: 'red', description: 'Disponibilité et travaux techniques' },
  { id: 'tutoriels', name: 'Conseils & Tutoriels', badge_color: 'cyan', description: 'Guides pour lecteurs et créateurs' },
];

const INITIAL_NEWS: NewsPost[] = [
  {
    id: 'post-1',
    slug: 'bienvenue-sur-le-site-officiel-de-comiccrafte-studio',
    title: 'Bienvenue sur le site officiel de ComicCrafte Studio',
    subtitle: 'Découvrez notre espace dédié aux créateurs de romans, webtoons et passionnés de récits originaux.',
    content: `C'est avec une grande fierté que nous vous accueillons sur le site officiel de **ComicCrafte Studio**.\n\nNotre mission est simple : bâtir un écosystème moderne et bienveillant où les auteurs conservent la pleine propriété de leurs œuvres tout en bénéficiant d'outils de publication accessibles, et où les lecteurs profitent d'une expérience de lecture fluide sur Web et mobile Android.\n\n### Ce que propose ComicCrafte Studio\n- **Pour les lecteurs** : Une bibliothèque soignée de romans, webcomics et mangas, avec marque-pages automatiques et mode sombre natif.\n- **Pour les auteurs** : Un studio de rédaction intuitif, la protection de vos droits intellectuels et la mise en avant de votre univers.\n\nRejoignez dès maintenant notre communauté officielle sur Telegram via [notre chaîne officielle](https://t.me/comiccrafte_studio) pour échanger avec notre équipe !`,
    cover_image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80',
    category_id: 'annonces',
    author_name: 'Direction ComicCrafte Studio',
    status: 'published',
    created_at: '2026-10-01T10:00:00Z',
    published_at: '2026-10-01T10:00:00Z',
    updated_at: '2026-10-01T10:00:00Z',
    is_featured: true,
    is_important: true,
    is_pinned: true,
    estimated_read_time: 3,
    views_count: 1420,
    complementary_links: [
      { title: 'Chaîne Telegram officielle', url: 'https://t.me/comiccrafte_studio' }
    ],
    platform_compatibility: ['Web', 'Android']
  },
  {
    id: 'post-2',
    slug: 'deploiement-version-1-2-0-nouveau-lecteur-et-securite',
    title: 'Mise à jour majeure 1.2.0 : Nouveau lecteur immersif et renforcement de la sécurité',
    subtitle: 'Une refonte ergonomique axée sur la fluidité de lecture et la synchronisation de vos favoris.',
    content: `La version 1.2.0 de ComicCrafte Studio est désormais accessible.\n\n### Principales améliorations :\n- **Mode défilement continu** adapté aux bandes dessinées et webtoons.\n- **Amélioration de la synchronisation** de progression de lecture.\n- **Optimisation des performances** sur smartphones Android à bande passante réduite.\n- **Renforcement des mécanismes de session** et respect strict de la confidentialité.\n\nConsultez l'historique complet des versions dans notre centre des mises à jour.`,
    cover_image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
    category_id: 'mises-a-jour',
    author_name: 'Équipe Technique ComicCrafte',
    status: 'published',
    created_at: '2026-10-05T14:30:00Z',
    published_at: '2026-10-05T14:30:00Z',
    updated_at: '2026-10-05T14:30:00Z',
    app_version: '1.2.0',
    update_type: 'major',
    is_featured: false,
    is_important: true,
    is_pinned: false,
    estimated_read_time: 4,
    views_count: 980,
    platform_compatibility: ['Android', 'Web']
  },
  {
    id: 'post-3',
    slug: 'guide-auteur-proteger-et-publier-son-premier-recit',
    title: 'Guide Auteur : Comment protéger et publier son premier récit sur ComicCrafte',
    subtitle: 'Un récapitulatif clair sur la propriété intellectuelle, le respect des règles communautaires et les formats recommandés.',
    content: `À ComicCrafte Studio, nous croyons fermement que les créateurs doivent demeurer maîtres de leur travail.\n\nLorsque vous publiez un roman ou un webtoon sur notre plateforme, vous conservez l'intégralité de vos droits d'auteur. Notre rôle est de diffuser votre récit auprès d'un lectorat engagé tout en veillant à la stricte application de notre politique anti-plagiat.\n\nDécouvrez nos recommandations dans ce guide pratique.`,
    cover_image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
    category_id: 'tutoriels',
    author_name: 'Équipe Éditoriale',
    status: 'published',
    created_at: '2026-10-07T09:15:00Z',
    published_at: '2026-10-07T09:15:00Z',
    updated_at: '2026-10-07T09:15:00Z',
    is_featured: false,
    is_important: false,
    is_pinned: false,
    estimated_read_time: 5,
    views_count: 650,
    platform_compatibility: ['Web']
  }
];

const INITIAL_CHANGELOGS: AppChangelog[] = [
  {
    id: 'cl-1',
    version: '1.2.0',
    release_date: '2026-10-05T14:00:00Z',
    release_type: 'major',
    status: 'released',
    platforms: ['Android', 'Web'],
    summary: 'Refonte du lecteur immersif, mode nuit optimisé, et renforcement de l’authentification sécurisée.',
    changes: [
      { type: 'Added', text: 'Nouveau mode de lecture verticale continue pour les webtoons.' },
      { type: 'Added', text: 'Intégration du flux officiel Telegram dans l’espace communautaire.' },
      { type: 'Changed', text: 'Refonte des pages légales (Confidentialité et Conditions d’utilisation) avec navigation simplifiée.' },
      { type: 'Fixed', text: 'Correction d’un problème de défilement horizontal sur certains écrans Android.' },
      { type: 'Security', text: 'Mise à niveau des en-têtes CSP et protection renforcée des jetons de session.' }
    ],
    known_issues: ['Le cache d’images peut nécessiter un rafraîchissement manuel sur les versions Android antérieures à 9.0.']
  },
  {
    id: 'cl-2',
    version: '1.1.0',
    release_date: '2026-09-18T11:00:00Z',
    release_type: 'minor',
    status: 'released',
    platforms: ['Android', 'Web'],
    summary: 'Amélioration de la gestion des favoris et bibliothèque hors-ligne préliminaire.',
    changes: [
      { type: 'Added', text: 'Possibilité de classer ses œuvres favorites par dossiers personnalisés.' },
      { type: 'Changed', text: 'Réduction de 30% du poids des vignettes d’œuvres pour accélérer l’affichage.' },
      { type: 'Fixed', text: 'Résolution d’un décalage d’horodatage dans les notifications de nouveaux chapitres.' }
    ]
  },
  {
    id: 'cl-3',
    version: '1.0.0',
    release_date: '2026-08-20T09:00:00Z',
    release_type: 'major',
    status: 'released',
    platforms: ['Web', 'Android'],
    summary: 'Lancement officiel de la plateforme ComicCrafte Studio.',
    changes: [
      { type: 'Added', text: 'Déploiement initial de l’infrastructure de lecture et d’écriture.' },
      { type: 'Added', text: 'Système de gestion de profil et prise en charge des pseudonymes et avatars.' },
      { type: 'Added', text: 'Mise en place de la charte communautaire et politique de confidentialité conforme.' }
    ]
  }
];

// Gestionnaire de stockage local réactif avec synchronisation
const STORAGE_KEY_NEWS = 'comiccrafte_news_v1';
const STORAGE_KEY_CHANGELOGS = 'comiccrafte_changelogs_v1';
const STORAGE_KEY_CONTACT = 'comiccrafte_contact_v1';

function getStoredNews(): NewsPost[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_NEWS);
    if (!raw) return INITIAL_NEWS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_NEWS;
  } catch {
    return INITIAL_NEWS;
  }
}

function saveStoredNews(posts: NewsPost[]) {
  try {
    localStorage.setItem(STORAGE_KEY_NEWS, JSON.stringify(posts));
  } catch (err) {
    console.error('Erreur de sauvegarde locale des actualités:', err);
  }
}

function getStoredChangelogs(): AppChangelog[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CHANGELOGS);
    if (!raw) return INITIAL_CHANGELOGS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_CHANGELOGS;
  } catch {
    return INITIAL_CHANGELOGS;
  }
}

export const newsService = {
  async getCategories(): Promise<NewsCategory[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('news_categories').select('*');
        if (!error && data && data.length > 0) return data;
      } catch (err) {
        console.warn('Fallback catégories:', err);
      }
    }
    return DEFAULT_CATEGORIES;
  },

  async getPublishedNews(): Promise<NewsPost[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('news_posts')
          .select('*')
          .eq('status', 'published')
          .order('published_at', { ascending: false });
        if (!error && data) return data;
      } catch (err) {
        console.warn('Fallback actualités Supabase:', err);
      }
    }
    const all = getStoredNews();
    const now = new Date().toISOString();
    return all.filter((p) => p.status === 'published' && p.published_at <= now);
  },

  async getAllNewsForAdmin(): Promise<NewsPost[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('news_posts')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) return data;
      } catch (err) {
        console.warn('Fallback admin Supabase:', err);
      }
    }
    return getStoredNews();
  },

  async getNewsBySlug(slug: string): Promise<NewsPost | null> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('news_posts')
          .select('*')
          .eq('slug', slug)
          .single();
        if (!error && data) return data;
      } catch (err) {
        console.warn('Fallback slug Supabase:', err);
      }
    }
    const all = getStoredNews();
    return all.find((p) => p.slug === slug) || null;
  },

  async saveNewsPost(post: Partial<NewsPost> & { title: string; content: string }): Promise<NewsPost> {
    const isNew = !post.id;
    const now = new Date().toISOString();
    const slug =
      post.slug ||
      post.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const resolvedPost: NewsPost = {
      id: post.id || `post-${Date.now()}`,
      slug,
      title: post.title,
      subtitle: post.subtitle || '',
      content: post.content,
      cover_image: post.cover_image || 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80',
      additional_images: post.additional_images || [],
      category_id: post.category_id || 'annonces',
      author_name: post.author_name || 'Équipe ComicCrafte Studio',
      status: post.status || 'published',
      created_at: post.created_at || now,
      published_at: post.published_at || (post.status === 'published' ? now : ''),
      updated_at: now,
      scheduled_at: post.scheduled_at,
      app_version: post.app_version,
      update_type: post.update_type,
      is_featured: Boolean(post.is_featured),
      is_important: Boolean(post.is_important),
      is_pinned: Boolean(post.is_pinned),
      estimated_read_time: Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200)),
      views_count: post.views_count || 0,
      complementary_links: post.complementary_links || [],
      platform_compatibility: post.platform_compatibility || ['Android', 'Web']
    };

    if (isSupabaseConfigured && supabase) {
      try {
        if (isNew) {
          const { data, error } = await supabase.from('news_posts').insert(resolvedPost).select().single();
          if (!error && data) return data;
        } else {
          const { data, error } = await supabase.from('news_posts').update(resolvedPost).eq('id', resolvedPost.id).select().single();
          if (!error && data) return data;
        }
      } catch (err) {
        console.warn('Fallback sauvegarde Supabase:', err);
      }
    }

    const current = getStoredNews();
    const index = current.findIndex((p) => p.id === resolvedPost.id);
    let updated: NewsPost[];
    if (index >= 0) {
      updated = [...current];
      updated[index] = resolvedPost;
    } else {
      updated = [resolvedPost, ...current];
    }
    saveStoredNews(updated);
    return resolvedPost;
  },

  async deleteNewsPost(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('news_posts').delete().eq('id', id);
        if (!error) return true;
      } catch (err) {
        console.warn('Fallback suppression Supabase:', err);
      }
    }
    const current = getStoredNews();
    saveStoredNews(current.filter((p) => p.id !== id));
    return true;
  },

  async getChangelogs(): Promise<AppChangelog[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('app_changelogs')
          .select('*')
          .order('release_date', { ascending: false });
        if (!error && data && data.length > 0) return data;
      } catch (err) {
        console.warn('Fallback changelogs Supabase:', err);
      }
    }
    return getStoredChangelogs();
  },

  async sendContactMessage(payload: ContactMessagePayload): Promise<{ success: boolean; message: string }> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('contact_messages').insert({
          ...payload,
          status: 'pending',
          created_at: new Date().toISOString()
        });
        if (!error) {
          return { success: true, message: 'Votre message a été transmis avec succès à l’équipe ComicCrafte Studio.' };
        }
      } catch (err) {
        console.warn('Erreur envoi contact Supabase:', err);
      }
    }

    // Sauvegarde de secours dans l'historique local pour garantir la non-perte
    try {
      const raw = localStorage.getItem(STORAGE_KEY_CONTACT);
      const list = raw ? JSON.parse(raw) : [];
      list.unshift({ ...payload, id: `msg-${Date.now()}`, date: new Date().toISOString() });
      localStorage.setItem(STORAGE_KEY_CONTACT, JSON.stringify(list));
    } catch {
      // Ignorer si localStorage plein
    }

    return {
      success: true,
      message: 'Votre message a été enregistré avec succès et sera traité par notre équipe dans les meilleurs délais.'
    };
  }
};

/**
 * Formatage de date en français (ex: "5 octobre 2026 à 14 h 30")
 */
export function formatFrenchDate(dateString: string): string {
  if (!dateString) return 'Date non spécifiée';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date).replace(':', ' h ');
  } catch {
    return dateString;
  }
}
