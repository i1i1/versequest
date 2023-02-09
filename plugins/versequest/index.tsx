import { render } from "preact";
import { useEffect, useState } from "preact/hooks";
import { keccak256, VoxelCoord } from "@latticexyz/utils";
import { EntityID } from "@latticexyz/recs";
import styled from "styled-components";

import { Block, NoaBlockType } from "./types";
import { createMeshBlock } from "./mesh";


const {
  noa: { noa },
  network,
} = window.layers;

const ID = "versequest";

const ContainerWrapper = `
  position: absolute;
  width: 300px;
  height: 300px;
  left: 36px;
  top: 200px;
`;
const P = `
  line-height: 16px;
`;


// Create React UI
const Container = () => {

  const Textures = {
    Bull:      'https://ipfs.sea.tube/ipfs/QmWk1ZZppsDQ1RM19oj7AFecgP9P5JgFvRcHpkRbTWk4XR',
    Cat:       'https://ipfs.sea.tube/ipfs/QmNd4focFu8CNbNqk3W8ZbSD6jawp4cZpcsjgLtfm4BEKU',
    Chicken1:  'https://ipfs.sea.tube/ipfs/QmYwsHfByxAPebdJuG2b2aJQQTALUN8vv7A5orwyCfsUyp',
    Chicken2:  'https://ipfs.sea.tube/ipfs/QmYo5ajGoLAaPF144Pzb9wyZKZfVYoNGNUfbVdwjVNvd7K',
    Chicken:   'https://ipfs.sea.tube/ipfs/QmQ5CLAtvv89ghTS2dvdekW6nzrimp8ZPqDxZf5JkJXnPy',
    Cow:       'https://ipfs.sea.tube/ipfs/Qmc6Es6Hf3UjDp4qwEkfx7oysL2CTnjS5J2893PsU9FW7s',
    Dog:       'https://ipfs.sea.tube/ipfs/QmTtxnwbRRazWtox8bFYVmyQPtMxWDWZFD5No87hetzfpZ',
    Donkey:    'https://ipfs.sea.tube/ipfs/QmWkLP5ft4kjgHpyMyG5CetbBjeQsvfKTNDphpqpCd4Gk7',
    Duck:      'https://ipfs.sea.tube/ipfs/QmSDjBRyuwPwmngMrM78zSnhT6zSwy4LxrGc4V45b4FS75',
    Elephant:  'https://ipfs.sea.tube/ipfs/QmVWnn6uWTStsGvVUfqCVn2K9Tq5SdoH4FVq7C2hFE3VcL',
    Goat1:     'https://ipfs.sea.tube/ipfs/QmVDK2HeagezqEDYzbfHdJuV9zfWtfYzGBCzZfavviKNTq',
    Goat:      'https://ipfs.sea.tube/ipfs/QmUXy2kWxRX2Vb6FmM1VX2oWMUyEwuHTwfbfHDAvWT74tb',
    Hedgehog1: 'https://ipfs.sea.tube/ipfs/Qmb8zMh67F8aPZVLh8pt1kfkb49VaKzxrr3EcPDFuCxnVG',
    Hedgehog:  'https://ipfs.sea.tube/ipfs/QmRkMeqE6bXVw26kaYDFFJEQwwhufenvDPxSK8AFk2wUBt',
    Monkey:    'https://ipfs.sea.tube/ipfs/QmfNcVm8jtVhyMLNG8Lr9bBbMXvy3cPmWMqKhuFQ77e44L',
    Sheep:     'https://ipfs.sea.tube/ipfs/QmWjxJpmqkVQAAwRj6kQ6ZRK6SeHuPFgHop3PXVKGUaWRC',
  };

  const BlockType = {
    Bull:      keccak256("block.Bull") as EntityID,
    Cat:       keccak256("block.Cat") as EntityID,
    Chicken1:  keccak256("block.Chicken1") as EntityID,
    Chicken2:  keccak256("block.Chicken2") as EntityID,
    Chicken:   keccak256("block.Chicken") as EntityID,
    Cow:       keccak256("block.Cow") as EntityID,
    Dog:       keccak256("block.Dog") as EntityID,
    Donkey:    keccak256("block.Donkey") as EntityID,
    Duck:      keccak256("block.Duck") as EntityID,
    Elephant:  keccak256("block.Elephant") as EntityID,
    Goat1:     keccak256("block.Goat1") as EntityID,
    Goat:      keccak256("block.Goat") as EntityID,
    Hedgehog1: keccak256("block.Hedgehog1") as EntityID,
    Hedgehog:  keccak256("block.Hedgehog") as EntityID,
    Monkey:    keccak256("block.Monkey") as EntityID,
    Sheep:     keccak256("block.Sheep") as EntityID,
  };

  const BlockTypeIndex = Object.values(BlockType).reduce<{ [key: string]: number }>((acc, id, index) => {
    acc[id] = 255 - index;
    return acc;
  }, {});

  const BlockIndexToKey = Object.entries(BlockType).reduce<{ [key: number]: BlockTypeKey }>((acc, [key], index) => {
    acc[255 - index] = key;
    return acc;
  }, {});


  const Blocks = {
    Bull: { type: NoaBlockType.BLOCK, material: Textures.Bull, solid: false, opaque: false },
    Chicken: { type: NoaBlockType.BLOCK, material: Textures.Chicken, solid: false, opaque: false },
    Chicken1: { type: NoaBlockType.BLOCK, material: Textures.Chicken1, solid: false, opaque: false },
    Chicken2: { type: NoaBlockType.BLOCK, material: Textures.Chicken2, solid: false, opaque: false },
    Cat: { type: NoaBlockType.BLOCK, material: Textures.Cat, solid: false, opaque: false },
    Donkey: { type: NoaBlockType.BLOCK, material: Textures.Donkey, solid: false, opaque: false },
    Goat: { type: NoaBlockType.BLOCK, material: Textures.Goat, solid: false, opaque: false },
    Elephant: { type: NoaBlockType.BLOCK, material: Textures.Elephant, solid: false, opaque: false },
    Duck: { type: NoaBlockType.BLOCK, material: Textures.Duck, solid: false, opaque: false },
    Hedgehog: { type: NoaBlockType.BLOCK, material: Textures.Hedgehog, solid: false, opaque: false },
    Hedgehog1: { type: NoaBlockType.BLOCK, material: Textures.Hedgehog1, solid: false, opaque: false },
    Dog: { type: NoaBlockType.BLOCK, material: Textures.Dog, solid: false, opaque: false },
    Goat1: { type: NoaBlockType.BLOCK, material: Textures.Goat1, solid: false, opaque: false },
    Sheep: { type: NoaBlockType.BLOCK, material: Textures.Sheep, solid: false, opaque: false },
    Monkey: { type: NoaBlockType.BLOCK, material: Textures.Monkey, solid: false, opaque: false },
    Cow: { type: NoaBlockType.BLOCK, material: Textures.Cow, solid: false, opaque: false },
  };

  const [lastMinedNftId, setLastMinedNftId] = useState(null);

  useEffect(() => {
    for (const texture of Object.values(Textures)) {
      noa.registry.registerMaterial(texture, undefined, texture);
    }

    const scene = noa.rendering.getScene();

    // register extra blocks
    for (const [key, block] of Object.entries(Blocks)) {
      const index = BlockTypeIndex[BlockType[key]];
      const augmentedBlock = { ...block };

      const mesh = createMeshBlock(noa, scene, augmentedBlock.material, key, undefined);
      augmentedBlock.blockMesh = mesh;
      delete augmentedBlock.material;

      noa.registry.registerBlock(index, augmentedBlock);
    }

    let nfts = new Map();

    noa.world.on("worldDataNeeded", function (id, data, x, y, z) {
      const MIN_HEIGHT = 64;

      // `id` - a unique string id for the chunk
      // `data` - an `ndarray` of voxel ID data (see: https://github.com/scijs/ndarray)
      // `x, y, z` - world coords of the corner of the chunk
      if (y < -MIN_HEIGHT) {
        noa.world.setChunkData(id, data, undefined);
        return;
      }
      let allAir = true;
      for (let i = 0; i < data.shape[0]; i++) {
        for (let k = 0; k < data.shape[2]; k++) {
          for (let j = 0; j < data.shape[1]; j++) {
            if (data.get(i, j, k, 0) !== 0) {
              allAir = false;
            }
          }
        }
      }
      if (allAir) {
        noa.world.setChunkData(id, data, undefined);
        return;
      }

      for (let i = 0; i < data.shape[0]; i++) {
        for (let k = 0; k < data.shape[2]; k++) {
          for (let j = 0; j < data.shape[1]; j++) {
            if (data.get(i, j, k, 0) !== 0) {
              continue
            }

            data.set(i, j, k, 255 - (i + j + k) % 16);
            console.log({ x: x + i, y: y + j, z: z + k });
            nfts.set((x + i, y + j, z + k), (i + j + k) % 16);
            noa.world.setChunkData(id, data, undefined);
            return;
          }
        }
      }
    });
    let cb = noa.blockTargetIdCheck;
    noa.blockTargetIdCheck = function (index: number) {
      return index > (255 - 15) || cb(index);
    };

    let old_cb = network.api.mine;
    network.api.mine = async (coord: VoxelCoord) => {
      let c = (coord.x, coord.y, coord.z);
      if (nfts.has(c)) {
        setLastMinedNftId(nfts.get(c));
        nfts.delete(c);
      }
      return old_cb(coord);
    };

  }, []);

  return lastMinedNftId ? (
    <div style={ContainerWrapper}>
      <p style={P}>You've mined nft with id={lastMinedNftId}</p>
    </div>
  ) : (
    <div></div>
  );
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
