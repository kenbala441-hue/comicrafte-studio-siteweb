import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { HelpCircle, ChevronDown, BookOpen, PenTool, Shield, Mail } from 'lucide-react';

export const HelpCenterPage: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'L’accès aux œuvres est-il payant sur ComicCrafte Studio ?',
      a: 'La grande majorité des œuvres et chapitres est accessible gratuitement et publiquement, sans obligation de création de compte. Certains accès anticipés peuvent être proposés par les auteurs via des Comic Points.',
    },
    {
      q: 'En tant qu’auteur, est-ce que je conserve mes droits d’auteur ?',
      a: 'Oui, à 100 %. ComicCrafte Studio n’exige aucune cession de propriété intellectuelle. Vous restez l’unique propriétaire de votre récit, de vos personnages et de votre univers.',
    },
    {
      q: 'Comment rejoindre la communauté officielle ?',
      a: `Vous pouvez rejoindre immédiatement notre chaîne Telegram officielle à l'adresse https://t.me/comiccrafte_studio. Une chaîne WhatsApp officielle sera également reliée dès son ouverture.`,
    },
    {
      q: 'Comment demander la suppression de mes données ou de mon compte ?',
      a: 'Vous pouvez soit utiliser l’option directe dans les paramètres de votre compte, soit consulter notre page dédiée /delete-account pour nous transmettre votre demande par e-mail.',
    },
    {
      q: 'Comment contacter l’équipe de modération ou de support ?',
      a: `Vous pouvez nous joindre par courriel à ${siteConfig.contactEmail} ou utiliser notre formulaire de contact officiel.`,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6A00]/10 border border-[#FF6A00]/25 text-[#FF8A33] text-xs font-semibold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          Assistance & Questions Fréquentes
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Centre d'aide ComicCrafte Studio
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          Trouvez des réponses claires sur la lecture, la publication d'œuvres, les droits d'auteur et l'accès à nos communautés.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="rounded-2xl bg-[#151515] border border-neutral-800 overflow-hidden transition-colors"
          >
            <button
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-white text-sm sm:text-base hover:text-[#FF8A33] transition-colors"
            >
              <span>{faq.q}</span>
              <ChevronDown
                className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform ${
                  openFaq === idx ? 'rotate-180 text-[#FF6A00]' : ''
                }`}
              />
            </button>
            {openFaq === idx && (
              <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/60">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-neutral-800 text-center space-y-4">
        <h2 className="text-lg font-bold text-white">Vous n'avez pas trouvé de réponse ?</h2>
        <p className="text-xs text-neutral-400 max-w-md mx-auto">
          Notre équipe d'assistance vous répond rapidement pour toute question technique, éditoriale ou juridique.
        </p>
        <button
          onClick={() => navigate('/contact')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF6A00] hover:bg-[#e55f00] text-white text-xs font-semibold transition-colors"
        >
          <Mail className="w-4 h-4" />
          <span>Accéder au formulaire de contact</span>
        </button>
      </div>
    </div>
  );
};
