import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { newsService } from '../services/newsService';
import { AlertTriangle, ShieldAlert, Send, CheckCircle2 } from 'lucide-react';

export const ReportPage: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
  const [targetUrl, setTargetUrl] = useState('');
  const [reportType, setReportType] = useState('plagiat');
  const [details, setDetails] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await newsService.sendContactMessage({
      full_name: 'Signalement Utilisateur',
      email,
      category: 'signalement',
      subject: `[SIGNALEMENT] Type : ${reportType}`,
      message: `URL signalée : ${targetUrl}\nType d'infraction : ${reportType}\nDétails :\n${details}`,
      consent_rgpd: true,
    });
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-semibold uppercase tracking-wider">
          <AlertTriangle className="w-3.5 h-3.5" />
          Modération & Propriété Intellectuelle
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Signaler un contenu ou une atteinte aux droits d'auteur
        </h1>
        <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed">
          ComicCrafte Studio applique une politique de tolérance zéro envers le plagiat, la contrefaçon et les comportements préjudiciables.
        </p>
      </div>

      {submitted ? (
        <div className="p-8 rounded-3xl bg-[#151515] border border-emerald-500/40 text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
          <h2 className="text-xl font-bold text-white">Signalement reçu avec succès</h2>
          <p className="text-xs text-neutral-300 max-w-md mx-auto leading-relaxed">
            Notre équipe de modération a bien pris note de votre déclaration et examinera le contenu sous 24 à 48 heures.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold"
          >
            Retourner à l'accueil
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-[#151515] border border-neutral-800 p-6 sm:p-8 space-y-5"
        >
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-300 block">
              Type de signalement <span className="text-[#FF6A00]">*</span>
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#FF6A00]"
            >
              <option value="plagiat">Plagiat ou violation de droits d'auteur</option>
              <option value="haine">Contenu haineux ou harcèlement</option>
              <option value="inapproprie">Contenu mature non signalé / Protection des mineurs</option>
              <option value="spam">Spam, escroquerie ou liens malveillants</option>
              <option value="autre">Autre motif sérieux</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-300 block">
              Lien de l'œuvre ou du contenu concerné <span className="text-[#FF6A00]">*</span>
            </label>
            <input
              type="text"
              required
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              placeholder="Ex: Titre du roman ou lien précis de la page"
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF6A00]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-300 block">
              Votre adresse e-mail de contact <span className="text-[#FF6A00]">*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Pour vous tenir informé de l'issue du dossier"
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF6A00]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-300 block">
              Explication détaillée & preuves éventuelles <span className="text-[#FF6A00]">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Décrivez les motifs de votre signalement..."
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF6A00]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 transition-all shadow-md"
          >
            {loading ? 'Transmission...' : 'Envoyer le signalement officiel'}
          </button>
        </form>
      )}
    </div>
  );
};
