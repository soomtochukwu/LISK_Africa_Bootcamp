import { Grid } from "lucide-react";
import { accentColor, dim, mockNFTs } from "../../utils/vars";
import Card from "./Card";

const AllNFTs = () => {
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
        {mockNFTs.map(
          ({ creator, description, currentOwner, id, ipfsURL, title }) => {
            return (
              <Card
                key={Math.random()}
                title={title}
                id={id}
                description={description}
                currentOwner={currentOwner}
                creator={creator}
                ipfsURL={ipfsURL}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export default AllNFTs;
