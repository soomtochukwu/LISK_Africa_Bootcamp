import { LucideCloudUpload } from "lucide-react";
import { accentColor, dim } from "../../utils/vars";
import { useState } from "react";

interface UploadProps {
  reset: () => void;
  uploaded: boolean;
  setUploaded: (boolean: boolean) => void;
  setImage: (file: File) => void;
}

const Upload = ({ reset, uploaded, setUploaded, setImage }: UploadProps) => {
  const //

    previewImage = async (uploadedFile: File) => {
      setUploaded(true);
      // setFile(e.dataTransfer.files[0]);
      console.log(uploadedFile?.name);
      console.log(uploadedFile?.type);
      const reader = new FileReader();
      if (uploadedFile?.type.startsWith("image")) {
        reader.onload = (ev) => {
          (document.getElementById("preview") as HTMLImageElement).src = ev
            .target?.result as string;
        };
        reader.readAsDataURL(uploadedFile);
      } else {
        alert("please make sure you upload an image");
        setUploaded(false);
      }
      setBgDrag("");
    },
    [bgDrag, setBgDrag] = useState("");
  // [file, setFile] = useState<File>(),
  return (
    <div
      onClick={() => {
        document.getElementById("input")?.click();
      }}
      onDragOver={(e) => {
        reset();
        e.preventDefault();
        setBgDrag("bg-[#9999]");
      }}
      onDrop={(e) => {
        e.preventDefault();
        previewImage(e.dataTransfer.files[0]);
        setImage(e.dataTransfer.files[0]);
      }}
      className={
        "  flex active:scale-95 w-full md:w-96  cursor-pointer justify-between space-y-2 "
      }
    >
      <input
        type="file"
        className="hidden"
        id="input"
        onInput={(e) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          if (e.currentTarget.files && e.currentTarget.files[0]) {
            previewImage(e.currentTarget.files[0]);
            setImage(e.currentTarget.files[0]);
          }
        }}
      />

      {uploaded ? (
        <div className="h-full flex items-center justify-center">
          <img
            className="w-full hover:brightness-125 max-h-96 shadow-2xl shadow-gray-900 rounded-xl "
            id="preview"
          />
        </div>
      ) : (
        <div
          className={
            " border-2 space-y-5 p-3 text-center justify-center items-center rounded-lg h-60 flex flex-col " +
            bgDrag
          }
        >
          <LucideCloudUpload size={40} color={accentColor} />
          <p className={`text-sm ${dim}`}>
            Click to upload or drag and drop
            <br />
            <span className="text-xs">
              PNG, JPG, GIF up to <b className={`text-[${accentColor}]`}>5MB</b>
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Upload;
