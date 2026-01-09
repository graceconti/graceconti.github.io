import { useState, useEffect } from 'react';
import './Gallery.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import galleryDataJson from '../data/galleryData.json';

const Gallery = () => {
  const [filter, setFilter] = useState('video');
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sectionRef, isVisible] = useScrollAnimation(0.2);
  const [galleryItems, setGalleryItems] = useState([]);
  
  const itemsPerPage = 6; // Numero di elementi per pagina

  // Load gallery items from JSON
  useEffect(() => {
    setGalleryItems(galleryDataJson);
  }, []);

  const filteredItems = galleryItems.filter(item => item.type === filter);

  // Calcola paginazione
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  // Reset alla pagina 1 quando cambia il filtro
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openModal = (item) => {
    // Se è un video, apri il link in una nuova scheda
    if (item.type === 'video' && item.videoUrl) {
      window.open(item.videoUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    
    // Altrimenti apri il modal per photo e AI
    setSelectedItem(item);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="gallery" className="gallery" ref={sectionRef}>
      <div className="gallery-container">
        <div className={`gallery-header scroll-animate ${isVisible ? 'visible' : ''}`}>
          <h2 className="section-title">Gallery</h2>
          <div className="title-underline"></div>
        </div>

        <div className={`gallery-filters scroll-animate ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
          <button 
            className={`filter-btn ${filter === 'video' ? 'active' : ''}`}
            onClick={() => handleFilterChange('video')}
          >
            Video
          </button>
          <button 
            className={`filter-btn ${filter === 'photo' ? 'active' : ''}`}
            onClick={() => handleFilterChange('photo')}
          >
            Photo
          </button>
          <button 
            className={`filter-btn ${filter === 'ai' ? 'active' : ''}`}
            onClick={() => handleFilterChange('ai')}
          >
            AI
          </button>
        </div>

        <div className={`gallery-grid scroll-animate-scale ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.4s' }}>
          {currentItems.map((item, index) => (
            <div 
              key={item.id} 
              className="gallery-item"
              onClick={() => openModal(item)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="item-image">
                <img src={item.image} alt={item.title} />
                <div className="item-overlay">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Paginazione */}
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              className="pagination-btn prev" 
              onClick={goToPrevPage}
              disabled={currentPage === 1}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              <span>Previous</span>
            </button>

            <div className="pagination-info">
              <span className="page-current">{currentPage}</span>
              <span className="page-separator">/</span>
              <span className="page-total">{totalPages}</span>
            </div>

            <button 
              className="pagination-btn next" 
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              <span>Next</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        )}

        {/* Modal/Lightbox per immagini */}
        {selectedItem && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <div className="modal-image">
                <img src={selectedItem.image} alt={selectedItem.title} />
                <span className="item-type-badge">{selectedItem.type.toUpperCase()}</span>
              </div>
              <div className="modal-info">
                <h2>{selectedItem.title}</h2>
                <p>{selectedItem.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
