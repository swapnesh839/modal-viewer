// import '@google/model-viewer';
// // import model from "../src/Headphone3M.glb"
// import model from "../src/LOT144.glb"

// const ARViewer = () => {
//   return (
//     // <model-viewer
//     //   src={model}
//     //   alt="Headphones"
//     //   ar
//     //   ar-modes="scene-viewer quick-look webxr"
//     //   camera-controls
//     //   environment-image="neutral"
//     //   auto-rotate
//     //   style={{ width: '100%', height: '100vh' }}
//     // >
//     <model-viewer id="color"
//       autoplay ar
//       ar-modes="webxr scene-viewer quick-look"
//       ar-scale
//       camera-orbit="-30deg auto auto"
//       max-camera-orbit="auto 100deg auto"
//       shadow-intensity="1"
//       camera-controls touch-action="pan-y"
//       poster="/public/logo192.png"
//       src={model}
//       //  disabled-ios-src="/static/bestbuysofa.usdz" 
//       auto-rotate
//       style={{ width: '100%', height: '100vh' }}
//       exposure="1"
//       shadow-softness="0.55"
//       tone-mapping="commerce"
//       class="container_div"
//       ar-status="presenting">
//       {/* <button slot="ar-button" style={{ background: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>
//         View in AR
//       </button> */}
//     </model-viewer>
//   );
// };

// export default ARViewer;

import '@google/model-viewer';
import model from "../src/Roses.glb";

const ARViewer = () => {
  return (
    <model-viewer
      id="color"
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
      // ar-placement="floor"
      ar-placement="auto"
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
      <model-viewer-lights
        shadow-intensity="1"
        environment-image="/src/hdr/illovo_beach_balcony_4k.hdr"
        shadow-softness="0.55"
      />
      <button slot="ar-button" style={{ background: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>
        View in AR
      </button>
    </model-viewer>
  );
};

export default ARViewer;
