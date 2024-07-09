import '@google/model-viewer';
import model from "../src/Headphone3M.glb"

const ARViewer = () => {
  return (
    // <model-viewer
    //   src={model}
    //   alt="Headphones"
    //   ar
    //   ar-modes="scene-viewer quick-look webxr"
    //   camera-controls
    //   environment-image="neutral"
    //   auto-rotate
    //   style={{ width: '100%', height: '100vh' }}
    // >
    <model-viewer id="color"
     autoplay ar 
    ar-modes="webxr scene-viewer quick-look"
     ar-scale 
     camera-orbit="-30deg auto auto" 
     max-camera-orbit="auto 100deg auto" 
     shadow-intensity="1" 
     camera-controls touch-action="pan-y" 
     poster="/public/logo192.png" 
     src={model} 
    //  disabled-ios-src="/static/bestbuysofa.usdz" 
     auto-rotate 
     style={{ width: '100%', height: '100vh' }}
     exposure="1" 
     shadow-softness="0.55" 
     tone-mapping="commerce" 
     class="container_div" 
     ar-status="presenting">
      {/* <button slot="ar-button" style={{ background: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>
        View in AR
      </button> */}
    </model-viewer>
  );
};

export default ARViewer;
