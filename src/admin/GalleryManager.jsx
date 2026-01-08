import { useState, useEffect } from 'react';
import githubService from '../services/githubService';
import galleryDataJson from '../data/galleryData.json';
import './GalleryManager.css';

const GalleryManager = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [githubToken, setGithubToken] = useState('');
  const [repoOwner, setRepoOwner] = useState('');
  const [repoName, setRepoName] = useState('');
  const [showTokenSetup, setShowTokenSetup] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    type: 'video',
    title: '',
    description: '',
    image: '',
    videoUrl: ''
  });

  useEffect(() => {
    setItems(galleryDataJson);
    
    // Load saved GitHub config
    const savedToken = localStorage.getItem('githubToken');
    const savedOwner = localStorage.getItem('githubRepoOwner');
    const savedName = localStorage.getItem('githubRepoName');
    
    if (savedToken && savedOwner && savedName) {
      setGithubToken(savedToken);
      setRepoOwner(savedOwner);
      setRepoName(savedName);
    } else {
      setShowTokenSetup(true);
    }
  }, []);

  const saveGithubConfig = () => {
    if (!githubToken || !repoOwner || !repoName) {
      alert('Compila tutti i campi GitHub');
      return;
    }
    
    localStorage.setItem('githubToken', githubToken);
    localStorage.setItem('githubRepoOwner', repoOwner);
    localStorage.setItem('githubRepoName', repoName);
    setShowTokenSetup(false);
    alert('Configurazione GitHub salvata! ✅');
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!githubToken || !repoOwner || !repoName) {
      alert('Configura prima le credenziali GitHub!');
      setShowTokenSetup(true);
      return;
    }

    setUploadingImage(true);
    try {
      const imagePath = await githubService.uploadImage(
        file,
        githubToken,
        repoOwner,
        repoName
      );
      
      setFormData(prev => ({
        ...prev,
        image: imagePath
      }));
      
      alert('Immagine caricata con successo! ✅');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Errore nel caricamento: ' + error.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!githubToken || !repoOwner || !repoName) {
      alert('Configura prima le credenziali GitHub!');
      setShowTokenSetup(true);
      return;
    }

    setSaving(true);
    try {
      let updatedItems;
      
      if (editingItem) {
        // Update existing item
        updatedItems = items.map(item =>
          item.id === editingItem.id ? { ...formData, id: editingItem.id } : item
        );
      } else {
        // Add new item
        const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
        updatedItems = [...items, { ...formData, id: newId }];
      }

      // Commit to GitHub
      await githubService.updateGalleryData(
        updatedItems,
        githubToken,
        repoOwner,
        repoName
      );

      setItems(updatedItems);
      resetForm();
      alert('Galleria aggiornata con successo! 🎉\nIl sito verrà aggiornato automaticamente tra pochi minuti.');
    } catch (error) {
      console.error('Error saving:', error);
      alert('Errore nel salvataggio: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setIsAddingNew(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Sei sicura di voler eliminare questo elemento?')) return;

    if (!githubToken || !repoOwner || !repoName) {
      alert('Configura prima le credenziali GitHub!');
      setShowTokenSetup(true);
      return;
    }

    setSaving(true);
    try {
      const updatedItems = items.filter(item => item.id !== id);
      
      await githubService.updateGalleryData(
        updatedItems,
        githubToken,
        repoOwner,
        repoName
      );

      setItems(updatedItems);
      alert('Elemento eliminato! ✅');
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Errore nell\'eliminazione: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      type: 'video',
      title: '',
      description: '',
      image: '',
      videoUrl: ''
    });
    setEditingItem(null);
    setIsAddingNew(false);
  };

  const startAddNew = () => {
    resetForm();
    setIsAddingNew(true);
  };

  return (
    <div className="gallery-manager">
      <div className="manager-header">
        <h2>🎬 Gestione Galleria</h2>
        <button onClick={() => setShowTokenSetup(true)} className="config-btn">
          ⚙️ Configurazione GitHub
        </button>
      </div>

      {showTokenSetup && (
        <div className="github-setup">
          <h3>🔐 Configurazione GitHub</h3>
          <p className="setup-info">
            Per permettere il caricamento automatico delle immagini e l'aggiornamento della galleria, 
            inserisci i dati del tuo repository GitHub.
          </p>
          
          <div className="setup-steps">
            <h4>Come ottenere il Token:</h4>
            <ol>
              <li>Vai su GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)</li>
              <li>Clicca "Generate new token (classic)"</li>
              <li>Seleziona le autorizzazioni: <code>repo</code> (tutte)</li>
              <li>Copia il token generato</li>
            </ol>
          </div>

          <div className="form-group">
            <label>Repository Owner (es. "tuousername")</label>
            <input
              type="text"
              value={repoOwner}
              onChange={(e) => setRepoOwner(e.target.value)}
              placeholder="tuousername"
            />
          </div>

          <div className="form-group">
            <label>Repository Name (es. "GraceWebsite")</label>
            <input
              type="text"
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
              placeholder="GraceWebsite"
            />
          </div>

          <div className="form-group">
            <label>GitHub Personal Access Token</label>
            <input
              type="password"
              value={githubToken}
              onChange={(e) => setGithubToken(e.target.value)}
              placeholder="ghp_xxxxxxxxxxxx"
            />
          </div>

          <div className="setup-actions">
            <button onClick={saveGithubConfig} className="save-config-btn">
              💾 Salva Configurazione
            </button>
            {!showTokenSetup && (
              <button onClick={() => setShowTokenSetup(false)} className="cancel-btn">
                Annulla
              </button>
            )}
          </div>
        </div>
      )}

      {!showTokenSetup && (
        <>
          <div className="items-list">
            <div className="list-header">
              <h3>📋 Elementi Attuali ({items.length})</h3>
              <button onClick={startAddNew} className="add-btn">
                ➕ Aggiungi Nuovo
              </button>
            </div>

            <div className="items-grid">
              {items.map(item => (
                <div key={item.id} className="item-card">
                  <div className="item-preview">
                    <img src={item.image} alt={item.title} />
                    <span className={`item-type type-${item.type}`}>{item.type}</span>
                  </div>
                  <div className="item-info">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                  <div className="item-actions">
                    <button onClick={() => handleEdit(item)} className="edit-btn">
                      ✏️ Modifica
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="delete-btn">
                      🗑️ Elimina
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {(isAddingNew || editingItem) && (
            <div className="item-form">
              <h3>{editingItem ? '✏️ Modifica Elemento' : '➕ Nuovo Elemento'}</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Tipo *</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      required
                    >
                      <option value="video">Video</option>
                      <option value="photo">Photo</option>
                      <option value="ai">AI</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Titolo *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Descrizione *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows="3"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Immagine / Thumbnail *</label>
                  <div className="image-upload">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                    />
                    {uploadingImage && <span className="uploading">⏳ Caricamento...</span>}
                    {formData.image && (
                      <div className="image-preview">
                        <img src={formData.image} alt="Preview" />
                        <span>✅ Immagine caricata</span>
                      </div>
                    )}
                  </div>
                </div>

                {formData.type === 'video' && (
                  <div className="form-group">
                    <label>URL Video (YouTube, Vimeo, etc.) *</label>
                    <input
                      type="url"
                      value={formData.videoUrl}
                      onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                      placeholder="https://www.youtube.com/watch?v=..."
                      required={formData.type === 'video'}
                    />
                  </div>
                )}

                <div className="form-actions">
                  <button type="submit" className="submit-btn" disabled={saving || uploadingImage}>
                    {saving ? '⏳ Salvataggio...' : '💾 Salva e Pubblica'}
                  </button>
                  <button type="button" onClick={resetForm} className="cancel-btn">
                    ❌ Annulla
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GalleryManager;
