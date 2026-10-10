import React from 'react';
import { siteConfig, isWhatsAppConfigured } from '../config/siteConfig';
import { TelegramIcon, WhatsAppIcon } from './CommunitySection';
import { CheckCircle2, X, Bell, ExternalLink } from 'lucide-react';

interface ActionConfirmationBannerProps {
  title?: string;
  message?: string;
  onClose: () => void;
}

export const ActionConfirmationBanner: React.FC<ActionConfirmationBannerProps> = ({
  title = 'Action confirmée avec succès !',
  message = 'Votre demande a bien été prise en compte par l’équipe de ComicCrafte Studio.',
  onClose,
}) => {
  const whatsappReady = isWhatsAppConfigured();

  return (
    <div
      role="alert"
      className="rounded-2xl bg-[#151515] border border-[#FF6A00]/40 p-5 sm:p-6 shadow-2xl shadow-black/80 my-6 animate-fadeIn relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#FF6A00] to-[#FF8A33]" />

      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
        aria-label="Fermer la confirmation"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="flex flex-col sm:flex-row items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
          <CheckCircle2 className="w-6 h-6" />
        </div>

        <div className="space-y-2 max-w-2xl">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>{title}</span>
          </h3>
          <p className="text-sm text-neutral-300 leading-relaxed">{message}</p>

          {/* Invitation communautaire discrète et non intrusive */}
          <div className="pt-3 mt-3 border-t border-neutral-800/80">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#FF8A33] mb-2">
              <Bell className="w-3.5 h-3.5" />
              <span>Pour rester informé des nouveautés et annonces officielles :</span>
            </div>
            <p className="text-xs text-neutral-400 mb-3">
              Vous êtes libre de rejoindre notre canal Telegram officiel sans aucune obligation.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={siteConfig.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#0088cc] hover:bg-[#0077b5] text-white text-xs font-medium transition-all"
              >
                <TelegramIcon className="w-3.5 h-3.5" />
                <span>Chaîne Telegram officielle</span>
                <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
              </a>

              {whatsappReady ? (
                <a
                  href={siteConfig.whatsappChannelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#25D366] hover:bg-[#20be5c] text-white text-xs font-medium transition-all"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span>Chaîne WhatsApp</span>
                  <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
                </a>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-neutral-800/70 border border-neutral-700/60 text-neutral-400 text-xs">
                  <WhatsAppIcon className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Chaîne WhatsApp bientôt disponible</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
