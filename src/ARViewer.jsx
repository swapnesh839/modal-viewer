import React, { useEffect, useRef, useState } from 'react';
import '@google/model-viewer';
import Eiffel_tower from "../src/Eiffel_tower.glb";
import Eiffel_towerios from "../src/Eiffel_tower.usdz";
import logo from "../src/hdr/Logo.png";
import hdri from "../src/hdr/illovo_beach_balcony_4k.hdr";
import { Box } from 'lucide-react';
import "../src/App.css";
import { MoonLoader } from 'react-spinners';

const ARViewer = () => {
  const viewerRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);


  return (
    loading ? <Loadingcomp /> : (
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
        src={Eiffel_tower}
        ios-src={Eiffel_towerios}
        // auto-rotate
        style={{ width: '100%', height: '100vh' }}
        shadow-softness="0"
        tone-mapping="filmic"
        class="container_div"
        ar-placement="floor"
        interaction-prompt="auto"
        interaction-prompt-style="wiggle"
        min-camera-orbit="auto 0deg auto"
        max-field-of-view="45deg"
        min-field-of-view="10deg"
        bounds="auto"
        alt="AR Model"
      >
        <a href="https://realitiqxr.com/" rel="noreferrer" target='_blank'>
        <img style={{ maxWidth: "120px" }} className='position-absolute bg-dark-subtle pointer top-0 start-0 z-3 ms-2 p-0 mt-1 rounded' alt='logo' src={logo} />
      </a>
        <model-viewer-lights
          shadow-intensity="2"
          environment-image={hdri}
          shadow-softness="0.55"
        />
        <button slot="ar-button"
          className='position-absolute bipping-button px-4 py-2 z-3 rounded pointer bottom-0 start-50 mb-4 translate-middle-x'>
          <Box /> Explore AR
        </button>
      </model-viewer>
    )
  );
};

export default ARViewer;

const Loadingcomp = () => (
  <div style={{backgroundColor:"#4d5254"}} className='vh-100 text-black d-flex justify-content-center align-items-center'>
    <a href="https://realitiqxr.com/" rel="noreferrer" target='_blank'>
        <img style={{ maxWidth: "120px" }} className='position-absolute bg-dark-subtle pointer top-0 start-0 z-3 ms-2 p-0 mt-1 rounded' alt='logo' src={logo} />
      </a>
    <MoonLoader color="#6200ea" loading={true} size={150} />
  </div>
);
