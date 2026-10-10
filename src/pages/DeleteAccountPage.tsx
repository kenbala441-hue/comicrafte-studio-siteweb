import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { Trash2, Mail, AlertTriangle, ShieldCheck, Copy, Check, ExternalLink, ArrowRight } from 'lucide-react';

export const DeleteAccountPage: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
  const [copied, setCopied] = useState(false);

  const emailTemplate = `Objet : Demande de suppression définitive de compte ComicCrafte Studio

Bonjour à l'équipe ComicCrafte Studio,

Je souhaite par la présente demander la suppression définitive et irréversible de mon compte utilisateur conformément aux lois sur la protection des données (RGPD).

Voici les informations associées à mon compte :
- Adresse e-mail du compte : [VOTRE EMAIL]
- Pseudonyme d'utilisateur : [VOTRE PSEUDONYME]
- Raison de la suppression (facultatif) : [VOTRE RAISON]

Je confirme avoir pris connaissance que cette action entraîne la suppression de mes favoris, de ma progression de lecture et de mes données de profil.

Cordialement,
[VOTRE NOM / PSEUDO]`;

  const copyTemplate = () => {
    navigator.clipboard.writeText(emailTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const mailtoUrl = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(
    'Demande de suppression de compte ComicCrafte Studio'
  )}&body=${encodeURIComponent(emailTemplate)}`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* En-tête */}
      <div className="space-y-4 border-b border-neutral-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/25 text-red-400 text-xs font-semibold uppercase tracking-wider">
          <Trash2 className="w-3.5 h-3.5" />
          Gestion des données personnelles
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Procédure de suppression de compte
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 max-w-3xl leading-relaxed">
          Chez ComicCrafte Studio, vous gardez la pleine maîtrise de vos données personnelles. Vous pouvez demander à tout moment la suppression définitive de votre compte utilisateur et de ses données associées.
        </p>
      </div>

      {/* Les deux méthodes de suppression */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Méthode 1 : Depuis l'application */}
        <div className="p-6 rounded-2xl bg-[#151515] border border-neutral-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-xs font-bold text-[#FF8A33] uppercase tracking-wider">
              Option 1 (Automatisée)
            </span>
            <h2 className="text-lg font-bold text-white">Directement dans l'application</h2>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Si vous êtes connecté à votre compte sur l'application mobile ou web :
            </p>
            <ol className="list-decimal list-inside space-y-2 text-xs text-neutral-400 pl-1">
              <li>Ouvrez votre <strong>Profil</strong> utilisateur.</li>
              <li>Accédez aux <strong>Paramètres du compte</strong>.</li>
              <li>Faites défiler jusqu'à la section <strong>Sécurité & Confidentialité</strong>.</li>
              <li>Cliquez sur <strong>Supprimer mon compte</strong> puis confirmez votre mot de passe ou session Google.</li>
            </ol>
          </div>
          <div className="pt-2 text-xs text-neutral-500 italic">
            * Disponible lorsque votre session est ouverte.
          </div>
        </div>

        {/* Méthode 2 : Demande par e-mail officiel */}
        <div className="p-6 rounded-2xl bg-[#151515] border border-[#FF6A00]/30 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Option 2 (Garantie & Support)
            </span>
            <h2 className="text-lg font-bold text-white">Demande officielle par e-mail</h2>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Si vous n'avez plus accès à votre appareil ou préférez un traitement direct par notre équipe :
            </p>
            <p className="text-xs text-neutral-400">
              Envoyez un e-mail à l'adresse officielle : <br />
              <strong className="text-white font-mono">{siteConfig.contactEmail}</strong>
            </p>
          </div>
          <a
            href={mailtoUrl}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6A00] to-[#FF8A33] text-white text-xs font-semibold shadow-md"
          >
            <Mail className="w-4 h-4" />
            <span>Ouvrir votre client de messagerie</span>
          </a>
        </div>
      </div>

      {/* Informations minimales requises */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#151515] border border-neutral-800 space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>Informations minimales nécessaires à la demande</span>
        </h2>
        <p className="text-xs text-neutral-300 leading-relaxed">
          Pour des raisons de sécurité évidentes et afin d'empêcher qu'un tiers malveillant ne supprime votre compte à votre insu, votre demande doit comporter :
        </p>
        <ul className="list-disc list-inside space-y-1.5 text-xs text-neutral-400 pl-2">
          <li>L'adresse e-mail exacte rattachée à votre compte ComicCrafte Studio.</li>
          <li>Votre pseudonyme d'auteur ou de lecteur.</li>
          <li>L'envoi doit être effectué <strong>depuis l'adresse e-mail associée au compte</strong> pour valider l'identité du demandeur.</li>
        </ul>
      </div>

      {/* Conséquences de la suppression */}
      <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <span>Conséquences de la suppression définitive</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-300">
          <div className="p-4 rounded-xl bg-black/40 border border-neutral-800 space-y-1">
            <strong className="text-white block">Profil et bibliothèque</strong>
            <p className="text-neutral-400">
              Votre pseudonyme, avatar, historique de lecture, favoris et marque-pages sont supprimés sans récupération possible.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-black/40 border border-neutral-800 space-y-1">
            <strong className="text-white block">Œuvres publiées (Auteurs)</strong>
            <p className="text-neutral-400">
              Vos romans et webcomics peuvent être retirés de la publication ou anonymisés selon votre demande explicite.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-black/40 border border-neutral-800 space-y-1">
            <strong className="text-white block">Comic Points et achats</strong>
            <p className="text-neutral-400">
              Tout solde de points résiduel non utilisé est définitivement clôturé avec le compte.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-black/40 border border-neutral-800 space-y-1">
            <strong className="text-white block">Obligations légales de conservation</strong>
            <p className="text-neutral-400">
              Certaines données de facturation peuvent être conservées pendant la durée minimale requise par les lois fiscales.
            </p>
          </div>
        </div>
      </div>

      {/* Modèle de courriel prêt à l'emploi */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#151515] border border-neutral-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-white">Modèle d'e-mail type à envoyer</h2>
          <button
            onClick={copyTemplate}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 transition-colors self-start"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Modèle copié !</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copier le modèle de courriel</span>
              </>
            )}
          </button>
        </div>

        <pre className="p-4 rounded-xl bg-black/60 border border-neutral-800 text-xs text-neutral-300 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
          {emailTemplate}
        </pre>

        <div className="pt-2 text-xs text-neutral-400 flex items-center gap-2">
          <span>Délais de traitement :</span>
          <span className="font-semibold text-white">Sous 30 jours maximum conformément aux règles RGPD.</span>
        </div>
      </div>
    </div>
  );
};
