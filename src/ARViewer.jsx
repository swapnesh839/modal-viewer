import React, { useRef, useState, useEffect } from 'react';
import '@google/model-viewer';
import basketball_shoe from "../src/basketball_shoe.glb";
import basketball_shoeios from "../src/basketball_shoe.usdz";
import logo from "../src/hdr/Logo.png";
import hdri from "../src/hdr/illovo_beach_balcony_4k.hdr";
import { Box, Camera, Forward, Fullscreen, Minimize, X } from 'lucide-react';
import "../src/App.css";

const ARViewer = () => {
  const viewerRef = useRef(null);
  const [fullscreen, setfullscreen] = useState(false);
  const [open, setopen] = useState(false);
  const [showDimensions, setShowDimensions] = useState(true);

  const handleFullScreen = () => {
    setfullscreen(prev => !prev);
    if (viewerRef.current) {
      const element = viewerRef.current;

      if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        // If no element is in fullscreen, enter fullscreen
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.mozRequestFullScreen) { // Firefox
          element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) { // Chrome, Safari and Opera
          element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) { // IE/Edge
          element.msRequestFullscreen();
        }
      } else {
        // Otherwise, exit fullscreen
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
          document.msExitFullscreen();
        }
      }
    }
  };

  const handleCaptureImage = () => {
    if (viewerRef.current) {
      const imgDataUrl = viewerRef.current.toDataURL();

      const link = document.createElement('a');
      link.href = imgDataUrl;
      link.download = 'captured_image.png';

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    }
  };

  useEffect(() => {
    const modelViewer = viewerRef.current;

    if (modelViewer) {
      const updateDimensions = () => {
        const size = modelViewer.getBoundingBox().size;
        const center = modelViewer.getBoundingBox().center;

        // Example: Update hotspots
        modelViewer.hotspot.add({
          name: 'hotspot-dot+X-Y+Z',
          position: `${center.x + size.x / 2} ${center.y - size.y / 2} ${center.z + size.z / 2}`
        });

        modelViewer.hotspot.add({
          name: 'hotspot-dim+X-Y',
          position: `${center.x + size.x / 2 * 1.2} ${center.y - size.y / 2 * 1.1} ${center.z}`
        });
        modelViewer.querySelector('button[slot="hotspot-dim+X-Y"]').textContent = `${(size.z * 100).toFixed(0)} cm`;

        modelViewer.hotspot.add({
          name: 'hotspot-dot+X-Y-Z',
          position: `${center.x + size.x / 2} ${center.y - size.y / 2} ${center.z - size.z / 2}`
        });

        modelViewer.hotspot.add({
          name: 'hotspot-dim+X-Z',
          position: `${center.x + size.x / 2 * 1.2} ${center.y} ${center.z - size.z / 2 * 1.2}`
        });
        modelViewer.querySelector('button[slot="hotspot-dim+X-Z"]').textContent = `${(size.y * 100).toFixed(0)} cm`;

        modelViewer.hotspot.add({
          name: 'hotspot-dot+X+Y-Z',
          position: `${center.x + size.x / 2} ${center.y + size.y / 2} ${center.z - size.z / 2}`
        });

        modelViewer.hotspot.add({
          name: 'hotspot-dim+Y-Z',
          position: `${center.x} ${center.y + size.y / 2 * 1.1} ${center.z - size.z / 2 * 1.1}`
        });
        modelViewer.querySelector('button[slot="hotspot-dim+Y-Z"]').textContent = `${(size.x * 100).toFixed(0)} cm`;

        modelViewer.hotspot.add({
          name: 'hotspot-dot-X+Y-Z',
          position: `${center.x - size.x / 2} ${center.y + size.y / 2} ${center.z - size.z / 2}`
        });

        modelViewer.hotspot.add({
          name: 'hotspot-dim-X-Z',
          position: `${center.x - size.x / 2 * 1.2} ${center.y} ${center.z - size.z / 2 * 1.2}`
        });
        modelViewer.querySelector('button[slot="hotspot-dim-X-Z"]').textContent = `${(size.y * 100).toFixed(0)} cm`;

        modelViewer.hotspot.add({
          name: 'hotspot-dot-X-Y-Z',
          position: `${center.x - size.x / 2} ${center.y - size.y / 2} ${center.z - size.z / 2}`
        });

        modelViewer.hotspot.add({
          name: 'hotspot-dim-X-Y',
          position: `${center.x - size.x / 2 * 1.2} ${center.y - size.y / 2 * 1.1} ${center.z}`
        });
        modelViewer.querySelector('button[slot="hotspot-dim-X-Y"]').textContent = `${(size.z * 100).toFixed(0)} cm`;

        modelViewer.hotspot.add({
          name: 'hotspot-dot-X-Y+Z',
          position: `${center.x - size.x / 2} ${center.y - size.y / 2} ${center.z + size.z / 2}`
        });

        // Update the dimension lines
        renderSVG();
      };

      const renderSVG = () => {
        const dimLines = modelViewer.querySelectorAll('line');

        const drawLine = (svgLine, dotHotspot1, dotHotspot2, dimensionHotspot) => {
          if (dotHotspot1 && dotHotspot2) {
            svgLine.setAttribute('x1', dotHotspot1.canvasPosition.x);
            svgLine.setAttribute('y1', dotHotspot1.canvasPosition.y);
            svgLine.setAttribute('x2', dotHotspot2.canvasPosition.x);
            svgLine.setAttribute('y2', dotHotspot2.canvasPosition.y);

            if (dimensionHotspot && !dimensionHotspot.facingCamera) {
              svgLine.classList.add('hide');
            } else {
              svgLine.classList.remove('hide');
            }
          }
        };

        drawLine(dimLines[0], modelViewer.queryHotspot('hotspot-dot+X-Y+Z'), modelViewer.queryHotspot('hotspot-dot+X-Y-Z'), modelViewer.queryHotspot('hotspot-dim+X-Y'));
        drawLine(dimLines[1], modelViewer.queryHotspot('hotspot-dot+X-Y-Z'), modelViewer.queryHotspot('hotspot-dot+X+Y-Z'), modelViewer.queryHotspot('hotspot-dim+X-Z'));
        drawLine(dimLines[2], modelViewer.queryHotspot('hotspot-dot+X+Y-Z'), modelViewer.queryHotspot('hotspot-dot-X+Y-Z')); // always visible
        drawLine(dimLines[3], modelViewer.queryHotspot('hotspot-dot-X+Y-Z'), modelViewer.queryHotspot('hotspot-dot-X-Y-Z'), modelViewer.queryHotspot('hotspot-dim-X-Z'));
        drawLine(dimLines[4], modelViewer.queryHotspot('hotspot-dot-X-Y-Z'), modelViewer.queryHotspot('hotspot-dot-X-Y+Z'), modelViewer.queryHotspot('hotspot-dim-X-Y'));
      };

      modelViewer.addEventListener('load', updateDimensions);

      return () => {
        modelViewer.removeEventListener('load', updateDimensions);
      };
    }
  }, []);

  return (
    <>
      <model-viewer
        id="color"
        ref={viewerRef}
        autoplay
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-orbit="-30deg auto auto"
        max-camera-orbit="auto 100deg auto"
        shadow-intensity="2"
        camera-controls
        touch-action="pan-y"
        poster="/public/logo192.png"
        src={basketball_shoe}
        ios-src={basketball_shoeios} // ios src
        auto-rotate
        style={{ width: '100%', height: '100vh' }}
        shadow-softness="0"
        tone-mapping="filmic"
        class="container_div"
        ar-status="presenting"
        ar-placement="floor"
        interaction-prompt="auto"
        interaction-prompt-style="wiggle"
        min-camera-orbit="auto 0deg auto"
        max-field-of-view="45deg"
        min-field-of-view="10deg"
        bounds="auto"
        alt="AR Model"
      >
        <img className='position-absolute top-0 start-0 z-3 mt-2 ms-2 bg-dark-subtle rounded px-2' alt='logo' src={logo} width={100} />
        <div className='position-absolute transition-element end-0 top-50 rounded d-flex flex-column translate-middle-x z-3 bg-dark-subtle'>
          <span
            className='m-1 p-1 border rounded-2 pointer'
            onClick={() => { setopen(!open) }}
          >
            {open ? <X className='transition-element' /> : <X className='transition-element' style={{ rotate: '-135deg' }} />}
          </span>
          {open && <>
            <span
              className='m-1 transition-element p-1 border rounded-2 pointer'
              onClick={handleFullScreen}
            >
              {fullscreen ? <Minimize /> : <Fullscreen xlinkTitle='fullscreen' />}
            </span>
            <span
              className='m-1 transition-element p-1 border rounded-2 pointer'
              onClick={handleCaptureImage}
            >
              <Camera />
            </span>
            <span
              className='m-1 transition-element p-1 border rounded-2 pointer'
            >
              <Forward />
            </span>
          </>}
        </div>
        <model-viewer-lights
          shadow-intensity="2"
          environment-image={hdri}
          shadow-softness="0.55"
        />
        <button slot="ar-button" className='position-absolute btn-16 px-4 border py-2 border-2 shadow z-3 rounded pointer bottom-0 start-50 translate-middle'>
          <Box /> AR View
        </button>
        {showDimensions && (
          <svg className="dimensions-svg" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            <line stroke="red" strokeWidth="2" />
            <line stroke="green" strokeWidth="2" />
            <line stroke="blue" strokeWidth="2" />
            <line stroke="yellow" strokeWidth="2" />
          </svg>
        )}
      </model-viewer>
    </>
  );
};

export default ARViewer;
