import React, { useEffect, useState } from 'react';
import { newsService, formatFrenchDate, DEFAULT_CATEGORIES } from '../services/newsService';
import { NewsPost } from '../services/types';
import { siteConfig } from '../config/siteConfig';
import { TelegramIcon } from '../components/CommunitySection';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  Copy, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  AlertCircle,
  ExternalLink,
  BookOpen
} from 'lucide-react';

interface NewsDetailPageProps {
  slug: string;
  navigate: (path: string) => void;
}

export const NewsDetailPage: React.FC<NewsDetailPageProps> = ({ slug, navigate }) => {
  const [post, setPost] = useState<NewsPost | null>(null);
  const [allPosts, setAllPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadPost() {
      setLoading(true);
      try {
        const [targetPost, published] = await Promise.all([
          newsService.getNewsBySlug(slug),
          newsService.getPublishedNews(),
        ]);
        setPost(targetPost);
        setAllPosts(published);
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-3">
        <div className="w-8 h-8 rounded-full border-2 border-[#FF6A00] border-t-transparent animate-spin mx-auto" />
        <p className="text-xs text-neutral-400">Chargement de la publication...</p>
      </div>
    );
  }

  if (!post || post.status !== 'published') {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-800 text-[#FF6A00] flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-white">Publication introuvable ou retirée</h1>
        <p className="text-sm text-neutral-400 leading-relaxed">
          Cet article n'existe pas, a été déplacé ou n'est plus accessible publiquement sur ComicCrafte Studio.
        </p>
        <button
          onClick={() => navigate('/actualites')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF6A00] hover:bg-[#e55f00] text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retourner aux actualités</span>
        </button>
      </div>
    );
  }

  // Articles précédent et suivant
  const currentIndex = allPosts.findIndex((p) => p.id === post.id);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex >= 0 && currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  // Catégorie
  const category = DEFAULT_CATEGORIES.find((c) => c.id === post.category_id);

  // Articles associés
  const relatedPosts = allPosts
    .filter((p) => p.id !== post.id && p.category_id === post.category_id)
    .slice(0, 2);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`;

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Bouton retour */}
      <div>
        <button
          onClick={() => navigate('/actualites')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour au centre des actualités</span>
        </button>
      </div>

      {/* En-tête de l'article */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {category && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FF6A00]/15 text-[#FF8A33] border border-[#FF6A00]/30">
              {category.name}
            </span>
          )}
          {post.app_version && (
            <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-neutral-800 text-neutral-300 border border-neutral-700">
              Version {post.app_version}
            </span>
          )}
          {post.is_important && (
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-600 text-white uppercase tracking-wider">
              Annonce Importante
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug">
          {post.title}
        </h1>

        {post.subtitle && (
          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
            {post.subtitle}
          </p>
        )}

        <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-400 border-t border-b border-neutral-800/80 py-3">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-neutral-500" />
              {post.author_name}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-neutral-500" />
              {formatFrenchDate(post.published_at)}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-neutral-500" />
              {post.estimated_read_time} min de lecture
            </span>
          </div>

          {/* Boutons de partage */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs transition-colors"
              title="Copier le lien"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Lien copié' : 'Partager'}</span>
            </button>

            <a
              href={telegramShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Partager cette annonce sur Telegram"
              className="p-1.5 rounded-lg bg-[#0088cc]/20 text-[#38a9e1] hover:bg-[#0088cc] hover:text-white transition-colors"
              title="Diffuser sur Telegram"
            >
              <TelegramIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Image de couverture principale */}
      {post.cover_image && (
        <div className="rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 aspect-[16/9] shadow-2xl">
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Contenu formaté de l'article */}
      <div className="prose prose-invert max-w-none text-neutral-200 leading-relaxed space-y-4 text-sm sm:text-base">
        {post.content.split('\n\n').map((paragraph, idx) => {
          if (paragraph.startsWith('### ')) {
            return (
              <h3 key={idx} className="text-xl font-bold text-white pt-4 pb-1 border-b border-neutral-800">
                {paragraph.replace('### ', '')}
              </h3>
            );
          }
          if (paragraph.startsWith('- ')) {
            return (
              <ul key={idx} className="list-disc list-inside space-y-1.5 text-neutral-300 pl-2">
                {paragraph.split('\n').map((line, lIdx) => (
                  <li key={lIdx}>{line.replace(/^- /, '')}</li>
                ))}
              </ul>
            );
          }
          return (
            <p key={idx} className="leading-relaxed">
              {paragraph}
            </p>
          );
        })}
      </div>

      {/* Liens complémentaires officiels */}
      {post.complementary_links && post.complementary_links.length > 0 && (
        <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-5 space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Ressources & Liens associés
          </h4>
          <div className="flex flex-wrap gap-3">
            {post.complementary_links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs text-[#FF8A33] font-medium transition-colors"
              >
                <span>{link.title}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Précédent / Suivant */}
      <div className="pt-8 border-t border-neutral-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prevPost ? (
          <button
            onClick={() => navigate(`/actualites/${prevPost.slug}`)}
            className="p-4 rounded-xl bg-[#151515] border border-neutral-800 hover:border-[#FF6A00]/40 transition-colors text-left flex items-start gap-3 group"
          >
            <ChevronLeft className="w-5 h-5 text-neutral-400 group-hover:text-[#FF8A33] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Article précédent</span>
              <span className="text-xs font-bold text-white group-hover:text-[#FF8A33] transition-colors line-clamp-1">
                {prevPost.title}
              </span>
            </div>
          </button>
        ) : <div />}

        {nextPost ? (
          <button
            onClick={() => navigate(`/actualites/${nextPost.slug}`)}
            className="p-4 rounded-xl bg-[#151515] border border-neutral-800 hover:border-[#FF6A00]/40 transition-colors text-right flex items-start justify-end gap-3 group"
          >
            <div className="space-y-1">
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Article suivant</span>
              <span className="text-xs font-bold text-white group-hover:text-[#FF8A33] transition-colors line-clamp-1">
                {nextPost.title}
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-neutral-400 group-hover:text-[#FF8A33] shrink-0 mt-0.5" />
          </button>
        ) : <div />}
      </div>
    </article>
  );
};
