import { useEffect, useState } from "react";

interface NFTPreviewProps {
  metadataCid: string; // can be raw CID or ipfs://CID
  gateway?: string; // optional custom gateway
  alt?: string;
  width?: number;
  height?: number;
}

const NFTPreview = ({
  metadataCid,
  //   gateway = "https://ipfs.io/ipfs/",
  alt = "IPFS Image",
}: NFTPreviewProps) => {
  const //
    [imageUrl, setImageUrl] = useState<string | null>(null),
    [error, setError] = useState<string | null>(null),
    gateways = [
      "https://cloudflare-ipfs.com/ipfs/",
      "https://gateway.pinata.cloud/ipfs/",
      "https://ipfs.io/ipfs/",

      "https://cloudflare-ipfs.com/ipfs/",
      "https://nftstorage.link/ipfs/",
      "https://dweb.link/ipfs/",
    ];

  const tryGateways = async (cid: string) => {
    for (const g of gateways) {
      try {
        const res = await fetch(`${g}${cid}`);
        if (res.ok) return await res.json();
      } catch {
        // Intentionally ignore errors and try next gateway
      }
    }
    throw new Error("All gateways failed");
  };

  useEffect(() => {
    const fetchImageFromMetadata = async () => {
      try {
        const cid = metadataCid.replace("ipfs://", "");
        const metadata = await tryGateways(cid);

        if (!metadata.image) throw new Error("No 'image' field in metadata");

        const imageCid = metadata.image.replace("ipfs://", "");
        for (const g of gateways) {
          try {
            const imageUrl = `${g}${imageCid}`;
            const res = await fetch(imageUrl, { method: "HEAD" });
            if (res.ok) {
              setImageUrl(imageUrl);
              return;
            }
          } catch {
            // Intentionally ignore errors and try next gateway
          }
        }

        throw new Error("All gateways failed to load image");
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to load image");
        }
      }
    };

    fetchImageFromMetadata();
  }, [metadataCid]);

  if (error) return <p className="text-red-500">⚠️ {error}</p>;
  if (!imageUrl) return <p>Loading image...</p>;

  return (
    <img
      key={metadataCid}
      src={imageUrl}
      alt={alt}
      className="hover:brightness-125 brightness-75"
    />
  );
};

export default NFTPreview;
