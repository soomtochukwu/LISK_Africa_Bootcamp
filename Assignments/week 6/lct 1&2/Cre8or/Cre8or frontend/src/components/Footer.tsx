import { GithubIcon } from "lucide-react";

const Footer = () => {
  return (
    <div className="flex w-[105%] h-20 p-1 items-center justify-between">
      <div>
        Built by{" "}
        <a href="#somto" id="somto">
          Somtochukwu K. O.
        </a>{" "}
        using Vite, Solidity, Wagmi & Pinata
      </div>
      <div className="flex space-x-2">
        <a href="#octacat" id="octacat">
          <GithubIcon />
        </a>
        <a href="#github" id="github">
          View Smart Contract
        </a>
      </div>
    </div>
  );
};

export default Footer;
