import React from 'react';
import { Logo } from './Logo';
import { siteConfig, isWhatsAppConfigured } from '../config/siteConfig';
import { TelegramIcon, WhatsAppIcon } from './CommunitySection';
import { Mail, Shield, BookCheck, HelpCircle, AlertTriangle, Activity, Key } from 'lucide-react';

interface FooterProps {
  navigate: (path: string) => void;
  onOpenOAuthGuide?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate, onOpenOAuthGuide }) => {
  const whatsappReady = isWhatsAppConfigured();

  const handleNav = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0e0e0e] border-t border-neutral-800 text-neutral-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Colonne 1 : Marque & Présentation */}
          <div className="lg:col-span-2 space-y-4">
            <Logo withSlogan={true} size="md" />
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              ComicCrafte Studio est la plateforme officielle dédiée à la lecture, à l'écriture et au partage d'histoires, de romans, mangas et webtoons originaux.
            </p>

            {/* Communautés officielles (Icônes cliquables) */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block mb-3">
                Canaux communautaires officiels
              </span>
              <div className="flex items-center gap-3">
                {/* Icône Telegram */}
                <a
                  href={siteConfig.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chaîne Telegram officielle de ComicCrafte Studio"
                  className="w-10 h-10 rounded-xl bg-[#0088cc]/20 border border-[#0088cc]/30 text-[#38a9e1] hover:bg-[#0088cc] hover:text-white flex items-center justify-center transition-all duration-200"
                  title="Chaîne Telegram officielle (Actif)"
                >
                  <TelegramIcon className="w-5 h-5" />
                </a>

                {/* Icône WhatsApp */}
                {whatsappReady ? (
                  <a
                    href={siteConfig.whatsappChannelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chaîne WhatsApp officielle de ComicCrafte Studio"
                    className="w-10 h-10 rounded-xl bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-all duration-200"
                    title="Chaîne WhatsApp officielle"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                  </a>
                ) : (
                  <button
                    disabled
                    aria-label="Chaîne WhatsApp officielle (En attente d'ouverture)"
                    title="Chaîne WhatsApp officielle : En préparation (Non encore publiée)"
                    className="w-10 h-10 rounded-xl bg-neutral-800/80 border border-neutral-700/60 text-neutral-500 cursor-not-allowed flex items-center justify-center relative group"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                    <span className="sr-only">WhatsApp en préparation</span>
                  </button>
                )}

                {/* Contact Email direct */}
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  aria-label={`Envoyer un email à ${siteConfig.contactEmail}`}
                  className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-[#FF8A33] hover:border-[#FF6A00]/40 flex items-center justify-center transition-all duration-200"
                  title="Contact direct par e-mail"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
              {!whatsappReady && (
                <p className="text-[11px] text-neutral-400 mt-2">
                  * Canal Telegram actif. Le canal WhatsApp officiel sera relié dès son lancement public.
                </p>
              )}
            </div>
          </div>

          {/* Colonne 2 : Plateforme & Contenus */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Découverte
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNav('/')}
                  className="hover:text-[#FF8A33] transition-colors text-left"
                >
                  Accueil officiel
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/actualites')}
                  className="hover:text-[#FF8A33] transition-colors text-left"
                >
                  Actualités & Nouveautés
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/mises-a-jour')}
                  className="hover:text-[#FF8A33] transition-colors text-left"
                >
                  Journal des versions
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/a-propos')}
                  className="hover:text-[#FF8A33] transition-colors text-left"
                >
                  À propos du Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/statut')}
                  className="hover:text-[#FF8A33] transition-colors flex items-center gap-1.5"
                >
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  <span>État des services</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Juridique & Conformité */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Cadre Juridique
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNav('/privacy')}
                  className="hover:text-[#FF8A33] transition-colors flex items-center gap-1.5 text-left"
                >
                  <Shield className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Politique de confidentialité</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/terms')}
                  className="hover:text-[#FF8A33] transition-colors flex items-center gap-1.5 text-left"
                >
                  <BookCheck className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Conditions d'utilisation</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/delete-account')}
                  className="hover:text-[#FF8A33] transition-colors text-left text-neutral-400 hover:text-amber-400"
                >
                  Suppression de compte
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/terms#propriete-intellectuelle')}
                  className="hover:text-[#FF8A33] transition-colors text-left"
                >
                  Droits d'auteur & Auteurs
                </button>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Assistance & Outils */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Assistance & Sécurité
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNav('/contact')}
                  className="hover:text-[#FF8A33] transition-colors text-left"
                >
                  Nous contacter
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/aide')}
                  className="hover:text-[#FF8A33] transition-colors flex items-center gap-1.5 text-left"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Centre d'aide & FAQ</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/signaler')}
                  className="hover:text-[#FF8A33] transition-colors flex items-center gap-1.5 text-left text-amber-400/90 hover:text-amber-300"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Signaler un contenu</span>
                </button>
              </li>
              {onOpenOAuthGuide && (
                <li>
                  <button
                    onClick={onOpenOAuthGuide}
                    className="hover:text-blue-400 transition-colors flex items-center gap-1.5 text-left text-xs text-neutral-400"
                  >
                    <Key className="w-3 h-3 text-blue-400" />
                    <span>Configuration Google OAuth</span>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Ligne inférieure : Copyright & Mentions */}
        <div className="pt-10 mt-10 border-t border-neutral-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div>
            © {new Date().getFullYear()} <strong className="text-white">ComicCrafte Studio</strong>. Tous droits réservés. Les auteurs restent propriétaires exclusifs de leurs créations.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-neutral-400">Contact officiel : {siteConfig.contactEmail}</span>
            <span className="text-neutral-500">•</span>
            <button
              onClick={() => handleNav('/admin/actualites')}
              className="text-neutral-400 hover:text-white underline decoration-dotted"
            >
              Console d'administration
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
