import { LucideCloudUpload } from "lucide-react";
import {
  accentColor,
  ArtNFTAddress,
  ArtNFTAbi,
  // CreatorTokenAbi,/
  // CreatorTokenAddress,
  dim,
} from "../../utils/vars";
import Upload from "./Upload";
import { useState } from "react";
import { PinataSDK } from "pinata";
import { useWriteContract } from "wagmi";

const MintSection = () => {
  const //
    [uploaded, setUploaded] = useState<boolean>(),
    [image, setImage] = useState<File>(),
    [name, setName] = useState(""),
    [description, setDescription] = useState(""),
    { writeContract } = useWriteContract(),
    pinata = new PinataSDK({
      pinataJwt: import.meta.env.VITE_JWT,
      pinataGateway: import.meta.env.VITE_GATE,
    }),
    reset = () => {
      //   setImgSrc("");
      setUploaded(false);
      //   setFile(undefined);
      //   setBgDrag("");
    },
    pinFiles = async () => {
      const //
        // pin image
        pinnedImage = await (async () => {
          const pin = await pinata.upload.public.file(
            new File(
              [image as Blob],
              `${name}${image?.name.slice(image?.name.lastIndexOf("."))}`,
              {
                type: "image/plain",
              }
            )
          );
          await console.log(pin.cid);
          return pin;
        })(),
        // construct metadata
        metadata = {
          name: name,
          description: description,
          image: `ipfs://${pinnedImage.cid}`,
        },
        metadataBlob = new Blob([JSON.stringify(metadata)], {
          type: "application/json",
        }),
        file2 = new File([metadataBlob], `metadata_${name}.json`, {
          type: "application/json",
        }),
        pinnedMetadata = await (async () => {
          const pin = await pinata.upload.public.file(file2);
          await console.log(pin.cid);
          return pin;
        })();
      // pin metadata
      // return metadata ipfs hash
      return pinnedMetadata.cid;
    },
    handleMint = async () => {
      // logic to minth nft
      try {
        const //
          ipfsHash = await pinFiles(),
          tx = await writeContract({
            abi: ArtNFTAbi,
            address: ArtNFTAddress,
            functionName: "safeMint",
            args: [String(ipfsHash)],
          });
        console.log(tx);
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="w-3/4 space-y-8 p-6">
      {/* intro */}
      <div className="w-fit">
        <div className="flex items-center text-xl font-bold  p-2 space-x-2">
          <LucideCloudUpload color={accentColor} />
          <span>Mint a New NFT</span>
        </div>
        <div className={dim}>
          Upload your artwork and mint it as an NFT on the blockchain
        </div>
      </div>
      {/* upload image */}
      <div className="flex flex-col md:flex-row justify-center  text-left  space-x-9 space-y-9 ">
        <Upload
          setImage={setImage}
          setUploaded={setUploaded}
          reset={reset}
          uploaded={uploaded as boolean}
        />
        {/*add metadata */}
        <div className="flex space-y-10 flex-col w-full">
          <input
            onChange={(e) => {
              setName(e.currentTarget.value);
            }}
            type="text"
            className={`p-3 border rounded-lg outline-0 outline-[#0000] focus:outline-2 focus:outline-[${accentColor}]`}
            placeholder="Give your NFT a name"
          />

          <textarea
            onChange={(e) => {
              setDescription(e.currentTarget.value);
            }}
            placeholder="Describe your NFT (optional)"
            className={
              "p-3 border rounded-lg outline-0 outline-[#0000] focus:outline-2 " +
              `focus:outline-[${accentColor}]`
            }
            rows={5}
          ></textarea>
        </div>
      </div>
      <div className="flex justify-between">
        <button onClick={reset}>Reset</button>
        <button onClick={handleMint} className="bg-[accentColor]">
          Mint NFT
        </button>
      </div>
    </div>
  );
};

export default MintSection;
