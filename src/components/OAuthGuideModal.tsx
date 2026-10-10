import React from 'react';
import { X, ExternalLink, ShieldCheck, Copy, Check, AlertCircle } from 'lucide-react';

interface OAuthGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OAuthGuideModal: React.FC<OAuthGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://comiccrafte-studio.com';

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const urls = [
    { label: "Nom de l'application (Marque)", value: "ComicCrafte Studio", key: 'brand' },
    { label: "Page d'accueil de l'application", value: `${currentOrigin}/`, key: 'home' },
    { label: "Lien vers les Règles de confidentialité", value: `${currentOrigin}/privacy`, key: 'privacy' },
    { label: "Lien vers les Conditions d'utilisation", value: `${currentOrigin}/terms`, key: 'terms' },
    { label: "E-mail d'assistance utilisateur", value: "kenbala441@gmail.com", key: 'support_email' },
    { label: "E-mail de contact développeur", value: "kenbala441@gmail.com", key: 'dev_email' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-[#151515] border border-neutral-700 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl text-neutral-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Guide Google Cloud & OAuth Console</h2>
            <p className="text-xs text-neutral-400">Paramètres officiels pour l'écran de consentement OAuth</p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 leading-relaxed">
            <p className="font-semibold text-white mb-1">À renseigner dans la Google Cloud Console :</p>
            <p>
              Rendez-vous dans <strong>APIs & Services &gt; Écran de consentement OAuth</strong>.
              Voici les valeurs exactes et stables fournies par ce site public sans besoin d'authentification :
            </p>
          </div>

          <div className="space-y-2.5">
            {urls.map((item) => (
              <div
                key={item.key}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-black/60 border border-neutral-800 gap-2"
              >
                <div>
                  <span className="text-[11px] text-neutral-400 font-medium block">{item.label}</span>
                  <span className="text-xs font-mono text-[#FF8A33] break-all">{item.value}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(item.value, item.key)}
                  className="self-end sm:self-center inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs shrink-0"
                >
                  {copiedKey === item.key ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copié</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copier</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs leading-relaxed flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 text-amber-400 mt-0.5" />
            <div>
              <strong className="block text-white mb-1">Différence importante :</strong>
              <ul className="list-disc list-inside space-y-1 text-neutral-300">
                <li><strong>Domaine autorisé :</strong> le nom de domaine racine (ex: <code>comiccrafte-studio.com</code> ou le domaine fourni par votre hébergeur).</li>
                <li><strong>URI de redirection OAuth :</strong> l'URL de rappel Supabase / backend (ex: <code>https://&lt;projet&gt;.supabase.co/auth/v1/callback</code>).</li>
                <li><strong>Pages juridiques :</strong> les URL ci-dessus (accessibles publiquement sans restriction).</li>
              </ul>
              <p className="mt-2 text-neutral-400">
                * Note : La mise en ligne des pages ne garantit pas à elle seule l'approbation automatique par Google, qui peut vérifier les permissions scopes demandées.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-neutral-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
