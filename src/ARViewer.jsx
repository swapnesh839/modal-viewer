import React, { useRef, useState,useEffect } from 'react'
import '@google/model-viewer';
// import model from "../src/Roses.glb";
// import modelios from "../src/Roses.usdz";
import basketball_shoe from "../src/basketball_shoe.glb";
import basketball_shoeios from "../src/basketball_shoe.usdz";
import logo from "../src/hdr/Logo.png"
import hdri from "../src/hdr/illovo_beach_balcony_4k.hdr"
import { Box, Camera,Forward, Fullscreen, Minimize, X } from 'lucide-react';
import "../src/App.css"

const ARViewer = () => {
  const viewerRef = useRef(null);
  const [fullscreen, setfullscreen] = useState(false);
  const [open, setopen] = useState(false);
  // const [modelColor, setModelColor] = useState('#ffffff');

  // const handleColorChange = (event) => {
  //   setModelColor(event.target.value);
  // };

  useEffect(() => {
    if (viewerRef.current) {
      const modelViewer = viewerRef.current;

      const updateMaterialColor = () => {
        const materials = modelViewer?.model?.materials;
        if (Array.isArray(materials)) {
          if (materials.length > 0) {
            materials[0].pbrMetallicRoughness.setBaseColorFactor(modelColor);
          }
        }
      };
      updateMaterialColor()
    }
  }, [modelColor]);
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
      src={basketball_shoe}
      ios-src={basketball_shoeios} // ios src
      auto-rotate
      style={{ width: '100%', height: '100vh' }}
      // exposure="1.7"
      shadow-softness="0"
      // tone-mapping="linear"
      // tone-mapping="aces"
      tone-mapping="filmic"
      // tone-mapping="commerce"
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
      // skybox-image={hdri}
      // environment-image={hdri}
      alt="AR Model"
    >
      <img className='position-absolute top-0 start-0 z-3 mt-2 ms-2 bg-dark-subtle rounded px-2' alt='logo' src={logo} width={100} />
      <div className='position-absolute transition-element end-0 top-50 rounded d-flex flex-column translate-middle-x z-3 bg-dark-subtle'>
        <span
          className='m-1 p-1 border rounded-2 pointer'
          onClick={() => { setopen(!open) }}
        >
          {open ? <X className='transition-element' /> : <X className='transition-element'  style={{ rotate: '-135deg' }}/>}
        </span>
        {
          open && <>
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
            // onClick={handleCaptureImage}
            >
              <Forward />
            </span>
          </>
        }
      </div>
      <model-viewer-lights
        shadow-intensity="2"
        environment-image={hdri}
        shadow-softness="0.55"
      />
      <button slot="ar-button" className='position-absolute btn-16 px-4 border py-2 border-2 shadow z-3 rounded pointer bottom-0 start-50 translate-middle'>
        <Box /> AR View
      </button>
      <button className='position-absolute btn-16 px-4 border py-2 border-2 shadow rounded pointer bottom-0 start-50 translate-middle'>
        <Box /> AR View
      </button>
      {/* <span slot="ar-button" className='pointer position-absolute bottom-0 start-50 bg-black '>
      <Box /> AR 
      </span> */}
       {/* <input
        type="color"
        value={modelColor}
        onChange={handleColorChange}
        style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000 }}
      /> */}

    </model-viewer>
  );
};

export default ARViewer;
