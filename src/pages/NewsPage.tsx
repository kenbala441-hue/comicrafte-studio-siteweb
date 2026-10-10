import React, { useState, useEffect } from 'react';
import { newsService, formatFrenchDate, DEFAULT_CATEGORIES } from '../services/newsService';
import { NewsPost, NewsCategory } from '../services/types';
import { siteConfig, isWhatsAppConfigured } from '../config/siteConfig';
import { TelegramIcon, WhatsAppIcon } from '../components/CommunitySection';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  Calendar, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  Pin, 
  AlertCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface NewsPageProps {
  navigate: (path: string) => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ navigate }) => {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [categories, setCategories] = useState<NewsCategory[]>(DEFAULT_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'recent' | 'oldest'>('recent');
  const [loading, setLoading] = useState<boolean>(true);

  const whatsappReady = isWhatsAppConfigured();

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [cats, news] = await Promise.all([
          newsService.getCategories(),
          newsService.getPublishedNews(),
        ]);
        setCategories(cats);
        setPosts(news);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filtrage et recherche
  const filteredPosts = posts.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category_id === selectedCategory;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query === '' ||
      p.title.toLowerCase().includes(query) ||
      (p.subtitle && p.subtitle.toLowerCase().includes(query)) ||
      p.content.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  // Tri
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    const dateA = new Date(a.published_at).getTime();
    const dateB = new Date(b.published_at).getTime();
    return sortBy === 'recent' ? dateB - dateA : dateA - dateB;
  });

  const featuredPost = posts.find((p) => p.is_featured);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* En-tête de page */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6A00]/10 border border-[#FF6A00]/25 text-[#FF8A33] text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Centre Officiel d'Informations
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Actualités et nouveautés du studio
        </h1>
        <p className="text-neutral-300 max-w-3xl text-sm sm:text-base leading-relaxed">
          Suivez l'évolution de ComicCrafte Studio, les annonces de publications, les mises à jour techniques et la vie de notre communauté de lecteurs et d'auteurs.
        </p>

        {/* INVITATION COMMUNAUTAIRE SUR LA PAGE ACTUALITÉS (EXIGENCE DU BRIEF) */}
        <div className="rounded-2xl bg-[#151515] border border-neutral-800 p-5 mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Ne manquez aucune annonce officielle
            </h3>
            <p className="text-xs text-neutral-400">
              Retrouvez l'actualité en direct sur nos canaux communautaires vérifiés.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Telegram */}
            <a
              href={siteConfig.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0088cc] hover:bg-[#0077b5] text-white text-xs font-semibold transition-all shadow-sm flex-1 md:flex-initial"
            >
              <TelegramIcon className="w-4 h-4" />
              <span>Chaîne Telegram officielle</span>
              <ExternalLink className="w-3 h-3 ml-1 opacity-70" />
            </a>

            {/* WhatsApp */}
            {whatsappReady ? (
              <a
                href={siteConfig.whatsappChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20be5c] text-white text-xs font-semibold transition-all shadow-sm flex-1 md:flex-initial"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Chaîne WhatsApp</span>
                <ExternalLink className="w-3 h-3 ml-1 opacity-70" />
              </a>
            ) : (
              <button
                disabled
                title="Chaîne WhatsApp officielle : En attente de lancement"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800/80 border border-neutral-700/60 text-neutral-400 text-xs font-medium cursor-not-allowed opacity-80 flex-1 md:flex-initial"
              >
                <WhatsAppIcon className="w-4 h-4 text-neutral-500" />
                <span>WhatsApp (Bientôt disponible)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ARTICLE À LA UNE */}
      {featuredPost && selectedCategory === 'all' && searchQuery === '' && (
        <section aria-labelledby="featured-heading">
          <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-[#FF8A33]">
            <Pin className="w-3.5 h-3.5" />
            <span>À la une</span>
          </div>

          <div
            onClick={() => navigate(`/actualites/${featuredPost.slug}`)}
            className="group cursor-pointer rounded-3xl bg-[#151515] border border-neutral-800 hover:border-[#FF6A00]/50 overflow-hidden transition-all duration-300 shadow-xl grid grid-cols-1 lg:grid-cols-12"
          >
            <div className="lg:col-span-7 aspect-[16/9] lg:aspect-auto relative overflow-hidden bg-neutral-900">
              {featuredPost.cover_image && (
                <img
                  src={featuredPost.cover_image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 rounded-full bg-[#FF6A00] text-white text-xs font-bold uppercase tracking-wider shadow-md">
                  À la une
                </span>
                {featuredPost.is_important && (
                  <span className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-wider shadow-md">
                    Important
                  </span>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatFrenchDate(featuredPost.published_at)}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredPost.estimated_read_time} min de lecture
                  </span>
                </div>

                <h2
                  id="featured-heading"
                  className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#FF8A33] transition-colors leading-snug"
                >
                  {featuredPost.title}
                </h2>

                {featuredPost.subtitle && (
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {featuredPost.subtitle}
                  </p>
                )}
              </div>

              <div className="pt-6 border-t border-neutral-800/80 flex items-center justify-between text-xs text-[#FF8A33] font-semibold">
                <span>Lire l'annonce complète</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* BARRE DE RECHERCHE ET FILTRES */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Recherche */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par mot-clé, titre ou annonce..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#151515] border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF6A00] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
              >
                Effacer
              </button>
            )}
          </div>

          {/* Tri */}
          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'recent' | 'oldest')}
              className="px-3.5 py-2.5 rounded-xl bg-[#151515] border border-neutral-800 text-xs sm:text-sm text-neutral-300 focus:outline-none focus:border-[#FF6A00]"
            >
              <option value="recent">Plus récentes en premier</option>
              <option value="oldest">Plus anciennes en premier</option>
            </select>

            {(selectedCategory !== 'all' || searchQuery !== '') && (
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-neutral-800 text-xs text-neutral-300 hover:text-white transition-colors"
                title="Réinitialiser les filtres"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Réinitialiser</span>
              </button>
            )}
          </div>
        </div>

        {/* Pilules de catégories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[#FF6A00] text-white shadow-sm'
                : 'bg-[#151515] text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            Toutes les catégories ({posts.length})
          </button>
          {categories.map((cat) => {
            const count = posts.filter((p) => p.category_id === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-[#FF6A00] text-white shadow-sm'
                    : 'bg-[#151515] text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </section>

      {/* LISTE DES ACTUALITÉS */}
      <section>
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-8 h-8 rounded-full border-2 border-[#FF6A00] border-t-transparent animate-spin mx-auto" />
            <p className="text-xs text-neutral-400">Chargement des publications officielles...</p>
          </div>
        ) : sortedPosts.length === 0 ? (
          <div className="rounded-2xl bg-[#151515] border border-neutral-800 p-12 text-center max-w-lg mx-auto space-y-4">
            <AlertCircle className="w-10 h-10 text-neutral-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">Aucune actualité trouvée</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Aucune publication ne correspond à vos critères de recherche. Essayez un autre mot-clé ou réinitialisez les filtres.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-800 text-xs font-semibold text-white hover:bg-neutral-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Voir toutes les actualités</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => navigate(`/actualites/${post.slug}`)}
                className="group cursor-pointer rounded-2xl bg-[#151515] border border-neutral-800 overflow-hidden hover:border-[#FF6A00]/50 transition-all duration-300 flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="aspect-[16/9] w-full bg-neutral-900 relative overflow-hidden">
                    {post.cover_image ? (
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-600 bg-neutral-900">
                        ComicCrafte Studio
                      </div>
                    )}

                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {post.is_pinned && (
                        <span className="px-2 py-0.5 rounded bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider">
                          Épinglé
                        </span>
                      )}
                      {post.is_important && (
                        <span className="px-2 py-0.5 rounded bg-[#FF6A00] text-white text-[10px] font-bold uppercase tracking-wider">
                          Important
                        </span>
                      )}
                      {post.app_version && (
                        <span className="px-2 py-0.5 rounded bg-neutral-900/90 text-white text-[10px] font-mono border border-neutral-700">
                          v{post.app_version}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-neutral-400">
                      <span>{formatFrenchDate(post.published_at)}</span>
                      <span>{post.estimated_read_time} min</span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-[#FF8A33] transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>

                    {post.subtitle && (
                      <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                        {post.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between text-xs text-[#FF8A33] font-medium border-t border-neutral-800/40 mt-4">
                  <span>Consulter</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
