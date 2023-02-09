import { render } from "preact";
import { useEffect } from "preact/hooks";
import { Textures } from "./OPCraftTextureNames";
import { Scene } from "@babylonjs/core";
import { Engine, } from "noa-engine";
import * as BABYLON from "@babylonjs/core";



export function createMeshBlock(noa: Engine, scene: Scene, texture: string, name: string, frames = 1) {
  const matname = name || "mat";
  const tex = new BABYLON.Texture(texture, scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);
  tex.hasAlpha = true;
  const mesh = BABYLON.Mesh.CreatePlane("sprite-" + matname, 1, scene);
  const material = noa.rendering.makeStandardMaterial(matname);
  material.backFaceCulling = false;
  material.diffuseTexture = tex;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  material.diffuseTexture.vOffset = 0.99;
  mesh.material = material;
  mesh.rotation.y += 0.81;
  material.diffuseTexture.wrapV = BABYLON.Texture.WRAP_ADDRESSMODE;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  material.diffuseTexture.vScale = 1 / frames;

  material.unfreeze();

  let time = 0;
  const frameTime = 30;
  scene.registerBeforeRender(() => {
    time++;
    const currentFrame = Math.floor(time / frameTime) % frames;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    material.diffuseTexture.vOffset = (1 / frames) * currentFrame;
  });

  const offset = BABYLON.Matrix.Translation(0, 0.5, 0);
  mesh.bakeTransformIntoVertices(offset);
  const clone = mesh.clone();
  clone.rotation.y += 1.62;
  return BABYLON.Mesh.MergeMeshes([mesh, clone], false);
}


const ID = "autumn-plugin-root";

const noa = window.layers.noa.noa;

// Create React UI
const Container = () => {
  const textureNameToUrl = {
    // These don't work somehow
    [Textures.RedFlower]: 'https://i.imgur.com/sW4X9yI.png',
    [Textures.OrangeFlower]: 'https://i.imgur.com/sW4X9yI.png',
    [Textures.MagentaFlower]: 'https://i.imgur.com/rPQwpmk.png',
    [Textures.LightBlueFlower]: 'https://i.imgur.com/sW4X9yI.png',
    [Textures.LimeFlower]: 'https://i.imgur.com/sW4X9yI.png',
    [Textures.PinkFlower]: 'https://i.imgur.com/rPQwpmk.png',
    [Textures.GrayFlower]: 'https://i.imgur.com/sW4X9yI.png',
    [Textures.LightGrayFlower]: 'https://i.imgur.com/sW4X9yI.png',
    [Textures.CyanFlower]: 'https://i.imgur.com/sW4X9yI.png',
    [Textures.PurpleFlower]: 'https://i.imgur.com/sW4X9yI.png',
    [Textures.BlueFlower]: 'https://i.imgur.com/rPQwpmk.png',
    [Textures.GreenFlower]: 'https://i.imgur.com/sW4X9yI.png',
    [Textures.BlackFlower]: 'https://i.imgur.com/sW4X9yI.png',
    [Textures.Kelp]: 'https://i.imgur.com/sW4X9yI.png',
    // Textures that actually change
    // [Textures.Grass]: 'https://i.imgur.com/sW4X9yI.png',
    // Red leaves
    // [Textures.Leaves]: 'https://i.imgur.com/zhdz4ER.png',
    // Yellow leaves
    [Textures.Leaves]: 'https://i.imgur.com/f7oIj6y.png',
    [Textures.Diamond]: 'https://i.imgur.com/iGCwvsO.png',
    // [Textures.Bedrock]: 'https://i.imgur.com/sW4X9yI.png',
    // [Textures.Bricks]: 'https://i.imgur.com/sW4X9yI.png',
    // [Textures.Glass]: 'https://i.imgur.com/sW4X9yI.png',
    // [Textures.Sand]: 'https://i.imgur.com/sW4X9yI.png',
    [Textures.Dirt]: 'https://i.imgur.com/taBBKX4.png',
    // [Textures.Stone]: 'https://i.imgur.com/sW4X9yI.png',
    // [Textures.Water]: 'https://i.imgur.com/sW4X9yI.png',
    // [Textures.Cobblestone]: 'https://i.imgur.com/sW4X9yI.png',
    // [Textures.Stone]: 'https://i.imgur.com/sW4X9yI.png',
    [Textures.Grass]: 'https://i.imgur.com/sySjgl0.png',
    [Textures.GrassSide]: 'https://i.imgur.com/s7YumQ2.png',
    [Textures.GrassBottom]: 'https://i.imgur.com/taBBKX4.png',
    // Orange grass
    // [Textures.Grass]: 'https://i.imgur.com/imUAW4F.png',
  }
  // useEffect(() => {
  //   Object.entries(textureNameToUrl).forEach(
  //     ([textureName, url]) => {
  //       noa.registry.registerMaterial(textureName, undefined, url, true)
  //     }
  //   )
  // }, []);
    useEffect(() => {


        const scene = noa.rendering.getScene();
        const index = 20;
        const key = "MagentaFlower"
        const texture =  'https://i.imgur.com/rPQwpmk.png';
        const augmentedBlock =  { type: 1, material: texture, solid: false, opaque: false, blockMesh: undefined, frames: undefined }
      //  const augmentedBlock = { ...block };
      //  if (!block) continue;
    
        // Register mesh for mesh blocks

          if (texture === null) {
            throw new Error("Can't create a plant block without a material");
          }

          const mesh = createMeshBlock(noa, scene, texture, key, undefined);
          augmentedBlock.blockMesh = mesh;
          delete augmentedBlock.material;

          console.log(augmentedBlock)

    
        noa.registry.registerBlock(index, augmentedBlock);

    
  }, []);

  return null;
};


// Cleanup function to call when plugin gets reloaded
function cleanup() {
  document.getElementById(ID)?.remove();
}

// Create a new react root to mount this element
cleanup();
const root = document.createElement("div");
root.id = ID;
document.body.appendChild(root);
render(<Container />, root);

