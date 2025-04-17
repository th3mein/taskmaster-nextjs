"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { CgLogOut } from "react-icons/cg";

const LogoutButton = () => {
  const router = useRouter();
  const logout = async () => {
    axios
      .post("/api/auth/logout")
      .then(() => {
        router.push("/");
      })
      .catch((err) => {
        console.log(err, "Logout Error");
      });
  };

  return (
    <a
      className="icon-button11 cursor-pointer bg-foreground text-background rounded-full p-1"
      title="Logout"
      onClick={logout}
    >
      <CgLogOut className="" />
    </a>
  );
};
export default LogoutButton;
