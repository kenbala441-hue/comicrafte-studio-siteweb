/**
 * Configuration centralisée pour ComicCrafte Studio.
 * Modifiez les liens ici sans devoir parcourir plusieurs composants.
 */

export interface SiteConfig {
  studioName: string;
  slogan: string;
  contactEmail: string;
  telegramUrl: string;
  /**
   * Lien officiel de la chaîne WhatsApp ComicCrafte Studio.
   * Laisser vide ("") tant que la chaîne n'a pas été officiellement créée.
   * L'interface désactive automatiquement le bouton et affiche un état
   * clairement identifiable sans inventer d'URL fictive.
   */
  whatsappChannelUrl: string;
  communityMessage: string;
  appVersionWeb: string;
  appVersionAndroid: string;
  appStatus: 'stable' | 'maintenance' | 'beta';
}

export const siteConfig: SiteConfig = {
  studioName: 'ComicCrafte Studio',
  slogan: 'Là où les histoires prennent vie.',
  contactEmail: 'kenbala441@gmail.com',
  // Chaîne officielle Telegram vérifiée
  telegramUrl: 'https://t.me/comiccrafte_studio',
  // Chaîne WhatsApp : non renseignée pour l'instant (sera mise à jour dès disponibilité)
  whatsappChannelUrl: '',
  communityMessage:
    'Rejoignez la communauté ComicCrafte Studio pour découvrir nos nouveautés, suivre les mises à jour, retrouver nos annonces officielles et rester informé des projets en préparation.\n\nCOMICCRAFTE STUDIO — Là où les histoires prennent vie.',
  appVersionWeb: '1.2.0',
  appVersionAndroid: '1.2.0',
  appStatus: 'stable',
};

/**
 * Vérifie si la chaîne WhatsApp est configurée avec un lien valide.
 */
export function isWhatsAppConfigured(): boolean {
  return (
    typeof siteConfig.whatsappChannelUrl === 'string' &&
    siteConfig.whatsappChannelUrl.trim().length > 0 &&
    siteConfig.whatsappChannelUrl.startsWith('https://')
  );
}
