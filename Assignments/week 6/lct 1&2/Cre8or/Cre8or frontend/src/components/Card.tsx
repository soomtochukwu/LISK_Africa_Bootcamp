import { CgProfile } from "react-icons/cg";
import { accentColor, dim } from "../../utils/vars";
import { PenToolIcon } from "lucide-react";

interface CardProps {
  ipfsURL: string;
  title: string;
  id: number;
  description: string;
  currentOwner: string;
  creator: string;
}

const Card = ({
  creator,
  currentOwner,
  description,
  id,
  title,
  ipfsURL,
}: CardProps) => {
  return (
    <div
      key={Math.random()}
      className="w-72 shadow-2xl rounded-2xl hover:shadow shadow-gray-900 hover:scale-110"
    >
      {/* nft display */}
      <div className="w-fit h-80 flex items-center">
        <img
          src={ipfsURL}
          className="hover:brightness-125 brightness-75"
          alt=""
        />
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
              href="#"
              title="Current owner"
              className="flex items-center space-x-1"
            >
              <CgProfile /> <span>{currentOwner}</span>
            </a>
            <a href="#" title="Creator" className="flex items-center space-x-1">
              <PenToolIcon size={15} /> <span>{creator}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
