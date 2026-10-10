/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { NewsPage } from './pages/NewsPage';
import { NewsDetailPage } from './pages/NewsDetailPage';
import { ChangelogPage } from './pages/ChangelogPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { DeleteAccountPage } from './pages/DeleteAccountPage';
import { HelpCenterPage } from './pages/HelpCenterPage';
import { ReportPage } from './pages/ReportPage';
import { StatusPage } from './pages/StatusPage';
import { AdminNewsPage } from './pages/AdminNewsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { OAuthGuideModal } from './components/OAuthGuideModal';
import { siteConfig } from './config/siteConfig';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return typeof window !== 'undefined' ? window.location.pathname : '/';
  });
  const [isOAuthGuideOpen, setIsOAuthGuideOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Synchronisation dynamique du titre du document pour un référencement optimal
  useEffect(() => {
    let title = `${siteConfig.studioName} — ${siteConfig.slogan}`;
    if (currentPath === '/actualites') {
      title = `Actualités & Annonces Officielles — ${siteConfig.studioName}`;
    } else if (currentPath.startsWith('/actualites/')) {
      title = `Actualité du Studio — ${siteConfig.studioName}`;
    } else if (currentPath === '/mises-a-jour') {
      title = `Journal des Mises à Jour & Versions — ${siteConfig.studioName}`;
    } else if (currentPath === '/a-propos') {
      title = `À Propos du Studio & Communauté — ${siteConfig.studioName}`;
    } else if (currentPath === '/contact') {
      title = `Contact Officiel & Assistance — ${siteConfig.studioName}`;
    } else if (currentPath === '/privacy') {
      title = `Politique de Confidentialité — ${siteConfig.studioName}`;
    } else if (currentPath === '/terms') {
      title = `Conditions d'Utilisation & Droits d'Auteur — ${siteConfig.studioName}`;
    } else if (currentPath === '/delete-account') {
      title = `Suppression de Compte — ${siteConfig.studioName}`;
    } else if (currentPath === '/aide' || currentPath === '/faq') {
      title = `Centre d'Aide & FAQ — ${siteConfig.studioName}`;
    } else if (currentPath === '/signaler') {
      title = `Signaler un Contenu — ${siteConfig.studioName}`;
    } else if (currentPath === '/statut') {
      title = `Disponibilité & État des Services — ${siteConfig.studioName}`;
    } else if (currentPath === '/admin/actualites') {
      title = `Console d'Administration — ${siteConfig.studioName}`;
    }
    document.title = title;
  }, [currentPath]);

  // Routeur déclaratif
  const renderPage = () => {
    // Route dynamique pour les articles individuels
    if (currentPath.startsWith('/actualites/')) {
      const slug = currentPath.replace('/actualites/', '').split('/')[0];
      if (slug) {
        return <NewsDetailPage slug={slug} navigate={navigate} />;
      }
    }

    switch (currentPath) {
      case '/':
        return <HomePage navigate={navigate} />;
      case '/actualites':
        return <NewsPage navigate={navigate} />;
      case '/mises-a-jour':
        return <ChangelogPage />;
      case '/a-propos':
        return <AboutPage navigate={navigate} />;
      case '/contact':
        return <ContactPage navigate={navigate} />;
      case '/privacy':
        return <PrivacyPolicyPage navigate={navigate} />;
      case '/terms':
        return <TermsPage navigate={navigate} />;
      case '/delete-account':
        return <DeleteAccountPage navigate={navigate} />;
      case '/aide':
      case '/faq':
        return <HelpCenterPage navigate={navigate} />;
      case '/signaler':
        return <ReportPage navigate={navigate} />;
      case '/statut':
        return <StatusPage />;
      case '/admin/actualites':
        return <AdminNewsPage navigate={navigate} />;
      default:
        return <NotFoundPage navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col font-sans selection:bg-[#FF6A00] selection:text-white">
      {/* Barre de navigation responsive */}
      <Navbar currentPath={currentPath} navigate={navigate} />

      {/* Contenu principal de la page courante */}
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Pied de page officiel avec liens communautaires et juridiques */}
      <Footer 
        navigate={navigate} 
        onOpenOAuthGuide={() => setIsOAuthGuideOpen(true)} 
      />

      {/* Modal d'instructions pour la configuration Google Cloud & OAuth */}
      <OAuthGuideModal
        isOpen={isOAuthGuideOpen}
        onClose={() => setIsOAuthGuideOpen(false)}
      />
    </div>
  );
}
