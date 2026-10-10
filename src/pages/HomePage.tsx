import React, { useEffect, useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { CommunitySection, TelegramIcon } from '../components/CommunitySection';
import { newsService } from '../services/newsService';
import { NewsPost } from '../services/types';
import { formatFrenchDate } from '../services/newsService';
import { 
  BookOpen, 
  PenTool, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Smartphone, 
  Eye, 
  Bookmark, 
  Heart, 
  ChevronRight, 
  Send, 
  Layers, 
  CheckCircle2, 
  Users
} from 'lucide-react';

interface HomePageProps {
  navigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const [latestNews, setLatestNews] = useState<NewsPost[]>([]);

  useEffect(() => {
    newsService.getPublishedNews().then((posts) => {
      setLatestNews(posts.slice(0, 3));
    });
  }, []);

  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      {/* HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 pb-12 overflow-hidden">
        {/* Glow background effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 sm:w-[600px] sm:h-[600px] bg-[#FF6A00]/15 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs sm:text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-[#FF6A00] animate-pulse"></span>
            Plateforme Officielle de Récits & Webcomics
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
            ComicCrafte Studio —{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A00] via-[#FF8A33] to-[#FFB066]">
              Là où les histoires prennent vie.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Découvrez des histoires originales, lisez des webtoons et des romans, développez votre créativité et partagez vos propres univers avec une communauté de lecteurs et d'auteurs.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={siteConfig.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[#FF6A00] to-[#FF8A33] hover:from-[#e55f00] hover:to-[#e67b2d] shadow-lg shadow-[#FF6A00]/25 transition-all"
            >
              <TelegramIcon className="w-5 h-5" />
              <span>Découvrir la communauté</span>
            </a>

            <button
              onClick={() => navigate('/contact')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-neutral-200 bg-[#151515] hover:bg-neutral-800 border border-neutral-700/80 transition-all"
            >
              <span>Nous contacter</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/actualites')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-medium text-neutral-400 hover:text-white transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#FF8A33]" />
              <span>Actualités du studio</span>
            </button>
          </div>

          {/* Badges de confiance */}
          <div className="mt-12 pt-8 border-t border-neutral-800/60 max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Propriété intellectuelle des auteurs garantie</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Accès public sans inscription forcée</span>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-[#FF8A33]" />
              <span>Optimisé Web & Android</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION COMMUNAUTÉ OFFICIELLE (EXIGENCE CENTRALE) */}
      <CommunitySection />

      {/* SECTION 1 : POUR LES LECTEURS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#151515] border border-neutral-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6A00]/10 border border-[#FF6A00]/25 text-[#FF8A33] text-xs font-semibold uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                Espace Lecteurs
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Une expérience de lecture pensée pour l'immersion
              </h2>
              <p className="text-neutral-300 leading-relaxed">
                Plongez dans des récits palpitants, du fantastique à la romance, du thriller à la science-fiction. Profitez d'une liseuse ergonomique conçue pour limiter la fatigue oculaire.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                  <Bookmark className="w-5 h-5 text-[#FF6A00] mb-2" />
                  <h3 className="text-sm font-bold text-white mb-1">Reprise automatique</h3>
                  <p className="text-xs text-neutral-400">Votre progression de lecture reste mémorisée sur votre appareil.</p>
                </div>
                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                  <Smartphone className="w-5 h-5 text-[#FF6A00] mb-2" />
                  <h3 className="text-sm font-bold text-white mb-1">Lecture verticale fluide</h3>
                  <p className="text-xs text-neutral-400">Idéal pour les webtoons et les romans au format mobile.</p>
                </div>
                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                  <Heart className="w-5 h-5 text-[#FF6A00] mb-2" />
                  <h3 className="text-sm font-bold text-white mb-1">Bibliothèque de favoris</h3>
                  <p className="text-xs text-neutral-400">Gardez vos sagas préférées à portée de main en un clic.</p>
                </div>
                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                  <Eye className="w-5 h-5 text-[#FF6A00] mb-2" />
                  <h3 className="text-sm font-bold text-white mb-1">Mode sombre natif</h3>
                  <p className="text-xs text-neutral-400">Design conçu pour les sessions de lecture nocturnes prolongées.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl bg-neutral-900/90 border border-neutral-700 p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <span className="text-xs font-semibold text-neutral-400">Exemple d'œuvre originale</span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">En cours</span>
                </div>
                <div className="aspect-video w-full rounded-xl overflow-hidden bg-neutral-800 relative">
                  <img
                    src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"
                    alt="Aperçu de lecture ComicCrafte"
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                    <div>
                      <h4 className="text-base font-bold text-white">Chroniques d'Aethelgard</h4>
                      <p className="text-xs text-neutral-300">Roman Fantasy Original • Par un auteur de la communauté</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-neutral-400 pt-1">
                  <span>Chapitres réguliers</span>
                  <span>Disponible sur Web & Android</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 : POUR LES AUTEURS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#151515] border border-neutral-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="rounded-2xl bg-neutral-900 border border-neutral-700/80 p-6 shadow-xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FF6A00]/20 text-[#FF6A00] flex items-center justify-center font-bold">
                    ©
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Vos droits restent les vôtres</h3>
                    <p className="text-xs text-neutral-400">Aucune cession abusive de propriété intellectuelle</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/50 border border-neutral-800 text-xs text-neutral-300 space-y-2 leading-relaxed">
                  <p>
                    « ComicCrafte Studio applique une politique stricte : publier votre récit sur notre plateforme ne transfère aucun droit de propriété intellectuelle. Vous restez seul maître de votre univers. »
                  </p>
                  <p className="text-[#FF8A33] font-semibold">
                    Extrait officiel des Conditions d’utilisation (Art. 4).
                  </p>
                </div>

                <div className="space-y-2 text-xs text-neutral-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Protection renforcée contre le plagiat et les copies non autorisées</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Signalement direct en cas d'atteinte à vos créations</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6A00]/10 border border-[#FF6A00]/25 text-[#FF8A33] text-xs font-semibold uppercase tracking-wider">
                <PenTool className="w-3.5 h-3.5" />
                Espace Auteurs & Créateurs
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Partagez votre créativité avec un lectorat passionné
              </h2>
              <p className="text-neutral-300 leading-relaxed">
                Que vous soyez écrivain de romans, scénariste ou illustrateur de webtoons, ComicCrafte Studio vous offre une vitrine claire pour faire grandir votre communauté sans intermédiaires opaques.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => navigate('/terms')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold border border-neutral-700"
                >
                  <span>Lire la charte auteur & propriété</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-transparent hover:bg-neutral-800 text-neutral-300 text-xs font-semibold border border-neutral-800"
                >
                  <span>Proposer un projet au studio</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 : FONCTIONNALITÉS RÉELLEMENT DISPONIBLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Fonctionnalités disponibles sur la plateforme
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base">
            ComicCrafte Studio privilégie la transparence : voici les services réellement opérationnels et déployés.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#151515] border border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF6A00]/15 text-[#FF6A00] flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Lecteur Web & Mobile</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Interface responsive adaptée aux ordinateurs, tablettes et smartphones Android, avec rendu optimisé des textes et vignettes.
            </p>
            <span className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
              Disponible
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-[#151515] border border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#0088cc]/20 text-[#38a9e1] flex items-center justify-center font-bold">
              <TelegramIcon className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Chaîne Telegram Officielle</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Diffusion immédiate de toutes les annonces officielles, nouveautés et alertes de publication via notre chaîne publique vérifiée.
            </p>
            <span className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
              Actif & Vérifié
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-[#151515] border border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Conformité & Droits</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Pages juridiques complètes, procédure de suppression de compte, formulaire de signalement et respect strict des données.
            </p>
            <span className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
              Conforme RGPD
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 4 : DERNIÈRES ACTUALITÉS DU STUDIO */}
      {latestNews.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FF8A33] mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Actualités & Nouveautés
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Dernières annonces officielles
              </h2>
            </div>
            <button
              onClick={() => navigate('/actualites')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF8A33] hover:text-[#FF6A00] transition-colors"
            >
              <span>Consulter toutes les actualités</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestNews.map((post) => (
              <div
                key={post.id}
                onClick={() => navigate(`/actualites/${post.slug}`)}
                className="group cursor-pointer rounded-2xl bg-[#151515] border border-neutral-800 overflow-hidden hover:border-[#FF6A00]/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/9] w-full overflow-hidden bg-neutral-900 relative">
                    {post.cover_image && (
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    )}
                    {post.is_important && (
                      <span className="absolute top-3 left-3 px-2 py-1 rounded bg-[#FF6A00] text-white text-[10px] font-extrabold uppercase tracking-wide">
                        Important
                      </span>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="text-[11px] text-neutral-400 mb-2">
                      {formatFrenchDate(post.published_at)}
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-[#FF8A33] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    {post.subtitle && (
                      <p className="mt-2 text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                        {post.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between text-xs text-[#FF8A33] font-medium">
                  <span>Lire l'article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
