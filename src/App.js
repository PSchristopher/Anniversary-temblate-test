import React, { useState, useEffect } from 'react';
import './App.css';
import sketch from './sketch';
import p5 from 'p5';

const TEXT = 'M A R T I N ♥ J A N C Y';

const App = () => {
  const canvasRef = React.useRef(null);
  const [showSurprise, setShowSurprise] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showAnniversary, setShowAnniversary] = useState(false);

  useEffect(() => {
    const canvasDivElement = canvasRef.current;
    new p5(sketch(canvasDivElement, TEXT), canvasDivElement);
    
    // Show anniversary popup after a short delay
    setTimeout(() => setShowAnniversary(true), 1000);
  }, []);

  const handlePhotoClick = (index) => {
    setActivePhoto(index);
    setShowSurprise(true);
  };

  return (
    <div className="main">
      <div className="canvas-container" ref={canvasRef} />
      
      <div className="message-container">
        <div className="floating-hearts">❤️</div>
        <h2 className="love-message">Forever Together</h2>
      </div>

      <div className="photos-container">
        <div className="photo-grid">
          <div 
            className={`photo-item ${isHovered ? 'hovered' : ''}`}
            onClick={() => handlePhotoClick(0)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
          >
            <div className="photo-wrapper">
              <img src="/couple4.jpg" alt="Memory 1" />
              <div className="photo-overlay">
                <span className="heart-icon">❤️</span>
              </div>
            </div>
          </div>
          {/* <div className="photo-item" onClick={() => handlePhotoClick(1)}>
            <img src="/couple2.jpg" alt="Memory 2" />
            <div className="photo-caption">Special Moments</div>
          </div> */}
        </div>
      </div>

      {showSurprise && (
        <div 
          className="surprise-popup" 
          onClick={() => setShowSurprise(false)}
        >
          <div className="surprise-content">
            <h3>💝 My Love 💝</h3>
            <p>Every moment with you is magical...</p>
            <div className="heart-animation">💖</div>
          </div>
        </div>
      )}

      {activePhoto !== null && (
        <div className="photo-modal" onClick={() => setActivePhoto(null)}>
          <div className="modal-content">
            <img src={`/images/couple${activePhoto + 1}.jpg`} alt={`Memory ${activePhoto + 1}`} />
          </div>
        </div>
      )}

      {showAnniversary && (
        <div className="anniversary-popup" onClick={() => setShowAnniversary(false)}>
          <div className="anniversary-content">
            <div className="floating-balloons">
              🎈🎈🎈
            </div>
            <h2 className="anniversary-title">Happy Anniversary!</h2>
            <div className="anniversary-hearts">
              💝 💖 💝
            </div>
            <p className="anniversary-message">
              Another year of beautiful moments together...
            </p>
            <div className="celebration-icons">
              🎉 ✨ 🎊
            </div>
            <button className="close-button" onClick={() => setShowAnniversary(false)}>
              Celebrate Together ❤️
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
