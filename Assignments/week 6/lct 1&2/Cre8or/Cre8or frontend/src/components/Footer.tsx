import { GithubIcon } from "lucide-react";

const Footer = () => {
  return (
    <div className="flex w-[105%] h-20 p-1 items-center justify-between">
      <div>
        ...In fulfillment of the deliverables of WK 6 Assignment |{" "}
        <a
          href="https:x.com/tweetSomto"
          target="me"
          className="text-blue-300"
          id="somto"
        >
          Somtochukwu K. O.
        </a>{" "}
      </div>
      <div className="flex space-x-2">
        <a
          href="https://github.com/soomtochukwu/LISK_Africa_Bootcamp/tree/main/Assignments/week%206/lct%201%262/Cre8or"
          id="octacat"
          target="ww"
        >
          <GithubIcon />
        </a>
        <a
          href="https://sepolia-blockscout.lisk.com/token/0x43c73E1a22130737a0bA4B8e0825Be3347F565Df?tab=contract"
          id="github"
        >
          View Smart Contract
        </a>
      </div>
    </div>
  );
};

export default Footer;
