import React, { useState } from 'react';
import { Logo } from './Logo';
import { siteConfig, isWhatsAppConfigured } from '../config/siteConfig';
import { TelegramIcon, WhatsAppIcon } from './CommunitySection';
import { 
  Menu, 
  X, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  BookOpen, 
  Info, 
  Mail, 
  Sliders
} from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, navigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const whatsappReady = isWhatsAppConfigured();

  const navLinks = [
    { label: 'Accueil', path: '/', icon: BookOpen },
    { label: 'Actualités', path: '/actualites', icon: Sparkles },
    { label: 'Mises à jour', path: '/mises-a-jour', icon: Layers },
    { label: 'À propos', path: '/a-propos', icon: Info },
    { label: 'Contact', path: '/contact', icon: Mail },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-neutral-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo cliquable */}
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] rounded-xl text-left"
            aria-label="Retour à l'accueil de ComicCrafte Studio"
          >
            <Logo withSlogan={false} size="md" />
          </button>

          {/* Navigation Bureau */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[#FF8A33] bg-[#FF6A00]/10 border border-[#FF6A00]/20'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Actions rapides à droite */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Lien Telegram Officiel Navbar */}
            <a
              href={siteConfig.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Rejoindre la chaîne Telegram officielle de ComicCrafte Studio"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-[#0088cc] hover:bg-[#0077b5] transition-all shadow-sm"
            >
              <TelegramIcon className="w-4 h-4" />
              <span>Telegram</span>
            </a>

            {/* Accès rapide Admin */}
            <button
              onClick={() => handleNavClick('/admin/actualites')}
              title="Espace Édition / Administration"
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800 transition-colors"
              aria-label="Administration des actualités"
            >
              <Sliders className="w-4 h-4" />
            </button>
          </div>

          {/* Bouton menu mobile */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href={siteConfig.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram ComicCrafte Studio"
              className="p-2 rounded-xl text-[#38a9e1] bg-[#0088cc]/20 border border-[#0088cc]/30"
            >
              <TelegramIcon className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800"
              aria-expanded={mobileMenuOpen}
              aria-label="Ouvrir le menu de navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile déroulant optimisé pour Android & smartphone */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#151515] border-b border-neutral-800 px-4 pt-3 pb-6 animate-fadeIn">
          <nav className="flex flex-col gap-1 mb-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-colors text-left ${
                    isActive
                      ? 'text-[#FF8A33] bg-[#FF6A00]/10 border border-[#FF6A00]/25'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-800/80'
                  }`}
                >
                  <Icon className="w-4 h-4 text-neutral-400" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Liens de communauté mobile */}
          <div className="pt-3 border-t border-neutral-800 flex flex-col gap-2">
            <a
              href={siteConfig.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#0088cc] text-white text-xs font-semibold"
            >
              <div className="flex items-center gap-2">
                <TelegramIcon className="w-4 h-4" />
                <span>Chaîne Telegram officielle</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {whatsappReady ? (
              <a
                href={siteConfig.whatsappChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-semibold"
              >
                <div className="flex items-center gap-2">
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Chaîne WhatsApp officielle</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-neutral-800/60 text-neutral-400 text-xs border border-neutral-700/60">
                <div className="flex items-center gap-2">
                  <WhatsAppIcon className="w-4 h-4 text-neutral-500" />
                  <span>Chaîne WhatsApp (Bientôt disponible)</span>
                </div>
                <span className="text-[10px] text-amber-400 font-medium">En attente</span>
              </div>
            )}

            <button
              onClick={() => handleNavClick('/admin/actualites')}
              className="mt-2 text-xs text-neutral-400 hover:text-white py-2 text-center"
            >
              Panneau d’administration des publications
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
