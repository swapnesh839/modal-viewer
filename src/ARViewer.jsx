import React, { useRef, useState } from 'react'
import '@google/model-viewer';
import model from "../src/Roses.glb";
import modelios from "../src/Roses.usdz";
import logo from "../src/hdr/Logo.png"
import { Box, Camera, Forward, Fullscreen, Minimize } from 'lucide-react';
import "../src/App.css"

const ARViewer = () => {
  const viewerRef = useRef(null);
  const [fullscreen, setfullscreen] = useState(false);

  // const handleFullScreen = () => {
  //   if (viewerRef.current) {
  //     viewerRef.current.requestFullscreen();
  //   }
  // };

  const handleFullScreen = () => {
    setfullscreen(i => !i)
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

  return (
    <model-viewer
      id="color"
      ref={viewerRef}
      autoplay
      ar
      ar-modes="webxr scene-viewer quick-look"
      // ar-scale="fixed"
      camera-orbit="-30deg auto auto"
      max-camera-orbit="auto 100deg auto"
      shadow-intensity="2"
      camera-controls
      touch-action="pan-y"
      poster="/public/logo192.png"
      src={model}
      ios-src={modelios}
      auto-rotate
      style={{ width: '100%', height: '100vh' }}
      // exposure="1.7"
      shadow-softness="0"
      // tone-mapping="linear"
      // tone-mapping="aces"
      // tone-mapping="filmic"
      tone-mapping="commerce"
      // tone-mapping="hejl"
      // tone-mapping="uncharted2"
      class="container_div"
      ar-status="presenting"
      ar-placement="floor"
      // ar-placement="auto"
      interaction-prompt="auto"
      interaction-prompt-style="wiggle"
      min-camera-orbit="auto 0deg auto"
      max-field-of-view="45deg"
      min-field-of-view="10deg"
      // bounds="tight"
      bounds="auto"
      // skybox-image="/src/hdr/illovo_beach_balcony_4k.hdr"
      // environment-image="/src/hdr/illovo_beach_balcony_4k.hdr"
      alt="AR Model"
    >
      <img className='position-absolute top-0 start-0 z-3' alt='logo' src={logo} width={200} />
      <div className='position-absolute end-0 top-50 rounded d-flex flex-column translate-middle z-3 bg-dark-subtle'>
        <span
          className='m-1 p-1 border rounded-2 pointer'
          onClick={handleFullScreen}
        >
          {fullscreen ?<Minimize /> : <Fullscreen xlinkTitle='fullscreen' />} 
        </span>
        <span
          className='m-1 p-1 border rounded-2 pointer'
          onClick={handleCaptureImage}
        >
          <Camera />
        </span>
        <span
          className='m-1 p-1 border rounded-2 pointer'
        // onClick={handleCaptureImage}
        >
          <Forward />
        </span>
      </div>
      <model-viewer-lights
        shadow-intensity="1"
        environment-image="/src/hdr/illovo_beach_balcony_4k.hdr"
        shadow-softness="0.55"
      />
      <button slot="ar-button" className='pointer position-absolute bottom-0 start-50 bg-black '>
      <Box /> AR 
      </button>
    </model-viewer>
  );
};

export default ARViewer;
