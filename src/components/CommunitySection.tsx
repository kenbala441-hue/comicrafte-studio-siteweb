import React from 'react';
import { siteConfig, isWhatsAppConfigured } from '../config/siteConfig';
import { ExternalLink, CheckCircle2, ShieldAlert, Sparkles, MessageCircle, Send } from 'lucide-react';

interface CommunitySectionProps {
  variant?: 'full' | 'compact';
  className?: string;
  showOfficialNotice?: boolean;
}

export const TelegramIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.37.74-.56 2.92-1.27 4.86-2.11 5.83-2.52 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .33z" />
  </svg>
);

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 012.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.44 0-2.85-.38-4.09-1.11l-.29-.17-3.05.8 0.81-2.97-.19-.3A8.2 8.2 0 013.8 11.9c0-4.54 3.7-8.23 8.25-8.23m4.52 11.66c-.25-.13-1.47-.72-1.7-.8-.23-.09-.39-.13-.56.12-.17.25-.65.81-.8 1-.15.19-.3.21-.55.09-.25-.13-1.07-.39-2.03-1.25-.75-.67-1.26-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.44 1.03 2.61c.13.17 1.77 2.7 4.29 3.78.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.17-.48-.29z" />
  </svg>
);

export const CommunitySection: React.FC<CommunitySectionProps> = ({
  variant = 'full',
  className = '',
  showOfficialNotice = true,
}) => {
  const whatsappReady = isWhatsAppConfigured();

  return (
    <section className={`w-full ${className}`} aria-labelledby="community-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6A00]/10 border border-[#FF6A00]/25 text-[#FF8A33] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Espace Communautaire Officiel
          </div>
          <h2
            id="community-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight"
          >
            Rejoignez notre communauté
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed">
            Rejoignez la communauté ComicCrafte Studio pour découvrir nos nouveautés, suivre les mises à jour, retrouver nos annonces officielles et rester informé des projets en préparation.
          </p>
          <p className="mt-2 text-sm font-semibold text-[#FF8A33] tracking-wide">
            COMICCRAFTE STUDIO — Là où les histoires prennent vie.
          </p>
        </div>

        {/* Grille des 2 cartes Telegram & WhatsApp */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {/* CARTE TELEGRAM OFFICIELLE */}
          <div className="relative group rounded-2xl bg-[#151515] border border-neutral-800 p-6 sm:p-8 hover:border-[#FF6A00]/50 transition-all duration-300 shadow-xl shadow-black/40 flex flex-col justify-between">
            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0088cc]/15 text-[#38a9e1] text-xs font-medium border border-[#0088cc]/30">
              <span className="w-2 h-2 rounded-full bg-[#38a9e1] animate-pulse"></span>
              Officiel & Actif
            </div>

            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#0088cc]/15 text-[#38a9e1] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 border border-[#0088cc]/20">
                <TelegramIcon className="w-8 h-8" />
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#FF8A33] transition-colors">
                Rejoindre Telegram
              </h3>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6">
                Retrouvez les annonces officielles, les nouveautés et les actualités de ComicCrafte Studio.
              </p>

              <div className="space-y-2 mb-6 text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Annonces prioritaires et alertes de nouveaux chapitres</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Accès libre et public sans obligation d’inscription</span>
                </div>
              </div>
            </div>

            <div>
              <a
                href={siteConfig.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Rejoindre la chaîne officielle Telegram de ComicCrafte Studio"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[#FF6A00] to-[#FF8A33] hover:from-[#e55f00] hover:to-[#e67b2d] active:scale-[0.99] transition-all duration-200 shadow-lg shadow-[#FF6A00]/20"
              >
                <span>Rejoindre la chaîne</span>
                <Send className="w-4 h-4 ml-1" />
              </a>
              <p className="mt-2 text-center text-[11px] text-neutral-400 truncate">
                Lien : {siteConfig.telegramUrl}
              </p>
            </div>
          </div>

          {/* CARTE WHATSAPP OFFICIELLE (CONFIGURABLE ET DÉSACTIVÉE PROPREMENT SI NON PRÉSENTE) */}
          <div className="relative group rounded-2xl bg-[#151515] border border-neutral-800 p-6 sm:p-8 hover:border-neutral-700 transition-all duration-300 shadow-xl shadow-black/40 flex flex-col justify-between">
            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border bg-amber-500/10 text-amber-400 border-amber-500/25">
              {whatsappReady ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Officiel & Actif
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  En préparation
                </>
              )}
            </div>

            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center mb-6 border border-[#25D366]/20">
                <WhatsAppIcon className="w-8 h-8" />
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                Suivre notre chaîne WhatsApp
              </h3>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6">
                Restez informé des nouveautés, des publications et des annonces du studio.
              </p>

              <div className="space-y-2 mb-6 text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                  <span>Fil de diffusion officiel direct sur WhatsApp</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                  <span>Numéro de téléphone masqué et respect de votre vie privée</span>
                </div>
              </div>
            </div>

            <div>
              {whatsappReady ? (
                <a
                  href={siteConfig.whatsappChannelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Suivre la chaîne officielle WhatsApp de ComicCrafte Studio"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-[#25D366] hover:bg-[#20be5c] transition-all duration-200 shadow-lg shadow-[#25D366]/20"
                >
                  <span>Suivre la chaîne</span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              ) : (
                <div>
                  <button
                    disabled
                    aria-disabled="true"
                    aria-label="Chaîne WhatsApp officielle en cours de configuration"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-neutral-400 bg-neutral-800/80 border border-neutral-700/80 cursor-not-allowed opacity-85 select-none"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Lancement prochain (Lien en attente)</span>
                  </button>
                  <p className="mt-2 text-center text-[11px] text-amber-400/90">
                    La chaîne officielle sera reliée ici dès son ouverture. Aucun lien non vérifié n’est utilisé.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Note de transparence sur les abonnements */}
        {showOfficialNotice && (
          <div className="mt-8 max-w-3xl mx-auto rounded-xl bg-neutral-900/60 border border-neutral-800 p-4 text-xs text-neutral-400 text-center flex flex-col sm:flex-row items-center justify-center gap-2">
            <span className="font-semibold text-neutral-300">Transparence & Éthique :</span>
            <span>
              L’accès à nos œuvres et pages publiques est 100% libre. L’abonnement aux chaînes s’effectue sur les plateformes respectives et n’est jamais obligatoire.
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
