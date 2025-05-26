import { Grid } from "lucide-react";
import {
  accentColor,
  dim,
  // mockNFTs,
  ArtNFTAddress,
  ArtNFTAbi,
} from "../../utils/vars";
import Card from "./Card";
import { useReadContract, useWatchContractEvent } from "wagmi";
// import { title } from "process";

const AllNFTs = () => {
  const //
    { data, refetch } = useReadContract({
      address: ArtNFTAddress,
      abi: ArtNFTAbi,
      functionName: "getAllMetadata",
      args: [],
    }),
    totalNFT = (Array.isArray(data) ? [...data] : []).reverse();

  useWatchContractEvent({
    address: ArtNFTAddress,
    abi: ArtNFTAbi,
    eventName: "newArt",
    onLogs: async (logs) => {
      await refetch();
      console.log("New NFT minted:", logs);
    },
  });

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
      <div className="space-x-7 space-y-10 flex items-center justify-center flex-wrap">
        {totalNFT.map(
          ({
            creator,
            tokenId,
            uri,
          }: {
            creator: `0x${string}`;
            tokenId: bigint;
            uri: string;
          }) => {
            return (
              <Card
                key={String(tokenId)}
                id={Number(tokenId)}
                creator={creator}
                metadataCid={uri}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export default AllNFTs;
