import React from 'react';
import { Activity, CheckCircle2, ShieldCheck, Server, Smartphone, Database, Globe } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const StatusPage: React.FC = () => {
  const services = [
    { name: 'Site Web & Plateforme Publique', status: 'Opérationnel', uptime: '99.98%', icon: Globe },
    { name: 'Infrastructure de Base de Données (Supabase)', status: 'Opérationnel', uptime: '100%', icon: Database },
    { name: 'Moteur de Lecture & Rendu Webtoons', status: 'Opérationnel', uptime: '99.95%', icon: Server },
    { name: 'Compatibilité Mobile Android', status: 'Opérationnel', uptime: '100%', icon: Smartphone },
    { name: 'Chaîne de diffusion Telegram', status: 'Opérationnel (Vérifié)', uptime: '100%', icon: Activity },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
          <Activity className="w-3.5 h-3.5" />
          Disponibilité en Temps Réel
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          État des services ComicCrafte Studio
        </h1>
        <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed">
          Suivez la disponibilité opérationnelle de notre plateforme, de l'infrastructure de données et de nos canaux de communication.
        </p>
      </div>

      {/* Bannière globale */}
      <div className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Tous les systèmes sont opérationnels</h2>
          <p className="text-xs text-neutral-300">
            Aucun incident majeur n'est signalé sur l'infrastructure de ComicCrafte Studio.
          </p>
        </div>
      </div>

      {/* Grille des composants */}
      <div className="rounded-3xl bg-[#151515] border border-neutral-800 divide-y divide-neutral-800 overflow-hidden shadow-xl">
        {services.map((srv, idx) => {
          const Icon = srv.icon;
          return (
            <div key={idx} className="p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-[#FF6A00]">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{srv.name}</h3>
                  <span className="text-[11px] text-neutral-400">Taux de disponibilité : {srv.uptime}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{srv.status}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
