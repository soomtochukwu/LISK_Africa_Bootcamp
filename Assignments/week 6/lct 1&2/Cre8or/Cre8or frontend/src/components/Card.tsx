import { accentColor, dim } from "../../utils/vars";
import { PenToolIcon } from "lucide-react";
import NFTPreview from "./NFTPreview";
import { useEffect, useState } from "react";
import { useChainId, useConfig } from "wagmi";

interface CardProps {
  id: number;
  creator: string;
  metadataCid: string;
}

const Card = ({ creator, id, metadataCid }: CardProps) => {
  const //
    [title, setTitle] = useState<string>(""),
    [description, setDescription] = useState<string>(""),
    chainId = useChainId(),
    { chains } = useConfig(),
    currentChain = chains.find((c) => c.id === chainId);

  useEffect(() => {
    const //
      gateways = [
        // "https://cloudflare-ipfs.com/ipfs/",
        "https://gateway.pinata.cloud/ipfs/",
        // "https://ipfs.io/ipfs/",
      ],
      tryGateways = async (cid: string) => {
        for (const g of gateways) {
          try {
            const res = await fetch(`${g}${cid}`);
            console.log(`${g}`);
            if (res.ok) return await res.json();
          } catch {
            // Intentionally ignore errors and try next gateway
          }
        }
        throw new Error("All gateways failed");
      },
      fetchImageFromMetadata = async () => {
        try {
          const cid = metadataCid.replace("ipfs://", "");
          const metadata = await tryGateways(cid);

          // Set metadata fields if available
          setTitle(metadata.name || "");
          setDescription(metadata.description || "");

          if (!metadata.image) throw new Error("No 'image' field in metadata");

          const imageCid = metadata.image.replace("ipfs://", "");
          setTitle(metadata.name || "Untitled NFT");
          setDescription(metadata.description || "No description available");
          for (const g of gateways) {
            try {
              const imageUrl = `${g}${imageCid}`;
              const res = await fetch(imageUrl, { method: "HEAD" });
              if (res.ok) {
                // setImageUrl(imageUrl);
                return;
              }
            } catch {
              // Intentionally ignore errors and try next gateway
            }
          }

          throw new Error("All gateways failed to load image");
        } catch (err: unknown) {
          if (err instanceof Error) {
            // setError(err.message);
          } else {
            // setError("Failed to load image");
          }
        }
      };

    fetchImageFromMetadata();
  }, [metadataCid]);

  return (
    <div
      key={Math.random()}
      className="w-72 shadow-2xl rounded-2xl hover:shadow shadow-gray-900 hover:scale-110"
    >
      <div>{currentChain?.blockExplorers?.default.url}</div>
      {/* nft display */}
      <div className="w-fit h-80 flex items-center">
        <NFTPreview metadataCid={metadataCid} />
      </div>
      {/* metadata */}
      <div className="p-4 space-y-3">
        <div className="flex w-full justify-between">
          {/* heading*/}
          <span className="font-bold">{title}</span>
          <span className={`text-[${accentColor}]`}>#{id}</span>
        </div>
        <div className={"text-left text-sm space-y-3 " + dim}>
          <div className="border-l-4 pl-2 border-l-gray-200">
            {" "}
            {description}
          </div>
          <div className="flex justify-between">
            <a
              href={
                currentChain?.blockExplorers?.default.url +
                "/address/" +
                creator
              }
              target="_blank"
              title="Creator"
              className="flex items-center space-x-1"
            >
              <PenToolIcon size={15} />{" "}
              <span>
                {creator.replace(creator.slice(6, creator.length - 5), "...")}
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
