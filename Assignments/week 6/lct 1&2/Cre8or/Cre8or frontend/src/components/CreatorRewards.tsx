import { Link } from "lucide-react";
import {
  ArtNFTAbi,
  ArtNFTAddress,
  CreatorTokenAbi,
  CreatorTokenAddress,
  dim,
} from "../../utils/vars";
import Money from "./Money";
import { useConfig, useChainId, useReadContract } from "wagmi";
import NFTPreview from "./NFTPreview";

const //
  CreatorRewards = () => {
    const //
      // [tokenId, setTokenId] = useState(""),
      totalNFT = useReadContract({
        address: ArtNFTAddress,
        abi: ArtNFTAbi,
        functionName: "getAllMetadata",
        args: [],
      }).data,
      chainId = useChainId(),
      { chains } = useConfig(),
      currentChain = chains.find((c) => c.id === chainId);

    return (
      <div className="w-full p-4 text-sm space-y-10">
        {/* intro */}
        <div>
          <div className="flex items-center space-x-2">
            <Money />
            <span className="font-bold text-2xl"> Creator Rewards</span>
          </div>
          <div className={`text-sm text-left ${dim}`}>
            Track rewards earned by creators when their NFTs are minted
          </div>
        </div>
        <div className="flex justify-center">
          <table className="  table-fixed w-[96%] ">
            <thead className=" ">
              <tr className={` *:${dim} *:text-start `}>
                <td>NFT Token ID</td>
                <td>NFT Image</td>
                <td>Creator Address</td>
                <td>Reward Amount</td>
                <td>Transaction Hash</td>
              </tr>
            </thead>
            <tbody>
              {totalNFT?.map(({ creator, tokenId, uri }) => {
                return (
                  <tr
                    key={Math.random()}
                    className=" *:text-start *:my-2 border-t-2  "
                  >
                    <td>{tokenId}</td>
                    <td className="h-20 w-20 flex items-center justify-center">
                      <NFTPreview metadataCid={uri} />
                    </td>
                    <td>
                      <a
                        href={
                          currentChain?.blockExplorers?.default.url +
                          "/address/" +
                          creator
                        }
                      >
                        {creator.replace(
                          creator.slice(6, creator.length - 5),
                          "..."
                        )}
                      </a>
                    </td>
                    <td className=" flex text-2xl items-center font-bold -top-8 relative">
                      <Money /> <CreatorRewardsBalance creator={creator} />
                    </td>
                    <td>
                      <a href="#" className="flex items-center space-x-1">
                        <Link className={`${dim}`} size={15} />
                        <span>
                          {"wedewcbywqbxyunwqziqw8wedewcbywqbxyunwqziqw8".slice(
                            35
                          )}
                          ...
                        </span>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

interface CreatorRewardsBalanceProps {
  creator: string;
}
export const CreatorRewardsBalance = ({
  creator,
}: CreatorRewardsBalanceProps) => {
  const balance =
    Number(
      useReadContract({
        address: CreatorTokenAddress,
        abi: CreatorTokenAbi,
        functionName: "balanceOf",
        args: [creator as `0x${string}`],
      }).data
    ) / 1e18;
  return <span>{balance}</span>;
};

export default CreatorRewards;
