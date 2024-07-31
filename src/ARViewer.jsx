import React, { useRef, useState } from 'react'
import '@google/model-viewer';
import model from "../src/models/lamborghini_huracan_twin_turbo_lost.glb";
import modelios from "../src/models/Lamborghini_Huracan_Twin_Turbo_LOST.usdz";
import logo from "../src/hdr/Logo.png"
import hdri from "../src/hdr/illovo_beach_balcony_4k.hdr"
import { Box } from 'lucide-react';
import "../src/App.css"

const ARViewer = () => {
  const viewerRef = useRef(null);
  return (
    <model-viewer
      id="color"
      ref={viewerRef}
      autoplay
      ar
      ar-modes="webxr scene-viewer quick-look"
      ar-scale="fixed"
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
      bounds="tight"
      // bounds="auto"
      environment-image={hdri}
      alt="AR Model"
    >
      <img className='position-absolute top-0 start-0 z-3 mt-2 ms-2 bg-dark-subtle rounded px-2' alt='logo' src={logo} width={100} />
      <model-viewer-lights
        shadow-intensity="2"
        environment-image={hdri}
        shadow-softness="0.55"
      />
      <button slot="ar-button" className='position-absolute btn-16 px-4 border py-2 border-2 shadow z-3 rounded pointer bottom-0 start-50 translate-middle'>
        <Box /> AR View
      </button>
      {/* <button className='position-absolute btn-16 px-4 border py-2 border-2 shadow rounded pointer bottom-0 z-2 start-50 translate-middle'>
        <Box /> AR View
      </button> */}
    </model-viewer>
  );
};

export default ARViewer;
