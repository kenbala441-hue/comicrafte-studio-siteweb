-- =================================================================
-- COMICCRAFTE STUDIO - Migration SQL pour Actualités & Mises à jour
-- Schéma de base de données PostgreSQL / Supabase
-- =================================================================

-- 1. Table des catégories d'actualités
CREATE TABLE IF NOT EXISTS public.news_categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    badge_color TEXT DEFAULT 'orange',
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

-- Insertion des catégories initiales
INSERT INTO public.news_categories (id, name, description, badge_color)
VALUES 
    ('annonces', 'Annonces officielles', 'Communications officielles de ComicCrafte Studio', 'orange'),
    ('mises-a-jour', 'Mises à jour', 'Évolutions et correctifs de la plateforme et de l''application', 'blue'),
    ('studio', 'Nouveautés du studio', 'Projets, productions et coulisses de ComicCrafte', 'purple'),
    ('lecture', 'Nouveautés de lecture', 'Nouvelles séries, romans, mangas et chapitres', 'emerald'),
    ('evenements', 'Événements & Concours', 'Défis créatifs, tremplins et concours d''écriture', 'amber'),
    ('maintenance', 'Maintenance & Incidents', 'Informations techniques et opérations de maintenance', 'red'),
    ('tutoriels', 'Conseils & Tutoriels', 'Guides pratiques pour lecteurs et auteurs', 'cyan')
ON CONFLICT (id) DO NOTHING;

-- 2. Table des publications d'actualités
CREATE TABLE IF NOT EXISTS public.news_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    content TEXT NOT NULL,
    cover_image TEXT,
    additional_images TEXT[] DEFAULT '{}',
    category_id TEXT REFERENCES public.news_categories(id) ON DELETE SET NULL,
    author_name TEXT NOT NULL DEFAULT 'Équipe ComicCrafte Studio',
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'scheduled', 'published', 'archived', 'withdrawn')),
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()),
    published_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()),
    scheduled_at TIMESTAMPTZ,
    app_version TEXT,
    update_type TEXT CHECK (update_type IN ('major', 'minor', 'patch', 'maintenance')),
    is_featured BOOLEAN DEFAULT FALSE,
    is_important BOOLEAN DEFAULT FALSE,
    is_pinned BOOLEAN DEFAULT FALSE,
    estimated_read_time INTEGER DEFAULT 3,
    views_count INTEGER DEFAULT 0,
    complementary_links JSONB DEFAULT '[]'::jsonb,
    platform_compatibility TEXT[] DEFAULT ARRAY['Android', 'Web']
);

-- Index pour les recherches rapides et le tri
CREATE INDEX IF NOT EXISTS idx_news_published_at ON public.news_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_status ON public.news_posts(status);
CREATE INDEX IF NOT EXISTS idx_news_category ON public.news_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_news_slug ON public.news_posts(slug);

-- 3. Table des versions et du journal des modifications (Changelog)
CREATE TABLE IF NOT EXISTS public.app_changelogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    version TEXT NOT NULL UNIQUE,
    release_date TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    release_type TEXT NOT NULL CHECK (release_type IN ('major', 'minor', 'patch', 'hotfix')),
    status TEXT NOT NULL DEFAULT 'released' CHECK (status IN ('released', 'in_progress', 'planned')),
    platforms TEXT[] DEFAULT ARRAY['Android', 'Web'],
    summary TEXT,
    changes JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of { type: 'Added'|'Changed'|'Fixed'|'Security'|'Deprecated'|'Removed', text: string }
    known_issues TEXT[] DEFAULT '{}',
    user_actions_required TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_changelog_date ON public.app_changelogs(release_date DESC);

-- 4. Table des messages de contact officiels
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('assistance', 'partenariat', 'auteur', 'signalement', 'confidentialite', 'general')),
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    consent_rgpd BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'read', 'responded', 'archived'))
);

-- 5. Sécurité Row Level Security (RLS)
ALTER TABLE public.news_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_changelogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Politiques de lecture publique (Seules les annonces publiées et passées sont visibles par les visiteurs)
CREATE POLICY "Public read for news categories"
    ON public.news_categories FOR SELECT
    USING (true);

CREATE POLICY "Public read for published news"
    ON public.news_posts FOR SELECT
    USING (
        status = 'published' 
        AND published_at <= TIMEZONE('utc', NOW())
    );

CREATE POLICY "Public read for released changelogs"
    ON public.app_changelogs FOR SELECT
    USING (status IN ('released', 'in_progress', 'planned'));

-- Soumission de message de contact par les visiteurs
CREATE POLICY "Public insert for contact messages"
    ON public.contact_messages FOR INSERT
    WITH CHECK (true);

-- Politiques administrateur : basées sur le rôle authentifié ou clé de service
CREATE POLICY "Admin manage news posts"
    ON public.news_posts FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Admin manage changelogs"
    ON public.app_changelogs FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);
