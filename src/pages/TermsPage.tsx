import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { BookCheck, ShieldAlert, ArrowUp, ChevronRight, FileText, Scale } from 'lucide-react';

export const TermsPage: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
  const [activeSection, setActiveSection] = useState<string>('term-1');

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const sections = [
    { id: 'term-1', title: '1. Objet et acceptation des conditions' },
    { id: 'term-2', title: '2. Respect entre les membres & Convivialité' },
    { id: 'term-3', title: '3. Contenus interdits & Modération' },
    { id: 'term-4', title: '4. Propriété intellectuelle & Droits des auteurs' },
    { id: 'term-5', title: '5. Lutte contre le plagiat et contrefaçon' },
    { id: 'term-6', title: '6. Spam, automatisation et publicité non autorisée' },
    { id: 'term-7', title: '7. Authenticité et sécurité des comptes' },
    { id: 'term-8', title: '8. Protection des mineurs et classification' },
    { id: 'term-9', title: '9. Commentaires, avis et interactions' },
    { id: 'term-10', title: '10. Utilisation loyale des ressources' },
    { id: 'term-11', title: '11. Comic Points, monétisation et transactions' },
    { id: 'term-12', title: '12. Signalement des abus et procédure' },
    { id: 'term-13', title: '13. Sanctions, suspension et droit au réexamen' },
    { id: 'term-14', title: '14. Responsabilité des utilisateurs et du Studio' },
    { id: 'term-15', title: '15. Modifications des conditions' },
    { id: 'term-16', title: '16. Droit applicable et juridiction' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* En-tête */}
      <div className="space-y-4 border-b border-neutral-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6A00]/10 border border-[#FF6A00]/25 text-[#FF8A33] text-xs font-semibold uppercase tracking-wider">
          <BookCheck className="w-3.5 h-3.5" />
          Règlement Officiel & Conditions Générales
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Conditions d'Utilisation & Règles Communautaires
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400">
          <span>Dernière mise à jour : <strong>10 octobre 2026</strong></span>
          <span>•</span>
          <span>Plateforme : <strong>ComicCrafte Studio</strong></span>
          <span>•</span>
          <span>Accès : <strong>Public et sans restriction</strong></span>
        </div>
        <p className="text-sm text-neutral-300 max-w-3xl leading-relaxed">
          Bienvenue sur ComicCrafte Studio. Les présentes conditions définissent les règles d'utilisation de notre plateforme et les engagements mutuels entre les lecteurs, les auteurs et le studio, avec une attention rigoureuse accordée à la protection des droits de propriété intellectuelle des créateurs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Table des matières */}
        <nav
          aria-label="Table des matières des conditions d'utilisation"
          className="lg:col-span-4 sticky top-24 bg-[#151515] border border-neutral-800 rounded-2xl p-4 sm:p-5 max-h-[80vh] overflow-y-auto space-y-2 text-xs"
        >
          <div className="font-bold text-white text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#FF6A00]" />
            <span>Table des matières</span>
          </div>
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between text-xs ${
                activeSection === s.id
                  ? 'bg-[#FF6A00]/15 text-[#FF8A33] font-semibold border border-[#FF6A00]/30'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <span className="truncate">{s.title}</span>
              <ChevronRight className="w-3 h-3 shrink-0 ml-1 opacity-50" />
            </button>
          ))}
        </nav>

        {/* Contenu */}
        <div className="lg:col-span-8 bg-[#151515] border border-neutral-800 rounded-3xl p-6 sm:p-10 space-y-10 text-sm text-neutral-300 leading-relaxed">
          
          <section id="term-1" className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">
              1. Objet et acceptation des conditions
            </h2>
            <p>
              L'accès et la navigation sur les services de <strong>ComicCrafte Studio</strong> impliquent l'adhésion pleine et entière aux présentes Conditions Générales d'Utilisation. Si vous êtes en désaccord avec l'une de ces clauses, nous vous invitons à ne pas utiliser la plateforme.
            </p>
          </section>

          <section id="term-2" className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">
              2. Respect entre les membres & Convivialité
            </h2>
            <p>
              ComicCrafte Studio est un lieu de découverte littéraire et artistique. Tout utilisateur s'engage à faire preuve de courtoisie et de respect mutuel. Les comportements haineux, les insultes, le harcèlement, les menaces ou la discrimination sous toutes leurs formes sont rigoureusement proscrits.
            </p>
          </section>

          <section id="term-3" className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">
              3. Contenus interdits & Modération
            </h2>
            <p>Sont formellement interdits à la publication :</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>Les contenus pédopornographiques, violents ou faisant l'apologie de crimes contre l'humanité.</li>
              <li>Les propos incitant à la haine raciale, religieuse ou sexiste.</li>
              <li>La divulgation d'informations personnelles de tiers (doxxing).</li>
              <li>Les contenus portant atteinte à l'ordre public ou aux lois en vigueur.</li>
            </ul>
          </section>

          {/* SECTION CRUCIALE DE PROPRIÉTÉ INTELLECTUELLE */}
          <section id="term-4" className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#FF6A00]/10 border border-[#FF6A00]/30">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Scale className="w-5 h-5 text-[#FF6A00]" />
                <span>4. Propriété intellectuelle & Droits des auteurs (Clause clé)</span>
              </h2>
              <p className="mt-2 text-sm text-neutral-200 font-medium">
                « Les auteurs et créateurs conservent la pleine et entière propriété intellectuelle de leurs œuvres originales. »
              </p>
            </div>
            <p>
              La mise en ligne d'un roman, d'un manga, d'un webtoon ou d'une illustration sur ComicCrafte Studio ne constitue <strong>en aucun cas une cession de vos droits d'auteur</strong>.
            </p>
            <p>
              En publiant une œuvre, l'auteur concède uniquement à ComicCrafte Studio une licence technique, non exclusive, mondiale et révocable, strictement nécessaire pour stocker, convertir aux formats de lecture optimisés (Web/mobile) et diffuser l'œuvre auprès des lecteurs de la plateforme. L'auteur demeure libre de retirer son œuvre ou de la publier chez d'autres éditeurs.
            </p>
          </section>

          <section id="term-5" className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">
              5. Lutte contre le plagiat et contrefaçon
            </h2>
            <p>
              Tout auteur certifie être le créateur légitime des contenus qu'il dépose. Le plagiat, la copie non autorisée de romans ou mangas tiers, la numérisation pirate (scantrad illégal) et la violation de marques tierces sont formellement prohibés.
            </p>
            <p>
              Tout contenu avéré comme contrefaisant sera retiré promptement conformément aux dispositions de notre procédure de notification (disponible sur la page <button onClick={() => navigate('/signaler')} className="text-[#FF8A33] underline">Signaler un contenu</button>).
            </p>
          </section>

          <section id="term-6" className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">
              6. Spam, automatisation et publicité non autorisée
            </h2>
            <p>
              L'utilisation de robots de moissonnage (scraping automatisé), de systèmes de spamming dans les commentaires, ou la diffusion massive de liens promotionnels externes sans autorisation du Studio est interdite.
            </p>
          </section>

          <section id="term-7" className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">
              7. Authenticité et sécurité des comptes
            </h2>
            <p>
              L'utilisateur est seul responsable du maintien de la confidentialité de ses identifiants. Toute activité réalisée depuis son compte est présumée émaner de lui, à moins qu'une notification de piratage n'ait été signalée préalablement à notre support.
            </p>
          </section>

          <section id="term-8" className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">
              8. Protection des mineurs et classification
            </h2>
            <p>
              Les œuvres abordant des thématiques matures (romance adulte, suspense psychologique intense) doivent obligatoirement être étiquetées par l'auteur lors de la publication afin d'avertir le public jeune.
            </p>
          </section>

          <section id="term-9" className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">
              9. Commentaires, avis et interactions
            </h2>
            <p>
              L'espace de commentaires a vocation d'encourager les créateurs par une critique constructive. Les attaques ad hominem ou le dénigrement systématique feront l'objet d'une modération rapide.
            </p>
          </section>

          <section id="term-10" className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">
              10. Utilisation loyale des ressources
            </h2>
            <p>
              L'accès à la plateforme doit se faire conformément à son usage normal. Tout contournement des mécanismes de sécurité ou tentative d'altération du code entraînera le blocage immédiat de l'adresse IP concernée.
            </p>
          </section>

          <section id="term-11" className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">
              11. Comic Points, monétisation et transactions
            </h2>
            <p>
              Lorsque des Comic Points ou fonctionnalités payantes sont mis en place :
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>Les points permettent le déblocage d'accès anticipé à certains chapitres.</li>
              <li>Aucune clause contractuelle ne saurait restreindre les droits légaux impératifs reconnus aux consommateurs par la législation applicable.</li>
              <li>Toute contestation légitime de débit non sollicité peut être adressée à <a href={`mailto:${siteConfig.contactEmail}`} className="text-[#FF8A33] underline">{siteConfig.contactEmail}</a> pour examen personnalisé.</li>
            </ul>
          </section>

          <section id="term-12" className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">
              12. Signalement des abus et procédure
            </h2>
            <p>
              Pour signaler un abus, une diffamation ou une atteinte à des droits protégés, vous pouvez utiliser notre formulaire en ligne ou envoyer un courriel documenté comprenant l'URL du contenu litigieux à <a href={`mailto:${siteConfig.contactEmail}`} className="text-[#FF8A33] underline">{siteConfig.contactEmail}</a>.
            </p>
          </section>

          <section id="term-13" className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">
              13. Sanctions, suspension et droit au réexamen
            </h2>
            <p>
              En cas de manquement caractérisé au règlement :
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>Avertissement formel par courriel.</li>
              <li>Masquage ou suppression du contenu fautif.</li>
              <li>Suspension temporaire ou clôture définitive du compte.</li>
            </ul>
            <p>
              L'utilisateur dispose d'un droit de recours sous 14 jours en écrivant au support avec les éléments justifiant sa bonne foi.
            </p>
          </section>

          <section id="term-14" className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">
              14. Responsabilité des utilisateurs et du Studio
            </h2>
            <p>
              En sa qualité d'hébergeur de contenus fournis par les auteurs tiers, ComicCrafte Studio ne procède pas à une vérification a priori de chaque ligne rédigée, mais s'engage à intervenir sans délai dès notification d'un contenu manifestement illicite.
            </p>
          </section>

          <section id="term-15" className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">
              15. Modifications des conditions
            </h2>
            <p>
              ComicCrafte Studio se réserve le droit d'actualiser les présentes conditions pour répondre aux évolutions légales ou techniques. La date de dernière mise à jour est toujours mentionnée en tête du document.
            </p>
          </section>

          <section id="term-16" className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">
              16. Droit applicable et juridiction
            </h2>
            <p>
              Les présentes conditions sont régies par les règles de droit en vigueur. Tout différend non résolu amiablement sera soumis aux tribunaux compétents.
            </p>
          </section>

          <div className="pt-6 border-t border-neutral-800 flex justify-end">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-300 transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Haut de page</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
