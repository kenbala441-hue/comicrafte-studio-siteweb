import React, { useEffect, useState } from 'react';
import { newsService, formatFrenchDate } from '../services/newsService';
import { AppChangelog, ChangeType } from '../services/types';
import { 
  Layers, 
  Calendar, 
  Smartphone, 
  Globe, 
  ShieldCheck, 
  PlusCircle, 
  Wrench, 
  CheckCircle2, 
  AlertTriangle, 
  MinusCircle, 
  Info,
  Clock
} from 'lucide-react';

export const ChangelogPage: React.FC = () => {
  const [changelogs, setChangelogs] = useState<AppChangelog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    newsService.getChangelogs().then((data) => {
      setChangelogs(data);
      setLoading(false);
    });
  }, []);

  const getChangeBadge = (type: ChangeType) => {
    switch (type) {
      case 'Added':
        return { label: 'Ajout', bg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30', icon: PlusCircle };
      case 'Changed':
        return { label: 'Amélioration', bg: 'bg-blue-500/15 text-blue-400 border-blue-500/30', icon: Wrench };
      case 'Fixed':
        return { label: 'Correction', bg: 'bg-amber-500/15 text-amber-400 border-amber-500/30', icon: CheckCircle2 };
      case 'Security':
        return { label: 'Sécurité', bg: 'bg-purple-500/15 text-purple-400 border-purple-500/30', icon: ShieldCheck };
      case 'Deprecated':
        return { label: 'Déprécié', bg: 'bg-orange-500/15 text-orange-400 border-orange-500/30', icon: Clock };
      case 'Removed':
        return { label: 'Retiré', bg: 'bg-red-500/15 text-red-400 border-red-500/30', icon: MinusCircle };
      default:
        return { label: type, bg: 'bg-neutral-800 text-neutral-300 border-neutral-700', icon: Info };
    }
  };

  const getStatusBadge = (status: AppChangelog['status']) => {
    switch (status) {
      case 'released':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Version Déployée</span>;
      case 'in_progress':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">En préparation</span>;
      case 'planned':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/30">Prévue</span>;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* En-tête */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6A00]/10 border border-[#FF6A00]/25 text-[#FF8A33] text-xs font-semibold uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5" />
          Évolution & Transparence Technique
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Centre des mises à jour de l'application
        </h1>
        <p className="text-neutral-300 max-w-2xl text-sm sm:text-base leading-relaxed">
          Retrouvez la chronologie complète des évolutions de ComicCrafte Studio, version après version. Chaque déploiement fait l'objet d'un rapport détaillé pour nos utilisateurs.
        </p>
      </div>

      {/* Note de compatibilité */}
      <div className="p-4 rounded-2xl bg-[#151515] border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-neutral-300">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-neutral-800 text-neutral-400">
            <Smartphone className="w-5 h-5 text-[#FF8A33]" />
          </div>
          <div>
            <strong className="text-white block">Écosystème multiplateforme :</strong>
            <span>Version Web opérationnelle et compatibilité optimisée pour navigateurs Android.</span>
          </div>
        </div>
        <div className="px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-700/80 font-mono text-neutral-400 text-[11px]">
          Version actuelle : v1.2.0
        </div>
      </div>

      {/* Timeline des versions */}
      <div className="space-y-8">
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-8 h-8 rounded-full border-2 border-[#FF6A00] border-t-transparent animate-spin mx-auto" />
            <p className="text-xs text-neutral-400">Chargement de l'historique des versions...</p>
          </div>
        ) : (
          changelogs.map((cl, idx) => (
            <section
              key={cl.id}
              className="rounded-3xl bg-[#151515] border border-neutral-800 p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-xl"
            >
              {/* Entête de version */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-black text-white font-mono">
                    COMICCRAFTE STUDIO — v{cl.version}
                  </h2>
                  {getStatusBadge(cl.status)}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                    {formatFrenchDate(cl.release_date)}
                  </span>
                  <span>•</span>
                  <div className="flex items-center gap-1.5 font-medium text-neutral-300">
                    {cl.platforms.map((p) => (
                      <span key={p} className="px-2 py-0.5 rounded bg-neutral-800 text-[11px]">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Résumé de version */}
              {cl.summary && (
                <p className="text-sm text-neutral-300 leading-relaxed font-medium">
                  {cl.summary}
                </p>
              )}

              {/* Liste des changements */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  Détail des modifications
                </h3>
                <div className="space-y-2">
                  {cl.changes.map((change, cIdx) => {
                    const badge = getChangeBadge(change.type);
                    const Icon = badge.icon;
                    return (
                      <div
                        key={cIdx}
                        className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800/80 flex items-start gap-3 text-xs sm:text-sm text-neutral-300"
                      >
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border shrink-0 mt-0.5 ${badge.bg}`}
                        >
                          <Icon className="w-3 h-3" />
                          <span>{badge.label}</span>
                        </span>
                        <span className="leading-relaxed">{change.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Problèmes connus éventuels */}
              {cl.known_issues && cl.known_issues.length > 0 && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-300 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-amber-200">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Problème connu identifié :</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-neutral-300 pl-1">
                    {cl.known_issues.map((issue, iIdx) => (
                      <li key={iIdx}>{issue}</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ))
        )}
      </div>
    </div>
  );
};
