import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { TelegramIcon } from '../components/CommunitySection';
import { ArrowLeft, Home, Sparkles, HelpCircle } from 'lucide-react';

export const NotFoundPage: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-[#FF6A00]/15 text-[#FF6A00] border border-[#FF6A00]/30 font-black text-3xl">
          404
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Page introuvable</h1>
          <p className="text-sm text-neutral-400 leading-relaxed">
            L'adresse demandée n'existe pas ou a été déplacée. Vous pouvez retourner à l'accueil ou consulter les actualités de ComicCrafte Studio.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6A00] to-[#FF8A33] text-white text-xs font-semibold"
          >
            <Home className="w-4 h-4" />
            <span>Retour à l'accueil</span>
          </button>
          <button
            onClick={() => navigate('/actualites')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-800 text-neutral-200 hover:text-white text-xs font-semibold border border-neutral-700"
          >
            <Sparkles className="w-4 h-4 text-[#FF8A33]" />
            <span>Actualités</span>
          </button>
        </div>

        <div className="pt-6 border-t border-neutral-800 text-xs text-neutral-400">
          <span>Besoin d'assistance ? </span>
          <a href={`mailto:${siteConfig.contactEmail}`} className="text-[#FF8A33] hover:underline">
            {siteConfig.contactEmail}
          </a>
        </div>
      </div>
    </div>
  );
};
