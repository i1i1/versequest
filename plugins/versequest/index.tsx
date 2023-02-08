import { render } from "preact";
import { useEffect } from "preact/hooks";
import { keccak256 } from "@latticexyz/utils";
import { EntityID } from "@latticexyz/recs";

import { Block, NoaBlockType } from "./types";


const {
  noa: { noa },
} = window.layers;

const ID = "versequest";

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

  const Blocks = {
    Bull: { type: NoaBlockType.BLOCK, material: Textures.Bull },
    Chicken: { type: NoaBlockType.BLOCK, material: Textures.Chicken },
    Chicken1: { type: NoaBlockType.BLOCK, material: Textures.Chicken1 },
    Chicken2: { type: NoaBlockType.BLOCK, material: Textures.Chicken2 },
    Cat: { type: NoaBlockType.BLOCK, material: Textures.Cat },
    Donkey: { type: NoaBlockType.BLOCK, material: Textures.Donkey },
    Goat: { type: NoaBlockType.BLOCK, material: Textures.Goat },
    Elephant: { type: NoaBlockType.BLOCK, material: Textures.Elephant },
    Duck: { type: NoaBlockType.BLOCK, material: Textures.Duck },
    Hedgehog: { type: NoaBlockType.BLOCK, material: Textures.Hedgehog },
    Hedgehog1: { type: NoaBlockType.BLOCK, material: Textures.Hedgehog1 },
    Dog: { type: NoaBlockType.BLOCK, material: Textures.Dog },
    Goat1: { type: NoaBlockType.BLOCK, material: Textures.Goat1 },
    Sheep: { type: NoaBlockType.BLOCK, material: Textures.Sheep },
    Monkey: { type: NoaBlockType.BLOCK, material: Textures.Monkey },
    Cow: { type: NoaBlockType.BLOCK, material: Textures.Cow },
  };

  useEffect(() => {
    for (const texture of Object.values(Textures)) {
      noa.registry.registerMaterial(texture, undefined, texture);
    }

    // register extra blocks
    for (const [key, block] of Object.entries(Blocks)) {
      const index = BlockTypeIndex[BlockType[key as BlockTypeKey]];
      const augmentedBlock = { ...block };

      noa.registry.registerBlock(index, augmentedBlock);
    }

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
