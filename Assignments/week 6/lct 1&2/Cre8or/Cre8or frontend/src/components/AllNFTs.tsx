import { Grid } from "lucide-react";
import {
  accentColor,
  dim,
  // mockNFTs,
  ArtNFTAddress,
  ArtNFTAbi,
} from "../../utils/vars";
import Card from "./Card";
import { useReadContract } from "wagmi";
// import { title } from "process";

const AllNFTs = () => {
  const totalNFT = useReadContract({
    address: ArtNFTAddress,
    abi: ArtNFTAbi,
    functionName: "getAllMetadata",
    args: [],
  }).data;
  return (
    <div className=" w-full space-y-4">
      {/* intro */}
      <div className="text-left space-y-3">
        {/* heading */}
        <div className="flex space-x-4">
          <Grid color={accentColor} />
          <span className="font-bold text-xl">ArtNFT (All Art NFTs)</span>
        </div>
        {/* section description */}
        <div className={dim + " text-sm "}>
          Browse all minted NFTs in the collection
        </div>
      </div>
      {/* gallery */}
      <div className="space-x-7 space-y-7 flex items-center justify-center flex-wrap">
        {totalNFT?.map(({ creator, tokenId, uri }) => {
          return (
            <Card
              key={Math.random()}
              id={Number(tokenId)}
              creator={creator}
              metadataCid={uri}
            />
          );
        })}

        {}
      </div>
    </div>
  );
};

export default AllNFTs;
