import { FaWallet } from "react-icons/fa";

const Header = () => {
  return (
    <div className="flex fixed top-0 z-40 backdrop-blur-2xl w-full justify-between items-center p-4 shadow-md">
      <a href="#" className="flex items-center space-x-4">
        <img src="/cre8or.png" width={70} alt="Header Image" />
        <span className="text-2xl font-bold">Creator Rewards dApp</span>
      </a>
      <button className=" flex items-center space-x-2 p-3">
        <FaWallet /> <span>Connect Wallet</span>
      </button>
    </div>
  );
};

export default Header;
