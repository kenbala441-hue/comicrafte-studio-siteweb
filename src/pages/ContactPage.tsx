import React, { useState } from 'react';
import { siteConfig, isWhatsAppConfigured } from '../config/siteConfig';
import { newsService } from '../services/newsService';
import { TelegramIcon, WhatsAppIcon } from '../components/CommunitySection';
import { ActionConfirmationBanner } from '../components/ActionConfirmationBanner';
import { 
  Mail, 
  Send, 
  ShieldCheck, 
  HelpCircle, 
  MessageSquare, 
  AlertTriangle, 
  ExternalLink, 
  CheckCircle2,
  FileQuestion
} from 'lucide-react';

export const ContactPage: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    category: 'assistance' as const,
    subject: '',
    message: '',
    consent: false,
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const whatsappReady = isWhatsAppConfigured();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setErrorMsg('Veuillez renseigner tous les champs obligatoires.');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setErrorMsg('Veuillez fournir une adresse e-mail valide.');
      return;
    }

    if (!formData.consent) {
      setErrorMsg('Vous devez accepter le traitement de vos données pour envoyer un message.');
      return;
    }

    setLoading(true);
    try {
      const result = await newsService.sendContactMessage({
        full_name: formData.fullName,
        email: formData.email,
        category: formData.category,
        subject: formData.subject,
        message: formData.message,
        consent_rgpd: formData.consent,
      });

      if (result.success) {
        setSubmitted(true);
        setFormData({
          fullName: '',
          email: '',
          category: 'assistance',
          subject: '',
          message: '',
          consent: false,
        });
      }
    } catch {
      setErrorMsg('Une erreur est survenue lors de l’envoi. Veuillez réessayer ou utiliser l’adresse directe.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* En-tête */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6A00]/10 border border-[#FF6A00]/25 text-[#FF8A33] text-xs font-semibold uppercase tracking-wider">
          <Mail className="w-3.5 h-3.5" />
          Contact & Support Officiel
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Contacter ComicCrafte Studio
        </h1>
        <p className="text-base text-neutral-300">
          « {siteConfig.slogan} »
        </p>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          Une question sur une œuvre, une demande de partenariat, un problème technique ou une demande relative à vos données personnelles ? Notre équipe est à votre écoute.
        </p>
      </div>

      {/* Bannière de confirmation d'envoi avec invitation communautaire non contraignante */}
      {submitted && (
        <ActionConfirmationBanner
          title="Message transmis avec succès !"
          message={`Votre demande a été bien enregistrée. Notre équipe vous répondra par courriel à l'adresse fournie dans les meilleurs délais.`}
          onClose={() => setSubmitted(false)}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Colonne gauche : Coordonnées officielles & Canaux communautaires */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-[#151515] border border-neutral-800 p-6 sm:p-8 space-y-6 shadow-xl">
            <h2 className="text-lg font-bold text-white">Canaux de contact directs</h2>

            {/* Email officiel */}
            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
              <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
                Adresse électronique officielle
              </span>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-base font-bold text-[#FF8A33] hover:underline break-all flex items-center gap-2 font-mono"
              >
                <Mail className="w-4 h-4 shrink-0 text-[#FF6A00]" />
                <span>{siteConfig.contactEmail}</span>
              </a>
              <p className="text-[11px] text-neutral-500">
                Temps de réponse habituel : sous 48 à 72 heures ouvrées.
              </p>
            </div>

            {/* Chaîne Telegram */}
            <div className="p-4 rounded-2xl bg-[#0088cc]/10 border border-[#0088cc]/25 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#38a9e1] flex items-center gap-1.5">
                  <TelegramIcon className="w-4 h-4" />
                  <span>Chaîne Telegram officielle</span>
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                  Actif
                </span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Retrouvez les annonces officielles, les alertes de nouveaux chapitres et les coulisses du studio.
              </p>
              <a
                href={siteConfig.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0088cc] hover:bg-[#0077b5] text-white text-xs font-semibold transition-all shadow-sm"
              >
                <span>Ouvrir la chaîne Telegram</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Chaîne WhatsApp */}
            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-300 flex items-center gap-1.5">
                  <WhatsAppIcon className="w-4 h-4 text-emerald-500" />
                  <span>Chaîne WhatsApp officielle</span>
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">
                  {whatsappReady ? 'Actif' : 'En préparation'}
                </span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Fil de diffusion direct pour recevoir les publications sur votre messagerie mobile.
              </p>
              {whatsappReady ? (
                <a
                  href={siteConfig.whatsappChannelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20be5c] text-white text-xs font-semibold transition-all shadow-sm"
                >
                  <span>Suivre sur WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <button
                  disabled
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800 text-neutral-400 text-xs font-medium cursor-not-allowed border border-neutral-700"
                >
                  <span>Lancement prochain (Lien en attente)</span>
                </button>
              )}
            </div>

            {/* Motifs de contact */}
            <div className="pt-2 border-t border-neutral-800 text-xs space-y-2 text-neutral-400">
              <span className="font-semibold text-neutral-300 block">Motifs pris en charge :</span>
              <ul className="space-y-1 pl-2">
                <li>• Assistance technique et bugs du lecteur</li>
                <li>• Relations créateurs et soumission de projets</li>
                <li>• Demandes relatives à la confidentialité et au RGPD</li>
                <li>• Signalement de violation de droits d'auteur</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Colonne droite : Formulaire de contact fonctionnel */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-[#151515] border border-neutral-800 p-6 sm:p-10 space-y-6 shadow-xl"
          >
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#FF6A00]" />
              <span>Envoyer un message à l'équipe</span>
            </h2>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Nom / Pseudo */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-300 block">
                  Nom ou pseudonyme <span className="text-[#FF6A00]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Ex: Alex R. ou PlumeNoire"
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF6A00]"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-300 block">
                  Adresse e-mail <span className="text-[#FF6A00]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="votre.email@exemple.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF6A00]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Catégorie */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-300 block">
                  Catégorie de la demande <span className="text-[#FF6A00]">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value as typeof formData.category,
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#FF6A00]"
                >
                  <option value="assistance">Assistance technique</option>
                  <option value="auteur">Espace Auteur & Soumission</option>
                  <option value="partenariat">Partenariat & Médias</option>
                  <option value="signalement">Signalement de contenu</option>
                  <option value="confidentialite">Confidentialité & RGPD</option>
                  <option value="general">Demande générale</option>
                </select>
              </div>

              {/* Sujet */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-300 block">
                  Sujet du message <span className="text-[#FF6A00]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Objet clair de votre message"
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF6A00]"
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-300 block">
                Message détaillé <span className="text-[#FF6A00]">*</span>
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Décrivez précisément votre demande..."
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF6A00] resize-y"
              />
            </div>

            {/* Consentement RGPD */}
            <div className="flex items-start gap-3 pt-1">
              <input
                type="checkbox"
                id="consent"
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                className="mt-1 w-4 h-4 rounded bg-neutral-900 border-neutral-700 text-[#FF6A00] focus:ring-[#FF6A00]"
              />
              <label htmlFor="consent" className="text-xs text-neutral-400 leading-relaxed cursor-pointer">
                J'accepte que ComicCrafte Studio utilise mon adresse e-mail et ces informations pour traiter ma demande conformément à la{' '}
                <button
                  type="button"
                  onClick={() => navigate('/privacy')}
                  className="text-[#FF8A33] underline"
                >
                  Politique de confidentialité
                </button>
                .
              </label>
            </div>

            {/* Bouton de soumission */}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#FF6A00] to-[#FF8A33] hover:from-[#e55f00] hover:to-[#e67b2d] active:scale-[0.99] transition-all shadow-lg shadow-[#FF6A00]/20 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>Envoi en cours...</span>
                </>
              ) : (
                <>
                  <span>Envoyer mon message</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
