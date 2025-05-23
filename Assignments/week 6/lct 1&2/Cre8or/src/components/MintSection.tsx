import { LucideCloudUpload } from "lucide-react";
import { accentColor, dim } from "../../utils/vars";
import Upload from "./Upload";
import { useState } from "react";

const MintSection = () => {
  const [uploaded, setUploaded] = useState<boolean>(),
    reset = () => {
      //   setImgSrc("");
      setUploaded(false);
      //   setFile(undefined);
      //   setBgDrag("");
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
      <div className="flex items-center text-left space-x-9 ">
        {/* upload image */}

        <Upload
          setUploaded={setUploaded}
          reset={reset}
          uploaded={uploaded as boolean}
        />
        {/*add info */}
        <div className="flex space-y-10 flex-col w-full">
          <input
            type="text"
            className={`p-3 border rounded-lg outline-0 outline-[#0000] focus:outline-2 focus:outline-[${accentColor}]`}
            placeholder="Give your NFT a name"
          />

          <textarea
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
        <button className="bg-[accentColor]">Mint NFT</button>
      </div>
    </div>
  );
};

export default MintSection;
