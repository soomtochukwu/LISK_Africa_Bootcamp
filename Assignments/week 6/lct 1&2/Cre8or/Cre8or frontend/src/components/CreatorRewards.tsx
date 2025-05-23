import { Link } from "lucide-react";
import { dim } from "../../utils/vars";
import Money from "./Money";

const //
  rewardsMockData = [
    {
      id: "#0042",
      ipfsUrl: "/cre8or.png",
      creatorAddress: "0x1234...5678",
      amount: "50",
      txn: "0x7d5f3e52f4f7a1c6a8ec1b5c9d8b7a9f8e7d6c5b4a3f2e1d",
    },
    {
      id: "#0043",
      ipfsUrl: "/cre8or.png",
      creatorAddress: "0x8765...4321",
      amount: "75",
      txn: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x",
    },
    {
      id: "#0044",
      ipfsUrl: "/cre8or.png",
      creatorAddress: "0xabcd...efgh",
      amount: "100",
      txn: "0x9z8y7x6w5v4u3t2s1r0q9p8o7n6m5l4k3j2i1h0g9f8e7d6c",
    },
  ],
  CreatorRewards = () => {
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
              {rewardsMockData.map(
                ({ amount, creatorAddress, id, ipfsUrl, txn }) => {
                  return (
                    <tr
                      key={Math.random()}
                      className="*:text-start *:my-2 border-t-2  "
                    >
                      <td>{id}</td>
                      <td className="">
                        <img width={60} height={60} src={ipfsUrl} alt="" />
                      </td>
                      <td>{creatorAddress}</td>
                      <td className="flex items-center p-4">
                        <Money /> {amount}
                      </td>
                      <td>
                        <a href="#" className="flex ">
                          <span>{txn.slice(35)}...</span>
                          <Link className={`${dim}`} size={15} />
                        </a>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

export default CreatorRewards;
