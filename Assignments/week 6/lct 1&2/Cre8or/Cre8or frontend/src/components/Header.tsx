import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaWallet } from "react-icons/fa";
import { useAccount, useReadContract } from "wagmi";
import { CreatorTokenAddress, CreatorTokenAbi } from "../../utils/vars";

const Header = () => {
  const //
    { isConnected, address } = useAccount(),
    balance =
      Number(
        useReadContract({
          abi: CreatorTokenAbi,
          address: CreatorTokenAddress,
          functionName: "balanceOf",
          args: [address as `0x${string}`],
        }).data
      ) / 1e18,
    symbol = useReadContract({
      abi: CreatorTokenAbi,
      address: CreatorTokenAddress,
      functionName: "symbol",
      args: [],
    }).data;

  return (
    <div className="flex fixed top-0 z-40 backdrop-blur-2xl w-full justify-between items-center p-4 shadow-md">
      <a href="#" className="flex items-center space-x-4">
        <img src="/cre8or.png" width={70} alt="Header Image" />
        <span className="text-2xl hidden md:inline font-bold">
          Creator Rewards dApp
        </span>
      </a>
      <div className=" bg-[#0065a0] rounded-xl flex scale-75 md:scale-100 items-center space-x-2 p-1">
        {isConnected ? (
          <span
            className="font-bold text-xl font-mono"
            title="Your Cre8or Rewards Balance"
          >
            {balance ? balance : 0} {symbol}{" "}
          </span>
        ) : (
          <FaWallet size={25} />
        )}
        <ConnectButton
          accountStatus={{
            smallScreen: "avatar",
            largeScreen: "full",
          }}
          chainStatus={{
            smallScreen: "icon",
            largeScreen: "full",
          }}
          showBalance={{
            smallScreen: false,
            largeScreen: true,
          }}
        />
      </div>
    </div>
  );
};

export default Header;
