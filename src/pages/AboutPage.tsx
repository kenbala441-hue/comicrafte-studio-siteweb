import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { CommunitySection } from '../components/CommunitySection';
import { Sparkles, Heart, Compass, ShieldCheck, BookOpen, PenTool, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
  return (
    <div className="space-y-16 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* En-tête */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6A00]/10 border border-[#FF6A00]/25 text-[#FF8A33] text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Manifeste Éditorial
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          À propos de ComicCrafte Studio
        </h1>
        <p className="text-lg text-[#FF8A33] font-medium">
          « {siteConfig.slogan} »
        </p>
        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
          ComicCrafte Studio est né d'une conviction simple : chaque histoire mérite d'être racontée et partagée dans un cadre respectueux des créateurs et agréable pour les lecteurs.
        </p>
      </div>

      {/* Les 3 piliers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-3xl bg-[#151515] border border-neutral-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FF6A00]/15 text-[#FF6A00] flex items-center justify-center font-bold">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Notre Vision</h2>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Démocratiser la diffusion littéraire et graphique numérique en offrant une plateforme moderne pour les romans en série, les mangas et les webtoons.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-[#151515] border border-neutral-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Respect des Créateurs</h2>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Les auteurs conservent l'intégralité de leurs droits de propriété intellectuelle. Aucune clause restrictive cachée : la liberté artistique reste souveraine.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-[#151515] border border-neutral-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/15 text-blue-400 flex items-center justify-center font-bold">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Communauté Passionnée</h2>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Un écosystème bienveillant où les retours constructifs et les encouragements permettent aux artistes de perfectionner leur art au fil des chapitres.
          </p>
        </div>
      </div>

      {/* SECTION COMMUNAUTAIRE SPÉCIFIQUE DANS LA PAGE À PROPOS (EXIGENCE 5 DU BRIEF) */}
      <div className="pt-8">
        <CommunitySection />
      </div>
    </div>
  );
};
