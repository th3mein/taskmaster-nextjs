"use client";
import { useRouter } from "next/navigation";
import { FaRegEdit } from "react-icons/fa";

type ButtonProps = {
  type: string;
  link: string;
};
const Button = ({ type, link }: ButtonProps) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push(link);
  };

  let buttonContent = null;

  if (type === "edit") {
    buttonContent = (
      <button
        className="icon-button table__button cursor-pointer flex"
        onClick={handleEdit}
      >
        <FaRegEdit className="mr-2 mt-0.5" /> Edit
      </button>
    );
  }
  return buttonContent;
};
export default Button;
