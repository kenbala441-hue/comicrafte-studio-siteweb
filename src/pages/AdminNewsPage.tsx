import React, { useState, useEffect } from 'react';
import { newsService, DEFAULT_CATEGORIES, isSupabaseConfigured, formatFrenchDate } from '../services/newsService';
import { NewsPost, NewsCategory } from '../services/types';
import { 
  Sliders, 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  Check, 
  AlertCircle, 
  Save, 
  Smartphone, 
  Monitor, 
  Clock, 
  Pin, 
  Sparkles,
  ArrowLeft,
  Database
} from 'lucide-react';

interface AdminNewsPageProps {
  navigate: (path: string) => void;
}

export const AdminNewsPage: React.FC<AdminNewsPageProps> = ({ navigate }) => {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [categories, setCategories] = useState<NewsCategory[]>(DEFAULT_CATEGORIES);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<Partial<NewsPost> | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [showPreview, setShowPreview] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    setLoading(true);
    try {
      const [cats, news] = await Promise.all([
        newsService.getCategories(),
        newsService.getAllNewsForAdmin(),
      ]);
      setCategories(cats);
      setPosts(news);
    } catch {
      setFeedback({ type: 'error', message: 'Erreur lors du chargement des annonces.' });
    } finally {
      setLoading(false);
    }
  }

  const handleStartCreate = () => {
    setEditingPost({
      title: '',
      subtitle: '',
      content: '',
      category_id: 'annonces',
      author_name: 'Équipe ComicCrafte Studio',
      status: 'published',
      cover_image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80',
      is_featured: false,
      is_important: false,
      is_pinned: false,
      app_version: '1.2.0',
      platform_compatibility: ['Android', 'Web'],
    });
    setShowPreview(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost?.title?.trim() || !editingPost?.content?.trim()) {
      setFeedback({ type: 'error', message: 'Le titre et le contenu sont obligatoires.' });
      return;
    }

    try {
      await newsService.saveNewsPost(editingPost as any);
      setFeedback({ type: 'success', message: 'Publication enregistrée avec succès.' });
      setEditingPost(null);
      await loadAll();
    } catch {
      setFeedback({ type: 'error', message: 'Erreur lors de la sauvegarde.' });
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Confirmez-vous la suppression définitive de : "${title}" ?`)) {
      return;
    }
    try {
      await newsService.deleteNewsPost(id);
      setFeedback({ type: 'success', message: 'Annonce supprimée avec succès.' });
      await loadAll();
    } catch {
      setFeedback({ type: 'error', message: 'Échec de la suppression.' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Barre supérieure */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <button
            onClick={() => navigate('/actualites')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à l'espace public des actualités</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
            <Sliders className="w-6 h-6 text-[#FF6A00]" />
            <span>Administration des Actualités & Mises à jour</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleStartCreate}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6A00] to-[#FF8A33] text-white text-xs font-bold shadow-md hover:from-[#e55f00] hover:to-[#e67b2d] transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Nouvelle publication</span>
          </button>
        </div>
      </div>

      {/* État de synchronisation Supabase */}
      <div className="p-4 rounded-2xl bg-[#151515] border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <Database className="w-4 h-4 text-[#FF6A00]" />
          <span>
            Connecteur Supabase :{' '}
            {isSupabaseConfigured ? (
              <span className="font-semibold text-emerald-400">Connecté & Actif</span>
            ) : (
              <span className="font-semibold text-amber-400">Mode Local Résilient (Prêt pour VITE_SUPABASE_URL)</span>
            )}
          </span>
        </div>
        <span className="text-neutral-400 text-[11px]">
          Toutes les modifications sont immédiatement synchronisées.
        </span>
      </div>

      {/* Message de notification */}
      {feedback && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center justify-between border ${
            feedback.type === 'success'
              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
              : 'bg-red-500/15 border-red-500/30 text-red-300'
          }`}
        >
          <span>{feedback.message}</span>
          <button onClick={() => setFeedback(null)} className="text-xs underline ml-2">
            Fermer
          </button>
        </div>
      )}

      {/* MODAL OU FORMULAIRE D'ÉDITION AVEC PRÉVISUALISATION */}
      {editingPost && (
        <div className="rounded-3xl bg-[#151515] border border-[#FF6A00]/40 p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
            <h2 className="text-lg font-bold text-white">
              {editingPost.id ? 'Modifier la publication' : 'Créer une nouvelle publication'}
            </h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 transition-colors"
              >
                <Eye className="w-4 h-4 text-[#FF6A00]" />
                <span>{showPreview ? 'Masquer aperçu' : 'Prévisualiser'}</span>
              </button>
              <button
                type="button"
                onClick={() => setEditingPost(null)}
                className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-400 hover:text-white"
              >
                Annuler
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Formulaire */}
            <form onSubmit={handleSave} className={`${showPreview ? 'lg:col-span-6' : 'lg:col-span-12'} space-y-4`}>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-300 block">Titre *</label>
                <input
                  type="text"
                  required
                  value={editingPost.title || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  placeholder="Titre clair et captivant"
                  className="w-full px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#FF6A00]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-300 block">Sous-titre / Résumé</label>
                <input
                  type="text"
                  value={editingPost.subtitle || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, subtitle: e.target.value })}
                  placeholder="Brève introduction"
                  className="w-full px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#FF6A00]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300 block">Catégorie</label>
                  <select
                    value={editingPost.category_id || 'annonces'}
                    onChange={(e) => setEditingPost({ ...editingPost, category_id: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300 block">Statut</label>
                  <select
                    value={editingPost.status || 'published'}
                    onChange={(e) => setEditingPost({ ...editingPost, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white"
                  >
                    <option value="published">Publiée immédiatement</option>
                    <option value="draft">Brouillon (Non visible)</option>
                    <option value="scheduled">Programmée</option>
                    <option value="archived">Archivée</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300 block">Version app (facultatif)</label>
                  <input
                    type="text"
                    value={editingPost.app_version || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, app_version: e.target.value })}
                    placeholder="Ex: 1.2.0"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-300 block">Image de couverture (URL)</label>
                <input
                  type="url"
                  value={editingPost.cover_image || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, cover_image: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-300 block">Contenu complet (Markdown supporté) *</label>
                <textarea
                  required
                  rows={8}
                  value={editingPost.content || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  placeholder="Rédigez l'annonce..."
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#FF6A00] font-mono"
                />
              </div>

              {/* Options & Drapeaux */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-300 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(editingPost.is_featured)}
                    onChange={(e) => setEditingPost({ ...editingPost, is_featured: e.target.checked })}
                    className="rounded text-[#FF6A00]"
                  />
                  <span>Mettre à la une</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(editingPost.is_important)}
                    onChange={(e) => setEditingPost({ ...editingPost, is_important: e.target.checked })}
                    className="rounded text-[#FF6A00]"
                  />
                  <span>Annonce Importante</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(editingPost.is_pinned)}
                    onChange={(e) => setEditingPost({ ...editingPost, is_pinned: e.target.checked })}
                    className="rounded text-[#FF6A00]"
                  />
                  <span>Épingler en haut</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6A00] to-[#FF8A33] text-white text-xs font-bold shadow-md hover:from-[#e55f00] hover:to-[#e67b2d]"
                >
                  <Save className="w-4 h-4" />
                  <span>Enregistrer et appliquer</span>
                </button>
              </div>
            </form>

            {/* Panneau de prévisualisation en direct (Desktop / Mobile) */}
            {showPreview && (
              <div className="lg:col-span-6 bg-neutral-900 border border-neutral-800 rounded-2xl p-4 space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                  <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                    Aperçu en direct
                  </span>
                  <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setPreviewMode('desktop')}
                      className={`p-1 rounded ${previewMode === 'desktop' ? 'bg-[#FF6A00] text-white' : 'text-neutral-400'}`}
                      title="Vue Ordinateur"
                    >
                      <Monitor className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewMode('mobile')}
                      className={`p-1 rounded ${previewMode === 'mobile' ? 'bg-[#FF6A00] text-white' : 'text-neutral-400'}`}
                      title="Vue Mobile Android"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className={`mx-auto bg-[#151515] border border-neutral-800 rounded-xl overflow-hidden p-4 space-y-3 ${previewMode === 'mobile' ? 'max-w-xs' : 'w-full'}`}>
                  {editingPost.cover_image && (
                    <img
                      src={editingPost.cover_image}
                      alt="Aperçu"
                      className="w-full aspect-video object-cover rounded-lg"
                    />
                  )}
                  <div className="flex items-center gap-2 text-[10px] text-neutral-400">
                    <span>Aujourd'hui</span>
                    <span>•</span>
                    <span className="text-[#FF8A33]">ComicCrafte Studio</span>
                  </div>
                  <h3 className="text-sm font-bold text-white leading-snug">
                    {editingPost.title || 'Titre de la publication'}
                  </h3>
                  <p className="text-xs text-neutral-300 line-clamp-2">
                    {editingPost.subtitle || 'Sous-titre explicatif...'}
                  </p>
                  <div className="text-xs text-neutral-400 whitespace-pre-wrap font-sans border-t border-neutral-800 pt-2 line-clamp-4">
                    {editingPost.content || 'Contenu complet de la publication...'}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* LISTE DES PUBLICATIONS EXISTANTES */}
      <div className="rounded-3xl bg-[#151515] border border-neutral-800 overflow-hidden shadow-xl">
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
          <h2 className="text-base font-bold text-white">
            Publications enregistrées ({posts.length})
          </h2>
          <span className="text-xs text-neutral-400">Classées par date de création</span>
        </div>

        {posts.length === 0 ? (
          <div className="p-12 text-center text-xs text-neutral-400">
            Aucune publication enregistrée pour l'instant.
          </div>
        ) : (
          <div className="divide-y divide-neutral-800">
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-neutral-900/50 transition-colors"
              >
                <div className="space-y-1 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      post.status === 'published' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-neutral-800 text-neutral-400'
                    }`}>
                      {post.status}
                    </span>
                    {post.is_featured && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FF6A00] text-white">
                        À la une
                      </span>
                    )}
                    <span className="text-neutral-500 text-[11px]">
                      {formatFrenchDate(post.published_at || post.created_at)}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{post.title}</h3>
                  <p className="text-xs text-neutral-400 line-clamp-1">{post.subtitle || post.content}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => navigate(`/actualites/${post.slug}`)}
                    className="p-2 rounded-xl bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800"
                    title="Voir en ligne"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setEditingPost(post);
                      setShowPreview(false);
                      window.scrollTo({ top: 200, behavior: 'smooth' });
                    }}
                    className="p-2 rounded-xl bg-neutral-900 text-neutral-300 hover:text-[#FF8A33] border border-neutral-800"
                    title="Modifier"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    className="p-2 rounded-xl bg-neutral-900 text-neutral-400 hover:text-red-400 border border-neutral-800"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
