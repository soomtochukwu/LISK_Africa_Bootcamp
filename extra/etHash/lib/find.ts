import {
  keccak256,
  encodeBytes32String,
  encodeBase58,
  encodeBase64,
  solidityPacked,
} from "ethers";
import { words } from "./var";

const MAGIC_WORD_HASH: string =
  "0xe12a28df6f8731c94ade6605c8f457c16b3f591ecc3be3d092af1f56215a3da2";

words.forEach((word) => {
  const //
    encode = encodeBase58(word),
    encode1 = encodeBase64(word),
    encode2 = encodeBytes32String(word),
    hash = keccak256(encode);
  console.log("hash", hash);
  console.log("encode", encode, encode1, encode2);
  hash == MAGIC_WORD_HASH
    ? console.log(word.padEnd(27), "word found".padEnd(27), word, hash)
    : console.log(word.padEnd(27), "NOT FOUND".padEnd(27), hash);
});
