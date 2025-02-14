import Dot from './Dot';
import fontFile from './AvenirNextLTPro-Demi.otf';

const defaultFrameRate = 30; // low framerate to avoid too much strain on mobile phones


export default (parent, text) => (sketch) => {
  let font;
  let dots;
  let firstWordPoints;
  let secondWordPoints;

  sketch.preload = () => {
    font = sketch.loadFont(fontFile);
  };

  const fillDots = (width, height) => {
    dots = [];
    let parts = text.split('♥').map(part => part.trim());
    let beforeHeart = parts[0]; // Will be "M A R T I N"
    let afterHeart = parts[1];  // Will be "J A N C Y"

    // Colors
    const textColor = '#0000FF'; // Blue
    const heartColor = '#FF0000'; // Red
    
    // Calculate font sizes and spacing
    const fontSize = Math.min(width, height) * 0.12;
    const spacing = height * 0.3;
    
    // Center alignment calculations
    const centerX = width / 2;
    // Adjust text offset calculation for pre-spaced text
    const getTextOffset = (text, size) => (text.length * size * 0.5) / 2;
    
    // Calculate positions for vertical layout
    const verticalStart = height * 0.2;
    
    // Animation parameters
    const waveAmplitude = 5; // Wave movement amplitude
    const waveSpeed = 0.02; // Wave movement speed
    const floatAmplitude = 3; // Floating movement amplitude
    const floatSpeed = 0.015; // Floating movement speed
    
    // First name (M A R T I N) - centered
    const martinOffset = getTextOffset(beforeHeart, fontSize);
    firstWordPoints = font.textToPoints(
      beforeHeart, 
      centerX - martinOffset,
      verticalStart,
      fontSize,
      { 
        sampleFactor: 0.25, // Increased dot density
        spacing: 0.2 // Keep letter spacing
      }
    );

    // Heart in the middle - centered
    const heartSize = fontSize * 1.2;
    const heartY = verticalStart + spacing * 1.2;
    addHeartPoints(centerX, heartY, heartSize);

    // Second name (J A N C Y) - centered
    const jancyOffset = getTextOffset(afterHeart, fontSize);
    secondWordPoints = font.textToPoints(
      afterHeart, 
      centerX - jancyOffset,
      verticalStart + (spacing * 2.4),
      fontSize,
      { 
        sampleFactor: 0.25, // Increased dot density
        spacing: 0.2 // Keep letter spacing
      }
    );

    function addHeartPoints(x, y, size) {
      const heartPoints = [];
      const steps = 25; // Reduced for clearer heart shape
      
      // Create heart outline
      for (let i = 0; i < steps; i++) {
        const t = (i / steps) * Math.PI * 2;
        const heartX = x + size * (16 * Math.pow(Math.sin(t), 3)) / 16;
        const heartY = y - size * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 16;
        heartPoints.push({ x: heartX, y: heartY });
      }

      // Add fewer fill points for clearer shape
      const fillPoints = Math.floor(steps * 0.6);
      for (let i = 0; i < fillPoints; i++) {
        const t = (i / fillPoints) * Math.PI * 2;
        const scale = Math.random() * 0.4 + 0.3; // More consistent fill
        const heartX = x + scale * size * (16 * Math.pow(Math.sin(t), 3)) / 16;
        const heartY = y - scale * size * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 16;
        heartPoints.push({ x: heartX, y: heartY });
      }

      heartPoints.forEach(point => {
        dots.push(new Dot(point.x, point.y, sketch, heartColor, {
          waveAmplitude: waveAmplitude * 1.2,
          waveSpeed: waveSpeed * 1.2,
          floatAmplitude: floatAmplitude * 1.2,
          floatSpeed: floatSpeed * 1.2,
          delay: 0,
          size: 6 // Increased dot size
        }));
      });
    }

    // Add dots for text
    firstWordPoints.forEach((point, index) => {
      dots.push(new Dot(point.x, point.y, sketch, textColor, {
        waveAmplitude,
        waveSpeed,
        floatAmplitude,
        floatSpeed,
        delay: index * 0.1
      }));
    });

    secondWordPoints.forEach((point, index) => {
      dots.push(new Dot(point.x, point.y, sketch, textColor, {
        waveAmplitude,
        waveSpeed,
        floatAmplitude,
        floatSpeed,
        delay: index * 0.1
      }));
    });
  };

  sketch.setup = () => {
    const width = parent.offsetWidth;
    const height = parent.offsetHeight;
    sketch.createCanvas(width, height);
    fillDots(width, height);
    sketch.frameRate(defaultFrameRate);
  };

  sketch.draw = () => {
    sketch.clear();
    dots.forEach((dot) => {
      dot.update();
      dot.applyAllForces();
      dot.show();
    });
  };

  // Add window resize handler
  sketch.windowResized = () => {
    const width = parent.offsetWidth;
    const height = parent.offsetHeight;
    sketch.resizeCanvas(width, height);
    fillDots(width, height);
  };
};
