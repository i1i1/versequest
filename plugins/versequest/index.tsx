import { render } from "preact";
import { useEffect, useState } from "preact/hooks";
import { keccak256, VoxelCoord } from "@latticexyz/utils";
import { EntityID } from "@latticexyz/recs";
import styled from "styled-components";

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
    Bear:     'https://ipfs.sea.tube/ipfs/QmcTZavrnQSW2rDk1agh71MZ7Mi7gF5eLehKiQBdUipoRc',
    Bull:     'https://ipfs.sea.tube/ipfs/QmbwBpX8m9YrASsJBcQLm4coeWkrE7UhWtiGYoa5LHtYct',
    Chicken:  'https://ipfs.sea.tube/ipfs/QmesESySjgcKrtXiWFUiyd8YTszECR56ZJzF7355nMWmob',
    Cow:      'https://ipfs.sea.tube/ipfs/QmRPfhWkLV5oAq5qfLmaCciuFMwsoUfsnpnRvbPSKfEbDf',
    Dog:      'https://ipfs.sea.tube/ipfs/QmdXgLn1juts7g7RHvQTFi9bBs44agyAp2Q1rBzNPPLAPq',
    Donkey:   'https://ipfs.sea.tube/ipfs/QmXUGAEcX8Nq6WfNjRwDrg7GMNszepmZekwGxUex2uJ8t4',
    Duck:     'https://ipfs.sea.tube/ipfs/QmcsF5w2SPbbjhFR2V5PvhLqbBLSHxc82vEgkYticGgKXq',
    Elephant: 'https://ipfs.sea.tube/ipfs/QmRJsDyeUjSyn8sAm4sVQAtnBw3e39W1d1G6VTo78EchVz',
    Goat:     'https://ipfs.sea.tube/ipfs/QmRafKu1SwzgKGU4BWxQDouhuT3Wi5NFP1cPVWkjvrVpas',
    Hedgehog: 'https://ipfs.sea.tube/ipfs/QmYKzVZQRM5s7z5v2moU1UtYEANw4ttidWFrsuUfH2oTPk',
    Horse:    'https://ipfs.sea.tube/ipfs/Qmdk7J4mhLFqFF1BASsiQFqvfRPzbajJPkQEWAnFGGZsBP',
    Monkey:   'https://ipfs.sea.tube/ipfs/Qmd8QBnJKyHvezHwz3yBH8WufqYHKtihG7HCPTzSgHRiaZ',
    Mouse:    'https://ipfs.sea.tube/ipfs/QmVLCphEVKC13yiS4sffAYtpdipmEnzu4aXpTEKJXPJsy6',
    Panda:    'https://ipfs.sea.tube/ipfs/QmUD5MrTZjcCVdGdEpHetEGT9tMG5mWNWzg6r9C8bn2cyi',
    Pig:      'https://ipfs.sea.tube/ipfs/QmWFxhSubrZaEz4AVvQhKwLr5WGdronwCbTRBw6r4jPSgK',
    Rabbit:   'https://ipfs.sea.tube/ipfs/QmWbxKj7zFPQNZekoJ82wQgvEkomGMq4vY1FWArY2N6V8b',
    Raccoon:  'https://ipfs.sea.tube/ipfs/QmYrpUNasPZuNaCEAXMcFstj7bGEwK4txyiPitSz4v2PVp',
    Sheep:    'https://ipfs.sea.tube/ipfs/Qmdtif1pKATYoNEGBrmDfoaqVseLmoaNjABzgKCP8SD4Ew',
  };

  const BlockType = {
    Bull:     keccak256("block.Bull") as EntityID,
    Chicken:  keccak256("block.Chicken") as EntityID,
    Cow:      keccak256("block.Cow") as EntityID,
    Dog:      keccak256("block.Dog") as EntityID,
    Donkey:   keccak256("block.Donkey") as EntityID,
    Duck:     keccak256("block.Duck") as EntityID,
    Elephant: keccak256("block.Elephant") as EntityID,
    Goat:     keccak256("block.Goat") as EntityID,
    Hedgehog: keccak256("block.Hedgehog") as EntityID,
    Horse:    keccak256("block.Horse") as EntityID,
    Monkey:   keccak256("block.Monkey") as EntityID,
    Mouse:    keccak256("block.Mouse") as EntityID,
    Panda:    keccak256("block.Panda") as EntityID,
    Pig:      keccak256("block.Pig") as EntityID,
    Rabbit:   keccak256("block.Rabbit") as EntityID,
    Raccoon:  keccak256("block.Raccoon") as EntityID,
    Sheep:    keccak256("block.Sheep") as EntityID,
  };

  const BlockTypeIndex = Object.values(BlockType).reduce<{ [key: string]: number }>((acc, id, index) => {
    acc[id] = 255 - index;
    return acc;
  }, {});

  const BlockIndexToKey = Object.entries(BlockType).reduce<{ [key: number]: BlockTypeKey }>((acc, [key], index) => {
    acc[255 - index] = key;
    return acc;
  }, {});


  const [lastMinedNftId, setLastMinedNftId] = useState(null);

  useEffect(() => {
    for (const texture of Object.values(Textures)) {
      noa.registry.registerMaterial(texture, undefined, texture);
    }

    const scene = noa.rendering.getScene();

    // register extra blocks
    for (const [key, material] of Object.entries(Textures)) {
      const index = BlockTypeIndex[BlockType[key]];
      const blockMesh = createMeshBlock(noa, scene, material, key, undefined);
      const block = { blockMesh, solid: false, opaque: false };
      noa.registry.registerBlock(index, block);
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

            const nftIdx = (i + j + k) % Object.keys(Textures).len;
            data.set(i, j, k, 255 - nftIdx);
            nfts.set((x + i, y + j, z + k), nftIdx);
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
