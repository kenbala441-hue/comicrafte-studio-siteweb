import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { Shield, Mail, ArrowUp, Lock, CheckCircle2, ChevronRight, FileText } from 'lucide-react';

export const PrivacyPolicyPage: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
  const [activeSection, setActiveSection] = useState<string>('sec-1');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const sections = [
    { id: 'sec-1', title: '1. Identité du responsable de traitement et contact' },
    { id: 'sec-2', title: '2. Catégories de données collectées' },
    { id: 'sec-3', title: '3. Connexion Google OAuth et inscription tierce' },
    { id: 'sec-4', title: '4. Profil utilisateur, pseudonyme et avatar' },
    { id: 'sec-5', title: '5. Progression de lecture, favoris et interactions' },
    { id: 'sec-6', title: '6. Données techniques et journaux système' },
    { id: 'sec-7', title: '7. Comic Points, achats et transactions' },
    { id: 'sec-8', title: '8. Finalités et bases légales de traitement' },
    { id: 'sec-9', title: '9. Prestataires techniques et infrastructure (Supabase)' },
    { id: 'sec-10', title: '10. Sécurité et intégrité des données' },
    { id: 'sec-11', title: '11. Transferts internationaux de données' },
    { id: 'sec-12', title: '12. Non-cession et règles de partage des données' },
    { id: 'sec-13', title: '13. Données visibles publiquement' },
    { id: 'sec-14', title: '14. Cookies, localStorage et traceurs' },
    { id: 'sec-15', title: '15. Durées de conservation des données' },
    { id: 'sec-16', title: '16. Droits des utilisateurs (Accès, Rectification, RGPD)' },
    { id: 'sec-17', title: '17. Modalités de suppression du compte' },
    { id: 'sec-18', title: '18. Protection des mineurs' },
    { id: 'sec-19', title: '19. Notifications et communications' },
    { id: 'sec-20', title: '20. Liens vers services externes (Telegram / WhatsApp)' },
    { id: 'sec-21', title: '21. Mises à jour de la politique' },
    { id: 'sec-22', title: '22. Point de contact officiel dédié' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* En-tête */}
      <div className="space-y-4 border-b border-neutral-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6A00]/10 border border-[#FF6A00]/25 text-[#FF8A33] text-xs font-semibold uppercase tracking-wider">
          <Shield className="w-3.5 h-3.5" />
          Document Juridique Officiel
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Politique de Confidentialité
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400">
          <span>Date d'entrée en vigueur : <strong>10 octobre 2026</strong></span>
          <span>•</span>
          <span>Statut : <strong>Publique & Accessible sans connexion</strong></span>
          <span>•</span>
          <span>Éditeur : <strong>ComicCrafte Studio</strong></span>
        </div>
        <p className="text-sm text-neutral-300 max-w-3xl leading-relaxed">
          Chez ComicCrafte Studio, la protection de votre vie privée et la transparence concernant l'utilisation de vos données constituent des engagements fondamentaux. Ce document expose de manière détaillée la nature des données traitées, les raisons de leur collecte et vos droits.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Table des matières latérale fixe sur grand écran */}
        <nav
          aria-label="Table des matières de la politique de confidentialité"
          className="lg:col-span-4 sticky top-24 bg-[#151515] border border-neutral-800 rounded-2xl p-4 sm:p-5 max-h-[80vh] overflow-y-auto space-y-2 text-xs"
        >
          <div className="font-bold text-white text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#FF6A00]" />
            <span>Table des matières</span>
          </div>
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollToSection(s.id)}
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

        {/* Corps du texte juridique */}
        <div className="lg:col-span-8 bg-[#151515] border border-neutral-800 rounded-3xl p-6 sm:p-10 space-y-10 text-sm text-neutral-300 leading-relaxed">
          
          {/* SECTION 1 */}
          <section id="sec-1" className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">
              1. Identité du responsable de traitement et contact
            </h2>
            <p>
              Le service <strong>ComicCrafte Studio</strong> (dénommé ci-après « le Studio », « nous » ou « notre plateforme »), accessible via son site officiel et son application, est responsable du traitement des données à caractère personnel collectées auprès des utilisateurs.
            </p>
            <p>
              Pour toute question ou demande relative à vos données personnelles, vous pouvez contacter notre délégué par e-mail à l'adresse officielle : <a href={`mailto:${siteConfig.contactEmail}`} className="text-[#FF8A33] underline">{siteConfig.contactEmail}</a>.
            </p>
          </section>

          {/* SECTION 2 */}
          <section id="sec-2" className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">
              2. Catégories de données collectées
            </h2>
            <p>
              Nous collectons uniquement les informations strictement nécessaires à la fourniture de nos services de lecture, d'écriture et de partage narratif :
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li><strong>Données de compte :</strong> adresse e-mail, identifiant de compte, mot de passe chiffré (en cas d'authentification par mot de passe).</li>
              <li><strong>Données de profil :</strong> pseudonyme choisi, avatar sélectionné, description publique facultative.</li>
              <li><strong>Données d'activité :</strong> historique de lecture, chapitres marqués comme lus, liste de favoris, commentaires rédigés.</li>
              <li><strong>Données techniques de connexion :</strong> adresse IP abrégée, type de navigateur, horodatage, journaux d'erreurs techniques.</li>
            </ul>
          </section>

          {/* SECTION 3 */}
          <section id="sec-3" className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">
              3. Connexion Google OAuth et inscription tierce
            </h2>
            <p>
              Lorsque vous choisissez de vous connecter via le protocole Google OAuth :
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>Nous recevons uniquement de Google votre identifiant unique Google, votre adresse e-mail vérifiée, votre nom complet et l'URL de votre photo de profil publique.</li>
              <li>ComicCrafte Studio ne demande, ne lit et ne stocke <strong>jamais</strong> vos mots de passe Google, vos contacts personnels ou vos fichiers Google Drive.</li>
              <li>Cette transmission respecte strictement les règles du programme Google API Services User Data Policy, notamment les exigences d'utilisation restreinte (« Limited Use requirements »).</li>
            </ul>
          </section>

          {/* SECTION 4 */}
          <section id="sec-4" className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">
              4. Profil utilisateur, pseudonyme et avatar
            </h2>
            <p>
              Votre pseudonyme et votre avatar sont destinés à être affichés publiquement lors de vos publications de commentaires ou d'œuvres. Vous êtes libre de choisir un pseudonyme garantissant votre anonymat. Aucun nom réel civil n'est imposé pour profiter du service.
            </p>
          </section>

          {/* SECTION 5 */}
          <section id="sec-5" className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">
              5. Progression de lecture, favoris et interactions
            </h2>
            <p>
              Afin de synchroniser votre lecture d'un appareil à l'autre (par exemple entre votre ordinateur et votre smartphone Android), nous sauvegardons les derniers chapitres consultés et vos œuvres enregistrées dans votre bibliothèque.
            </p>
          </section>

          {/* SECTION 6 */}
          <section id="sec-6" className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">
              6. Données techniques et journaux système
            </h2>
            <p>
              Pour prévenir les attaques par déni de service (DDoS) et corriger les bugs logiciels, des journaux techniques standards (logs HTTP) peuvent enregistrer temporairement les codes de réponse du serveur et les agents utilisateurs. Ces journaux sont purgés de façon automatisée.
            </p>
          </section>

          {/* SECTION 7 */}
          <section id="sec-7" className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">
              7. Comic Points, achats et transactions
            </h2>
            <p>
              Lorsque des fonctionnalités de Comic Points ou d'achats sont activées :
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>ComicCrafte Studio ne conserve aucune coordonnée bancaire directe (numéro de carte de crédit). Les paiements sont traités par des prestataires bancaires agréés.</li>
              <li>Nous enregistrons uniquement le solde de points disponible, l'historique des déblocages de chapitres et les reçus d'achats numériques pour des impératifs comptables.</li>
            </ul>
          </section>

          {/* SECTION 8 */}
          <section id="sec-8" className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">
              8. Finalités et bases légales de traitement
            </h2>
            <p>Vos données sont traitées pour les finalités suivantes :</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li><strong>Exécution du contrat (Art. 6.1.b RGPD) :</strong> mise à disposition de la liseuse, sauvegarde des préférences et synchronisation.</li>
              <li><strong>Intérêt légitime (Art. 6.1.f RGPD) :</strong> sécurité de la plateforme, détection des abus et modération du contenu préjudiciable.</li>
              <li><strong>Obligation légale (Art. 6.1.c RGPD) :</strong> conservation des preuves comptables et réponse aux requêtes judiciaires officielles.</li>
            </ul>
          </section>

          {/* SECTION 9 */}
          <section id="sec-9" className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">
              9. Prestataires techniques et infrastructure (Supabase)
            </h2>
            <p>
              Pour assurer le stockage résilient des profils, chapitres et actualités, ComicCrafte Studio s'appuie sur l'infrastructure gérée de <strong>Supabase</strong> (PostgreSQL hébergé dans des centres de données sécurisés conformes SOC2 et RGPD). Nos prestataires d'hébergement agissent en qualité de sous-traitants techniques sans disposer du droit d'exploiter vos données à leurs propres fins.
            </p>
          </section>

          {/* SECTION 10 */}
          <section id="sec-10" className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">
              10. Sécurité et intégrité des données
            </h2>
            <p>
              Toutes les connexions s'effectuent par le protocole chiffré <strong>HTTPS / TLS</strong>. L'accès aux bases de données est protégé par des politiques strictes de sécurité au niveau des lignes (Row Level Security - RLS) garantissant qu'un utilisateur ne peut accéder qu'à ses propres données privées.
            </p>
          </section>

          {/* SECTION 11 */}
          <section id="sec-11" className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">
              11. Transferts internationaux de données
            </h2>
            <p>
              Lorsque des serveurs ou sous-traitants sont localisés hors de l'Espace Économique Européen, nous veillons à ce que des garanties contractuelles appropriées (Clauses Contractuelles Types approuvées par la Commission Européenne) soient mises en place.
            </p>
          </section>

          {/* SECTION 12 */}
          <section id="sec-12" className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">
              12. Non-cession et règles de partage des données
            </h2>
            <p className="font-semibold text-white">
              ComicCrafte Studio ne vend, ne loue et ne commercialise aucune de vos données personnelles à des courtiers en données ou régies publicitaires tierces.
            </p>
          </section>

          {/* SECTION 13 */}
          <section id="sec-13" className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">
              13. Données visibles publiquement
            </h2>
            <p>
              Sont visibles publiquement : votre pseudonyme d'auteur ou de lecteur, votre photo de profil/avatar, et les œuvres ou commentaires que vous choisissez délibérément de rendre publics. Votre adresse e-mail reste strictement confidentielle.
            </p>
          </section>

          {/* SECTION 14 */}
          <section id="sec-14" className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">
              14. Cookies, localStorage et traceurs
            </h2>
            <p>
              Nous employons le stockage local de votre navigateur (<code>localStorage</code>) pour conserver vos préférences d'affichage (mode sombre, taille de police du lecteur) et votre jeton de session sécurisé. Aucun cookie publicitaire intrusif n'est déposé.
            </p>
          </section>

          {/* SECTION 15 */}
          <section id="sec-15" className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">
              15. Durées de conservation des données
            </h2>
            <p>
              Les données de compte sont conservées pendant toute la durée de vie du compte utilisateur. En cas d'inactivité continue supérieure à 36 mois, un courriel de rappel est envoyé avant suppression définitive.
            </p>
          </section>

          {/* SECTION 16 */}
          <section id="sec-16" className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">
              16. Droits des utilisateurs (RGPD)
            </h2>
            <p>
              Conformément à la réglementation applicable, vous disposez des droits suivants :
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li><strong>Droit d'accès et de rectification :</strong> consulter et corriger vos informations à tout moment.</li>
              <li><strong>Droit à l'effacement :</strong> demander la suppression de votre compte et de vos données associées.</li>
              <li><strong>Droit d'opposition et de limitation :</strong> vous opposer à un traitement fondé sur notre intérêt légitime.</li>
            </ul>
            <p>
              Pour exercer vos droits, écrivez à <a href={`mailto:${siteConfig.contactEmail}`} className="text-[#FF8A33] underline">{siteConfig.contactEmail}</a>.
            </p>
          </section>

          {/* SECTION 17 */}
          <section id="sec-17" className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">
              17. Modalités de suppression du compte
            </h2>
            <p>
              Vous pouvez à tout moment demander la clôture et la suppression irréversible de votre compte. Une page dédiée détaillant la procédure est accessible à l'adresse suivante :
            </p>
            <div className="pt-1">
              <button
                onClick={() => navigate('/delete-account')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white border border-neutral-700"
              >
                <span>Consulter la page de suppression de compte</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </section>

          {/* SECTION 18 */}
          <section id="sec-18" className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">
              18. Protection des mineurs
            </h2>
            <p>
              ComicCrafte Studio s'adresse aux personnes ayant l'âge légal de consentement numérique dans leur pays de résidence (généralement 13 à 15 ans selon les législations). Les mineurs doivent obtenir l'accord de leurs représentants légaux avant de créer un compte.
            </p>
          </section>

          {/* SECTION 19 */}
          <section id="sec-19" className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">
              19. Notifications et communications
            </h2>
            <p>
              Nous vous adressons des notifications indispensables relatives à la sécurité de votre compte (changement de mot de passe, alertes de sécurité). Les communications éditoriales sont facultatives et peuvent être désactivées dans vos préférences.
            </p>
          </section>

          {/* SECTION 20 */}
          <section id="sec-20" className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">
              20. Liens vers services externes (Telegram / WhatsApp)
            </h2>
            <p>
              Notre site propose des liens vers nos canaux communautaires externes (Telegram via <a href={siteConfig.telegramUrl} target="_blank" rel="noopener noreferrer" className="text-[#0088cc] underline">{siteConfig.telegramUrl}</a> et WhatsApp lorsqu'il sera déployé). Lorsque vous quittez ComicCrafte Studio pour ces services, les politiques de confidentialité respectives de ces tiers s'appliquent.
            </p>
          </section>

          {/* SECTION 21 */}
          <section id="sec-21" className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">
              21. Mises à jour de la politique
            </h2>
            <p>
              Toute modification substantielle de cette politique sera signalée par une annonce officielle sur notre page Actualités et notre canal Telegram au moins 15 jours avant son application.
            </p>
          </section>

          {/* SECTION 22 */}
          <section id="sec-22" className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">
              22. Point de contact officiel dédié
            </h2>
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
              <p className="font-semibold text-white">Pour toute réclamation ou exercice de droits :</p>
              <p className="flex items-center gap-2 text-[#FF8A33]">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${siteConfig.contactEmail}`} className="underline font-mono">
                  {siteConfig.contactEmail}
                </a>
              </p>
              <p className="text-xs text-neutral-400">
                Temps de réponse habituel : sous 72 heures ouvrées.
              </p>
            </div>
          </section>

          {/* Revenir en haut */}
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
