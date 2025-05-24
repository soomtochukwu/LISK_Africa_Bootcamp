import { CiMoneyBill } from "react-icons/ci";
import { accentColor } from "../../utils/vars";

const Money = () => {
  return (
    <div className="flex flex-col -space-y-3 h-6 relative">
      <CiMoneyBill size={25} color={accentColor} className="rotate-45" />
      <CiMoneyBill size={25} color={accentColor} className="rotate-45" />
    </div>
  );
};

export default Money;
